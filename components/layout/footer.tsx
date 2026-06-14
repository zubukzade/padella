"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Send, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { ParticleCanvas } from "@/components/visuals/particle-canvas";
import { Counter } from "@/components/primitives/counter";
import { HERO_STATS } from "@/lib/data";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Community", href: "/community" },
      { label: "Clubs", href: "/clubs" },
      { label: "Tournaments", href: "/tournaments" },
      { label: "Rankings", href: "/rankings" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Academy", href: "/academy" },
      { label: "Shop", href: "/shop" },
      { label: "Premium", href: "/premium" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <ParticleCanvas className="opacity-50" maxParticles={70} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-neon/10 blur-[120px]" />

      <div className="container-px relative z-10 py-20">
        {/* CTA band */}
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tighter text-sand sm:text-6xl">
            Ready to step on
            <br />
            <span className="neon-text">the court?</span>
          </h2>
          <p className="max-w-md text-sand/55">
            Join Turkey&apos;s fastest-growing padel community. Find players, book
            courts, and level up — all in one place.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] p-1.5 backdrop-blur-xl"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="h-11 flex-1 bg-transparent px-4 text-sm text-sand outline-none placeholder:text-sand/40"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-1.5 rounded-full bg-neon px-5 text-sm font-semibold text-[#06120b] transition-transform hover:scale-[1.02]"
            >
              Join <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* stats strip */}
        <div className="mb-16 grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:grid-cols-4">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-sand md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-sand/45">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* link columns */}
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-sand/50">
              The definitive digital ecosystem for padel players, clubs,
              tournaments and brands in Turkey.
            </p>
            <div className="flex gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-sand/70 transition-colors hover:border-neon/40 hover:text-neon"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sand/40">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-sand/65 transition-colors hover:text-sand"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-sand/40 md:flex-row">
          <p>© {new Date().getFullYear()} Padella. Crafted for the padel obsessed.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-sand/70">Privacy</Link>
            <Link href="#" className="hover:text-sand/70">Terms</Link>
            <Link href="#" className="hover:text-sand/70">Made in Türkiye 🇹🇷</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
