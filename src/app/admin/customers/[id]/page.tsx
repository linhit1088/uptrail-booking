import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { CustomerActions } from '@/components/admin/CustomerActions';
import Link from 'next/link';

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const { id } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      bookings: {
        orderBy: { createdAt: 'desc' },
        include: { departure: { include: { tour: true } }, payments: true },
      },
      inquiries: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!customer) notFound();

  const tags = (customer.tags || []) as string[];

  const totalSpent = customer.bookings.reduce((s, b) => s + (b.status !== 'cancelled' ? b.totalAmount : 0), 0);

  const statusLabels: Record<string, string> = {
    pending: 'Chờ XN', confirmed: 'Đã XN', paid: 'Đã TT', completed: 'Hoàn tất', cancelled: 'Đã Hủy',
  };
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700', confirmed: 'bg-blue-50 text-blue-700',
    paid: 'bg-emerald-50 text-emerald-700', completed: 'bg-slate-100 text-slate-700', cancelled: 'bg-red-50 text-red-700',
  };

  return (
    <div>
      <a href="/admin/customers" className="text-sm text-slate-500 hover:text-[#047857] mb-2 inline-block">← Quay lại danh sách</a>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-[#ecfdf5] text-[#047857] flex items-center justify-center font-bold text-2xl">
          {customer.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{customer.name}</h1>
          <p className="text-slate-500 text-sm">{customer.phone} {customer.email ? `• ${customer.email}` : ''}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
              <div className="text-2xl font-bold text-slate-800">{customer.bookings.length}</div>
              <div className="text-xs text-slate-500">Tổng đơn</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
              <div className="text-2xl font-bold text-[#d97706]">
                {new Intl.NumberFormat('vi-VN').format(totalSpent)}đ
              </div>
              <div className="text-xs text-slate-500">Tổng chi</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
              <div className="text-2xl font-bold text-slate-800">
                {new Date(customer.createdAt).toLocaleDateString('vi-VN')}
              </div>
              <div className="text-xs text-slate-500">Ngày tham gia</div>
            </div>
          </div>

          {/* Booking History */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-lg text-slate-800 mb-4">Lịch Sử Booking</h2>
            {customer.bookings.length === 0 ? (
              <p className="text-slate-400 text-sm py-4 text-center">Chưa có booking nào</p>
            ) : (
              <div className="space-y-3">
                {customer.bookings.map((b) => (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div>
                      <div className="font-medium text-slate-800">{b.departure.tour.name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(b.departure.startDate).toLocaleDateString('vi-VN')} • {b.numPeople} người •
                        {' '}{new Intl.NumberFormat('vi-VN').format(b.totalAmount)}đ
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${statusColors[b.status] || ''}`}>
                      {statusLabels[b.status] || b.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Inquiries */}
          {customer.inquiries.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-lg text-slate-800 mb-4">Yêu Cầu Tư Vấn</h2>
              <div className="space-y-3">
                {customer.inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-slate-50 text-sm">
                    <p className="text-slate-700">{inq.message}</p>
                    <p className="text-xs text-slate-400 mt-2">{new Date(inq.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right - Notes & Tags */}
        <CustomerActions customerId={customer.id} initialNote={customer.notes || ''} initialTags={tags} />
      </div>
    </div>
  );
}
