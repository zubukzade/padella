"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Users2, Plus } from "lucide-react";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MATCHES, PLAYERS, type SkillLevel } from "@/lib/data";

const LEVELS: (SkillLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced", "Pro"];
const CITIES = ["All", "İstanbul", "İzmir", "Antalya"];

function MatchNetwork() {
  // decorative floating player spheres + connections
  const avatars = PLAYERS.slice(0, 6);
  const positions = [
    { x: 20, y: 18 },
    { x: 70, y: 12 },
    { x: 50, y: 42 },
    { x: 14, y: 64 },
    { x: 82, y: 60 },
    { x: 44, y: 84 },
  ];
  return (
    <div className="relative aspect-square w-full max-w-[30rem]">
      <div className="absolute inset-0 rounded-full bg-neon-radial" />
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {positions.map((a, i) =>
          positions.slice(i + 1).map((b, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="rgba(201,255,61,0.18)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: (i + j) * 0.06 }}
            />
          ))
        )}
      </svg>
      {avatars.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-neon/20 blur-md" />
            <Image
              src={p.avatar}
              alt={p.name}
              width={56}
              height={56}
              className="relative h-12 w-12 rounded-full border-2 border-neon/40 object-cover md:h-14 md:w-14"
            />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/80 px-1.5 py-0.5 text-[9px] text-neon backdrop-blur">
              {p.rating}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MatchFinder() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [city, setCity] = useState("All");

  const filtered = MATCHES.filter(
    (m) =>
      (level === "All" || m.level === level) &&
      (city === "All" || m.city === city)
  );

  return (
    <section id="match-finder" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-neon/10 blur-[130px]" />
      <div className="container-px relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 lg:order-1">
          <Reveal>
            <div className="mx-auto hidden lg:block">
              <MatchNetwork />
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            kicker="Match Finder"
            title={
              <>
                Never play
                <br />
                <span className="neon-text">a player short</span>
              </>
            }
            description="Smart matchmaking pairs you on skill, city and availability. Find an open match tonight."
          />

          {/* filters */}
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  level === l
                    ? "border-neon bg-neon text-[#06120b]"
                    : "border-white/12 bg-white/[0.04] text-sand/70 hover:border-white/25"
                }`}
              >
                {l}
              </button>
            ))}
            <span className="mx-1 w-px self-stretch bg-white/10" />
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  city === c
                    ? "border-neon/60 bg-neon/10 text-neon"
                    : "border-white/12 bg-white/[0.04] text-sand/70 hover:border-white/25"
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>

          {/* match cards */}
          <div className="mt-6 flex flex-col gap-3">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-sand/50">
                No open matches for those filters — try widening your search.
              </p>
            )}
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-colors hover:border-neon/30"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="neon">{m.level}</Badge>
                    <span className="truncate text-sm font-semibold text-sand">
                      {m.club}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sand/55">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {m.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {m.date} · {m.time}
                    </span>
                    <span className="flex items-center gap-1 text-neon">
                      <Users2 className="h-3 w-3" /> {m.spotsLeft} spot
                      {m.spotsLeft > 1 ? "s" : ""} left
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <div className="hidden -space-x-2 sm:flex">
                    {m.players.map((p, idx) => (
                      <Image
                        key={idx}
                        src={p.avatar}
                        alt={p.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full border-2 border-ink object-cover"
                      />
                    ))}
                    <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-dashed border-neon/40 bg-ink text-neon">
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <Button size="sm" variant="primary">
                    Join
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
