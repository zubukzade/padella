"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticleCanvasProps {
  className?: string;
  /** particles per 100k px² (density). Default 0.9 */
  density?: number;
  color?: string;
  lineColor?: string;
  maxParticles?: number;
  connect?: boolean;
  speed?: number;
}

/**
 * Lightweight constellation particle field on a 2D canvas.
 * - caps particle count, pauses when offscreen, respects reduced-motion
 * - DPR-aware for crisp rendering
 */
export function ParticleCanvas({
  className,
  density = 0.9,
  color = "rgba(201,255,61,0.7)",
  lineColor = "rgba(201,255,61,0.12)",
  maxParticles = 90,
  connect = true,
  speed = 0.25,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    // non-null typed so narrowing survives inside the rAF closures
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let raf = 0;
    let visible = true;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        maxParticles,
        Math.round((w * h) / 100000 * density * 100)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.6 + 0.5,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (connect) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = dx * dx + dy * dy;
            if (dist < 13000) {
              ctx.beginPath();
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 1;
              ctx.globalAlpha = 1 - dist / 13000;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    if (reduce) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [density, color, lineColor, maxParticles, connect, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
