'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Đóng menu khi đổi route
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Khám Phá', path: '/' },
    { name: 'Danh sách Tour', path: '/tours' },
    { name: 'Về Uptrail', path: '/about' },
    { name: 'Câu Chuyện', path: '/stories' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[200] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Area */}
          <Link href="/" className="relative z-50 flex items-center gap-2 group p-1 -ml-1">
            <div className="w-9 h-9 bg-[#047857] rounded-full flex items-center justify-center text-white shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2l-5.5 9h11L12 2z" />
                <path d="M12 22l-5.5-9h11L12 22z" />
              </svg>
            </div>
            <span className={`font-serif font-bold text-xl tracking-tight transition-colors ${
              isScrolled || isMobileMenuOpen ? 'text-[#064e3b]' : 'text-white drop-shadow-md'
            }`}>
              UPTRAIL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              // Exact match cho trang chủ, hoặc is included cho các trang con
              const isActive = link.path === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(link.path);
                  
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-sm font-medium hover:text-[#d97706] transition-colors py-2 ${
                    isActive 
                      ? 'text-[#d97706]' 
                      : (isScrolled ? 'text-slate-600' : 'text-white/90 drop-shadow-sm')
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden z-50 p-3 -mr-2 active:bg-slate-100 rounded-full transition-colors ${
              isScrolled || isMobileMenuOpen ? 'text-slate-700' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`fixed inset-0 z-[150] md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Sidebar */}
        <div className={`absolute inset-y-0 right-0 w-[80vw] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out pt-24 px-6 fixed overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
               const isActive = link.path === '/' 
               ? pathname === '/' 
               : pathname.startsWith(link.path);
               
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-xl font-medium py-4 border-b border-slate-100 flex justify-between items-center ${
                      isActive ? 'text-[#047857] font-bold' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#047857]"></span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
