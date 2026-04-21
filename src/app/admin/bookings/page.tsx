import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Chờ XN', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmed: { label: 'Đã XN', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  paid: { label: 'Đã TT', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  completed: { label: 'Hoàn tất', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  cancelled: { label: 'Đã Hủy', color: 'bg-red-50 text-red-700 border-red-200' },
};

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const params = await searchParams;
  const statusFilter = params.status;

  const bookings = await prisma.booking.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      customer: true,
      departure: { include: { tour: true } },
      payments: true,
    },
  });

  const statusTabs = [
    { key: '', label: 'Tất cả', count: bookings.length },
    { key: 'pending', label: 'Chờ XN' },
    { key: 'confirmed', label: 'Đã XN' },
    { key: 'paid', label: 'Đã TT' },
    { key: 'cancelled', label: 'Đã Hủy' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Đơn Đặt Chỗ</h1>
          <p className="text-slate-500 mt-1">Quản lý tất cả booking từ khách hàng</p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statusTabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key ? `/admin/bookings?status=${tab.key}` : '/admin/bookings'}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
              (statusFilter || '') === tab.key
                ? 'bg-[#047857] text-white border-[#047857]'
                : 'bg-white text-slate-600 border-slate-200 hover:border-[#047857] hover:text-[#047857]'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-left">
                <th className="px-6 py-4 font-medium">Mã</th>
                <th className="px-6 py-4 font-medium">Khách Hàng</th>
                <th className="px-6 py-4 font-medium">Tour</th>
                <th className="px-6 py-4 font-medium">Ngày Đi</th>
                <th className="px-6 py-4 font-medium">Người</th>
                <th className="px-6 py-4 font-medium">Tổng Tiền</th>
                <th className="px-6 py-4 font-medium">Trạng Thái</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    Không có đơn nào {statusFilter ? `ở trạng thái "${STATUS_MAP[statusFilter]?.label}"` : ''}
                  </td>
                </tr>
              )}
              {bookings.map((b) => {
                const st = STATUS_MAP[b.status] || STATUS_MAP.pending;
                return (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">#{b.id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{b.customer.name}</div>
                      <div className="text-xs text-slate-400">{b.customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 max-w-[200px] truncate">{b.departure.tour.name}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(b.departure.startDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center font-bold">{b.numPeople}</td>
                    <td className="px-6 py-4 font-bold text-[#d97706]">
                      {new Intl.NumberFormat('vi-VN').format(b.totalAmount)}đ
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${st.color}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/bookings/${b.id}`} className="text-[#047857] font-medium text-xs hover:underline">
                        Chi tiết →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
