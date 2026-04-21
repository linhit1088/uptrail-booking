import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding sample bookings...');

  // Get first departure
  const departures = await prisma.departure.findMany({
    take: 4,
    include: { tour: true },
  });

  if (departures.length === 0) {
    console.log('No departures found. Run the main seed first.');
    return;
  }

  // Create sample customers
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { id: 'cust-1' },
      update: {},
      create: {
        id: 'cust-1',
        name: 'Nguyễn Văn An',
        phone: '0912345678',
        email: 'an.nguyen@gmail.com',
        tags: JSON.stringify(['VIP', 'Quay lại']),
        notes: 'Khách quen, đã đi 3 chuyến. Thích tour khó.',
      },
    }),
    prisma.customer.upsert({
      where: { id: 'cust-2' },
      update: {},
      create: {
        id: 'cust-2',
        name: 'Trần Thị Bình',
        phone: '0987654321',
        email: 'binh.tran@outlook.com',
        tags: JSON.stringify(['Mới']),
      },
    }),
    prisma.customer.upsert({
      where: { id: 'cust-3' },
      update: {},
      create: {
        id: 'cust-3',
        name: 'Lê Hoàng Cường',
        phone: '0909123456',
        email: 'cuong.le@yahoo.com',
        tags: JSON.stringify(['Nhóm lớn']),
        notes: 'Hay đi nhóm 5-6 người. Cần hỗ trợ chia phòng.',
      },
    }),
    prisma.customer.upsert({
      where: { id: 'cust-4' },
      update: {},
      create: {
        id: 'cust-4',
        name: 'Phạm Mai Dung',
        phone: '0933456789',
        email: 'dung.pham@gmail.com',
        tags: JSON.stringify(['Solo']),
      },
    }),
    prisma.customer.upsert({
      where: { id: 'cust-5' },
      update: {},
      create: {
        id: 'cust-5',
        name: 'Võ Minh Đức',
        phone: '0977888999',
        tags: JSON.stringify([]),
      },
    }),
  ]);

  // Create bookings with different statuses
  const bookingsData = [
    {
      id: 'book-1',
      departureId: departures[0].id,
      customerId: 'cust-1',
      numPeople: 2,
      totalAmount: departures[0].price * 2,
      amountPaid: departures[0].price * 2,
      status: 'paid',
      source: 'website',
      note: 'Muốn ngủ cùng phòng với bạn',
      adminNote: 'Đã xác nhận thanh toán qua VCB. Khách VIP.',
    },
    {
      id: 'book-2',
      departureId: departures[0].id,
      customerId: 'cust-2',
      numPeople: 1,
      totalAmount: departures[0].price,
      amountPaid: 0,
      status: 'pending',
      source: 'website',
      note: 'Lần đầu đi trekking, lo lắng về thể lực.',
    },
    {
      id: 'book-3',
      departureId: departures[1]?.id || departures[0].id,
      customerId: 'cust-3',
      numPeople: 5,
      totalAmount: (departures[1]?.price || departures[0].price) * 5,
      amountPaid: (departures[1]?.price || departures[0].price) * 2,
      status: 'confirmed',
      source: 'zalo',
      note: 'Nhóm bạn đại học, cần 2 lều riêng.',
      adminNote: 'Đã nhận cọc 2 người. Chờ chuyển nốt.',
    },
    {
      id: 'book-4',
      departureId: departures[2]?.id || departures[0].id,
      customerId: 'cust-4',
      numPeople: 1,
      totalAmount: departures[2]?.price || departures[0].price,
      amountPaid: 0,
      status: 'pending',
      source: 'facebook',
      note: 'Đi solo, muốn kết bạn mới.',
    },
    {
      id: 'book-5',
      departureId: departures[0].id,
      customerId: 'cust-5',
      numPeople: 3,
      totalAmount: departures[0].price * 3,
      amountPaid: 0,
      status: 'cancelled',
      source: 'phone',
      adminNote: 'Khách hủy do lịch công tác. Đã hoàn cọc.',
    },
    {
      id: 'book-6',
      departureId: departures[3]?.id || departures[0].id,
      customerId: 'cust-1',
      numPeople: 2,
      totalAmount: (departures[3]?.price || departures[0].price) * 2,
      amountPaid: 0,
      status: 'pending',
      source: 'website',
      note: 'Đặt thêm chuyến mới cho tháng sau.',
    },
  ];

  for (const b of bookingsData) {
    await prisma.booking.upsert({
      where: { id: b.id },
      update: {},
      create: b,
    });
  }
  console.log('Created 6 sample bookings.');

  // Create payment records for paid/confirmed bookings
  const paymentsData = [
    {
      id: 'pay-1',
      bookingId: 'book-1',
      amount: departures[0].price * 2,
      method: 'bank_transfer',
      status: 'confirmed',
      note: 'CK qua VCB - Mã GD: VCB123456789',
      paidAt: new Date('2026-04-15T10:30:00'),
    },
    {
      id: 'pay-2',
      bookingId: 'book-3',
      amount: (departures[1]?.price || departures[0].price) * 2,
      method: 'bank_transfer',
      status: 'confirmed',
      note: 'Cọc 2 người - CK qua Techcombank',
      paidAt: new Date('2026-04-18T14:20:00'),
    },
  ];

  for (const p of paymentsData) {
    await prisma.payment.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }
  console.log('Created payment records.');

  // Create sample inquiry
  await prisma.inquiry.upsert({
    where: { id: 'inq-1' },
    update: {},
    create: {
      id: 'inq-1',
      customerId: 'cust-2',
      name: 'Trần Thị Bình',
      contact: '0987654321',
      message: 'Em muốn hỏi về tour Kỳ Quan San, liệu thể lực yếu có đi được không ạ?',
      status: 'new',
    },
  });

  await prisma.inquiry.upsert({
    where: { id: 'inq-2' },
    update: {},
    create: {
      id: 'inq-2',
      name: 'Hoàng Minh Tâm',
      contact: 'tam.hoang@gmail.com',
      message: 'Nhóm mình 10 người, muốn book riêng 1 chuyến Lảo Thẩn vào tháng 5. Có được không?',
      status: 'contacted',
      adminNote: 'Đã liên hệ qua Zalo, đang chờ confirm ngày.',
    },
  });

  console.log('Created sample inquiries.');
  console.log('✅ Booking seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
