import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: {
    default: "UPTRAIL — Hành Trình Chữa Lành",
    template: "%s | UPTRAIL",
  },
  description:
    "Uptrail chuyên tổ chức các tour trekking, leo núi trọn gói, chuyên nghiệp. Khám phá vẻ đẹp Việt Nam qua những hành trình kết nối thiên nhiên.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "UPTRAIL — Hành Trình Chữa Lành",
    description:
      "Trekking chữa lành tâm hồn giữa đại ngàn Tây Bắc. Tour trọn gói, leader kinh nghiệm, an toàn tuyệt đối.",
    siteName: "UPTRAIL",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
