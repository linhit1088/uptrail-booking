import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BookingSuccessPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      customer: true,
      departure: {
        include: { tour: true }
      }
    }
  });

  if (!booking) {
    notFound();
  }

  const startDateStr = new Date(booking.departure.startDate).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  // Example Bank account info logic
  const BANK_INFO = {
    bankName: 'Techcombank',
    accountName: 'UPTRAIL CO LTD',
    accountNumber: '1903686868',
    branch: 'Chi nhánh Hà Nội'
  };

  const transferSyntax = `UPTRAIL ${booking.id.slice(-6).toUpperCase()}`;

  // VietQR standard generator (https://vietqr.net/)
  // Using an open API to generate QR based on generic format for demo
  const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankName.toLowerCase()}-${BANK_INFO.accountNumber}-compact2.jpg?amount=${booking.totalAmount}&addInfo=${encodeURIComponent(transferSyntax)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Success Header */}
        <div className="text-center mb-12">
           <div className="w-20 h-20 bg-[#10b981] text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-emerald-500/20 border-4 border-[#ecfdf5]">
              ✓
           </div>
           <h1 className="font-serif text-3xl md:text-5xl text-slate-800 font-bold mb-4">Ghi Nhận Giữ Chỗ Thành Công!</h1>
           <p className="text-slate-600 max-w-lg mx-auto">
             Cảm ơn <strong className="text-slate-800">{booking.customer.name}</strong> đã lựa chọn Uptrail. Chỗ của bạn hiện đang được tạm giữ. Vui lòng thanh toán theo hướng dẫn dưới đây để hoàn tất.
           </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           
           {/* Transfer Info */}
           <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 flex flex-col items-center">
              <h2 className="font-bold text-xl text-slate-800 mb-6 w-full text-center">Hướng Dẫn Chuyển Khoản</h2>
              
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl w-full mb-6 relative group">
                 <img src={qrUrl} alt="VietQR Transfer" className="w-48 mx-auto mix-blend-multiply" />
                 <p className="text-center text-xs text-slate-500 mt-2">Sử dụng App Ngân Hàng để quét mã</p>
              </div>

              {/* Warning Alert */}
              <div className="w-full bg-red-50 border border-red-200 p-4 rounded-xl mb-6 flex items-start gap-3">
                 <span className="text-red-500 text-xl">⏳</span>
                 <div>
                    <h4 className="font-bold text-red-700 text-sm">Thời Gian Giữ Chỗ Có Hạn</h4>
                    <p className="text-red-600 text-xs mt-1 leading-relaxed">
                       Chỗ của bạn sẽ <strong>tự động bị hủy</strong> nếu Uptrail không nhận được thanh toán trong vòng <strong>24 giờ</strong> tới. Vui lòng thanh toán sớm nhất để đảm bảo không bị quá tải chỗ.
                    </p>
                 </div>
              </div>

              <div className="w-full space-y-4 text-sm">
                 <div className="flex flex-col">
                    <span className="text-slate-500 mb-1">Ngân hàng</span>
                    <span className="font-bold text-slate-800 text-lg">{BANK_INFO.bankName}</span>
                 </div>
                 <div className="flex flex-col relative">
                    <span className="text-slate-500 mb-1">Số tài khoản</span>
                    <span className="font-bold text-slate-800 text-lg text-[#047857]">{BANK_INFO.accountNumber}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-slate-500 mb-1">Tên tài khoản</span>
                    <span className="font-bold text-slate-800 text-lg">{BANK_INFO.accountName}</span>
                 </div>
                 <div className="flex flex-col bg-[#fffbeb] p-4 rounded-xl border border-yellow-200 mt-4">
                    <span className="text-[#b45309] font-medium mb-1">Số tiền thanh toán</span>
                    <span className="font-bold text-[#d97706] text-2xl">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.totalAmount)}
                    </span>
                 </div>
                 <div className="flex flex-col bg-emerald-50 p-4 rounded-xl border border-emerald-200 border-dashed">
                    <span className="text-emerald-700 mb-1 font-bold text-sm">Nội dung chuyển khoản (Bắt buộc)</span>
                    <span className="font-bold text-emerald-900 text-xl tracking-widest">{transferSyntax}</span>
                 </div>
              </div>

              {/* Next Steps Card */}
              <div className="w-full mt-8 bg-slate-100 p-5 rounded-2xl text-slate-700 text-sm">
                 <h4 className="font-bold mb-2 flex items-center gap-2"><span>✅</span> Chuyện gì xảy ra tiếp theo?</h4>
                 <ul className="list-disc list-inside space-y-2 opacity-90">
                    <li>Sau khi chuyển khoản thành công, vui lòng giữ lại Bill (biên lai).</li>
                    <li>Trong vòng tối đa <strong>2 giờ làm việc</strong>, nhân viên của Uptrail sẽ kiểm tra hệ thống.</li>
                    <li>Khi nhận được tiền, Uptrail sẽ gửi thông báo Xác Nhận Thành Công và liên hệ tư vấn chi tiết thông qua Zalo / Số điện thoại của bạn.</li>
                 </ul>
              </div>
           </div>

           {/* Booking Summary */}
           <div className="space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                 <h2 className="font-bold text-xl text-slate-800 mb-6">Thông Tin Chuyến Đi</h2>
                 
                 <div className="flex gap-4 items-start mb-6 pb-6 border-b border-slate-100">
                    <img src={booking.departure.tour.featuredImage} alt="tour" className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                    <div>
                       <h3 className="font-bold text-slate-800">{booking.departure.tour.name}</h3>
                       <p className="text-sm text-slate-500 mt-1">{booking.departure.tour.durationDays} Ngày • Độ khó {booking.departure.tour.difficulty}/5</p>
                    </div>
                 </div>

                 <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                       <span className="text-slate-500">Mã đặt chỗ:</span>
                       <span className="font-bold text-slate-800">#{booking.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">Ngày đi:</span>
                       <span className="font-bold text-slate-800">{startDateStr}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">Khách hàng:</span>
                       <span className="font-bold text-slate-800">{booking.customer.name} ({booking.numPeople} người)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">Trạng thái:</span>
                       <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">Chờ thanh toán</span>
                    </div>
                 </div>
              </div>

              <div className="bg-[#0f172a] rounded-[2rem] p-8 shadow-xl text-white">
                 <h3 className="font-bold mb-4 flex items-center gap-2"><span>💬</span> Cần Hỗ Trợ?</h3>
                 <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                   Nếu bạn cần xác nhận nhanh hoặc thay đổi thông tin, vui lòng gọi điện thoại trực tiếp hoặc nhắn qua Zalo Uptrail.
                 </p>
                 <div className="space-y-2">
                    <a href="tel:0968686868" className="block text-white bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors font-bold text-center">
                       Hotline: 0968 686 868
                    </a>
                    <Link href="/" className="block text-white text-center py-3 ext-sm text-slate-400 hover:text-white underline">
                       Quay Về Trang Chủ
                    </Link>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
