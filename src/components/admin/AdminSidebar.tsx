'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/admin', label: 'Tổng Quan', icon: '📊' },
  { href: '/admin/bookings', label: 'Đơn Đặt Chỗ', icon: '📋' },
  { href: '/admin/customers', label: 'Khách Hàng', icon: '👥' },
  { href: '/admin/tours', label: 'Tours', icon: '🏔️' },
  { href: '/admin/departures', label: 'Lịch Khởi Hành', icon: '📅' },
  { href: '/admin/inquiries', label: 'Yêu Cầu Tư Vấn', icon: '💬' },
];

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0f172a] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10b981] flex items-center justify-center text-lg font-bold">U</div>
          <div>
            <div className="font-bold text-lg">Uptrail</div>
            <div className="text-xs text-slate-400">Hệ Thống Quản Trị</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/10 text-[#10b981] border-r-2 border-[#10b981]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium">{userName}</div>
            <div className="text-xs text-slate-500">Admin</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full text-left text-xs text-slate-500 hover:text-red-400 transition-colors"
        >
          Đăng xuất →
        </button>
      </div>
    </aside>
  );
}
