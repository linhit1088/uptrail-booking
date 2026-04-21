import React from 'react';
import Link from 'next/link';

interface TourCardProps {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  featuredImage: string;
  durationDays: number;
  difficulty: number;
  basePrice: number;
}

export function TourCard({
  slug,
  name,
  shortDesc,
  featuredImage,
  durationDays,
  difficulty,
  basePrice,
}: TourCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-300 h-full border border-slate-100 hover:-translate-y-2 active:scale-[0.98] cursor-pointer">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-slate-200">
        <img
          src={featuredImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/40">
          {durationDays} Ngày
        </div>
        <div className="absolute top-4 left-4 bg-[#064e3b]/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
          Cấp độ {difficulty}/5
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-serif text-2xl font-bold mb-2 leading-tight text-slate-800 group-hover:text-[#047857] transition-colors">
          {name}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
          {shortDesc}
        </p>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center border-t border-slate-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Giá chỉ từ</span>
            <span className="text-lg font-bold text-[#d97706]">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(basePrice)}
            </span>
          </div>
          <Link
            href={`/tours/${slug}`}
            className="text-[#047857] font-bold text-sm bg-[#ecfdf5] px-4 py-2 rounded-xl group-hover:bg-[#047857] group-hover:text-white transition-colors active:bg-[#064e3b]"
          >
            Xem Tour ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
