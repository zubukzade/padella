"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { ParticleCanvas } from "@/components/visuals/particle-canvas";

interface PageHeaderProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({ kicker, title, description, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-36 md:pt-44">
      <ParticleCanvas className="opacity-40" maxParticles={50} />
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-neon/10 blur-[130px]" />
      <div className="container-px relative">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="kicker"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
          {kicker}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tighter text-sand sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 max-w-2xl text-base text-sand/60 md:text-lg"
          >
            {description}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
