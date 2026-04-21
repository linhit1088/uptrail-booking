import React from 'react';
import { prisma } from '@/lib/db';
import { Hero } from '@/components/public/Hero';
import { TourCard } from '@/components/public/TourCard';
import { SectionTitle } from '@/components/ui';
import Link from 'next/link';

// Forces this page to be dynamically rendered (or we can use ISR with native cache)
export const revalidate = 3600; // revalidate every hour

export default async function HomePage() {
  // Fetch featured tours (maybe the first 3 or specific ones)
  const featuredTours = await prisma.tour.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    take: 3,
  });

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <>
      <Hero />

      {/* Category Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto">
          <SectionTitle 
            title="Sắc Thái Tuyến Hành Trình" 
            subtitle="Chọn một cảm xúc, chúng tôi sẽ gợi ý cho bạn chuyến đi hoàn hảo nhất."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link 
                href={`/tours?mood=${cat.id}`} 
                key={cat.id}
                className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center border border-slate-100 flex flex-col items-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform filter grayscale group-hover:grayscale-0">
                  {cat.icon}
                </div>
                <h3 className="font-serif font-bold text-slate-800">{cat.label}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              href="/tours"
              className="inline-flex items-center justify-center text-sm font-bold text-slate-500 hover:text-[#047857] underline underline-offset-4 decoration-2 hover:decoration-[#047857] transition-all"
            >
              Khám phá toàn bộ {categories.length} sắc thái ➔
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto">
          <SectionTitle 
            title="Tuyến Chữa Lành Nổi Bật" 
            subtitle="Những nẻo đường hoang sơ được thiết kế riêng để tái tạo năng lượng cho bạn."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
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
          <div className="text-center mt-12 bg-slate-50 py-8 rounded-3xl border border-slate-100">
            <div className="font-serif text-2xl font-bold text-slate-800 mb-4">Bạn chưa tìm thấy mục tiêu?</div>
            <Link 
              href="/tours"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-bold bg-white shadow-md border border-slate-200 text-slate-700 rounded-xl hover:border-[#10b981] hover:text-[#10b981] hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all"
            >
              Xem Kỹ Hơn Tất Cả Chuyến Đi
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / Commitment Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100">
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl text-[#064e3b] mb-6 leading-tight">
                Không Để Lại Dấu Vết (Leave No Trace)
              </h2>
              <p className="text-slate-600 font-light leading-relaxed mb-4">
                Mỗi chuyến đi của Uptrail được thiết kế để hạn chế tối đa tác động lên môi trường. Chúng ta chỉ đến để chữa lành, không lấy đi gì ngoài những bức ảnh, không để lại gì ngoài những dấu chân.
              </p>
              <p className="text-slate-600 font-light leading-relaxed mb-8">
                Đội ngũ porter và guide người bản địa được đào tạo chuẩn mực để dọn dẹp và bảo vệ cung đường.
              </p>
              <Link
                href="/about"
                className="inline-flex px-6 py-3 bg-[#064e3b] text-white rounded-full font-bold hover:bg-[#047857] transition-colors shadow-lg"
              >
                Về Chúng Tôi
              </Link>
            </div>
            <div className="w-full md:w-1/2 h-[400px] rounded-[2rem] overflow-hidden shadow-xl relative">
              <img 
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Sustainable Travel Commitment"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
