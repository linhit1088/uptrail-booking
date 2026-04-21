import { SectionTitle } from '@/components/ui';

export const metadata = {
  title: 'Về Uptrail | Hành Trình Chữa Lành',
  description: 'Tìm hiểu về câu chuyện của Uptrail và những người dẫn đường tận tâm.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionTitle 
           title="Câu Chuyện Của Uptrail" 
           subtitle="Từ những bước chân lạc lối tìm về với thiên nhiên nguyên bản."
        />
        
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
           <div className="prose prose-lg max-w-none text-slate-600 font-light leading-relaxed space-y-6">
              <p>
                 Uptrail không chỉ là một đơn vị tổ chức tour trekking. Chúng tôi là những người bạn đồng hành, những người dẫn đường đưa bạn trở về với thiên nhiên hoang dã để tìm lại sự bình yên trong tâm hồn.
              </p>
              <p>
                 Bắt đầu từ năm 2021, từ một nhóm nhỏ đam mê leo núi, Uptrail nhanh chóng nhận ra rằng núi rừng mang một sức mạnh chữa lành kỳ diệu. Không có sóng điện thoại, không có deadline, chỉ có bạn, nhịp thở của chính mình và tiếng gió thổi qua ngọn cây.
              </p>
              <h3 className="font-serif text-2xl font-bold text-slate-800 mt-8 mb-4">Triết Lý Của Chúng Tôi</h3>
              <ul className="list-disc pl-6 space-y-4">
                 <li><strong>An toàn tuyệt đối:</strong> Sự chuẩn bị chu đáo 100% trong mọi tình huống. Đội ngũ y tế và trang bị sơ cứu luôn có sẵn.</li>
                 <li><strong>Leave No Trace:</strong> Bảo tồn nét hoang sơ của những cung đường. Tác động tối thiểu đến tự nhiên.</li>
                 <li><strong>Hỗ trợ cộng đồng bản địa:</strong> 100% porter của mạng lưới Uptrail là người dân địa phương được trả mức lương công bằng và trang bị đầy đủ.</li>
              </ul>
              
              <div className="mt-12 bg-[#ecfdf5] p-8 rounded-2xl border border-[#10b981]/20 text-center">
                 <p className="font-serif italic text-xl text-[#064e3b]">
                   "Một chuyến đi thực sự không được đo bằng số kilomet đã đi, mà bằng những thay đổi bên trong tâm hồn bạn."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
