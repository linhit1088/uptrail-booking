// ==========================================
// Shared TypeScript Types for Uptrail
// ==========================================

// JSON-parsed types (from Prisma string fields)

export interface TourSummaryStats {
  bestMonths: string;
  maxGroupSize: string;
  pickupTime: string;
  meetingPoint: string;
  durationDesc: string;
  stats: {
    medicalAccess: { score: number; value: string };
    distance: { score: number; value: string };
    activityTime: { score: number; value: string };
    elevationGain: { score: number; value: string };
    peakAltitude: { score: number; value: string };
  };
}

export interface TourPolicy {
  cancellation: string[];
  reschedule: string[];
  note?: string;
}

export interface LeaderFeedback {
  user: string;
  comment: string;
  tourName: string;
  avatar?: string;
}

// ==========================================
// API Response types
// ==========================================

export interface TourWithRelations {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  tagline: string;
  story: string;
  moods: string[];
  difficulty: number;
  durationDays: number;
  location: string;
  basePrice: number;
  featuredImage: string;
  gallery: string[];
  highlights: string[];
  includes: string[];
  prepares: string[];
  notIncluded: string[];
  policy: TourPolicy;
  summaryStats: TourSummaryStats;
  safetyPromise: string | null;
  sortOrder: number;
  isActive: boolean;
  leaderId: string;
  leader: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    bio: string;
    tripsCount: number;
    specialties: string[];
    personality: string[];
  };
  checkpoints: {
    id: string;
    name: string;
    altitude: string;
    feeling: string;
    image: string | null;
    fatigueLevel: number;
  }[];
  itinerary: {
    id: string;
    day: string;
    title: string;
    desc: string;
  }[];
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
  departures: DepartureInfo[];
}

export interface DepartureInfo {
  id: string;
  startDate: string;
  price: number;
  slotsTotal: number;
  slotsTaken: number;
  status: string;
  leader?: {
    id: string;
    name: string;
    avatar: string;
  } | null;
}

export interface TourCardData {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  tagline: string;
  moods: string[];
  difficulty: number;
  durationDays: number;
  location: string;
  basePrice: number;
  featuredImage: string;
  nextDeparture?: DepartureInfo | null;
  leader: {
    name: string;
    avatar: string;
  };
}

export interface BookingFormData {
  departureId: string;
  name: string;
  phone: string;
  email?: string;
  numPeople: number;
  note?: string;
}

export interface InquiryFormData {
  name: string;
  contact: string;
  message: string;
}

// ==========================================
// Admin types
// ==========================================

export type BookingStatus = 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
export type DepartureStatus = 'open' | 'full' | 'cancelled' | 'completed';
export type InquiryStatus = 'new' | 'contacted' | 'closed';
export type PaymentMethod = 'bank_transfer' | 'vnpay' | 'momo' | 'cash';
export type PaymentStatus = 'pending' | 'confirmed' | 'refunded';
export type UserRole = 'admin' | 'editor' | 'viewer';
export type ArticleCategory = 'guide' | 'story' | 'news';

// Dashboard stats
export interface DashboardStats {
  totalBookingsThisMonth: number;
  totalRevenueThisMonth: number;
  pendingBookings: number;
  upcomingDepartures: number;
  newInquiries: number;
  totalCustomers: number;
}
