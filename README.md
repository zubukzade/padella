# Padella — Turkey's Home for Padel 🎾

A futuristic, premium sports-tech web platform: the digital home of padel in Turkey.
Built as a cinematic, venture-style product experience — Apple/Nike/Stripe/Red Bull energy with a real-time 3D hero, smooth-scroll storytelling, and a full multi-page ecosystem (community, clubs, tournaments, academy, shop, rankings, premium, dashboard).

> **Play. Connect. Compete.**

---

## ✨ Tech stack

| Area | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router) + **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v3** + custom design tokens |
| UI primitives | shadcn-style **Button / Card / Badge** (hand-rolled, zero Radix) |
| Animation | **Framer Motion** + **GSAP** (available) |
| 3D / WebGL | **Three.js** + **React Three Fiber** + **Drei** |
| Smooth scroll | **Lenis** |
| Icons | **lucide-react** |

The 3D is **targeted**: a real React Three Fiber hero scene (floating padel racket that tracks the cursor, glowing rim, particle field, energy rings, exploded-view-on-scroll), while the rest of the experience uses high-performance Canvas 2D (particle globe, constellation fields) + Framer Motion for buttery 60fps on every device.

---

## 🎨 Brand system

| Token | Value |
| --- | --- |
| Deep Forest Green | `#0F3D2E` |
| Black (ink) | `#050505` |
| Sand Beige | `#F6F2EA` |
| Neon Yellow-Green | `#C9FF3D` |
| Gold (premium) | `#E8C879` |

Dark premium theme, frosted glass surfaces, neon glow, gold-accented premium tier, editorial display type (**Sora**) + clean body (**Inter**).

---

## 🚀 Getting started

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev
# → http://localhost:3000

# 3. production build
npm run build
npm run start
```

Requires **Node 18.18+** (Node 20/22 recommended).

> Fonts (Inter + Sora) are pulled via `next/font/google` on first build, so the first
> `npm run dev` / `npm run build` needs network access.

---

## 🗺️ Routes

| Route | What's there |
| --- | --- |
| `/` | Cinematic landing — 3D hero + 8 scroll-driven sections + animated footer |
| `/community` | Player profiles (win rate, streak, badges) + Match Finder |
| `/clubs` | Full club directory with search + city/surface filters + interactive Turkey map |
| `/tournaments` | Live/Upcoming/Completed tabs, leaderboard, live bracket |
| `/academy` | Editorial article grid + categories + featured/video content |
| `/shop` | Premium pro-shop grid with power/control ratings + wishlist |
| `/rankings` | Hall-of-fame podium, national leaderboard, achievement badges |
| `/premium` | Gold-accented membership, pricing tiers, FAQ |
| `/dashboard` | SaaS + fitness-tracker member dashboard |

Mobile gets a glassmorphic **bottom nav** (Home / Community / Clubs / Tournaments / Shop / Profile).

---

## 📁 Project structure

```
app/
  layout.tsx            # fonts, Lenis provider, navbar, footer, mobile nav
  page.tsx              # landing page (composes all sections)
  globals.css           # design tokens, glass utilities, reduced-motion
  community|clubs|tournaments|academy|shop|rankings|premium|dashboard/page.tsx

components/
  three/                # R3F hero scene + procedural padel racket
  visuals/              # Canvas 2D particle field + particle globe
  sections/             # landing sections (hero, community, clubs, …, premium)
  views/                # interactive page views (directory, shop grid, dashboard, bracket)
  cards/                # reusable player / club / product cards
  layout/               # navbar, mobile-nav, footer, logo, page-header
  primitives/           # Reveal, Counter, SectionHeading, Magnetic
  providers/            # Lenis smooth-scroll provider
  ui/                   # Button, Card, Badge (shadcn-style)

lib/
  data.ts               # typed mock data (clubs, players, matches, tournaments, …)
  utils.ts              # cn(), number/currency formatting
```

---

## ⚙️ Notes on performance & accessibility

- **`prefers-reduced-motion`** is respected everywhere — Lenis, the 3D scene, and every Canvas animation fall back to static frames.
- Canvas animations **pause when offscreen** (IntersectionObserver) and are **DPR-capped**.
- The R3F hero is **dynamically imported with `ssr: false`** and capped DPR / `AdaptiveDpr`.
- Images use `next/image` with remote patterns configured for Unsplash.
- Semantic headings, focus-visible rings, and `aria-label`s on icon controls.

## 🔌 Replacing the mock data

Everything renders from `lib/data.ts` (fully typed). Swap those exports for your API/CMS calls — the component contracts stay identical.

---

_Crafted for the padel obsessed. Made in Türkiye 🇹🇷_
