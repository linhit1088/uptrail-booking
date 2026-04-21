import { SectionTitle } from '@/components/ui';
import { ContactForm } from '@/components/public/ContactForm';

export const metadata = {
  title: 'Liên Hệ | Uptrail',
  description: 'Liên hệ với Uptrail để được tư vấn chuyến đi phù hợp nhất.',
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionTitle 
           title="Trò Chuyện Cùng Chúng Tôi" 
           subtitle="Đội ngũ hỗ trợ của Uptrail sẵn sàng tư vấn cho bạn hành trình hoàn hảo."
        />
        
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 items-center">
           <div>
               <h3 className="font-serif text-3xl font-bold text-slate-800 mb-6">Thông Tin Liên Hệ</h3>
               <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                       <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 shrink-0">📍</div>
                       <div>
                           <div className="font-bold text-slate-800">Thành Phố Hồ Chí Minh</div>
                           <div className="text-slate-500 text-sm">Văn phòng tạm thời: Online. Các hoạt động offline chủ yếu hỗ trợ hội thảo hoặc Workshop chuyên biệt.</div>
                       </div>
                   </div>
                   <div className="flex gap-4 items-start">
                       <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 shrink-0">📞</div>
                       <div>
                           <div className="font-bold text-slate-800">Điện thoại / Zalo</div>
                           <a href="tel:0968686868" className="text-[#047857] hover:underline">0968 686 868</a>
                       </div>
                   </div>
                   <div className="flex gap-4 items-start">
                       <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 shrink-0">💌</div>
                       <div>
                           <div className="font-bold text-slate-800">Email</div>
                           <a href="mailto:hello@uptrail.vn" className="text-[#047857] hover:underline">hello@uptrail.vn</a>
                       </div>
                   </div>
               </div>
           </div>

           <ContactForm />
        </div>
      </div>
    </div>
  );
}
