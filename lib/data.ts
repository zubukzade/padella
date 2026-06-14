/* =========================================================================
   Padella — mock data layer
   Replace with a real API / CMS later. Everything is typed.
   ========================================================================= */

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Pro";

export const NAV_LINKS = [
  { label: "Community", href: "/community" },
  { label: "Clubs", href: "/clubs" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Academy", href: "/academy" },
  { label: "Shop", href: "/shop" },
  { label: "Rankings", href: "/rankings" },
] as const;

export const MOBILE_NAV = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Community", href: "/community", icon: "users" },
  { label: "Clubs", href: "/clubs", icon: "map-pin" },
  { label: "Tournaments", href: "/tournaments", icon: "trophy" },
  { label: "Shop", href: "/shop", icon: "shopping-bag" },
  { label: "Profile", href: "/dashboard", icon: "user" },
] as const;

export const HERO_STATS = [
  { label: "Players", value: 48200, suffix: "+" },
  { label: "Clubs", value: 312, suffix: "" },
  { label: "Matches Played", value: 1280000, suffix: "+" },
  { label: "Tournaments", value: 640, suffix: "" },
];

export const CITY_NODES = [
  { city: "İstanbul", lat: 41.01, lng: 28.98, players: 14200, clubs: 86 },
  { city: "Ankara", lat: 39.93, lng: 32.86, players: 6100, clubs: 41 },
  { city: "İzmir", lat: 38.42, lng: 27.14, players: 5400, clubs: 37 },
  { city: "Antalya", lat: 36.89, lng: 30.71, players: 4300, clubs: 29 },
  { city: "Bursa", lat: 40.19, lng: 29.06, players: 2600, clubs: 18 },
  { city: "Bodrum", lat: 37.03, lng: 27.43, players: 2100, clubs: 16 },
  { city: "Adana", lat: 37.0, lng: 35.32, players: 1700, clubs: 11 },
  { city: "Eskişehir", lat: 39.78, lng: 30.52, players: 1400, clubs: 9 },
  { city: "Gaziantep", lat: 37.07, lng: 37.38, players: 1200, clubs: 8 },
  { city: "Trabzon", lat: 41.0, lng: 39.72, players: 980, clubs: 6 },
];

export interface Club {
  id: string;
  name: string;
  city: string;
  district: string;
  lat: number;
  lng: number;
  courts: number;
  rating: number;
  reviews: number;
  coaches: number;
  indoor: boolean;
  price: number; // per hour
  image: string;
  tags: string[];
}

export const CLUBS: Club[] = [
  {
    id: "padelup-maslak",
    name: "PadelUp Maslak",
    city: "İstanbul",
    district: "Maslak",
    lat: 41.11,
    lng: 29.02,
    courts: 8,
    rating: 4.9,
    reviews: 1240,
    coaches: 6,
    indoor: true,
    price: 600,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    tags: ["Panoramic", "Pro Shop", "Café"],
  },
  {
    id: "matchpoint-etiler",
    name: "MatchPoint Etiler",
    city: "İstanbul",
    district: "Etiler",
    lat: 41.08,
    lng: 29.03,
    courts: 6,
    rating: 4.8,
    reviews: 870,
    coaches: 4,
    indoor: false,
    price: 720,
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Rooftop", "Night Play", "Academy"],
  },
  {
    id: "smash-bagdat",
    name: "Smash Club Bağdat",
    city: "İstanbul",
    district: "Kadıköy",
    lat: 40.96,
    lng: 29.07,
    courts: 5,
    rating: 4.7,
    reviews: 640,
    coaches: 3,
    indoor: true,
    price: 540,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Indoor", "Kids Program"],
  },
  {
    id: "anatolia-cankaya",
    name: "Anatolia Padel Çankaya",
    city: "Ankara",
    district: "Çankaya",
    lat: 39.9,
    lng: 32.85,
    courts: 7,
    rating: 4.8,
    reviews: 720,
    coaches: 5,
    indoor: true,
    price: 480,
    image:
      "https://images.unsplash.com/photo-1591491653056-4b3d3d1d4f8d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Indoor", "Leagues", "Gym"],
  },
  {
    id: "aegean-alsancak",
    name: "Aegean Padel Alsancak",
    city: "İzmir",
    district: "Alsancak",
    lat: 38.43,
    lng: 27.14,
    courts: 6,
    rating: 4.9,
    reviews: 910,
    coaches: 4,
    indoor: false,
    price: 500,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    tags: ["Sea View", "Café", "Pro Shop"],
  },
  {
    id: "riviera-konyaalti",
    name: "Riviera Padel Konyaaltı",
    city: "Antalya",
    district: "Konyaaltı",
    lat: 36.86,
    lng: 30.63,
    courts: 9,
    rating: 4.9,
    reviews: 1080,
    coaches: 7,
    indoor: false,
    price: 560,
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=80",
    tags: ["Resort", "Tournaments", "Beach"],
  },
  {
    id: "olive-bodrum",
    name: "Olive Padel Bodrum",
    city: "Bodrum",
    district: "Yalıkavak",
    lat: 37.1,
    lng: 27.29,
    courts: 5,
    rating: 4.8,
    reviews: 530,
    coaches: 3,
    indoor: false,
    price: 800,
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Marina", "Sunset Play", "VIP"],
  },
  {
    id: "greenset-nilufer",
    name: "GreenSet Nilüfer",
    city: "Bursa",
    district: "Nilüfer",
    lat: 40.21,
    lng: 28.95,
    courts: 4,
    rating: 4.6,
    reviews: 410,
    coaches: 2,
    indoor: true,
    price: 420,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Indoor", "Affordable"],
  },
];

export interface Player {
  id: string;
  name: string;
  city: string;
  level: SkillLevel;
  rating: number; // padel rating 0-7
  avatar: string;
  wins: number;
  losses: number;
  streak: number;
  club: string;
  badges: string[];
}

export const PLAYERS: Player[] = [
  {
    id: "ada-yilmaz",
    name: "Ada Yılmaz",
    city: "İstanbul",
    level: "Pro",
    rating: 6.4,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    wins: 218,
    losses: 41,
    streak: 9,
    club: "PadelUp Maslak",
    badges: ["National Top 10", "Iron Streak", "Tournament MVP"],
  },
  {
    id: "deniz-kaya",
    name: "Deniz Kaya",
    city: "İzmir",
    level: "Advanced",
    rating: 5.7,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    wins: 164,
    losses: 58,
    streak: 4,
    club: "Aegean Padel Alsancak",
    badges: ["City Champion", "Comeback King"],
  },
  {
    id: "elif-demir",
    name: "Elif Demir",
    city: "Ankara",
    level: "Advanced",
    rating: 5.9,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    wins: 181,
    losses: 49,
    streak: 6,
    club: "Anatolia Padel Çankaya",
    badges: ["Smash Master", "Top Rated"],
  },
  {
    id: "kerem-aydin",
    name: "Kerem Aydın",
    city: "Antalya",
    level: "Pro",
    rating: 6.2,
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    wins: 203,
    losses: 52,
    streak: 7,
    club: "Riviera Padel Konyaaltı",
    badges: ["Finalist x4", "Power Player"],
  },
  {
    id: "mira-sahin",
    name: "Mira Şahin",
    city: "İstanbul",
    level: "Intermediate",
    rating: 4.6,
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    wins: 92,
    losses: 60,
    streak: 3,
    club: "Smash Club Bağdat",
    badges: ["Rising Star"],
  },
  {
    id: "can-oz",
    name: "Can Öz",
    city: "Bursa",
    level: "Intermediate",
    rating: 4.4,
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    wins: 78,
    losses: 55,
    streak: 2,
    club: "GreenSet Nilüfer",
    badges: ["Most Improved"],
  },
];

export interface MatchOpening {
  id: string;
  club: string;
  city: string;
  date: string;
  time: string;
  level: SkillLevel;
  spotsLeft: number;
  players: { name: string; avatar: string }[];
  price: number;
}

export const MATCHES: MatchOpening[] = [
  {
    id: "m1",
    club: "PadelUp Maslak",
    city: "İstanbul",
    date: "Fri, Jun 19",
    time: "19:30",
    level: "Advanced",
    spotsLeft: 1,
    price: 150,
    players: [
      { name: "Ada", avatar: PLAYERS[0].avatar },
      { name: "Kerem", avatar: PLAYERS[3].avatar },
      { name: "Elif", avatar: PLAYERS[2].avatar },
    ],
  },
  {
    id: "m2",
    club: "Aegean Padel Alsancak",
    city: "İzmir",
    date: "Sat, Jun 20",
    time: "10:00",
    level: "Intermediate",
    spotsLeft: 2,
    price: 120,
    players: [
      { name: "Deniz", avatar: PLAYERS[1].avatar },
      { name: "Mira", avatar: PLAYERS[4].avatar },
    ],
  },
  {
    id: "m3",
    club: "Riviera Padel Konyaaltı",
    city: "Antalya",
    date: "Sun, Jun 21",
    time: "18:00",
    level: "Pro",
    spotsLeft: 1,
    price: 180,
    players: [
      { name: "Kerem", avatar: PLAYERS[3].avatar },
      { name: "Ada", avatar: PLAYERS[0].avatar },
      { name: "Elif", avatar: PLAYERS[2].avatar },
    ],
  },
  {
    id: "m4",
    club: "Smash Club Bağdat",
    city: "İstanbul",
    date: "Mon, Jun 22",
    time: "21:00",
    level: "Beginner",
    spotsLeft: 3,
    price: 90,
    players: [{ name: "Mira", avatar: PLAYERS[4].avatar }],
  },
];

export interface Tournament {
  id: string;
  name: string;
  city: string;
  club: string;
  date: string;
  status: "live" | "upcoming" | "completed";
  category: string;
  prize: number;
  teams: number;
  image: string;
}

export const TOURNAMENTS: Tournament[] = [
  {
    id: "t-live-1",
    name: "Padella Masters İstanbul",
    city: "İstanbul",
    club: "PadelUp Maslak",
    date: "Jun 14, 2026",
    status: "live",
    category: "Open · Mixed",
    prize: 250000,
    teams: 64,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "t-up-1",
    name: "Aegean Summer Slam",
    city: "İzmir",
    club: "Aegean Padel Alsancak",
    date: "Jul 04, 2026",
    status: "upcoming",
    category: "P1000",
    prize: 180000,
    teams: 48,
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "t-up-2",
    name: "Riviera Beach Cup",
    city: "Antalya",
    club: "Riviera Padel Konyaaltı",
    date: "Jul 18, 2026",
    status: "upcoming",
    category: "P700 · Amateur",
    prize: 90000,
    teams: 32,
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "t-done-1",
    name: "Capital Indoor Championship",
    city: "Ankara",
    club: "Anatolia Padel Çankaya",
    date: "May 30, 2026",
    status: "completed",
    category: "P1500",
    prize: 320000,
    teams: 64,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
  },
];

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
  video?: boolean;
}

export const ACADEMY_CATEGORIES = [
  "Technique",
  "Training",
  "Equipment Reviews",
  "News",
  "Beginner Guides",
  "Pro Tips",
  "Club Spotlights",
];

export const ARTICLES: Article[] = [
  {
    id: "a1",
    title: "The Bandeja, Decoded: Mastering Padel's Signature Shot",
    category: "Technique",
    excerpt:
      "A frame-by-frame breakdown of the most important defensive-to-offensive transition in the modern game.",
    author: "Coach Berk Altın",
    readTime: "8 min",
    date: "Jun 10, 2026",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1400&q=80",
    featured: true,
    video: true,
  },
  {
    id: "a2",
    title: "Carbon vs. Fiberglass: Which Racket Core Is Right For You?",
    category: "Equipment Reviews",
    excerpt:
      "We tested 14 rackets across power, control, and comfort. Here's how to read the spec sheet.",
    author: "Selin Aksoy",
    readTime: "6 min",
    date: "Jun 08, 2026",
    image:
      "https://images.unsplash.com/photo-1617083277624-3f0a64d4f5c8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "a3",
    title: "From Zero to First Match in 30 Days: The Beginner's Roadmap",
    category: "Beginner Guides",
    excerpt:
      "Everything a new player needs — gear, footwork, etiquette and your first match-day checklist.",
    author: "Padella Editorial",
    readTime: "10 min",
    date: "Jun 05, 2026",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "a4",
    title: "Inside Riviera Padel: Antalya's Resort-Grade Club",
    category: "Club Spotlights",
    excerpt:
      "Nine courts, a sea breeze and a pro academy. A look inside Turkey's most photogenic padel venue.",
    author: "Mert Yıldız",
    readTime: "5 min",
    date: "Jun 02, 2026",
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "a5",
    title: "Off-Court Power: A 6-Week Padel Strength Program",
    category: "Training",
    excerpt:
      "Build explosive rotation and bullet-proof shoulders with this periodized plan from our S&C team.",
    author: "Dr. Ayşe Korkmaz",
    readTime: "9 min",
    date: "May 28, 2026",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "a6",
    title: "Turkey Qualifies Record Number of Teams for European Padel",
    category: "News",
    excerpt:
      "A breakout season pushes the national program into the continental spotlight. What it means.",
    author: "Padella Newsroom",
    readTime: "4 min",
    date: "May 24, 2026",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1400&q=80",
  },
];

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  power: number; // 0-100
  control: number; // 0-100
  level: SkillLevel;
  shape: string;
  image: string;
  colorway: string;
  isNew?: boolean;
}

export const SHOP_CATEGORIES = [
  "Rackets",
  "Shoes",
  "Bags",
  "Balls",
  "Grips",
  "Apparel",
  "Accessories",
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Phantom Pro Carbon",
    brand: "Padella Lab",
    category: "Rackets",
    price: 7900,
    oldPrice: 9200,
    rating: 4.9,
    reviews: 312,
    power: 92,
    control: 78,
    level: "Pro",
    shape: "Diamond",
    image:
      "https://images.unsplash.com/photo-1617083277624-3f0a64d4f5c8?auto=format&fit=crop&w=1000&q=80",
    colorway: "Carbon / Neon",
    isNew: true,
  },
  {
    id: "p2",
    name: "Aero Control 18K",
    brand: "Padella Lab",
    category: "Rackets",
    price: 6500,
    rating: 4.8,
    reviews: 204,
    power: 74,
    control: 94,
    level: "Advanced",
    shape: "Round",
    image:
      "https://images.unsplash.com/photo-1622279457486-62dbf38a32d6?auto=format&fit=crop&w=1000&q=80",
    colorway: "Forest / Sand",
  },
  {
    id: "p3",
    name: "Ignite Hybrid Teardrop",
    brand: "Volt",
    category: "Rackets",
    price: 5400,
    oldPrice: 5900,
    rating: 4.7,
    reviews: 158,
    power: 84,
    control: 85,
    level: "Intermediate",
    shape: "Teardrop",
    image:
      "https://images.unsplash.com/photo-1611251135345-18c56206b863?auto=format&fit=crop&w=1000&q=80",
    colorway: "Black / Gold",
  },
  {
    id: "p4",
    name: "GripFlow Tour Shoes",
    brand: "Padella Lab",
    category: "Shoes",
    price: 3200,
    rating: 4.8,
    reviews: 96,
    power: 60,
    control: 88,
    level: "Advanced",
    shape: "Low",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    colorway: "Sand / Neon",
    isNew: true,
  },
  {
    id: "p5",
    name: "Tour Pro Padel Bag",
    brand: "Padella Lab",
    category: "Bags",
    price: 2400,
    rating: 4.9,
    reviews: 73,
    power: 50,
    control: 80,
    level: "Intermediate",
    shape: "12-Racket",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    colorway: "Forest Green",
  },
  {
    id: "p6",
    name: "Match Balls (x3 Tube)",
    brand: "Volt",
    category: "Balls",
    price: 320,
    rating: 4.6,
    reviews: 420,
    power: 70,
    control: 70,
    level: "Beginner",
    shape: "Pressurized",
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=80",
    colorway: "Optic Yellow",
  },
];

export interface Ranked {
  rank: number;
  player: Player;
  points: number;
  trend: "up" | "down" | "same";
}

export const NATIONAL_RANKINGS: Ranked[] = [
  { rank: 1, player: PLAYERS[0], points: 9840, trend: "same" },
  { rank: 2, player: PLAYERS[3], points: 9120, trend: "up" },
  { rank: 3, player: PLAYERS[2], points: 8760, trend: "up" },
  { rank: 4, player: PLAYERS[1], points: 7980, trend: "down" },
  { rank: 5, player: PLAYERS[4], points: 6420, trend: "up" },
  { rank: 6, player: PLAYERS[5], points: 5980, trend: "same" },
];

export const PREMIUM_BENEFITS = [
  {
    title: "Advanced Player Matching",
    desc: "AI-weighted pairing on rating, style and availability so every match is competitive.",
    icon: "sparkles",
  },
  {
    title: "Exclusive Tournaments",
    desc: "Members-only brackets, seeded entries and priority registration windows.",
    icon: "trophy",
  },
  {
    title: "Coaching Content",
    desc: "Full-length pro masterclasses, drills library and personalized improvement paths.",
    icon: "graduation-cap",
  },
  {
    title: "Analytics Dashboard",
    desc: "Win-rate trends, shot tendencies, partner chemistry and performance forecasting.",
    icon: "line-chart",
  },
  {
    title: "VIP Events",
    desc: "Early access to launches, pro exhibitions and Padella member nights across Turkey.",
    icon: "star",
  },
  {
    title: "Concierge Booking",
    desc: "Priority court access and same-day reservations at 300+ partner clubs.",
    icon: "calendar-check",
  },
];

export const PREMIUM_TIERS = [
  {
    name: "Player",
    price: 0,
    period: "free forever",
    highlight: false,
    features: [
      "Public profile & rankings",
      "Join open matches",
      "Club discovery",
      "Basic stats",
    ],
    cta: "Current plan",
  },
  {
    name: "Pro",
    price: 199,
    period: "per month",
    highlight: true,
    features: [
      "Advanced matchmaking",
      "Full analytics dashboard",
      "Coaching masterclasses",
      "Priority court booking",
      "Exclusive tournaments",
    ],
    cta: "Go Pro",
  },
  {
    name: "Club / Brand",
    price: 0,
    period: "custom",
    highlight: false,
    features: [
      "Club management suite",
      "Tournament hosting tools",
      "Branded storefront",
      "Sponsorship & analytics",
    ],
    cta: "Contact sales",
  },
];

export const ACHIEVEMENTS = [
  { name: "Iron Streak", desc: "Win 5 matches in a row", rarity: "Rare", icon: "flame" },
  { name: "Centurion", desc: "Play 100 matches", rarity: "Epic", icon: "swords" },
  { name: "Smash Master", desc: "Land 1,000 winners", rarity: "Epic", icon: "zap" },
  { name: "Globetrotter", desc: "Play in 5 cities", rarity: "Rare", icon: "globe" },
  { name: "Podium", desc: "Reach a tournament final", rarity: "Legendary", icon: "trophy" },
  { name: "Mentor", desc: "Coach 10 beginners", rarity: "Rare", icon: "graduation-cap" },
];
