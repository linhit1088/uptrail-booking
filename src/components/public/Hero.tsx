'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function Hero() {
  const images = [
    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f172a] group">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          <img
            src={img}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover animate-breathe"
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-10 pointer-events-none"></div>

      {/* Fog Animation (Optional, simplified) */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-10 animate-fade-in-up">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
          Hành Trình Chữa Lành
        </h1>
        <p className="text-slate-200 text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto italic font-serif opacity-90 drop-shadow-lg">
          Vượt qua giới hạn bản thân, hòa mình vào thiên nhiên hoang dã.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-[#10b981] text-white rounded-xl shadow-[0_4px_14px_rgba(16,185,129,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] active:scale-95 transition-all"
          >
            Khám phá tour phù hợp với bạn
          </Link>
          <Link
            href="/tours?difficulty=1"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 hover:-translate-y-1 active:scale-95 transition-all"
          >
            Tour Dễ Cho Người Mới
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex items-center justify-center gap-4 text-white/90 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
           <div className="flex -space-x-3">
             <img className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Hiker 1" />
             <img className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Hiker 2" />
             <img className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover bg-slate-200" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Hiker 3" />
             <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-[#d97706] flex items-center justify-center text-xs font-bold text-white z-10">+</div>
           </div>
           <div className="text-sm text-left">
             <div className="flex gap-1 text-yellow-400 text-sm drop-shadow-md">
                ★★★★★
             </div>
             <div className="drop-shadow-md"><span className="font-bold">5.0/5</span> từ 500+ nhà thám hiểm</div>
           </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
