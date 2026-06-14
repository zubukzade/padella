import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Rankings } from "@/components/sections/rankings";

export const metadata: Metadata = {
  title: "Rankings",
  description:
    "National, city and club padel rankings updated live, with achievement badges and performance analytics.",
};

export default function RankingsPage() {
  return (
    <>
      <PageHeader
        kicker="Rankings"
        title={
          <>
            Climb the <span className="neon-text">ladder</span>
          </>
        }
        description="National, city, club and seasonal leaderboards. Track your rise, earn badges and study the analytics behind the best players in Turkey."
      />
      <Rankings />
    </>
  );
}
