'use client';

import React, { useActionState, useState } from 'react';
import { submitBooking } from '@/app/actions/booking';

interface BookingFormProps {
  departureId: string;
  pricePerPerson: number;
}

export function BookingForm({ departureId, pricePerPerson }: BookingFormProps) {
  const [numPeople, setNumPeople] = useState(1);
  const [step, setStep] = useState(1);
  const [state, formAction, isPending] = useActionState(submitBooking, {});

  const totalPrice = numPeople * pricePerPerson;

  return (
    <form id="booking-form" action={formAction} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-6">
      <input type="hidden" name="departureId" value={departureId} />
      
      {state.message && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
          {state.message}
        </div>
      )}

      {/* STEP 1: FORM INPUTS */}
      <div className={step === 1 ? 'block space-y-6' : 'hidden'}>

      <div>
        <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Họ và Tên *</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#047857] outline-none transition-colors"
          placeholder="Ví dụ: Nguyễn Văn A"
        />
        {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">Số Điện Thoại *</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#047857] outline-none transition-colors"
            placeholder="0912 345 678"
          />
          {state.errors?.phone && <p className="text-red-500 text-xs mt-1">{state.errors.phone[0]}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#047857] outline-none transition-colors"
            placeholder="email@example.com (Không bắt buộc)"
          />
          {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="numPeople" className="block text-sm font-bold text-slate-700 mb-2">Số Lượng Người *</label>
          <div className="flex items-center gap-4">
             <button 
               type="button" 
               onClick={() => setNumPeople(Math.max(1, numPeople - 1))}
               className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
               disabled={isPending}
             >-</button>
             <input 
               type="number" 
               id="numPeople" 
               name="numPeople" 
               value={numPeople}
               readOnly
               className="w-16 text-center font-bold text-lg outline-none bg-transparent"
             />
             <button 
               type="button" 
               onClick={() => setNumPeople(Math.min(20, numPeople + 1))}
               className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
               disabled={isPending}
             >+</button>
          </div>
          {state.errors?.numPeople && <p className="text-red-500 text-xs mt-1">{state.errors.numPeople[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-bold text-slate-700 mb-2">Ghi chú thêm</label>
        <textarea 
          id="note" 
          name="note" 
          rows={3} 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#047857] outline-none transition-colors resize-none"
          placeholder="Lưu ý đặc biệt, dị ứng thức ăn, tình trạng sức khoẻ..."
        ></textarea>
      </div>

      </div>

      {/* STEP 2: REVIEW SUMMARY */}
      <div className={step === 2 ? 'block space-y-6 animate-fade-in-up' : 'hidden'}>
         <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-200 pb-2">Hãy kiểm tra kỹ thông tin</h3>
            <div className="space-y-4 text-sm text-slate-700">
               <div className="flex justify-between">
                 <span className="text-slate-500">Người đặt:</span>
                 <span className="font-bold">Đã điền trong Mẫu</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-slate-500">Số lượng người:</span>
                 <span className="font-bold text-[#047857]">{numPeople} người</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-slate-500">Tổng tiền dự kiến:</span>
                 <span className="font-bold text-[#d97706] text-xl">
                   {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                 </span>
               </div>
            </div>
         </div>
         <p className="text-sm text-slate-500 text-center">
            Bạn chưa phải thanh toán lúc này. Bạn sẽ chọn hình thức chuyển khoản ở bước tiếp theo sau khi hệ thống Giữ Chỗ.
         </p>
      </div>

      <div className="border-t border-slate-100 pt-6 mt-2 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="text-left w-full md:w-auto">
            {step === 2 && (
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-sm text-slate-500 hover:text-slate-800 underline underline-offset-4"
              >
                ← Quay lại sửa thông tin
              </button>
            )}
         </div>
         
         {step === 1 ? (
           <button 
             type="button"
             onClick={() => {
                const form = document.getElementById('booking-form') as HTMLFormElement;
                if (form && form.checkValidity()) {
                  setStep(2);
                } else {
                  form.reportValidity();
                }
             }}
             className="w-full md:w-auto px-10 py-4 bg-slate-800 text-white rounded-xl font-bold shadow hover:bg-slate-700 transition-colors text-lg"
           >
             Tiếp Tục Kiểm Tra ➔
           </button>
         ) : (
           <button 
             type="submit" 
             disabled={isPending}
             className="w-full md:w-auto px-10 py-4 bg-[#047857] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
           >
             {isPending ? (
               <>
                 <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Đang xử lý...
               </>
             ) : 'Xác Nhận Đặt Chỗ'}
           </button>
         )}
      </div>
    </form>
  );
}
