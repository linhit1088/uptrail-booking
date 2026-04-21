import { Resend } from 'resend';
import { logger } from './logger';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const EMAIL_FROM = process.env.EMAIL_FROM || 'Uptrail <noreply@uptrail.vn>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ==================== TYPES ====================

interface BookingEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourName: string;
  startDate: string;
  numPeople: number;
  totalAmount: number;
  note?: string | null;
}

interface PaymentEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  tourName: string;
  amountPaid: number;
  totalAmount: number;
  remaining: number;
}

// ==================== HELPERS ====================

function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    logger.warn('Email not sent: RESEND_API_KEY not configured', { to, subject });
    return;
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });
    logger.info('Email sent successfully', { to, subject, id: result.data?.id });
  } catch (error) {
    logger.error('Failed to send email', {
      to,
      subject,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

// ==================== EMAIL TEMPLATES ====================

function bookingConfirmationTemplate(data: BookingEmailData): string {
  const bookingCode = `#${data.bookingId.slice(-6).toUpperCase()}`;
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
      <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#064e3b,#047857);padding:32px;border-radius:16px 16px 0 0;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:24px;">🏔️ UPTRAIL</h1>
          <p style="color:#bbf7d0;margin:8px 0 0;font-size:14px;">Xác Nhận Đặt Chỗ Thành Công</p>
        </div>
        
        <!-- Body -->
        <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
          <p style="color:#334155;font-size:16px;margin:0 0 16px;">Xin chào <strong>${data.customerName}</strong>,</p>
          <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Cảm ơn bạn đã đặt chỗ tại Uptrail! Dưới đây là thông tin đơn đặt chỗ của bạn:
          </p>

          <!-- Booking Info Card -->
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:24px;margin:0 0 24px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:6px 0;color:#64748b;">Mã đơn:</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#064e3b;">${bookingCode}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Tour:</td><td style="padding:6px 0;text-align:right;font-weight:600;color:#1e293b;">${data.tourName}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Ngày khởi hành:</td><td style="padding:6px 0;text-align:right;color:#1e293b;">${formatDate(data.startDate)}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Số người:</td><td style="padding:6px 0;text-align:right;color:#1e293b;">${data.numPeople} người</td></tr>
              <tr style="border-top:1px solid #bbf7d0;"><td style="padding:12px 0 6px;color:#64748b;font-weight:700;">Tổng tiền:</td><td style="padding:12px 0 6px;text-align:right;font-weight:700;color:#d97706;font-size:18px;">${formatVND(data.totalAmount)}</td></tr>
            </table>
          </div>

          <!-- Payment Instructions -->
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:20px;margin:0 0 24px;">
            <h3 style="margin:0 0 12px;font-size:14px;color:#92400e;">💰 Hướng Dẫn Thanh Toán</h3>
            <p style="margin:0;font-size:13px;color:#78716c;line-height:1.6;">
              Vui lòng chuyển khoản <strong style="color:#d97706;">${formatVND(data.totalAmount)}</strong> trong vòng <strong>48 giờ</strong> để giữ chỗ.<br/>
              Nội dung CK: <strong style="color:#064e3b;">${bookingCode} ${data.customerName}</strong><br/><br/>
              Sau khi chuyển khoản, team Uptrail sẽ xác nhận qua điện thoại/Zalo trong vòng 2 giờ.
            </p>
          </div>

          <!-- Hotline -->
          <div style="text-align:center;padding:16px 0;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 4px;font-size:13px;color:#94a3b8;">Cần hỗ trợ? Gọi Hotline</p>
            <a href="tel:0966666666" style="display:inline-block;padding:8px 24px;background:#064e3b;color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:16px;">📞 0966 666 666</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding:24px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Uptrail — Hành Trình Chữa Lành</p>
          <p style="margin:4px 0 0;font-size:11px;color:#cbd5e1;">Email này được gửi tự động, vui lòng không trả lời.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function statusUpdateTemplate(data: BookingEmailData, newStatus: string): string {
  const bookingCode = `#${data.bookingId.slice(-6).toUpperCase()}`;

  const statusInfo: Record<string, { title: string; message: string; color: string }> = {
    confirmed: {
      title: '✅ Đơn Đã Được Xác Nhận',
      message: `Đơn đặt chỗ ${bookingCode} cho tour <strong>${data.tourName}</strong> đã được xác nhận thành công! Vui lòng hoàn tất thanh toán (nếu chưa) để đảm bảo giữ chỗ.`,
      color: '#2563eb',
    },
    paid: {
      title: '💚 Thanh Toán Hoàn Tất',
      message: `Cảm ơn bạn! Đơn đặt chỗ ${bookingCode} cho tour <strong>${data.tourName}</strong> đã được thanh toán đầy đủ. Hẹn gặp bạn vào ngày khởi hành!`,
      color: '#047857',
    },
    cancelled: {
      title: '❌ Đơn Đã Bị Hủy',
      message: `Đơn đặt chỗ ${bookingCode} cho tour <strong>${data.tourName}</strong> đã được hủy. Nếu bạn cần hỗ trợ, vui lòng liên hệ Hotline.`,
      color: '#dc2626',
    },
  };

  const info = statusInfo[newStatus];
  if (!info) return '';

  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
      <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
        <div style="background:${info.color};padding:32px;border-radius:16px 16px 0 0;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:20px;">${info.title}</h1>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;">
          <p style="color:#334155;font-size:16px;margin:0 0 16px;">Xin chào <strong>${data.customerName}</strong>,</p>
          <p style="color:#64748b;font-size:14px;line-height:1.8;margin:0 0 24px;">${info.message}</p>
          <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:0 0 24px;font-size:13px;color:#64748b;">
            <strong>Tour:</strong> ${data.tourName}<br/>
            <strong>Ngày đi:</strong> ${formatDate(data.startDate)}<br/>
            <strong>Số người:</strong> ${data.numPeople}
          </div>
          <div style="text-align:center;">
            <a href="tel:0966666666" style="color:#047857;font-weight:700;font-size:14px;">📞 Hotline: 0966 666 666</a>
          </div>
        </div>
        <div style="padding:24px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Uptrail — Hành Trình Chữa Lành</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function paymentConfirmationTemplate(data: PaymentEmailData): string {
  const bookingCode = `#${data.bookingId.slice(-6).toUpperCase()}`;
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
      <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
        <div style="background:#047857;padding:32px;border-radius:16px 16px 0 0;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:20px;">💰 Xác Nhận Thanh Toán</h1>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;">
          <p style="color:#334155;font-size:16px;margin:0 0 16px;">Xin chào <strong>${data.customerName}</strong>,</p>
          <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Uptrail đã nhận được khoản thanh toán của bạn cho đơn <strong>${bookingCode}</strong>:
          </p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:0 0 24px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:6px 0;color:#64748b;">Tour:</td><td style="padding:6px 0;text-align:right;font-weight:600;">${data.tourName}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Đã nhận:</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#047857;">${formatVND(data.amountPaid)}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Tổng đơn:</td><td style="padding:6px 0;text-align:right;">${formatVND(data.totalAmount)}</td></tr>
              ${data.remaining > 0 ? `<tr style="border-top:1px solid #bbf7d0;"><td style="padding:12px 0 0;color:#64748b;">Còn lại:</td><td style="padding:12px 0 0;text-align:right;font-weight:700;color:#d97706;">${formatVND(data.remaining)}</td></tr>` : '<tr style="border-top:1px solid #bbf7d0;"><td colspan="2" style="padding:12px 0 0;text-align:center;color:#047857;font-weight:700;">✅ Đã thanh toán đầy đủ</td></tr>'}
            </table>
          </div>
          <div style="text-align:center;">
            <a href="tel:0966666666" style="color:#047857;font-weight:700;font-size:14px;">📞 Hotline: 0966 666 666</a>
          </div>
        </div>
        <div style="padding:24px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Uptrail — Hành Trình Chữa Lành</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ==================== PUBLIC API ====================

export async function sendBookingConfirmation(data: BookingEmailData) {
  if (!data.customerEmail) return;
  const html = bookingConfirmationTemplate(data);
  await sendEmail(data.customerEmail, `[Uptrail] Xác nhận đặt chỗ #${data.bookingId.slice(-6).toUpperCase()} — ${data.tourName}`, html);
}

export async function sendBookingStatusUpdate(data: BookingEmailData, newStatus: string) {
  if (!data.customerEmail) return;
  if (!['confirmed', 'paid', 'cancelled'].includes(newStatus)) return;
  const html = statusUpdateTemplate(data, newStatus);
  if (!html) return;
  const statusLabels: Record<string, string> = { confirmed: 'Đã xác nhận', paid: 'Đã thanh toán', cancelled: 'Đã hủy' };
  await sendEmail(data.customerEmail, `[Uptrail] ${statusLabels[newStatus]} — Đơn #${data.bookingId.slice(-6).toUpperCase()}`, html);
}

export async function sendPaymentConfirmation(data: PaymentEmailData) {
  if (!data.customerEmail) return;
  const html = paymentConfirmationTemplate(data);
  await sendEmail(data.customerEmail, `[Uptrail] Xác nhận thanh toán ${formatVND(data.amountPaid)} — Đơn #${data.bookingId.slice(-6).toUpperCase()}`, html);
}
