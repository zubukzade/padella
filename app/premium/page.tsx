import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Premium } from "@/components/sections/premium";
import { Reveal } from "@/components/primitives/reveal";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Padella Premium — advanced matchmaking, analytics, pro coaching content and VIP access.",
};

const FAQ = [
  {
    q: "What do I get with Padella Pro?",
    a: "Advanced matchmaking, a full analytics dashboard, pro coaching masterclasses, priority court booking and entry to members-only tournaments.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Pro is month-to-month with no commitment — cancel from your dashboard whenever you like and keep access until the period ends.",
  },
  {
    q: "Do you offer plans for clubs and brands?",
    a: "Absolutely. Our Club / Brand plan includes management tools, tournament hosting, a branded storefront and sponsorship analytics. Contact sales for a custom quote.",
  },
  {
    q: "Is there a student or family discount?",
    a: "We offer seasonal student pricing and family bundles. Look out for member nights and early-access promotions throughout the year.",
  },
];

export default function PremiumPage() {
  return (
    <>
      <PageHeader
        kicker="Padella Premium"
        title={
          <>
            The <span className="bg-gradient-to-b from-gold-light to-gold-deep bg-clip-text text-transparent">elite</span> tier
          </>
        }
        description="Everything you need to train smarter, play more and compete at the highest level — wrapped in a premium membership experience."
      />
      <Premium />

      <section className="container-px pb-28">
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold text-sand">
          Questions, answered
        </h2>
        <div className="mx-auto grid max-w-3xl gap-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <h3 className="font-display text-base font-semibold text-sand">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand/55">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
