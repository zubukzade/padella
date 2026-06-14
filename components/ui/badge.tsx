import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/12 bg-white/[0.06] text-sand/80",
        neon: "border-neon/30 bg-neon/10 text-neon",
        gold: "border-gold/40 bg-gold/10 text-gold-light",
        live: "border-red-500/40 bg-red-500/15 text-red-300",
        forest: "border-forest-300/30 bg-forest-500/30 text-forest-100",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
