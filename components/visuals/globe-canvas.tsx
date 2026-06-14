"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Rotating particle globe rendered on a 2D canvas — a glowing point-sphere
 * with illuminated "player" nodes and dynamic connection arcs.
 * Performant: single rAF, DPR-aware, pauses offscreen, reduced-motion safe.
 */
export function GlobeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    // non-null typed so narrowing survives inside the rAF closures
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0,
      h = 0,
      raf = 0,
      rot = 0,
      visible = true;

    // fibonacci sphere points
    const N = 720;
    const pts: { x: number; y: number; z: number; node: boolean }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        node: Math.random() < 0.05,
      });
    }
    const nodes = pts.filter((p) => p.node);

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
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.42;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);

      // projected node screen positions for arcs
      const proj: { sx: number; sy: number; depth: number }[] = [];

      for (const p of pts) {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        const sx = cx + x * radius;
        const sy = cy + p.y * radius;
        const depth = (z + 1) / 2; // 0 back .. 1 front
        const size = p.node ? 1.6 + depth * 2.4 : 0.6 + depth * 1.2;
        const alpha = p.node ? 0.4 + depth * 0.6 : 0.12 + depth * 0.4;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        if (p.node) {
          ctx.fillStyle = `rgba(201,255,61,${alpha})`;
          if (depth > 0.55) {
            ctx.shadowColor = "rgba(201,255,61,0.8)";
            ctx.shadowBlur = 8;
          }
        } else {
          ctx.fillStyle = `rgba(180,220,170,${alpha * 0.5})`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.node) proj.push({ sx, sy, depth });
      }

      // connection arcs between front-facing nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < proj.length; i++) {
        if (proj[i].depth < 0.5) continue;
        for (let j = i + 1; j < proj.length; j++) {
          if (proj[j].depth < 0.5) continue;
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const d = Math.hypot(dx, dy);
          if (d < radius * 0.55) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201,255,61,${0.18 * (1 - d / (radius * 0.55))})`;
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      if (!reduce) rot += 0.0025;
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    if (!reduce) raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
