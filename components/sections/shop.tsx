"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, ArrowUpRight, Zap, Target } from "lucide-react";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/lib/data";
import { formatTRY } from "@/lib/utils";

function RatingBar({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Zap }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] text-sand/50">
        <span className="flex items-center gap-1">
          <Icon className="h-3 w-3" /> {label}
        </span>
        <span className="text-sand/70">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-forest-300 to-neon"
        />
      </div>
    </div>
  );
}

export function Shop() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const hero = PRODUCTS[0];
  const grid = PRODUCTS.slice(1, 5);

  const toggle = (id: string) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section id="shop" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-neon/10 blur-[140px]" />
      <div className="container-px relative">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Shop"
            title={
              <>
                Gear that <span className="neon-text">performs</span>
              </>
            }
            description="A curated pro shop — rackets, shoes and apparel with power & control ratings and skill recommendations."
          />
          <Reveal>
            <Button asChild variant="secondary">
              <Link href="/shop">
                Enter shop <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
          {/* hero product */}
          <Reveal y={40}>
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-forest-800/40 to-ink/60 p-8">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-neon/15 blur-3xl" />
              <Badge variant="neon" className="relative">New · {hero.shape}</Badge>
              <div className="relative mt-6 flex justify-center">
                <motion.div
                  animate={{ y: [0, -16, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-64 w-64"
                >
                  <Image
                    src={hero.image}
                    alt={hero.name}
                    fill
                    sizes="280px"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(201,255,61,0.2)]"
                  />
                </motion.div>
              </div>
              <div className="relative mt-6">
                <div className="text-xs uppercase tracking-widest text-sand/40">{hero.brand}</div>
                <h3 className="font-display text-2xl font-bold text-sand">{hero.name}</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <RatingBar label="Power" value={hero.power} icon={Zap} />
                  <RatingBar label="Control" value={hero.control} icon={Target} />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-neon">
                      {formatTRY(hero.price)}
                    </span>
                    {hero.oldPrice && (
                      <span className="text-sm text-sand/40 line-through">
                        {formatTRY(hero.oldPrice)}
                      </span>
                    )}
                  </div>
                  <Button variant="primary">Add to bag</Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* product grid */}
          <div className="grid grid-cols-2 gap-4">
            {grid.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all hover:border-neon/30">
                  <button
                    onClick={() => toggle(p.id)}
                    className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-ink/60 backdrop-blur transition-colors hover:border-neon/40"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        wishlist.has(p.id) ? "fill-neon text-neon" : "text-sand/60"
                      }`}
                    />
                  </button>
                  {p.isNew && (
                    <Badge variant="neon" className="absolute left-3 top-3 z-10">
                      New
                    </Badge>
                  )}
                  <div className="relative mx-auto mt-2 h-32 w-full">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="200px"
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-sand/40">
                        {p.brand}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-sand/60">
                        <Star className="h-3 w-3 fill-gold text-gold" /> {p.rating}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-semibold text-sand">{p.name}</h4>
                    <Badge variant="default" className="mt-1.5 text-[10px]">
                      {p.level}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display font-bold text-neon">{formatTRY(p.price)}</span>
                    <Button size="sm" variant="secondary">
                      View
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
