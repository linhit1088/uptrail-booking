import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminToursPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const tours = await prisma.tour.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      leader: true,
      _count: { select: { departures: true } },
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Quản Lý Tour</h1>
        <p className="text-slate-500 mt-1">Danh sách tất cả tour trong hệ thống</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="h-40 bg-slate-200 relative">
              <img src={tour.featuredImage} alt={tour.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold">
                {tour.isActive ? '🟢 Active' : '🔴 Inactive'}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-800 text-lg mb-1">{tour.name}</h3>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{tour.shortDesc}</p>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{tour.durationDays} ngày • Lv.{tour.difficulty}/5</span>
                <span>{tour._count.departures} lịch KH</span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                <span className="font-bold text-[#d97706] text-sm">
                  {new Intl.NumberFormat('vi-VN').format(tour.basePrice)}đ
                </span>
                <span className="text-xs text-slate-400">Leader: {tour.leader.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
