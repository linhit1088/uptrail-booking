import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { TOURS, LEADERS, ARTICLES, USERS, TESTIMONIALS, MOODS, SITE_CONFIG } from './old-data/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Users
  for (const user of USERS) {
    const hashedPassword = await bcrypt.hash(user.password || '123456', 10);
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        username: user.username,
        password: hashedPassword,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        isActive: user.active,
      },
    });
  }
  console.log('Seeded users.');

  // 2. Leaders
  for (const leader of LEADERS) {
    await prisma.leader.upsert({
      where: { id: leader.id },
      update: {},
      create: {
        id: leader.id,
        name: leader.name,
        role: leader.role,
        bio: leader.bio,
        tripsCount: leader.tripsCount,
        specialties: leader.specialties,
        avatar: leader.avatar,
        rating: leader.rating,
        personality: leader.personality,
        feedbacks: leader.feedbacks as any,
      },
    });
  }
  console.log('Seeded leaders.');

  // 3. Tours
  const autoNextDeparture = (tourDateStr: string, durationDays: number): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const manualDate = new Date(tourDateStr);
    manualDate.setHours(0,0,0,0);
    if (manualDate >= today) return manualDate;
    const targetDay = durationDays <= 2 ? 5 : 4; 
    const nextDate = new Date(today);
    const currentDay = nextDate.getDay(); 
    let daysToAdd = targetDay - currentDay;
    if (daysToAdd < 0) daysToAdd += 7;
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    return nextDate;
  };

  for (const tour of TOURS) {
    const createdTour = await prisma.tour.upsert({
      where: { slug: tour.id },
      update: {},
      create: {
        id: tour.id,
        name: tour.name,
        slug: tour.id,
        shortDesc: tour.shortDesc,
        tagline: tour.tagline,
        story: tour.story,
        moods: tour.moods,
        difficulty: tour.difficulty,
        durationDays: tour.durationDays,
        location: tour.location,
        basePrice: tour.price,
        featuredImage: tour.featuredImage,
        gallery: tour.gallery || [],
        highlights: tour.highlights || [],
        includes: tour.includes || [],
        prepares: tour.prepares || [],
        notIncluded: tour.notIncluded || [],
        policy: tour.policy || {},
        summaryStats: (tour.summary || {}) as any,
        safetyPromise: tour.safetyPromise || null,
        sortOrder: tour.order || 0,
        leaderId: tour.leaderId,
      },
    });

    // Checkpoints
    const checkpoints = tour.checkpoints || [];
    for (let i = 0; i < checkpoints.length; i++) {
        const cp = checkpoints[i];
        await prisma.tourCheckpoint.create({
            data: {
                tourId: createdTour.id,
                name: cp.name,
                altitude: cp.altitude,
                feeling: cp.feeling,
                image: cp.image,
                fatigueLevel: cp.fatigueLevel,
                sortOrder: i,
            }
        });
    }

    // Itinerary
    const itineraryItems = tour.itinerary || [];
    for (let i = 0; i < itineraryItems.length; i++) {
        const it = itineraryItems[i];
        await prisma.tourItinerary.create({
            data: {
                tourId: createdTour.id,
                day: it.day,
                title: it.title,
                desc: it.desc,
                sortOrder: i,
            }
        });
    }

    // FAQs
    const faqItems = tour.faq || [];
    for (let i = 0; i < faqItems.length; i++) {
        const f = faqItems[i];
        await prisma.tourFaq.create({
            data: {
                tourId: createdTour.id,
                question: f.question,
                answer: f.answer,
                sortOrder: i,
            }
        });
    }

    // Sample Departure
    const nextDepDate = autoNextDeparture(tour.nextDeparture, tour.durationDays);
    await prisma.departure.create({
        data: {
            tourId: createdTour.id,
            startDate: nextDepDate,
            price: tour.price,
            slotsTotal: tour.slotsTotal || 20,
            slotsTaken: tour.slotsTaken || 0,
            status: 'open',
            leaderId: tour.leaderId,
        }
    });
  }
  console.log('Seeded tours, checkpoints, itinerary, faqs, departures.');

  // 4. Articles
  for (const article of ARTICLES) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.coverImage,
        authorId: article.authorId,
        category: article.categoryId,
        tags: article.tags || [],
        seoTitle: article.seoTitle,
        seoDesc: article.seoDesc,
        publishedAt: new Date(article.createdAt),
      },
    });
  }
  console.log('Seeded articles.');

  // 5. Testimonials
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({
      data: {
        name: t.name,
        tourName: t.tourName,
        comment: t.comment,
        avatar: t.avatar,
      },
    });
  }
  console.log('Seeded testimonials.');

  // 6. Categories (Moods)
  for (let i = 0; i < MOODS.length; i++) {
      const m = MOODS[i];
      await prisma.category.create({
          data: {
              label: m.label,
              icon: m.icon,
              desc: m.desc,
              sortOrder: i,
          }
      });
  }
  console.log('Seeded categories.');

  // 7. Site Config
  await prisma.siteConfig.upsert({
      where: { key: 'main' },
      update: {},
      create: {
          key: 'main',
          value: JSON.stringify(SITE_CONFIG),
      }
  });
  console.log('Seeded site config.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
