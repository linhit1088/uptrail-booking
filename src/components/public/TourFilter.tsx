'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function TourFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentDiff = searchParams.get('difficulty') || '';
  
  // Note: For full implementation, we'd fetch categories/moods from db or pass them as props.
  // Here we use a simpler filter for difficulty.
  
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Độ khó</label>
        <select 
          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#047857] outline-none transition-colors"
          value={currentDiff}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
        >
          <option value="">Tất cả độ khó</option>
          <option value="1">1/5 - Vừa sức, người mới</option>
          <option value="2">2/5 - Cơ bản</option>
          <option value="3">3/5 - Trung bình</option>
          <option value="4">4/5 - Thử thách</option>
          <option value="5">5/5 - Cực khó</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Thời gian</label>
        <select 
          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#047857] outline-none transition-colors"
          value={searchParams.get('duration') || ''}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
        >
          <option value="">Tất cả thời gian</option>
          <option value="2">2 Ngày</option>
          <option value="3">3 Ngày</option>
          <option value="4">4+ Ngày</option>
        </select>
      </div>
      
      {/* Search Button (Optional since onChange pushes route automatically) */}
      <div className="hidden md:flex ml-auto self-end pb-1">
        {(currentDiff || searchParams.get('duration') || searchParams.get('mood')) && (
          <button 
             onClick={() => router.push('/tours')}
             className="text-sm text-slate-500 hover:text-red-500 underline"
          >
            Xóa Lọc
          </button>
        )}
      </div>
    </div>
  );
}
