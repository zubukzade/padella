"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Trophy,
  Activity,
  Flame,
  Calendar,
  Heart,
  Package,
  ChevronRight,
  Crown,
} from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLAYERS, MATCHES, CLUBS, PRODUCTS } from "@/lib/data";
import { formatTRY } from "@/lib/utils";

const me = PLAYERS[0];
const FORM = [62, 58, 70, 65, 78, 74, 85, 90]; // win % over weeks

const KPIS = [
  { label: "Win rate", value: "84%", icon: TrendingUp, trend: "+6% this month" },
  { label: "Matches", value: "259", icon: Activity, trend: "+12 this month" },
  { label: "National rank", value: "#1", icon: Trophy, trend: "Held 4 weeks" },
  { label: "Current streak", value: "9", icon: Flame, trend: "Personal best" },
];

export function Dashboard() {
  return (
    <div className="container-px pb-24 pt-32 md:pt-40">
      {/* header */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-forest-700/50 via-ink to-ink p-6 md:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-neon/15 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-neon/50 to-gold/40" />
                <Image
                  src={me.avatar}
                  alt={me.name}
                  width={80}
                  height={80}
                  className="relative h-20 w-20 rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-extrabold text-sand">{me.name}</h1>
                  <Badge variant="gold"><Crown className="h-3 w-3" /> Pro</Badge>
                </div>
                <div className="mt-1 text-sm text-sand/55">
                  {me.city} · {me.club}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="neon">{me.level}</Badge>
                  <span className="text-xs text-sand/60">Rating <b className="text-neon">{me.rating}</b></span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Edit profile</Button>
              <Button variant="primary" size="sm">Find a match</Button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.06}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <k.icon className="mb-3 h-5 w-5 text-neon" />
              <div className="font-display text-3xl font-extrabold text-sand">{k.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-sand/45">{k.label}</div>
              <div className="mt-2 text-[11px] text-neon">{k.trend}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* performance + matches */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-sand">Performance</h2>
                <span className="text-xs text-sand/45">Win % · last 8 weeks</span>
              </div>
              <div className="flex h-44 items-end gap-2">
                {FORM.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-forest-400 to-neon"
                    />
                    <span className="text-[10px] text-sand/40">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-sand">
                  <Calendar className="h-4 w-4 text-neon" /> Upcoming matches
                </h2>
                <Link href="/community#match-finder" className="text-xs text-neon hover:underline">
                  Find more
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {MATCHES.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-sand">{m.club}</div>
                      <div className="text-xs text-sand/45">{m.date} · {m.time} · {m.city}</div>
                    </div>
                    <Badge variant="neon">{m.level}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* sidebar: clubs + orders */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-sand">
                <Heart className="h-4 w-4 text-neon" /> Favorite clubs
              </h2>
              <div className="flex flex-col gap-3">
                {CLUBS.slice(0, 3).map((c) => (
                  <Link
                    key={c.id}
                    href={`/clubs#${c.id}`}
                    className="group flex items-center gap-3"
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-sand">{c.name}</div>
                      <div className="text-xs text-sand/45">{c.city}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-sand/30 transition-colors group-hover:text-neon" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-sand">
                <Package className="h-4 w-4 text-neon" /> Recent orders
              </h2>
              <div className="flex flex-col gap-3">
                {PRODUCTS.slice(0, 2).map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-xl bg-white/5 object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-sand">{p.name}</div>
                      <div className="text-xs text-sand/45">Delivered</div>
                    </div>
                    <span className="text-sm font-semibold text-neon">{formatTRY(p.price)}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
