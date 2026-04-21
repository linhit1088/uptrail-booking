import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { BookingForm } from '@/components/public/BookingForm';
import Link from 'next/link';

export default async function BookingPage({ params }: { params: Promise<{ departureId: string }> }) {
  const { departureId } = await params;

  const departure = await prisma.departure.findUnique({
    where: { id: departureId },
    include: {
      tour: true,
      leader: true
    }
  });

  if (!departure || !departure.tour) {
    notFound();
  }

  if (departure.status !== 'open' || departure.slotsTaken >= departure.slotsTotal) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-slate-100 max-w-lg">
          <div className="text-5xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Lịch khởi hành đã kín chỗ</h2>
          <p className="text-slate-600 mb-8">Rất tiếc, lịch khởi hành này đã ngừng nhận khách hoặc đủ chỗ. Vui lòng chọn một lịch trình khác.</p>
          <Link href={`/tours/${departure.tour.slug}`} className="inline-block px-8 py-3 bg-[#047857] text-white rounded-xl font-bold hover:bg-[#064e3b]">
             Quay Lại Tour
          </Link>
        </div>
      </div>
    );
  }

  const startDateStr = new Date(departure.startDate).toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const slotsLeft = departure.slotsTotal - departure.slotsTaken;
  const unitPrice = departure.price > 0 ? departure.price : departure.tour.basePrice;

  return (
    <div className="bg-slate-50 min-h-[90vh] pt-32 pb-24">
      <div className="container mx-auto max-w-5xl px-4">
        
        <div className="mb-10 text-center md:text-left">
          <Link href={`/tours/${departure.tour.slug}`} className="text-sm font-bold text-slate-500 hover:text-[#047857] mb-4 inline-block">
             ← Quay lại {departure.tour.name}
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold mb-2">Xác Nhận Giữ Chỗ</h1>
          <p className="text-slate-500">Hoàn tất thông tin cá nhân dưới đây để Uptrail chuẩn bị hành trang tốt nhất cho bạn.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           
           {/* Left Column - Booking Form */}
           <div className="w-full lg:w-2/3">
             <BookingForm departureId={departure.id} pricePerPerson={unitPrice} />
           </div>

           {/* Right Column - Summary */}
           <div className="w-full lg:w-1/3">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 lg:sticky lg:top-28">
                <img 
                  src={departure.tour.featuredImage} 
                  alt={departure.tour.name} 
                  className="w-full h-40 object-cover rounded-xl mb-6 shadow-inner"
                />
                
                <h3 className="font-bold text-xl text-slate-800 mb-4">{departure.tour.name}</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                   <div className="flex justify-between pb-3 border-b border-slate-100">
                      <span className="text-slate-500">Khởi hành:</span>
                      <span className="font-bold text-slate-800 text-right">{startDateStr}</span>
                   </div>
                   <div className="flex justify-between pb-3 border-b border-slate-100">
                      <span className="text-slate-500">Thời gian:</span>
                      <span className="font-bold text-slate-800">{departure.tour.durationDays} Ngày</span>
                   </div>
                   <div className="flex justify-between pb-3 border-b border-slate-100">
                      <span className="text-slate-500">Tình trạng:</span>
                      <span className="font-bold text-emerald-600">Còn {slotsLeft} chỗ</span>
                   </div>
                   {departure.leader && (
                     <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                        <span className="text-slate-500">Leader:</span>
                        <div className="flex items-center gap-2">
                           <img src={departure.leader.avatar} alt="leader" className="w-6 h-6 rounded-full" />
                           <span className="font-bold text-slate-800">{departure.leader.name}</span>
                        </div>
                     </div>
                   )}
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Giá theo khách:</span>
                      <span className="font-bold text-slate-800 text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(unitPrice)}
                      </span>
                   </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 space-y-2 border border-slate-100">
                  <p className="flex gap-2"><span>🛡️</span> 100% Yên tâm với Bảo hiểm du lịch trọn gói.</p>
                  <p className="flex gap-2"><span>🎒</span> Đã bao gồm toàn bộ Lều, Túi ngủ, Dụng cụ y tế, Tiêu chuẩn ăn cao cấp.</p>
                  <p className="flex gap-2"><span>🔄</span> Hoàn tiền / Bảo lưu linh hoạt nếu có sự cố thời tiết.</p>
                </div>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
