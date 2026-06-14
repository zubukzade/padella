import { Hero } from "@/components/sections/hero";
import { Community } from "@/components/sections/community";
import { Clubs } from "@/components/sections/clubs";
import { MatchFinder } from "@/components/sections/match-finder";
import { Tournaments } from "@/components/sections/tournaments";
import { Academy } from "@/components/sections/academy";
import { Shop } from "@/components/sections/shop";
import { Rankings } from "@/components/sections/rankings";
import { Premium } from "@/components/sections/premium";

const MARQUEE = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bodrum",
  "Bursa",
  "Adana",
  "Eskişehir",
  "Trabzon",
  "Gaziantep",
];

function CityMarquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative border-y border-white/10 bg-ink/60 py-5">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {items.map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-xl font-bold uppercase tracking-tight text-sand/30"
            >
              {c}
              <span className="h-1.5 w-1.5 rounded-full bg-neon/50" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CityMarquee />
      <Community />
      <Clubs />
      <MatchFinder />
      <Tournaments />
      <Academy />
      <Shop />
      <Rankings />
      <Premium />
    </>
  );
}
