import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const [bookingCount, pendingCount, customerCount, inquiryCount, recentBookings, upcomingDepartures] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'pending' } }),
    prisma.customer.count(),
    prisma.inquiry.count({ where: { status: 'new' } }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { customer: true, departure: { include: { tour: true } } },
    }),
    prisma.departure.findMany({
      where: { status: 'open', startDate: { gte: new Date() } },
      take: 5,
      orderBy: { startDate: 'asc' },
      include: { tour: true },
    }),
  ]);

  const totalRevenue = await prisma.booking.aggregate({
    where: { status: { in: ['confirmed', 'paid', 'completed'] } },
    _sum: { totalAmount: true },
  });

  const stats = [
    { label: 'Tổng Đơn', value: bookingCount, icon: '📋', color: 'bg-blue-50 text-blue-700', href: '/admin/bookings' },
    { label: 'Chờ Xác Nhận', value: pendingCount, icon: '⏳', color: 'bg-amber-50 text-amber-700', href: '/admin/bookings?status=pending' },
    { label: 'Khách Hàng', value: customerCount, icon: '👥', color: 'bg-emerald-50 text-emerald-700', href: '/admin/customers' },
    { label: 'Tư Vấn Mới', value: inquiryCount, icon: '💬', color: 'bg-purple-50 text-purple-700', href: '/admin/inquiries' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Tổng Quan</h1>
        <p className="text-slate-500 mt-1">Chào {session.user.name}, đây là tình hình hoạt động hôm nay.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${s.color} p-6 rounded-2xl hover:shadow-lg transition-shadow`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm font-medium opacity-70 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Revenue */}
      <div className="bg-gradient-to-r from-[#064e3b] to-[#047857] p-6 rounded-2xl text-white mb-8">
        <div className="text-sm opacity-80 mb-1">Tổng Doanh Thu (Đã xác nhận)</div>
        <div className="text-4xl font-bold">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue._sum.totalAmount || 0)}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-slate-800">Đơn Mới Nhất</h2>
            <Link href="/admin/bookings" className="text-sm text-[#047857] font-medium hover:underline">Xem tất cả →</Link>
          </div>
          <div className="space-y-3">
            {recentBookings.length === 0 && <p className="text-slate-400 text-sm py-4 text-center">Chưa có đơn nào</p>}
            {recentBookings.map((b) => (
              <Link key={b.id} href={`/admin/bookings/${b.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-medium text-slate-800">{b.customer.name}</div>
                  <div className="text-xs text-slate-500">{b.departure.tour.name} • {b.numPeople} người</div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                  b.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                  b.status === 'confirmed' ? 'bg-blue-50 text-blue-600' :
                  b.status === 'paid' ? 'bg-emerald-50 text-emerald-600' :
                  b.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                  'bg-slate-50 text-slate-600'
                }`}>
                  {b.status === 'pending' ? 'Chờ XN' :
                   b.status === 'confirmed' ? 'Đã XN' :
                   b.status === 'paid' ? 'Đã TT' :
                   b.status === 'cancelled' ? 'Đã Hủy' : b.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Departures */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-slate-800">Chuyến Sắp Tới</h2>
            <Link href="/admin/departures" className="text-sm text-[#047857] font-medium hover:underline">Xem tất cả →</Link>
          </div>
          <div className="space-y-3">
            {upcomingDepartures.length === 0 && <p className="text-slate-400 text-sm py-4 text-center">Không có chuyến nào sắp tới</p>}
            {upcomingDepartures.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div>
                  <div className="font-medium text-slate-800">{d.tour.name}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(d.startDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#047857]">{d.slotsTaken}/{d.slotsTotal}</div>
                  <div className="text-xs text-slate-400">đã đặt</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
