"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, Flame, Swords, Zap, Globe, GraduationCap, Trophy, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { NATIONAL_RANKINGS, ACHIEVEMENTS } from "@/lib/data";

const ACH_ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  swords: Swords,
  zap: Zap,
  globe: Globe,
  trophy: Trophy,
  "graduation-cap": GraduationCap,
};

const RARITY: Record<string, string> = {
  Rare: "from-forest-300/30 to-forest-500/10 text-forest-100 border-forest-300/30",
  Epic: "from-neon/20 to-neon/5 text-neon border-neon/30",
  Legendary: "from-gold/25 to-gold/5 text-gold-light border-gold/40",
};

export function Rankings() {
  const podium = NATIONAL_RANKINGS.slice(0, 3);
  const order = [podium[1], podium[0], podium[2]]; // 2nd, 1st, 3rd
  const heights = ["h-28", "h-40", "h-20"];

  return (
    <section id="rankings" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />
      <div className="container-px relative">
        <SectionHeading
          align="center"
          kicker="Rankings"
          title={
            <>
              The <span className="neon-text">hall of fame</span>
            </>
          }
          description="National, city and club leaderboards updated live. Climb the ranks, earn badges, make history."
        />

        {/* podium */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 items-end gap-3 sm:gap-6">
          {order.map((r, i) => {
            const isFirst = r.rank === 1;
            return (
              <motion.div
                key={r.player.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  {isFirst && (
                    <Crown className="absolute -top-7 left-1/2 h-6 w-6 -translate-x-1/2 text-gold" />
                  )}
                  <div
                    className={`relative rounded-full p-1 ${
                      isFirst ? "bg-gradient-to-b from-gold to-gold-deep" : "bg-white/10"
                    }`}
                  >
                    <Image
                      src={r.player.avatar}
                      alt={r.player.name}
                      width={isFirst ? 88 : 64}
                      height={isFirst ? 88 : 64}
                      className={`rounded-full object-cover ${
                        isFirst ? "h-20 w-20" : "h-16 w-16"
                      }`}
                    />
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm font-semibold text-sand">{r.player.name}</div>
                  <div className="text-[11px] text-sand/45">{r.player.city}</div>
                  <div className="mt-1 font-display text-sm font-bold text-neon">
                    {r.points.toLocaleString()} pts
                  </div>
                </div>
                <div
                  className={`mt-3 w-full rounded-t-2xl border border-b-0 border-white/10 bg-gradient-to-b ${
                    isFirst ? "from-gold/20 to-transparent" : "from-white/[0.06] to-transparent"
                  } ${heights[i]} grid place-items-start justify-center pt-3`}
                >
                  <span
                    className={`font-display text-3xl font-extrabold ${
                      isFirst ? "text-gold" : "text-sand/40"
                    }`}
                  >
                    {r.rank}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* rest of leaderboard */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-2">
          {NATIONAL_RANKINGS.slice(3).map((r, i) => (
            <Reveal key={r.player.id} delay={i * 0.05}>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-colors hover:border-neon/20">
                <span className="w-6 text-center font-display font-bold text-sand/50">
                  {r.rank}
                </span>
                <Image
                  src={r.player.avatar}
                  alt={r.player.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-sand">{r.player.name}</div>
                  <div className="text-[11px] text-sand/45">
                    {r.player.club} · {r.player.level}
                  </div>
                </div>
                <div className="text-right text-xs text-sand/50">
                  <span className="text-neon">{Math.round((r.player.wins / (r.player.wins + r.player.losses)) * 100)}%</span> win
                </div>
                <div className="font-display font-bold text-sand">
                  {r.points.toLocaleString()}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* achievement badges */}
        <div className="mt-16">
          <Reveal>
            <h3 className="mb-6 text-center font-display text-lg font-semibold text-sand">
              Achievement Badges
            </h3>
          </Reveal>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a, i) => {
              const Icon = ACH_ICONS[a.icon] ?? Trophy;
              return (
                <Reveal key={a.name} delay={i * 0.05}>
                  <div
                    className={`flex items-center gap-3 rounded-2xl border bg-gradient-to-br p-3 backdrop-blur-xl ${
                      RARITY[a.rarity] ?? RARITY.Rare
                    }`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/40">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{a.name}</div>
                      <div className="truncate text-[11px] opacity-70">{a.desc}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="primary">
            <Link href="/rankings">See full rankings</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
