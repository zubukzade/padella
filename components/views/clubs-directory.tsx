"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List } from "lucide-react";
import { ClubCard } from "@/components/cards/club-card";
import { CLUBS } from "@/lib/data";

const CITIES = ["All", "İstanbul", "İzmir", "Antalya", "Bursa", "Bodrum"];
const SURFACES = ["All", "Indoor", "Outdoor"];

export function ClubsDirectory() {
  const [city, setCity] = useState("All");
  const [surface, setSurface] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = CLUBS.filter((c) => {
    const cityOk = city === "All" || c.city === city;
    const surfaceOk =
      surface === "All" ||
      (surface === "Indoor" ? c.indoor : !c.indoor);
    const queryOk =
      query.trim() === "" ||
      `${c.name} ${c.city} ${c.district}`.toLowerCase().includes(query.toLowerCase());
    return cityOk && surfaceOk && queryOk;
  });

  return (
    <section className="container-px py-12">
      {/* controls */}
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink/40 px-4 lg:w-72">
          <Search className="h-4 w-4 text-sand/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clubs or cities…"
            className="h-10 w-full bg-transparent text-sm text-sand outline-none placeholder:text-sand/40"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                city === c
                  ? "border-neon bg-neon text-[#06120b]"
                  : "border-white/12 bg-white/[0.04] text-sand/70 hover:border-white/25"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-white/10" />
          {SURFACES.map((s) => (
            <button
              key={s}
              onClick={() => setSurface(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                surface === s
                  ? "border-neon/60 bg-neon/10 text-neon"
                  : "border-white/12 bg-white/[0.04] text-sand/70 hover:border-white/25"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-sand/45">
          {filtered.length} club{filtered.length !== 1 ? "s" : ""} found
        </span>
        <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-neon/15 text-neon">
            <LayoutGrid className="h-4 w-4" />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full text-sand/40">
            <List className="h-4 w-4" />
          </span>
        </div>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((club, i) => (
          <motion.div
            key={club.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <ClubCard club={club} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
