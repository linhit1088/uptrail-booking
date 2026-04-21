# UPTRAIL - Trekking Booking Platform

## Tóm tắt hệ thống

Đây là ứng dụng web fullstack Next.js cho Phase 1 của dự án Uptrail:
- **Dành cho khách hàng**: Trải nghiệm mượt mà, thông tin minh bạch, booking dễ dàng.
- **Dành cho nội bộ**: Quản trị vận hành khép kín (tours, bookings, departures, customers, payments).

## Tech Stack
- Frontend: Next.js 14 (App Router) + React 18 + Vanilla CSS (CSS Modules)
- Layer API: Next.js API Routes / Server Actions
- Database: Prisma ORM + PostgreSQL (Dev local bằng SQLite `dev.db`)
- Auth: NextAuth v5 (Admin credentials)
- Validation: Zod

## Cấu trúc thư mục

- `src/app/(public)`: Các trang public cho khách hàng
- `src/app/admin`: Các route được bảo vệ dành cho Admin
- `src/app/api`: Các endpoint backend nội bộ
- `src/components/ui`: UI Design System tái sử dụng
- `src/lib`: Logic backend, Prisma client, NextAuth, utilities
- `src/types`: TypeScript schemas chung
- `prisma/`: Database schema, migrations, seed scripts

## Chạy dự án (Development Mode)

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Thiết lập biến môi trường**:
   - `cp .env.example .env` (nếu có định nghĩa sẵn provider/secret)
   - Lưu ý cần có `DATABASE_URL="file:./dev.db"`

3. **Database (nếu mới clone)**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Khởi chạy Web Server**:
   ```bash
   npm run dev
   ```
   Dự án sẽ khởi chạy ở: `http://localhost:3000`

## Tài khoản Test (sau khi chạy seed)

- **Admin Root**: `root` / `123456`
- **Sales Admin**: `sale01` / `123456`
