"use client";

import { type ReactNode } from "react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {kicker && (
        <Reveal>
          <span className="kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tighter text-sand sm:text-5xl md:text-6xl text-balance">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-sand/60 md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
