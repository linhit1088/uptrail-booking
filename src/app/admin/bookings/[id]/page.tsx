import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { BookingActions } from '@/components/admin/BookingActions';

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      customer: true,
      departure: { include: { tour: true, leader: true } },
      payments: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!booking) notFound();

  const startDate = new Date(booking.departure.startDate).toLocaleDateString('vi-VN', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-100 text-blue-800',
    paid: 'bg-emerald-100 text-emerald-800',
    completed: 'bg-slate-200 text-slate-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Chờ Xác Nhận',
    confirmed: 'Đã Xác Nhận',
    paid: 'Đã Thanh Toán',
    completed: 'Hoàn Tất',
    cancelled: 'Đã Hủy',
  };

  return (
    <div>
      <div className="mb-6">
        <a href="/admin/bookings" className="text-sm text-slate-500 hover:text-[#047857] mb-2 inline-block">← Quay lại danh sách</a>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Đơn #{booking.id.slice(-6).toUpperCase()}</h1>
          <span className={`px-4 py-1 rounded-full text-sm font-bold ${statusColors[booking.status] || ''}`}>
            {statusLabels[booking.status] || booking.status}
          </span>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Tạo lúc {new Date(booking.createdAt).toLocaleString('vi-VN')} • Nguồn: {booking.source}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tour & Departure */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-lg text-slate-800 mb-4">Thông Tin Chuyến Đi</h2>
            <div className="flex gap-4 mb-4">
              <img src={booking.departure.tour.featuredImage} alt="" className="w-24 h-24 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{booking.departure.tour.name}</h3>
                <p className="text-sm text-slate-500">{booking.departure.tour.durationDays} ngày • Độ khó {booking.departure.tour.difficulty}/5</p>
                <p className="text-sm text-slate-600 mt-1">📅 Khởi hành: <strong>{startDate}</strong></p>
                {booking.departure.leader && (
                  <p className="text-sm text-slate-600">🧑‍🏫 Leader: {booking.departure.leader.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-lg text-slate-800 mb-4">Khách Hàng</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Họ tên:</span>
                <p className="font-bold text-slate-800">{booking.customer.name}</p>
              </div>
              <div>
                <span className="text-slate-500">SĐT:</span>
                <p className="font-bold text-slate-800">{booking.customer.phone}</p>
              </div>
              <div>
                <span className="text-slate-500">Email:</span>
                <p className="font-bold text-slate-800">{booking.customer.email || '—'}</p>
              </div>
              <div>
                <span className="text-slate-500">Số người:</span>
                <p className="font-bold text-slate-800">{booking.numPeople} người</p>
              </div>
            </div>
            {booking.note && (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl text-sm">
                <span className="text-slate-500 block mb-1">Ghi chú từ khách:</span>
                <p className="text-slate-700">{booking.note}</p>
              </div>
            )}
            <a href={`/admin/customers/${booking.customerId}`} className="text-sm text-[#047857] font-medium hover:underline mt-3 inline-block">
              Xem hồ sơ khách →
            </a>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-lg text-slate-800 mb-4">Lịch Sử Thanh Toán</h2>
            {booking.payments.length === 0 ? (
              <p className="text-slate-400 text-sm py-4 text-center">Chưa có khoản thanh toán nào được ghi nhận</p>
            ) : (
              <div className="space-y-3">
                {booking.payments.map((p) => (
                  <div key={p.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                    <div>
                      <div className="font-medium text-slate-800">
                        {new Intl.NumberFormat('vi-VN').format(p.amount)}đ
                      </div>
                      <div className="text-xs text-slate-500">
                        {p.paidAt ? new Date(p.paidAt).toLocaleString('vi-VN') : '—'} • {p.method}
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      p.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {p.status === 'confirmed' ? '✓ Đã xác nhận' : '⏳ Chờ'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Actions */}
        <div className="space-y-6">
          <BookingActions
            bookingId={booking.id}
            currentStatus={booking.status}
            totalAmount={booking.totalAmount}
            amountPaid={booking.amountPaid}
            adminNote={booking.adminNote || ''}
          />
        </div>
      </div>
    </div>
  );
}
