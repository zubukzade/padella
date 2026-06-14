import Image from "next/image";
import { MapPin, Trophy, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Player } from "@/lib/data";

export function PlayerCard({ player }: { player: Player }) {
  const total = player.wins + player.losses;
  const winRate = Math.round((player.wins / total) * 100);
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all hover:border-neon/30 hover:bg-white/[0.05]">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-neon/50 to-forest-400/40" />
          <Image
            src={player.avatar}
            alt={player.name}
            width={64}
            height={64}
            className="relative h-16 w-16 rounded-full object-cover"
          />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-neon ring-1 ring-neon/30">
            {player.rating}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold text-sand">{player.name}</h3>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-sand/50">
            <MapPin className="h-3 w-3" /> {player.city}
          </div>
          <Badge variant="neon" className="mt-1.5">{player.level}</Badge>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-white/[0.03] py-2.5">
          <div className="font-display text-lg font-bold text-sand">{winRate}%</div>
          <div className="text-[10px] uppercase tracking-wider text-sand/40">Win rate</div>
        </div>
        <div className="rounded-xl bg-white/[0.03] py-2.5">
          <div className="font-display text-lg font-bold text-sand">{total}</div>
          <div className="text-[10px] uppercase tracking-wider text-sand/40">Matches</div>
        </div>
        <div className="rounded-xl bg-white/[0.03] py-2.5">
          <div className="flex items-center justify-center gap-1 font-display text-lg font-bold text-neon">
            <Flame className="h-3.5 w-3.5" />
            {player.streak}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-sand/40">Streak</div>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {player.badges.map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-sand/60"
          >
            <Trophy className="h-2.5 w-2.5 text-gold" /> {b}
          </span>
        ))}
      </div>

      <div className="relative mt-3 text-[11px] text-sand/40">
        Home club · <span className="text-sand/70">{player.club}</span>
      </div>
    </div>
  );
}
