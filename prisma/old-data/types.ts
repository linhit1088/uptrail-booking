
export interface Tour {
  id: string;
  name: string;
  shortDesc: string;
  tagline: string;
  story: string;
  moods: Mood[];
  difficulty: 1 | 2 | 3 | 4 | 5; // 1: Easy, 5: Extreme
  durationDays: number;
  location: string;
  price: number;
  featuredImage: string;
  gallery: string[];
  nextDeparture: string;
  slotsTotal: number;
  slotsTaken: number;
  highlights: string[];
  checkpoints: Checkpoint[];
  leaderId: string;
  itinerary: DailySchedule[];
  includes?: string[]; // Uptrail trang bị
  prepares?: string[]; // Khách cần chuẩn bị
  notIncluded?: string[]; // Không bao gồm
  policy?: {
    cancellation: string[];
    reschedule: string[];
    note?: string;
  };
  safetyPromise?: string;
  order?: number; // For drag-and-drop sorting
  summary?: TourSummaryInfo; // NEW: Summary section data
  faq?: { question: string; answer: string }[]; // NEW: Tour specific FAQs
}

export interface TourSummaryInfo {
    bestMonths: string;
    maxGroupSize: string;
    pickupTime: string;
    // pickupLocation: excluded as requested
    meetingPoint: string;
    durationDesc: string;
    stats: {
        medicalAccess: { score: number; value: string }; // Score 1-10
        distance: { score: number; value: string };
        activityTime: { score: number; value: string };
        elevationGain: { score: number; value: string };
        peakAltitude: { score: number; value: string };
    }
}

export interface DailySchedule {
  day: string;
  title: string;
  desc: string;
}

export interface Checkpoint {
  name: string;
  altitude: string;
  feeling: string; // "Cảm giác"
  image?: string;
  fatigueLevel: number; // 1-10
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  tripsCount: number;
  specialties: string[];
  avatar: string;
  rating: number; // 0-5
  personality: string[]; // e.g., "Hài hước", "Trầm tĩnh"
  feedbacks: LeaderFeedback[];
}

export interface LeaderFeedback {
  user: string;
  comment: string;
  tourName: string;
  avatar?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

// Updated Moods based on psychological triggers. Using string type now since it can be dynamic.
export type Mood = string;

export interface BookingForm {
  name: string;
  phone: string;
  tourId: string;
  date: string;
  note: string;
}

// --- CMS NEW TYPES ---

export interface Booking {
    id: string;
    tourName: string;
    customerName: string;
    phone: string;
    departureDate: string;
    note: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
}

export interface Inquiry {
    id: string;
    name: string;
    contact: string; // Phone or Email
    message: string;
    status: 'new' | 'read';
    createdAt: string;
}

export interface Testimonial {
    id: string;
    name: string;
    tourName: string;
    comment: string;
    avatar: string;
}

export interface User {
  id: string;
  username: string;
  password?: string; // NEW: Password field
  role: 'admin' | 'editor' | 'viewer';
  name: string;
  avatar?: string;
  active: boolean;
}

export interface Comment {
    id: string;
    user: string;
    avatar?: string;
    content: string;
    date: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown
  coverImage: string;
  authorId: string;
  categoryId: 'guide' | 'story' | 'news';
  tags: string[];
  createdAt: string;
  seoTitle?: string;
  seoDesc?: string;
  comments?: Comment[];
}

export interface SiteConfig {
    // HERO
    heroTitle: string;
    heroSubtitle: string;
    heroVideoUrl: string; // Deprecated but kept for compatibility
    heroImages: string[]; // New: Array of images for slider
    heroSlideDuration: number; // New: Seconds per slide
    heroOverlayOpacity: number; // New: 0.0 to 1.0
    
    // INTRO
    introTitle: string;
    introContent: string;

    // MOOD
    moodTitle: string;
    moodSubtitle: string;

    // TOURS
    tourTitle: string;
    tourSubtitle: string;

    // LEADERS
    leaderTitle: string;
    leaderSubtitle: string;
    leaderDesc: string;
    leaderQuote: string; // NEW: Editable bottom quote

    // COMMITMENT
    sustainabilityTitle?: string;
    sustainabilityContent?: string;

    // TESTIMONIALS
    testimonialTitle: string;
    testimonialSubtitle: string;
    
    // NEWS
    newsTitle: string;
    newsSubtitle: string;

    // CONTACT & GLOBAL
    contactTitle: string;
    contactSubtitle: string;
    hotline: string;
    email: string;
    address: string;
    
    // SETTINGS
    // SEO Global
    globalSeoTitle?: string;
    globalSeoDesc?: string;
    globalSeoImage?: string;
    logoUrl?: string; // Logo trang web
    faviconUrl?: string; // Favicon trang web

    // ABOUT PAGE
    aboutHeroTitle?: string;
    aboutHeroDesc1?: string;
    aboutHeroDesc2?: string;
    aboutHeroQuote?: string;
    aboutHeroImage?: string;

    aboutBeliefTitle?: string;
    aboutBelief1Title?: string;
    aboutBelief1Desc?: string;
    aboutBelief2Title?: string;
    aboutBelief2Desc?: string;
    aboutBelief3Title?: string;
    aboutBelief3Desc?: string;

    aboutVisionTitle?: string;
    aboutVisionDesc1?: string;
    aboutVisionDesc2?: string;
    aboutVisionQuote?: string;

    aboutMissionTitle?: string;
    aboutMissionSubtitle?: string;
    aboutMission1Title?: string;
    aboutMission1Desc?: string;
    aboutMission2Title?: string;
    aboutMission2Desc?: string;
    aboutMission3Title?: string;
    aboutMission3Desc?: string;

    aboutValueTitle?: string;
    aboutValueSubtitle?: string;
    aboutValue1Title?: string;
    aboutValue1Desc?: string;
    aboutValue2Title?: string;
    aboutValue2Desc?: string;
    aboutValue3Title?: string;
    aboutValue3Desc?: string;

    aboutPeopleTitle?: string;
    aboutPeopleSubtitle?: string;
    aboutPeopleLeaderDesc?: string;
    aboutPeoplePorterDesc?: string;
    aboutPeopleOpsDesc?: string;
    aboutPeopleQuote?: string;

    aboutEndingTitle?: string;
    aboutEndingDesc1?: string;
    aboutEndingDesc2?: string;
    aboutEndingSignature?: string;

    // CONTACT PAGE
    // CONTACT PAGE
    contactMapUrl?: string;
    contactHotlineDesc?: string;
    contactEmailDesc?: string;

    backgroundMusicUrl?: string;
}
