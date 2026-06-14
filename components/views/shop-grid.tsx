"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/cards/product-card";
import { PRODUCTS, SHOP_CATEGORIES } from "@/lib/data";

export function ShopGrid() {
  const [cat, setCat] = useState("All");
  const cats = ["All", ...SHOP_CATEGORIES];
  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <section className="container-px py-12">
      <div className="mask-fade-x mb-8 flex gap-2 overflow-x-auto pb-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              cat === c
                ? "border-neon bg-neon text-[#06120b]"
                : "border-white/12 bg-white/[0.04] text-sand/70 hover:border-white/25"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sand/50">
          No products in this category yet — check back soon.
        </p>
      )}
    </section>
  );
}
