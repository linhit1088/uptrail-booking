# Kịch bản Kiến trúc (Architecture Note)

Dự án Uptrail Platform Phase 1 được xây dựng theo kiến trúc **Full-stack Monorepo** sử dụng Next.js App Router.

## 1. Thành phần hệ thống

- **Frontend (Client/Server Combo):** Next.js 14
  - Chịu trách nhiệm render UI (SSR, SSG cho trang Public, CSR cho các components tương tác).
  - Sử dụng TailwindCSS / CSS Modules để styling tĩnh, không phụ thuộc thư viện runtime nặng.
- **Backend (Layer API):** Next.js API Routes + Server Actions
  - Nằm chung repo, dễ chia sẻ Types và validate bằng Zod.
- **Data Access:** Prisma ORM
  - Mapping trực tiếp với Database SQL (hiện tại là SQLite, production là PostgreSQL).
- **Authentication:** NextAuth.js
  - Quản lý phiên đăng nhập cho Admin qua JWT HTTP-only Cookies.

## 2. Luồng dữ liệu (Data Flow)

### a. Public Flow (Website cho Khách Hàng)
Toàn bộ `(public)` tập trung vào Read-Only data. Không có Authentication.
- Khi khách vào trang chủ/Tour:
  1. Next.js **Server Component** gọi trực tiếp Prisma Query (`db.tour.findMany`).
  2. Next.js cache HTML lại (tối ưu tốc độ, SEO) và trả về Client.
  3. UI Client hoàn toàn nhẹ bẫng. Hình ảnh / Filter được xử lý qua URLSearchParams (để có thể share link filter).

### b. Booking Flow (Khách hàng đặt Tour)
Khách hàng Submit form đặt tour (Client Component).
- Dữ liệu -> Gửi qua Server Action (hoặc API Route `/api/bookings`).
- Validate bằng thư viện `Zod`.
- Hệ thống tạo record mới ở table `Booking` trong DB (Trạng thái `pending`).
- Hệ thống gửi Response/Ticket về UI. 

### c. Admin Panel Flow (Nội bộ vận hành)
- Các route trong `src/app/admin/*` bị chặn bởi NextAuth Middleware.
- Bắt buộc kiểm tra JWT ở mỗi request.
- Admin thao tác Data (Ví dụ Update trạng thái Booking sang `confirmed`).
- Gọi Server Action để mutate DB.
- UI Revalidate Cache (sử dụng tính năng `revalidatePath` của Next.js) để cập nhật dữ liệu real-time.

## 3. Lý do chọn hướng đi này
- Bỏ qua thiết kế "Tách React Frontend và Node.js Backend" để gom chung 1 source (Next.js Monorepo) — lý tưởng cho team nhỏ, maintain dễ dàng, bảo chứng type-safe từ đầu đến cuối Database.
- SSR mạnh cho SEO — bắt buộc khi cần marketing public web.
- Có thể scale linh hoạt: API route sau này có thể tách ra server riêng nếu Phase 2 (App Mobile) yêu cầu kết nối mạnh mẽ hơn.
