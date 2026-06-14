"use client";

import Link from "next/link";
import { ArrowUpRight, Activity, Users, Building2, Swords } from "lucide-react";
import { GlobeCanvas } from "@/components/visuals/globe-canvas";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { Counter } from "@/components/primitives/counter";
import { Button } from "@/components/ui/button";
import { HERO_STATS } from "@/lib/data";

const ICONS = [Users, Building2, Swords, Activity];

export function Community() {
  return (
    <section id="community" className="relative overflow-hidden py-28 md:py-36">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest-500/20 blur-[140px]" />

      <div className="container-px relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Community"
            title={
              <>
                The Fastest Growing
                <br />
                <span className="neon-text">Padel Community</span>
              </>
            }
            description="From İstanbul rooftops to Antalya's coast — Padella connects every player, club and court in Turkey into one living network."
          />

          <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {HERO_STATS.map((s, i) => {
              const Icon = ICONS[i] ?? Users;
              return (
                <RevealItem key={s.label}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-neon/30">
                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-neon/10 blur-2xl transition-opacity group-hover:opacity-100" />
                    <Icon className="mb-4 h-5 w-5 text-neon" />
                    <div className="font-display text-3xl font-extrabold text-sand md:text-4xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-sand/45">
                      {s.label}
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-8">
            <Button asChild variant="primary">
              <Link href="/community">
                Explore the community <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* globe */}
        <Reveal y={40}>
          <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
            <div className="absolute inset-0 rounded-full bg-neon-radial" />
            <GlobeCanvas />
            {/* orbiting label chips */}
            <div className="pointer-events-none absolute left-[8%] top-[18%] rounded-full border border-white/10 bg-ink/70 px-3 py-1 text-xs text-sand/80 backdrop-blur-md">
              📍 İstanbul · 14.2k players
            </div>
            <div className="pointer-events-none absolute bottom-[20%] right-[6%] rounded-full border border-white/10 bg-ink/70 px-3 py-1 text-xs text-sand/80 backdrop-blur-md">
              📍 İzmir · 5.4k players
            </div>
            <div className="pointer-events-none absolute bottom-[8%] left-[24%] rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs text-neon backdrop-blur-md">
              + new player joining
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
