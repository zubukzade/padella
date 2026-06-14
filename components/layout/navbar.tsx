"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-px">
        <nav
          className={cn(
            "mt-3 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "border border-white/10 bg-ink/70 shadow-glass backdrop-blur-2xl"
              : "border border-transparent bg-transparent"
          )}
        >
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active ? "text-sand" : "text-sand/60 hover:text-sand"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Sign in</Link>
            </Button>
            <Button asChild variant="gold" size="sm">
              <Link href="/premium">
                <Sparkles className="h-3.5 w-3.5" /> Go Premium
              </Link>
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-sand lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="container-px lg:hidden"
          >
            <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-ink/90 p-3 shadow-glass backdrop-blur-2xl">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-sand/80 hover:bg-white/[0.06] hover:text-sand"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button asChild variant="secondary" size="sm">
                  <Link href="/dashboard">Sign in</Link>
                </Button>
                <Button asChild variant="gold" size="sm">
                  <Link href="/premium">Go Premium</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
