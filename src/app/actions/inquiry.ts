'use server';

import { z } from 'zod';
import { prisma } from '@/lib/db';

const inquirySchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập tên (ít nhất 2 ký tự)'),
  contact: z.string().min(8, 'Vui lòng nhập đúng Email hoặc SĐT'),
  message: z.string().min(10, 'Lời nhắn cần chi tiết hơn (ít nhất 10 ký tự)'),
});

type InquiryState = {
  errors?: {
    name?: string[];
    contact?: string[];
    message?: string[];
    [key: string]: string[] | undefined;
  };
  success?: boolean;
  message?: string;
};

export async function submitInquiry(prevState: InquiryState, formData: FormData): Promise<InquiryState> {
  const parseResult = inquirySchema.safeParse({
    name: formData.get('name'),
    contact: formData.get('contact'),
    message: formData.get('message'),
  });

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
      message: 'Vui lòng điền đúng các trường yêu cầu.',
    };
  }

  const data = parseResult.data;

  try {
    // 1. Try to link customer if they exist via contact (heuristics)
    const possibleCustomer = await prisma.customer.findFirst({
      where: {
        OR: [
          { phone: data.contact },
          { email: data.contact }
        ]
      }
    });

    // 2. Insert inquiry
    await prisma.inquiry.create({
      data: {
        name: data.name,
        contact: data.contact,
        message: data.message,
        customerId: possibleCustomer?.id || null,
        status: 'new'
      }
    });

    return {
      success: true,
      message: 'Cảm ơn bạn! Yêu cầu của bạn đã được gửi. Đội ngũ Uptrail sẽ sớm liên lạc.'
    };

  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    return {
      message: 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau hoặc gọi Hotline.'
    };
  }
}
