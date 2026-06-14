"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Radio, Calendar, ArrowUpRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOURNAMENTS, NATIONAL_RANKINGS } from "@/lib/data";
import { formatTRY } from "@/lib/utils";

const TABS = [
  { key: "live", label: "Live", icon: Radio },
  { key: "upcoming", label: "Upcoming", icon: Calendar },
  { key: "completed", label: "Completed", icon: Trophy },
] as const;

export function Tournaments() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("live");
  const list = TOURNAMENTS.filter((t) => t.status === tab);

  return (
    <section id="tournaments" className="relative overflow-hidden py-28 md:py-36">
      {/* arena lighting */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-neon/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-10 h-72 w-72 rounded-full bg-forest-400/20 blur-[120px]" />

      <div className="container-px relative">
        <SectionHeading
          align="center"
          kicker="Tournaments"
          title={
            <>
              Step into <span className="neon-text">the arena</span>
            </>
          }
          description="Live brackets, esports-style leaderboards and prize pools across Turkey's biggest padel events."
        />

        {/* tabs */}
        <Reveal className="mt-10 flex justify-center">
          <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    active ? "text-[#06120b]" : "text-sand/60 hover:text-sand"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="tour-tab"
                      className="absolute inset-0 rounded-full bg-neon"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* tournament cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((t, i) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="(max-width:768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    {t.status === "live" && (
                      <Badge variant="live" className="absolute left-3 top-3">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                        LIVE
                      </Badge>
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs text-sand/80 backdrop-blur">
                      {t.teams} teams
                    </span>
                  </div>
                  <div className="p-5">
                    <Badge variant="neon" className="mb-2">{t.category}</Badge>
                    <h3 className="font-display text-lg font-semibold text-sand">{t.name}</h3>
                    <p className="mt-1 text-xs text-sand/50">
                      {t.club} · {t.city} · {t.date}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-sand/40">
                          Prize pool
                        </div>
                        <div className="font-display text-lg font-bold text-neon">
                          {formatTRY(t.prize)}
                        </div>
                      </div>
                      <Button size="sm" variant="secondary">
                        {t.status === "completed" ? "Results" : "View"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* live leaderboard */}
          <Reveal y={40}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-forest-800/40 to-ink/40 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-sand">
                  National Leaderboard
                </h3>
                <Link href="/rankings" className="text-xs text-neon hover:underline">
                  Full rankings
                </Link>
              </div>
              <div className="flex flex-col gap-1.5">
                {NATIONAL_RANKINGS.map((r, i) => {
                  const Trend =
                    r.trend === "up" ? TrendingUp : r.trend === "down" ? TrendingDown : Minus;
                  const trendColor =
                    r.trend === "up"
                      ? "text-neon"
                      : r.trend === "down"
                        ? "text-red-400"
                        : "text-sand/40";
                  return (
                    <motion.div
                      key={r.player.id}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-neon/20"
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold ${
                          i === 0
                            ? "bg-gold/20 text-gold"
                            : i < 3
                              ? "bg-neon/15 text-neon"
                              : "bg-white/5 text-sand/60"
                        }`}
                      >
                        {r.rank}
                      </span>
                      <Image
                        src={r.player.avatar}
                        alt={r.player.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-sand">
                          {r.player.name}
                        </div>
                        <div className="text-[10px] text-sand/45">{r.player.city}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-sm font-bold text-sand">
                          {r.points.toLocaleString()}
                        </div>
                        <Trend className={`ml-auto h-3 w-3 ${trendColor}`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-3 w-full">
                <Link href="/tournaments">
                  Explore all tournaments <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
