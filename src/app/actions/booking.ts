'use server';

import { z } from 'zod';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { sendBookingConfirmation } from '@/lib/email';
import { logger } from '@/lib/logger';

const bookingFormSchema = z.object({
  departureId: z.string().min(1, 'Mã khởi hành không hợp lệ'),
  name: z.string().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)'),
  phone: z.string().min(10, 'SĐT phải có ít nhất 10 số'),
  email: z.string().email('Email không đúng định dạng').optional().or(z.literal('')),
  numPeople: z.coerce.number().min(1, 'Số người tối thiểu là 1').max(20, 'Tối đa 20 người'),
  note: z.string().optional(),
});

type BookingFormState = {
  errors?: {
    name?: string[];
    phone?: string[];
    email?: string[];
    numPeople?: string[];
    [key: string]: string[] | undefined;
  };
  message?: string;
};

export async function submitBooking(prevState: BookingFormState, formData: FormData): Promise<BookingFormState> {
  const parseResult = bookingFormSchema.safeParse({
    departureId: formData.get('departureId'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    numPeople: formData.get('numPeople'),
    note: formData.get('note'),
  });

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
      message: 'Vui lòng kiểm tra lại thông tin form.',
    };
  }

  const data = parseResult.data;
  let bookingIdToRedirect: string | null = null;

  try {
    // 1. Verify Departure & Open Slots
    const departure = await prisma.departure.findUnique({
      where: { id: data.departureId },
      include: { tour: { select: { name: true } } },
    });

    if (!departure) {
      return { message: 'Lịch khởi hành không tồn tại.' };
    }

    if (departure.status !== 'open') {
      return { message: 'Lịch khởi hành này đã đóng hoặc cạn chỗ.' };
    }

    const slotsLeft = departure.slotsTotal - departure.slotsTaken;
    if (data.numPeople > slotsLeft) {
      return { message: `Rất tiếc, chỉ còn lại ${slotsLeft} chỗ trống cho chuyến này.` };
    }

    // Use Prisma transaction to ensure atomic operations
    const dep = departure; // capture for closure
    const result = await prisma.$transaction(async (tx) => {
      // 2. Prepare/Find Customer
      let customer = await tx.customer.findFirst({
        where: { phone: data.phone },
      });

      if (customer) {
        // Update name/email if they are different and exist
        customer = await tx.customer.update({
          where: { id: customer.id },
          data: {
            name: data.name,
            email: data.email || customer.email,
          },
        });
      } else {
        // Create new customer
        customer = await tx.customer.create({
          data: {
            name: data.name,
            phone: data.phone,
            email: data.email || null,
          },
        });
      }

      // 3. Create Booking
      const totalAmount = departure.price * data.numPeople;
      const newBooking = await tx.booking.create({
        data: {
          departureId: departure.id,
          customerId: customer.id,
          numPeople: data.numPeople,
          totalAmount: totalAmount,
          status: 'pending',
          note: data.note || null,
          source: 'website',
        },
      });

      // 4. Reduce slots from Departure
      await tx.departure.update({
        where: { id: departure.id },
        data: {
          slotsTaken: {
            increment: data.numPeople,
          },
          // Auto close if full
          status: (departure.slotsTaken + data.numPeople >= departure.slotsTotal) ? 'full' : departure.status,
        },
      });

      return { booking: newBooking, customer, departure: dep };
    });

    bookingIdToRedirect = result.booking.id;

    logger.info('Booking created', {
      bookingId: result.booking.id,
      customerId: result.customer.id,
      departureId: result.booking.departureId,
      numPeople: data.numPeople,
      totalAmount: result.booking.totalAmount,
    });

    // Send confirmation email (non-blocking)
    if (result.customer.email) {
      sendBookingConfirmation({
        bookingId: result.booking.id,
        customerName: result.customer.name,
        customerEmail: result.customer.email,
        customerPhone: result.customer.phone,
        tourName: result.departure.tour?.name || 'Tour',
        startDate: result.departure.startDate.toISOString(),
        numPeople: data.numPeople,
        totalAmount: result.booking.totalAmount,
        note: data.note,
      }).catch(() => {}); // Fire-and-forget
    }

  } catch (error) {
    logger.error('Booking failed', {
      error: error instanceof Error ? error.message : String(error),
      departureId: data.departureId,
      phone: data.phone,
    });
    return {
      message: 'Có lỗi phía hệ thống xảy ra. Vui lòng thử lại sau hoặc liên hệ Hotline.',
    };
  }

  // Redirect on Success (MUST BE OUTSIDE try-catch block in Next.js Server Action)
  redirect(`/booking/success/${bookingIdToRedirect}`);
}
