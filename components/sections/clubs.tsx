"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowUpRight, LayoutGrid } from "lucide-react";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CITY_NODES, CLUBS } from "@/lib/data";

const LNG = [25.5, 45.5];
const LAT = [35.2, 42.6];
function project(lng: number, lat: number) {
  const x = ((lng - LNG[0]) / (LNG[1] - LNG[0])) * 100;
  const y = ((LAT[1] - lat) / (LAT[1] - LAT[0])) * 100;
  return { x, y };
}

function TurkeyMap() {
  const [active, setActive] = useState<string | null>("İstanbul");
  const node = CITY_NODES.find((c) => c.city === active);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-forest-900/40 p-4 backdrop-blur-xl">
      {/* dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201,255,61,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-forest-500/10 to-transparent" />

      {/* faint region outline */}
      <div className="pointer-events-none absolute inset-[12%] rounded-[40%_30%_45%_35%] border border-dashed border-neon/15" />

      <span className="absolute left-5 top-4 text-xs font-semibold uppercase tracking-[0.3em] text-sand/40">
        Türkiye
      </span>

      {/* connection lines */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {CITY_NODES.slice(1, 6).map((c) => {
          const a = project(CITY_NODES[0].lng, CITY_NODES[0].lat);
          const b = project(c.lng, c.lat);
          return (
            <line
              key={c.city}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="rgba(201,255,61,0.18)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          );
        })}
      </svg>

      {/* city nodes */}
      {CITY_NODES.map((c) => {
        const { x, y } = project(c.lng, c.lat);
        const isActive = active === c.city;
        return (
          <button
            key={c.city}
            onMouseEnter={() => setActive(c.city)}
            onFocus={() => setActive(c.city)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={c.city}
          >
            <span
              className={`block rounded-full transition-all ${
                isActive ? "h-3.5 w-3.5 bg-neon" : "h-2.5 w-2.5 bg-neon/60"
              }`}
            />
            {isActive && (
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-neon/40" />
            )}
            <span
              className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium transition-colors ${
                isActive ? "text-neon" : "text-sand/50 group-hover:text-sand"
              }`}
            >
              {c.city}
            </span>
          </button>
        );
      })}

      {/* active city card */}
      <AnimatePresence mode="wait">
        {node && (
          <motion.div
            key={node.city}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-ink/80 p-4 backdrop-blur-xl"
          >
            <div className="text-sm font-semibold text-sand">{node.city}</div>
            <div className="mt-1 flex gap-4 text-xs text-sand/55">
              <span>
                <span className="text-neon">{node.players.toLocaleString()}</span> players
              </span>
              <span>
                <span className="text-neon">{node.clubs}</span> clubs
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Clubs() {
  return (
    <section id="clubs" className="relative py-28 md:py-36">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Clubs"
            title={
              <>
                Discover every court
                <br />
                <span className="neon-text">across Turkey</span>
              </>
            }
            description="312 partner clubs and counting. Filter by city, surface and amenities — then book in two taps."
          />
          <Reveal>
            <Button asChild variant="secondary">
              <Link href="/clubs">
                <LayoutGrid className="h-4 w-4" /> Full directory
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal y={40}>
            <TurkeyMap />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {CLUBS.slice(0, 3).map((club, i) => (
              <Reveal key={club.id} delay={i * 0.08}>
                <Link
                  href={`/clubs#${club.id}`}
                  className="group flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl transition-all hover:border-neon/30 hover:bg-white/[0.05]"
                >
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={club.image}
                      alt={club.name}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-base font-semibold text-sand">
                          {club.name}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-sand/30 transition-colors group-hover:text-neon" />
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-sand/50">
                        <MapPin className="h-3 w-3" /> {club.district}, {club.city}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <Badge variant="neon">{club.courts} courts</Badge>
                      <span className="flex items-center gap-1 text-sand/70">
                        <Star className="h-3 w-3 fill-gold text-gold" /> {club.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
