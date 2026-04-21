'use client';

import React, { useState, useTransition } from 'react';
import { updateCustomerNote, updateCustomerTags } from '@/app/actions/admin';

interface Props {
  customerId: string;
  initialNote: string;
  initialTags: string[];
}

const PRESET_TAGS = ['VIP', 'Quay lại', 'Cần chú ý', 'Nhóm lớn', 'Solo', 'Mới'];

export function CustomerActions({ customerId, initialNote, initialTags }: Props) {
  const [isPending, startTransition] = useTransition();
  const [note, setNote] = useState(initialNote);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState('');

  function handleSaveNote() {
    startTransition(() => { updateCustomerNote(customerId, note); });
  }

  function toggleTag(tag: string) {
    const updated = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
    setTags(updated);
    startTransition(() => { updateCustomerTags(customerId, updated); });
  }

  function addCustomTag() {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updated = [...tags, newTag.trim()];
      setTags(updated);
      setNewTag('');
      startTransition(() => { updateCustomerTags(customerId, updated); });
    }
  }

  return (
    <div className="space-y-6">
      {/* Tags */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-3">Tags</h3>
        <div className="flex gap-2 flex-wrap mb-3">
          {PRESET_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                tags.includes(tag)
                  ? 'bg-[#047857] text-white border-[#047857]'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[#047857]'
              }`}
            >
              {tags.includes(tag) ? '✓ ' : ''}{tag}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomTag()}
            placeholder="Tag tùy chỉnh..."
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#047857]"
          />
          <button onClick={addCustomTag} className="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">+</button>
        </div>
      </div>

      {/* Admin Note */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-3">Ghi Chú Nội Bộ</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#047857] resize-none"
          placeholder="Ghi chú về khách hàng cho team sale..."
        />
        <button onClick={handleSaveNote} disabled={isPending}
          className="mt-2 w-full py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 disabled:opacity-50">
          {isPending ? 'Đang lưu...' : 'Lưu Ghi Chú'}
        </button>
      </div>
    </div>
  );
}
