import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Padella home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-forest-500 ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          {/* stylized padel racket mark */}
          <ellipse cx="12" cy="9" rx="6.4" ry="7.2" stroke="#C9FF3D" strokeWidth="1.7" />
          <circle cx="9.6" cy="7.6" r="0.9" fill="#C9FF3D" />
          <circle cx="12" cy="6.6" r="0.9" fill="#C9FF3D" />
          <circle cx="14.4" cy="7.6" r="0.9" fill="#C9FF3D" />
          <circle cx="10.6" cy="10.4" r="0.9" fill="#C9FF3D" />
          <circle cx="13.4" cy="10.4" r="0.9" fill="#C9FF3D" />
          <path d="M12 16.2v4.2M10.4 21.4h3.2" stroke="#C9FF3D" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-sand">
        Padella
      </span>
    </Link>
  );
}
