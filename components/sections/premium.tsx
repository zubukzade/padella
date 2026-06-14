"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  GraduationCap,
  LineChart,
  Star,
  CalendarCheck,
  Check,
  Crown,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { PREMIUM_BENEFITS, PREMIUM_TIERS } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  trophy: Trophy,
  "graduation-cap": GraduationCap,
  "line-chart": LineChart,
  star: Star,
  "calendar-check": CalendarCheck,
};

export function Premium() {
  return (
    <section id="premium" className="relative overflow-hidden py-28 md:py-36">
      {/* gold ambience */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* left: badge + copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-gold-light">
                <Crown className="h-3.5 w-3.5" /> Padella Premium
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tighter text-sand sm:text-5xl md:text-6xl">
                Play like a{" "}
                <span className="bg-gradient-to-b from-gold-light to-gold-deep bg-clip-text text-transparent">
                  professional
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-sand/60">
                Unlock advanced matchmaking, full analytics, pro coaching content and
                VIP access to Turkey&apos;s most exclusive padel events.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {PREMIUM_BENEFITS.map((b, i) => {
                const Icon = ICONS[b.icon] ?? Sparkles;
                return (
                  <Reveal key={b.title} delay={i * 0.06}>
                    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-colors hover:border-gold/30">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-sand">{b.title}</div>
                        <div className="mt-0.5 text-xs leading-relaxed text-sand/50">
                          {b.desc}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* right: floating premium badge + pricing */}
          <div className="flex flex-col gap-6">
            <Reveal y={40}>
              <div className="relative mx-auto">
                <motion.div
                  animate={{ y: [0, -14, 0], rotateZ: [0, 1.5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative grid h-44 w-72 place-items-center overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/20 via-ink to-ink shadow-gold"
                >
                  <div className="absolute inset-0 bg-grain opacity-10" />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/30 blur-2xl" />
                  <div className="relative text-center">
                    <Crown className="mx-auto h-8 w-8 text-gold" />
                    <div className="mt-2 font-display text-xl font-extrabold tracking-tight text-sand">
                      PADELLA PRO
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-gold-light/80">
                      Member · 2026
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {PREMIUM_TIERS.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.08}>
                  <div
                    className={`relative flex h-full flex-col rounded-3xl border p-5 backdrop-blur-xl ${
                      tier.highlight
                        ? "border-gold/40 bg-gradient-to-b from-gold/10 to-ink shadow-gold"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {tier.highlight && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1a1304]">
                        Popular
                      </span>
                    )}
                    <div className="text-sm font-semibold text-sand">{tier.name}</div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-2xl font-extrabold text-sand">
                        {tier.price === 0 && tier.period === "custom"
                          ? "—"
                          : tier.price === 0
                            ? "Free"
                            : `₺${tier.price}`}
                      </span>
                    </div>
                    <div className="text-[11px] text-sand/45">{tier.period}</div>
                    <ul className="mt-4 flex flex-1 flex-col gap-2">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-sand/65">
                          <Check
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                              tier.highlight ? "text-gold" : "text-neon"
                            }`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={tier.highlight ? "gold" : "secondary"}
                      size="sm"
                      className="mt-5"
                    >
                      <Link href="/premium">{tier.cta}</Link>
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
