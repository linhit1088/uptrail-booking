import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 mt-20 pb-20 md:pb-16 z-10 relative">
      <div className="container mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <h4 className="text-white font-serif text-lg mb-4">UPTRAIL</h4>
          <p className="text-sm leading-relaxed">
            Hành trình chữa lành. Trải nghiệm trekking đẳng cấp với sự chuẩn bị kỹ lưỡng từ đội ngũ chuyên nghiệp nhất.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Dịch vụ Tour</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/tours" className="hover:text-[#d97706] block py-1">Tất cả Tour</Link></li>
            <li><Link href="/tours?difficulty=1" className="hover:text-[#d97706] block py-1">Tour vừa sức</Link></li>
            <li><Link href="/tours?difficulty=4" className="hover:text-[#d97706] block py-1">Tour thử thách</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Khám phá thêm</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-[#d97706] block py-1">Về Uptrail</Link></li>
            <li><Link href="/stories" className="hover:text-[#d97706] block py-1">Tin tức & Kinh nghiệm</Link></li>
            <li><a href="https://www.facebook.com/uptrailvn/" target="_blank" rel="noreferrer" className="hover:text-[#d97706] block py-1">Fanpage Uptrail</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Liên hệ</h4>
          <div className="space-y-3">
              <a href="tel:0968686868" className="block text-sm hover:text-white p-2 border border-slate-700 rounded-lg text-center">
                  Hotline: 0968 686 868
              </a>
              <a href="mailto:hello@uptrail.vn" className="block text-sm hover:text-white p-2 border border-slate-700 rounded-lg text-center">
                  hello@uptrail.vn
              </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2026 Uptrail Trekking. Mọi quyền được bảo lưu.</span>
        <Link href="/admin" className="opacity-50 hover:opacity-100 hover:text-white transition-opacity px-4 py-2">
            Hệ thống nội bộ
        </Link>
      </div>
    </footer>
  );
}
