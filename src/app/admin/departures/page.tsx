import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDeparturesPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const departures = await prisma.departure.findMany({
    orderBy: { startDate: 'asc' },
    include: {
      tour: true,
      leader: true,
      _count: { select: { bookings: true } },
    },
  });

  const statusColors: Record<string, string> = {
    open: 'bg-emerald-50 text-emerald-700',
    full: 'bg-red-50 text-red-700',
    cancelled: 'bg-slate-100 text-slate-600',
    completed: 'bg-blue-50 text-blue-700',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Lịch Khởi Hành</h1>
        <p className="text-slate-500 mt-1">Quản lý tất cả các chuyến đi</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-left">
                <th className="px-6 py-4 font-medium">Tour</th>
                <th className="px-6 py-4 font-medium">Ngày Khởi Hành</th>
                <th className="px-6 py-4 font-medium">Leader</th>
                <th className="px-6 py-4 font-medium">Chỗ</th>
                <th className="px-6 py-4 font-medium">Giá</th>
                <th className="px-6 py-4 font-medium">Trạng Thái</th>
                <th className="px-6 py-4 font-medium">Số Đơn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departures.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">Chưa có lịch khởi hành</td></tr>
              )}
              {departures.map((d) => {
                const isPast = new Date(d.startDate) < new Date();
                return (
                  <tr key={d.id} className={`hover:bg-slate-50 transition-colors ${isPast ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4 font-medium text-slate-800 max-w-[200px] truncate">{d.tour.name}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {new Date(d.startDate).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{d.leader?.name || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#047857] rounded-full"
                            style={{ width: `${(d.slotsTaken / d.slotsTotal) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{d.slotsTaken}/{d.slotsTotal}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#d97706]">
                      {new Intl.NumberFormat('vi-VN').format(d.price)}đ
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg ${statusColors[d.status] || ''}`}>
                        {d.status === 'open' ? 'Mở' : d.status === 'full' ? 'Hết chỗ' : d.status === 'cancelled' ? 'Hủy' : 'Xong'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-600">{d._count.bookings}</td>
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
