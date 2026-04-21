import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminCustomersPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      bookings: { select: { id: true, status: true, totalAmount: true } },
      _count: { select: { bookings: true, inquiries: true } },
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Khách Hàng</h1>
        <p className="text-slate-500 mt-1">CRM cơ bản — theo dõi khách, booking, ghi chú</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-left">
                <th className="px-6 py-4 font-medium">Khách Hàng</th>
                <th className="px-6 py-4 font-medium">Liên Hệ</th>
                <th className="px-6 py-4 font-medium">Số Đơn</th>
                <th className="px-6 py-4 font-medium">Tổng Chi</th>
                <th className="px-6 py-4 font-medium">Tags</th>
                <th className="px-6 py-4 font-medium">Ngày Tạo</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">Chưa có khách hàng nào</td></tr>
              )}
              {customers.map((c) => {
                const totalSpent = c.bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalAmount : 0), 0);
                const tags = (c.tags || []) as string[];

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#ecfdf5] text-[#047857] flex items-center justify-center font-bold text-sm">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-slate-800">{c.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-800">{c.phone}</div>
                      <div className="text-xs text-slate-400">{c.email || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{c._count.bookings}</td>
                    <td className="px-6 py-4 font-bold text-[#d97706]">
                      {totalSpent > 0 ? `${new Intl.NumberFormat('vi-VN').format(totalSpent)}đ` : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {tags.map((t, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/customers/${c.id}`} className="text-[#047857] font-medium text-xs hover:underline">
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
