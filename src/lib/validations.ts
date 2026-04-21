import { z } from 'zod';

// ==========================================
// Booking Validation
// ==========================================

export const bookingSchema = z.object({
  departureId: z.string().min(1, 'Vui lòng chọn ngày khởi hành'),
  name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').max(100),
  phone: z
    .string()
    .min(9, 'Số điện thoại không hợp lệ')
    .max(15)
    .regex(/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  numPeople: z.number().int().min(1, 'Ít nhất 1 người').max(30, 'Tối đa 30 người'),
  note: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

// ==========================================
// Inquiry Validation
// ==========================================

export const inquirySchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên').max(100),
  contact: z.string().min(5, 'Vui lòng nhập SĐT hoặc email').max(100),
  message: z.string().min(10, 'Tin nhắn phải có ít nhất 10 ký tự').max(1000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

// ==========================================
// Admin - Tour Validation
// ==========================================

export const tourSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
  shortDesc: z.string().min(10).max(500),
  tagline: z.string().max(200).optional(),
  story: z.string().min(20),
  moods: z.array(z.string()).min(1, 'Chọn ít nhất 1 mood'),
  difficulty: z.number().int().min(1).max(5),
  durationDays: z.number().int().min(1).max(30),
  location: z.string().min(2).max(200),
  basePrice: z.number().int().min(0),
  featuredImage: z.string().url().optional().or(z.literal('')),
  leaderId: z.string().min(1, 'Chọn leader'),
  isActive: z.boolean().optional(),
});

export type TourInput = z.infer<typeof tourSchema>;

// ==========================================
// Admin - Departure Validation
// ==========================================

export const departureSchema = z.object({
  tourId: z.string().min(1),
  startDate: z.string().min(1, 'Chọn ngày khởi hành'),
  price: z.number().int().min(0),
  slotsTotal: z.number().int().min(1).max(50),
  leaderId: z.string().optional(),
  status: z.enum(['open', 'full', 'cancelled', 'completed']).optional(),
  notes: z.string().max(500).optional(),
});

export type DepartureInput = z.infer<typeof departureSchema>;

// ==========================================
// Admin - Payment Validation
// ==========================================

export const paymentSchema = z.object({
  bookingId: z.string().min(1),
  amount: z.number().int().min(1000, 'Số tiền tối thiểu 1,000đ'),
  method: z.enum(['bank_transfer', 'vnpay', 'momo', 'cash']),
  note: z.string().max(500).optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;

// ==========================================
// Auth Validation
// ==========================================

export const loginSchema = z.object({
  username: z.string().min(2, 'Nhập tên đăng nhập'),
  password: z.string().min(3, 'Mật khẩu tối thiểu 3 ký tự'),
});

export type LoginInput = z.infer<typeof loginSchema>;
