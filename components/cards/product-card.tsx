"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, Zap, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/data";
import { formatTRY } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all hover:border-neon/30">
      <button
        onClick={() => setWished((v) => !v)}
        className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink/60 backdrop-blur transition-colors hover:border-neon/40"
        aria-label="Wishlist"
      >
        <Heart className={`h-4 w-4 transition-colors ${wished ? "fill-neon text-neon" : "text-sand/60"}`} />
      </button>
      {product.isNew && (
        <Badge variant="neon" className="absolute left-4 top-4 z-10">New</Badge>
      )}

      <div className="relative mx-auto mt-2 h-40 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="280px"
          className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-sand/40">{product.brand}</span>
        <span className="flex items-center gap-1 text-xs text-sand/60">
          <Star className="h-3 w-3 fill-gold text-gold" /> {product.rating}
          <span className="text-sand/35">({product.reviews})</span>
        </span>
      </div>
      <h3 className="mt-1 font-display text-lg font-semibold text-sand">{product.name}</h3>
      <div className="mt-1 flex items-center gap-2">
        <Badge variant="default" className="text-[10px]">{product.level}</Badge>
        <span className="text-[11px] text-sand/45">{product.shape} · {product.colorway}</span>
      </div>

      <div className="mt-4 space-y-2">
        <Meter label="Power" value={product.power} icon={Zap} />
        <Meter label="Control" value={product.control} icon={Target} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-neon">{formatTRY(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-sand/40 line-through">{formatTRY(product.oldPrice)}</span>
          )}
        </div>
        <Button size="sm" variant="primary">Add</Button>
      </div>
    </div>
  );
}

function Meter({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Zap }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] text-sand/50">
        <span className="flex items-center gap-1"><Icon className="h-3 w-3" /> {label}</span>
        <span className="text-sand/70">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-forest-300 to-neon"
        />
      </div>
    </div>
  );
}
