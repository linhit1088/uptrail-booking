'use client';

import React, { useState, useEffect } from 'react';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-3 items-end transition-all duration-300">
      {/* Nút cuộn lên (ẩn hiện theo scroll) */}
      <button 
        onClick={scrollToTop}
        className={`w-12 h-12 flex items-center justify-center bg-white text-[#047857] rounded-full shadow-[0_4px_20px_rgba(4,120,87,0.15)] border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        title="Cuộn lên đầu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>

      {/* Nút Zalo / Messenger Chat */}
      <a 
        href="https://www.facebook.com/uptrailvn/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#0084FF] text-white rounded-full shadow-xl hover:bg-[#0078e7] active:scale-95 transition-all duration-300 relative"
        aria-label="Chat với chúng tôi"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.86 7.15-.12.9-.66 2.37-1.53 3.49-.12.16-.02.39.18.39 2.14 0 3.73-.59 4.79-1.22.88.24 1.8.39 2.7.39 5.52 0 10-4.03 10-9s-4.48-9-10-9zm1.18 11.53l-2.65-2.83-5.18 2.83 5.69-6.04 2.65 2.83 5.19-2.83-5.7 6.04z"/>
        </svg>
        <span className="absolute right-full mr-3 bg-white text-slate-700 px-3 py-1 rounded-lg text-xs font-bold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat tư vấn
        </span>
      </a>
    </div>
  );
}
