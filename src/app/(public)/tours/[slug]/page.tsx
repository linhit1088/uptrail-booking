import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { TourBookingBlock } from '@/components/public/TourBookingBlock';

// ISR Cache
export const revalidate = 3600;

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const tour = await prisma.tour.findUnique({
    where: { slug: slug },
    include: {
      itinerary: { orderBy: { sortOrder: 'asc' } },
      faqs: { orderBy: { sortOrder: 'asc' } },
      departures: true,
      leader: true,
    }
  });

  if (!tour) {
    notFound();
  }

  // Native Json fields from PostgreSQL
  const gallery = (tour.gallery || []) as string[];
  const highlights = (tour.highlights || []) as string[];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <img 
          src={tour.featuredImage} 
          alt={tour.name}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black/40 to-transparent"></div>
        <div className="absolute bottom-10 left-0 w-full px-4">
          <div className="container mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight drop-shadow-lg mb-4">
              {tour.name}
            </h1>
            <p className="text-xl text-white/90 font-serif italic max-w-3xl drop-shadow">
              "{tour.tagline}"
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#0f172a] text-white py-6">
        <div className="container mx-auto px-4 flex flex-wrap gap-8 md:gap-16 justify-center">
          <div className="text-center">
            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Thời gian</div>
            <div className="text-2xl font-bold">{tour.durationDays} Ngày</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Độ khó</div>
            <div className="text-2xl font-bold">{tour.difficulty}/5</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Địa điểm</div>
            <div className="text-2xl font-bold">{tour.location}</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Left Column (Content) */}
          <div className="w-full lg:w-2/3">
             <div className="prose prose-lg max-w-none text-slate-600 font-light leading-relaxed mb-12">
                <p className="whitespace-pre-line text-lg">{tour.story}</p>
             </div>

             {highlights.length > 0 && (
                <div className="mb-16">
                   <h2 className="font-serif text-3xl text-slate-900 font-bold mb-6">Trải Nghiệm Nổi Bật</h2>
                   <ul className="grid md:grid-cols-2 gap-4">
                      {highlights.map((hlt: string, idx: number) => (
                        <li key={idx} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                           <span className="text-[#047857] text-xl">✨</span>
                           <span className="text-slate-700">{hlt}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             )}

             {/* Itinerary */}
             {tour.itinerary.length > 0 && (
               <div className="mb-16">
                 <h2 className="font-serif text-3xl text-slate-900 font-bold mb-8">Lịch Trình Chi Tiết</h2>
                 <div className="space-y-6">
                   {tour.itinerary.map((item, idx) => (
                     <div key={item.id} className="flex gap-6">
                       <div className="flex flex-col items-center">
                         <div className="w-12 h-12 bg-[#ecfdf5] text-[#047857] rounded-full flex items-center justify-center font-bold border-2 border-[#10b981]">
                           {item.day.replace(/[^\d]/g, '') || idx+1}
                         </div>
                         <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                       </div>
                       <div className="pb-10">
                         <h3 className="text-xl font-bold text-slate-800 mb-2">{item.day}: {item.title}</h3>
                         <p className="text-slate-600 whitespace-pre-line">
                           {item.desc}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {/* Gallery */}
             {gallery.length > 0 && (
               <div className="mb-16">
                 <h2 className="font-serif text-3xl text-slate-900 font-bold mb-6">Thư Viện Ảnh</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((img: string, i: number) => (
                       <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                          <img src={img} alt={`${tour.name} gallery ${i+1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                       </div>
                    ))}
                 </div>
               </div>
             )}

             {/* FAQs */}
             {tour.faqs.length > 0 && (
               <div className="mb-16">
                 <h2 className="font-serif text-3xl text-slate-900 font-bold mb-6">Câu Hỏi Thường Gặp</h2>
                 <div className="space-y-4">
                   {tour.faqs.map(faq => (
                     <div key={faq.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-slate-800 mb-2">Q: {faq.question}</h4>
                        <p className="text-slate-600">A: {faq.answer}</p>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          {/* Right Column (Booking Block) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-28 lg:self-start z-10">
             <TourBookingBlock 
                tourId={tour.id} 
                basePrice={tour.basePrice} 
                departures={tour.departures.map(d => ({
                  id: d.id,
                  startDate: d.startDate.toISOString(),
                  price: d.price,
                  slotsTotal: d.slotsTotal,
                  slotsTaken: d.slotsTaken,
                  status: d.status
                }))} 
             />
          </div>
          
        </div>
      </div>
    </div>
  );
}
