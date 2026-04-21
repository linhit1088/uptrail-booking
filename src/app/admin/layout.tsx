import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin | Uptrail',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Allow login page without auth
  // The middleware or page-level check handles this, but layout wraps all /admin/*
  // We only redirect if NOT on the login page — handled by checking session
  // For simplicity: if no session, the children (login page) render without sidebar
  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar userName={session.user.name || 'Admin'} />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
