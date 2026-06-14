"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        if (ref.current) {
          const rounded = Math.round(latest);
          ref.current.textContent =
            prefix +
            (rounded >= 1000
              ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(rounded)
              : rounded.toString()) +
            suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, motionValue, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
