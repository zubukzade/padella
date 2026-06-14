import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PlayerCard } from "@/components/cards/player-card";
import { MatchFinder } from "@/components/sections/match-finder";
import { Reveal } from "@/components/primitives/reveal";
import { PLAYERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Meet the players, find your partners and join the fastest-growing padel community in Turkey.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        kicker="Community"
        title={
          <>
            Find your <span className="neon-text">people</span>
          </>
        }
        description="Premium player profiles, skill levels, rankings and achievements — connect with padel players in every Turkish city."
      />

      <section className="container-px py-12">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-sand">Featured players</h2>
          <span className="text-sm text-sand/45">{PLAYERS.length} of 48,200+ members</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLAYERS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <PlayerCard player={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <MatchFinder />
    </>
  );
}
