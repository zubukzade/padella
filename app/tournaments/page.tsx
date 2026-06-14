import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Tournaments } from "@/components/sections/tournaments";
import { Bracket } from "@/components/views/bracket";

export const metadata: Metadata = {
  title: "Tournaments",
  description:
    "Live brackets, leaderboards and prize pools from Turkey's biggest padel tournaments.",
};

export default function TournamentsPage() {
  return (
    <>
      <PageHeader
        kicker="Tournaments Hub"
        title={
          <>
            Where champions <span className="neon-text">are made</span>
          </>
        }
        description="Follow live brackets, track rankings and register for tournaments across every category and city."
      />
      <Tournaments />
      <section className="container-px pb-24">
        <h2 className="mb-8 font-display text-2xl font-bold text-sand">
          Padella Masters İstanbul · Quarterfinals
        </h2>
        <Bracket />
      </section>
    </>
  );
}
