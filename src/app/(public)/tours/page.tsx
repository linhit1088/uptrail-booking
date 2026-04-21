import { prisma } from '@/lib/db';
import { TourCard } from '@/components/public/TourCard';
import { TourFilter } from '@/components/public/TourFilter';
import { EmptyState } from '@/components/ui';

// Using server component so we can read searchParams directly on the server
export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Parse search params
  const { difficulty, duration, mood } = await searchParams;
  
  // Build Prisma query dynamically
  const whereClause: any = { isActive: true };
  
  if (difficulty) {
    whereClause.difficulty = Number(difficulty);
  }
  
  if (duration) {
    if (Number(duration) >= 4) {
      whereClause.durationDays = { gte: 4 };
    } else {
      whereClause.durationDays = Number(duration);
    }
  }

  if (mood) {
    // Because moods is stored as a JSON string array '[ "cat_mountains", "cat_forest" ]'
    whereClause.moods = {
      contains: String(mood)
    };
  }

  const tours = await prisma.tour.findMany({
    where: whereClause,
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="font-serif text-4xl font-bold text-slate-900 mb-3">Tất Cả Chuyến Đi</h1>
          <p className="text-slate-500">Khám phá {tours.length} hành trình phù hợp với lựa chọn của bạn.</p>
        </div>

        {/* Bảng bộ lọc */}
        <TourFilter />

        {/* Danh sách Tours */}
        {tours.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(tour => (
              <TourCard
                key={tour.id}
                id={tour.id}
                slug={tour.slug}
                name={tour.name}
                shortDesc={tour.shortDesc}
                featuredImage={tour.featuredImage}
                durationDays={tour.durationDays}
                difficulty={tour.difficulty}
                basePrice={tour.basePrice}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl py-12 px-4 shadow-sm border border-slate-100 mt-8">
            <EmptyState 
              icon="🏜️"
              title="Chưa tìm thấy chuyến đi phù hợp"
              description="Vui lòng điều chỉnh lại bộ lọc hoặc chọn thời điểm khác để xem thêm kết quả."
            />
          </div>
        )}
      </div>
    </div>
  );
}
