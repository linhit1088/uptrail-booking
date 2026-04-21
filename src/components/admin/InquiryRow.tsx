'use client';

import React, { useTransition } from 'react';
import { updateInquiryStatus } from '@/app/actions/admin';

interface InquiryRowProps {
  inquiry: {
    id: string;
    name: string;
    contact: string;
    message: string;
    status: string;
    adminNote: string | null;
    createdAt: Date;
    customer: { name: string } | null;
  };
}

const statusMap: Record<string, { label: string; color: string }> = {
  new: { label: 'Mới', color: 'bg-blue-50 text-blue-700' },
  contacted: { label: 'Đã liên hệ', color: 'bg-amber-50 text-amber-700' },
  closed: { label: 'Đóng', color: 'bg-slate-100 text-slate-600' },
};

export function InquiryRow({ inquiry }: InquiryRowProps) {
  const [isPending, startTransition] = useTransition();
  const st = statusMap[inquiry.status] || statusMap.new;

  function handleStatusChange(newStatus: string) {
    startTransition(() => {
      updateInquiryStatus(inquiry.id, newStatus);
    });
  }

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-lg ${st.color}`}>{st.label}</span>
      </td>
      <td className="px-6 py-4 font-medium text-slate-800">{inquiry.name}</td>
      <td className="px-6 py-4 text-slate-600">{inquiry.contact}</td>
      <td className="px-6 py-4 text-slate-600 max-w-[300px] truncate">{inquiry.message}</td>
      <td className="px-6 py-4 text-xs text-slate-400">
        {new Date(inquiry.createdAt).toLocaleDateString('vi-VN')}
      </td>
      <td className="px-6 py-4">
        <select
          value={inquiry.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isPending}
          className="text-xs border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-[#047857] disabled:opacity-50"
        >
          <option value="new">Mới</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="closed">Đóng</option>
        </select>
      </td>
    </tr>
  );
}
