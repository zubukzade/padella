import type { Metadata } from "next";
import Image from "next/image";
import { Clock, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Academy } from "@/components/sections/academy";
import { Reveal } from "@/components/primitives/reveal";
import { Badge } from "@/components/ui/badge";
import { ARTICLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Technique breakdowns, equipment reviews, training science and padel news from the Padella Academy.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHeader
        kicker="Academy"
        title={
          <>
            Level up your <span className="neon-text">game</span>
          </>
        }
        description="Modern sports journalism for padel — pro technique, gear science, training plans and the stories shaping the game in Turkey."
      />
      <Academy />

      <section className="container-px pb-24">
        <h2 className="mb-8 font-display text-2xl font-bold text-sand">All articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all hover:border-neon/30">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <Badge variant="neon" className="absolute left-3 top-3">{a.category}</Badge>
                  {a.video && (
                    <span className="absolute inset-0 grid place-items-center">
                      <PlayCircle className="h-10 w-10 text-sand/90" />
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-sand">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-sand/55">{a.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-[11px] text-sand/45">
                    <span>{a.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {a.readTime}
                    </span>
                    <span className="ml-auto">{a.date}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
