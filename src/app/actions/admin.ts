'use server';

import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { sendBookingStatusUpdate, sendPaymentConfirmation } from '@/lib/email';
import { logger } from '@/lib/logger';

export async function updateBookingStatus(bookingId: string, newStatus: string) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: newStatus },
    include: {
      customer: true,
      departure: { include: { tour: { select: { name: true } } } },
    },
  });

  logger.info('Booking status updated', {
    bookingId,
    newStatus,
    updatedBy: session.user.name || 'admin',
  });

  // Send email for important status changes
  if (['confirmed', 'paid', 'cancelled'].includes(newStatus) && booking.customer.email) {
    sendBookingStatusUpdate({
      bookingId: booking.id,
      customerName: booking.customer.name,
      customerEmail: booking.customer.email,
      customerPhone: booking.customer.phone,
      tourName: booking.departure.tour?.name || 'Tour',
      startDate: booking.departure.startDate.toISOString(),
      numPeople: booking.numPeople,
      totalAmount: booking.totalAmount,
    }, newStatus).catch(() => {});
  }

  revalidatePath('/admin/bookings');
  revalidatePath('/admin');
}

export async function updateBookingAdminNote(bookingId: string, adminNote: string) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  await prisma.booking.update({
    where: { id: bookingId },
    data: { adminNote },
  });

  logger.info('Booking note updated', { bookingId, updatedBy: session.user.name || 'admin' });
  revalidatePath(`/admin/bookings/${bookingId}`);
}

export async function confirmPayment(bookingId: string, amount: number, note?: string) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  const result = await prisma.$transaction(async (tx) => {
    // Create payment record
    await tx.payment.create({
      data: {
        bookingId,
        amount,
        method: 'bank_transfer',
        status: 'confirmed',
        note: note || 'Admin xác nhận thanh toán',
        paidAt: new Date(),
      },
    });

    // Update booking
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: true,
        departure: { include: { tour: { select: { name: true } } } },
      },
    });
    if (!booking) throw new Error('Booking not found');

    const newAmountPaid = booking.amountPaid + amount;
    const newStatus = newAmountPaid >= booking.totalAmount ? 'paid' : 'confirmed';

    await tx.booking.update({
      where: { id: bookingId },
      data: {
        amountPaid: newAmountPaid,
        status: newStatus,
      },
    });

    return { booking, newAmountPaid, newStatus };
  });

  logger.info('Payment confirmed', {
    bookingId,
    amount,
    newAmountPaid: result.newAmountPaid,
    newStatus: result.newStatus,
    confirmedBy: session.user.name || 'admin',
  });

  // Send payment confirmation email
  if (result.booking.customer.email) {
    const remaining = result.booking.totalAmount - result.newAmountPaid;
    sendPaymentConfirmation({
      bookingId: result.booking.id,
      customerName: result.booking.customer.name,
      customerEmail: result.booking.customer.email,
      tourName: result.booking.departure.tour?.name || 'Tour',
      amountPaid: amount,
      totalAmount: result.booking.totalAmount,
      remaining: remaining > 0 ? remaining : 0,
    }).catch(() => {});
  }

  revalidatePath(`/admin/bookings/${bookingId}`);
  revalidatePath('/admin/bookings');
  revalidatePath('/admin');
}

export async function updateCustomerNote(customerId: string, notes: string) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  await prisma.customer.update({
    where: { id: customerId },
    data: { notes },
  });

  revalidatePath(`/admin/customers/${customerId}`);
}

export async function updateCustomerTags(customerId: string, tags: string[]) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  await prisma.customer.update({
    where: { id: customerId },
    data: { tags: tags },
  });

  revalidatePath(`/admin/customers/${customerId}`);
}

export async function updateInquiryStatus(inquiryId: string, status: string, adminNote?: string) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  await prisma.inquiry.update({
    where: { id: inquiryId },
    data: { status, ...(adminNote !== undefined && { adminNote }) },
  });

  revalidatePath('/admin/inquiries');
}
