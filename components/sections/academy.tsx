"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlayCircle, Clock, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ARTICLES, ACADEMY_CATEGORIES } from "@/lib/data";

export function Academy() {
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const rest = ARTICLES.filter((a) => a.id !== featured.id).slice(0, 4);

  return (
    <section id="academy" className="relative py-28 md:py-36">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Academy"
            title={
              <>
                Read. Watch. <span className="neon-text">Improve.</span>
              </>
            }
            description="Pro technique breakdowns, gear reviews and training science — sports journalism for the padel obsessed."
          />
          <Reveal>
            <Button asChild variant="secondary">
              <Link href="/academy">
                Visit Academy <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* category chips */}
        <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
          {ACADEMY_CATEGORIES.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-sand/70 transition-colors hover:border-neon/40 hover:text-neon"
            >
              {c}
            </span>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* featured */}
          <motion.article
            initial={{ opacity: 0, y: 60, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-white/10"
          >
            <div className="relative h-[26rem] w-full overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex items-center gap-2">
                <Badge variant="neon">{featured.category}</Badge>
                {featured.video && (
                  <Badge variant="default">
                    <PlayCircle className="h-3 w-3" /> Video
                  </Badge>
                )}
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-sand">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm text-sand/60">{featured.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-sand/45">
                <span>{featured.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {featured.readTime}
                </span>
              </div>
            </div>
          </motion.article>

          {/* list */}
          <div className="flex flex-col gap-4">
            {rest.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl transition-all hover:border-neon/30 hover:bg-white/[0.05]"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="140px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {a.video && (
                    <span className="absolute inset-0 grid place-items-center bg-ink/30">
                      <PlayCircle className="h-7 w-7 text-sand/90" />
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <Badge variant="default" className="w-fit text-[10px]">
                    {a.category}
                  </Badge>
                  <h4 className="mt-1.5 font-display text-base font-semibold leading-snug text-sand">
                    {a.title}
                  </h4>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-sand/45">
                    <span>{a.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {a.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
