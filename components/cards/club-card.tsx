import Image from "next/image";
import { MapPin, Star, Users, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Club } from "@/lib/data";
import { formatTRY } from "@/lib/utils";

export function ClubCard({ club }: { club: Club }) {
  return (
    <div
      id={club.id}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all hover:border-neon/30 scroll-mt-28"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={club.image}
          alt={club.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
        <Badge
          variant={club.indoor ? "forest" : "neon"}
          className="absolute left-3 top-3"
        >
          {club.indoor ? "Indoor" : "Outdoor"}
        </Badge>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-xs text-sand backdrop-blur">
          <Star className="h-3 w-3 fill-gold text-gold" /> {club.rating}
          <span className="text-sand/40">({club.reviews})</span>
        </span>
        <div className="absolute inset-x-4 bottom-3">
          <h3 className="font-display text-xl font-bold text-sand">{club.name}</h3>
          <div className="flex items-center gap-1 text-xs text-sand/60">
            <MapPin className="h-3 w-3" /> {club.district}, {club.city}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {club.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-sand/60"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <span className="flex items-center gap-1.5 text-sand/65">
            <Users className="h-4 w-4 text-neon" /> {club.courts} courts
          </span>
          <span className="flex items-center gap-1.5 text-sand/65">
            <GraduationCap className="h-4 w-4 text-neon" /> {club.coaches} coaches
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <span className="font-display text-lg font-bold text-sand">
              {formatTRY(club.price)}
            </span>
            <span className="text-xs text-sand/45"> / hour</span>
          </div>
          <button className="rounded-full bg-neon px-4 py-2 text-xs font-semibold text-[#06120b] transition-transform hover:scale-105">
            Book a court
          </button>
        </div>
      </div>
    </div>
  );
}
