import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import FloatingActions from '@/components/public/FloatingActions';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-[#10b981] selection:text-white">
      <Navbar />
      
      <main className="flex-grow w-full relative z-0 pb-20">
        {children}
      </main>
      
      <Footer />
      
      {/* Nút Liên hệ / Back to top nổi trên màn hình */}
      <FloatingActions />
    </div>
  );
}
