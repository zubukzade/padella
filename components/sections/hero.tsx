"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Users, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/primitives/counter";
import { HERO_STATS } from "@/lib/data";
import { scrollToId } from "@/components/providers/smooth-scroll";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/20 blur-[100px]" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full border border-neon/30" />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [show3D, setShow3D] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow3D(!reduce);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden"
    >
      {/* 3D / fallback layer */}
      <div className="absolute inset-0">
        {show3D ? <HeroScene progress={scrollYProgress} /> : <SceneSkeleton />}
      </div>

      {/* legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />

      {/* content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-px relative z-10 flex h-full flex-col items-center justify-center pt-16 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="kicker mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
          Türkiye · The Padel Movement
        </motion.span>

        <h1 className="display-hero text-[clamp(2.6rem,9vw,7.5rem)] text-sand">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            TURKEY&apos;S HOME
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            FOR <span className="neon-text">PADEL</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-6 text-lg font-medium tracking-wide text-sand/70 sm:text-2xl"
        >
          Play. Connect. Compete.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild variant="primary" size="lg">
            <Link href="/community">
              <Users className="h-4 w-4" /> Join Community
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/clubs">
              <MapPin className="h-4 w-4" /> Explore Clubs
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/community#match-finder">
              <Search className="h-4 w-4" /> Find Players
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* floating stat ticker */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{ opacity: textOpacity }}
        className="absolute inset-x-0 bottom-24 z-10 lg:bottom-10"
      >
        <div className="container-px">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-white/10 bg-ink/40 px-6 py-4 backdrop-blur-xl sm:justify-between">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-extrabold text-sand sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-sand/45 sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <button
        onClick={() => scrollToId("community")}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-sand/40 transition-colors hover:text-neon lg:flex"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
