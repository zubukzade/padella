"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  MapPin,
  Trophy,
  ShoppingBag,
  User,
  type LucideIcon,
} from "lucide-react";
import { MOBILE_NAV } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  "map-pin": MapPin,
  trophy: Trophy,
  "shopping-bag": ShoppingBag,
  user: User,
};

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl border border-white/10 bg-ink/80 px-2 py-1.5 shadow-glass backdrop-blur-2xl">
        {MOBILE_NAV.map((item) => {
          const Icon = ICONS[item.icon] ?? Home;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2"
            >
              {active && (
                <motion.span
                  layoutId="mobile-active"
                  className="absolute inset-0 rounded-xl bg-neon/10 ring-1 ring-inset ring-neon/30"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className={cn(
                  "relative h-5 w-5 transition-colors",
                  active ? "text-neon" : "text-sand/55"
                )}
                strokeWidth={2.2}
              />
              <span
                className={cn(
                  "relative text-[10px] font-medium transition-colors",
                  active ? "text-sand" : "text-sand/45"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
