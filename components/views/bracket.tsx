"use client";

import { motion } from "framer-motion";

type Team = { name: string; seed: number; score?: number; won?: boolean };
type Match = { a: Team; b: Team };

const QF: Match[] = [
  { a: { name: "Yılmaz / Aydın", seed: 1, score: 2, won: true }, b: { name: "Demir / Kaya", seed: 8, score: 0 } },
  { a: { name: "Şahin / Öz", seed: 4, score: 1 }, b: { name: "Arslan / Çelik", seed: 5, score: 2, won: true } },
  { a: { name: "Koç / Yıldız", seed: 3, score: 2, won: true }, b: { name: "Aksoy / Polat", seed: 6, score: 1 } },
  { a: { name: "Doğan / Kurt", seed: 2, score: 2, won: true }, b: { name: "Erdem / Şen", seed: 7, score: 0 } },
];
const SF: Match[] = [
  { a: { name: "Yılmaz / Aydın", seed: 1, score: 2, won: true }, b: { name: "Arslan / Çelik", seed: 5, score: 1 } },
  { a: { name: "Koç / Yıldız", seed: 3, score: 1 }, b: { name: "Doğan / Kurt", seed: 2, score: 2, won: true } },
];
const F: Match[] = [
  { a: { name: "Yılmaz / Aydın", seed: 1, score: 0 }, b: { name: "Doğan / Kurt", seed: 2, score: 0 } },
];

function TeamRow({ t }: { t: Team }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-3 py-2 ${
        t.won ? "text-sand" : "text-sand/50"
      }`}
    >
      <span className="flex items-center gap-2 truncate text-sm">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-white/10 text-[10px] font-bold text-sand/60">
          {t.seed}
        </span>
        <span className="truncate font-medium">{t.name}</span>
      </span>
      <span
        className={`font-display text-sm font-bold ${
          t.won ? "text-neon" : "text-sand/40"
        }`}
      >
        {t.score ?? "–"}
      </span>
    </div>
  );
}

function Round({ matches, label }: { matches: Match[]; label: string }) {
  return (
    <div className="flex flex-1 flex-col justify-around gap-4">
      <div className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-sand/40">
        {label}
      </div>
      {matches.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
        >
          <TeamRow t={m.a} />
          <TeamRow t={m.b} />
        </motion.div>
      ))}
    </div>
  );
}

export function Bracket() {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[760px] gap-6 rounded-3xl border border-white/10 bg-forest-900/30 p-6 backdrop-blur-xl">
        <Round matches={QF} label="Quarterfinals" />
        <Round matches={SF} label="Semifinals" />
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            Final
          </div>
          {F.map((m, i) => (
            <div
              key={i}
              className="divide-y divide-gold/20 overflow-hidden rounded-xl border border-gold/30 bg-gold/[0.06] backdrop-blur-xl shadow-gold"
            >
              <TeamRow t={m.a} />
              <TeamRow t={m.b} />
            </div>
          ))}
          <div className="mt-2 text-center text-xs text-sand/45">
            🏆 Champions decided live · Jun 14, 20:00
          </div>
        </div>
      </div>
    </div>
  );
}
