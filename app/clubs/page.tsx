import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ClubsDirectory } from "@/components/views/clubs-directory";

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "Discover and book 312+ padel clubs across Turkey. Filter by city, surface and amenities.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        kicker="Club Directory"
        title={
          <>
            Find your <span className="neon-text">court</span>
          </>
        }
        description="312 partner clubs across Turkey — panoramic glass courts, rooftop venues and resort-grade academies. Search, filter and book."
      />
      <ClubsDirectory />
    </>
  );
}
