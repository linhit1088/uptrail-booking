'use client';

import React, { useActionState, useEffect, useRef } from 'react';
import { submitInquiry } from '@/app/actions/inquiry';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return (
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative overflow-hidden">
      {state.success ? (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-[#047857] rounded-full flex items-center justify-center text-2xl mb-4">
             ✓
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Gửi Thành Công!</h3>
          <p className="text-slate-600">{state.message}</p>
        </div>
      ) : null}

      <h3 className="font-bold text-slate-800 mb-6 text-lg">Để lại lời nhắn tư vấn</h3>
      
      {state.message && !state.success && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
          {state.message}
        </div>
      )}

      <form action={formAction} ref={formRef} className="space-y-4">
        <div>
           <input 
             type="text" 
             name="name"
             placeholder="Họ và tên" 
             className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#047857]" 
             required 
           />
           {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
        </div>
        
        <div>
           <input 
             type="text" 
             name="contact"
             placeholder="Số điện thoại hoặc Email" 
             className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#047857]" 
             required 
           />
           {state.errors?.contact && <p className="text-red-500 text-xs mt-1">{state.errors.contact[0]}</p>}
        </div>

        <div>
           <textarea 
             name="message"
             placeholder="Bạn muốn đi tour nào hoặc có yêu cầu gì đặc biệt?" 
             rows={4} 
             className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#047857] resize-none" 
             required
           ></textarea>
           {state.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>}
        </div>

        <button 
           type="submit" 
           disabled={isPending}
           className="w-full py-4 bg-[#047857] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 disabled:transform-none flex justify-center items-center gap-2"
        >
          {isPending ? 'Đang gửi...' : 'Gửi Yêu Cầu Tư Vấn ➔'}
        </button>
      </form>
      <p className="text-xs text-slate-400 mt-4 text-center">Chúng tôi sẽ bảo mật thông tin của bạn. Không spam.</p>
    </div>
  );
}
