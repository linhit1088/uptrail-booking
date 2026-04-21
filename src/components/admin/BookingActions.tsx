'use client';

import React, { useState, useTransition } from 'react';
import { updateBookingStatus, updateBookingAdminNote, confirmPayment } from '@/app/actions/admin';

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
  totalAmount: number;
  amountPaid: number;
  adminNote: string;
}

const statusFlow = [
  { value: 'pending', label: 'Chờ Xác Nhận', color: 'bg-amber-500' },
  { value: 'confirmed', label: 'Xác Nhận', color: 'bg-blue-500' },
  { value: 'paid', label: 'Đã Thanh Toán', color: 'bg-emerald-500' },
  { value: 'completed', label: 'Hoàn Tất', color: 'bg-slate-500' },
  { value: 'cancelled', label: 'Hủy Đơn', color: 'bg-red-500' },
];

export function BookingActions({ bookingId, currentStatus, totalAmount, amountPaid, adminNote: initialNote }: BookingActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [note, setNote] = useState(initialNote);
  const [paymentAmount, setPaymentAmount] = useState(totalAmount - amountPaid);
  const [showPayment, setShowPayment] = useState(false);

  const remaining = totalAmount - amountPaid;

  function handleStatusChange(newStatus: string) {
    if (confirm(`Bạn muốn chuyển trạng thái sang "${statusFlow.find(s => s.value === newStatus)?.label}"?`)) {
      startTransition(() => {
        updateBookingStatus(bookingId, newStatus);
      });
    }
  }

  function handleSaveNote() {
    startTransition(() => {
      updateBookingAdminNote(bookingId, note);
    });
  }

  function handleConfirmPayment() {
    if (paymentAmount <= 0) return;
    if (confirm(`Xác nhận đã nhận ${new Intl.NumberFormat('vi-VN').format(paymentAmount)}đ?`)) {
      startTransition(() => {
        confirmPayment(bookingId, paymentAmount);
        setShowPayment(false);
      });
    }
  }

  return (
    <>
      {/* Status Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Cập Nhật Trạng Thái</h3>
        <div className="space-y-2">
          {statusFlow.map((s) => (
            <button
              key={s.value}
              onClick={() => handleStatusChange(s.value)}
              disabled={isPending || s.value === currentStatus}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                s.value === currentStatus
                  ? `${s.color} text-white border-transparent`
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              } disabled:opacity-50`}
            >
              {s.value === currentStatus ? '● ' : '○ '}{s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Payment CTA */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-3">Thanh Toán</h3>
        <div className="text-sm space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-slate-500">Tổng đơn:</span>
            <span className="font-bold">{new Intl.NumberFormat('vi-VN').format(totalAmount)}đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Đã nhận:</span>
            <span className="font-bold text-emerald-600">{new Intl.NumberFormat('vi-VN').format(amountPaid)}đ</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-slate-500">Còn lại:</span>
            <span className="font-bold text-[#d97706]">{new Intl.NumberFormat('vi-VN').format(remaining)}đ</span>
          </div>
        </div>

        {remaining > 0 && !showPayment && (
          <button onClick={() => setShowPayment(true)}
            className="w-full py-3 bg-[#047857] text-white rounded-xl font-bold hover:bg-[#064e3b] transition-colors text-sm">
            Ghi Nhận Đã Nhận Tiền
          </button>
        )}

        {remaining <= 0 && (
          <div className="text-center py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm">
            ✓ Đã thanh toán đủ
          </div>
        )}

        {showPayment && (
          <div className="space-y-3 mt-3 p-4 bg-slate-50 rounded-xl">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1 block">Số tiền nhận (VNĐ)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#047857]"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleConfirmPayment} disabled={isPending}
                className="flex-1 py-2 bg-[#047857] text-white rounded-lg text-sm font-bold disabled:opacity-50">
                {isPending ? '...' : 'Xác nhận'}
              </button>
              <button onClick={() => setShowPayment(false)}
                className="px-4 py-2 bg-white text-slate-600 rounded-lg text-sm border border-slate-200">
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Note */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-3">Ghi Chú Nội Bộ</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#047857] resize-none"
          placeholder="Ghi chú cho team..."
        />
        <button onClick={handleSaveNote} disabled={isPending}
          className="mt-2 w-full py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 disabled:opacity-50">
          {isPending ? 'Đang lưu...' : 'Lưu Ghi Chú'}
        </button>
      </div>
    </>
  );
}
