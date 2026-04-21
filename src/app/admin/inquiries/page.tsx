import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { InquiryRow } from '@/components/admin/InquiryRow';

export default async function AdminInquiriesPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: true },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Yêu Cầu Tư Vấn</h1>
        <p className="text-slate-500 mt-1">Quản lý các yêu cầu từ form liên hệ</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-left">
                <th className="px-6 py-4 font-medium">Trạng Thái</th>
                <th className="px-6 py-4 font-medium">Khách</th>
                <th className="px-6 py-4 font-medium">Liên Hệ</th>
                <th className="px-6 py-4 font-medium">Nội Dung</th>
                <th className="px-6 py-4 font-medium">Ngày</th>
                <th className="px-6 py-4 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Không có yêu cầu nào</td></tr>
              )}
              {inquiries.map((inq) => (
                <InquiryRow key={inq.id} inquiry={inq} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
