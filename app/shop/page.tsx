import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ShopGrid } from "@/components/views/shop-grid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "A premium padel pro shop — rackets, shoes, bags and apparel with power & control ratings.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        kicker="Pro Shop"
        title={
          <>
            Engineered to <span className="neon-text">win</span>
          </>
        }
        description="Every racket rated for power and control, with skill recommendations and pro reviews. Free returns, member pricing."
      />
      <ShopGrid />
    </>
  );
}
