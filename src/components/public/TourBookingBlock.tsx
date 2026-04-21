'use client';

import React from 'react';
import Link from 'next/link';
import { DepartureInfo } from '@/types';

interface TourBookingBlockProps {
  tourId: string;
  basePrice: number;
  departures: DepartureInfo[];
}

export function TourBookingBlock({ tourId, basePrice, departures }: TourBookingBlockProps) {
  // Sort departures setting available ones first
  const upcomingDepartures = departures
    .filter(d => new Date(d.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const availableDepartures = upcomingDepartures.filter(d => d.status === 'open' && d.slotsTaken < d.slotsTotal);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-28">
      <div className="mb-6 pb-6 border-b border-slate-100">
        <p className="text-slate-500 text-sm mb-1">Giá trọn gói chỉ từ</p>
        <p className="text-3xl font-bold text-[#d97706]">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(basePrice)}
        </p>
      </div>

      <h3 className="font-bold text-slate-800 mb-4">Lịch Khởi Hành Sắp Tới</h3>
      
      <div className="flex flex-col gap-3 mb-8">
        {availableDepartures.length > 0 ? (
          availableDepartures.slice(0, 3).map((dep) => {
            const date = new Date(dep.startDate);
            const formattedDate = date.toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
            const slotsLeft = dep.slotsTotal - dep.slotsTaken;
            const price = dep.price > 0 ? dep.price : basePrice;

            return (
              <div key={dep.id} className="p-4 rounded-xl border border-[#047857]/20 bg-[#ecfdf5] flex justify-between items-center group hover:bg-[#047857]/10 transition-colors">
                <div>
                  <div className="font-bold text-slate-800">{formattedDate}</div>
                  <div className="text-xs font-semibold text-[#d97706] mt-1">Còn {slotsLeft} chỗ</div>
                </div>
                <div className="text-right">
                   <div className="font-bold text-[#064e3b] text-sm">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                   </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            Đang cập nhật lịch mới. Xin vui lòng liên hệ tư vấn.
          </div>
        )}
      </div>

      <Link
        href={availableDepartures.length > 0 ? `/booking/${availableDepartures[0].id}` : '#contact'}
        className="block w-full py-4 bg-[#047857] text-white text-center font-bold text-lg rounded-xl shadow-lg hover:bg-[#064e3b] transition-colors"
      >
        {availableDepartures.length > 0 ? 'Giữ Chỗ Ngay' : 'Nhận Tư Vấn'}
      </Link>
      
      <p className="text-center text-xs text-slate-400 mt-4">
        Cam kết dịch vụ chuẩn 5 sao. Không phát sinh chi phí.
      </p>
    </div>
  );
}
