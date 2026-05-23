import { useMemo } from "react";
import { AttackEvent } from "@/lib/mock-data";

function project(lat: number, lng: number) {
  const x = (lng + 180) * (1000 / 360);
  const y = (90 - lat) * (500 / 180);
  return { x, y };
}

const ORIGIN = { lat: 38.9, lng: -77.04 };

export function WorldMap({ events, max = 60 }: { events: AttackEvent[]; max?: number }) {
  const o = useMemo(() => project(ORIGIN.lat, ORIGIN.lng), []);
  const items = events.slice(0, max);
  return (
    <div className="relative w-full h-full rounded-md overflow-hidden grid-bg">
      <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="arc" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--neon-red)" stopOpacity="0.0" />
            <stop offset="60%" stopColor="var(--neon-red)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {Array.from({ length: 72 }).map((_, i) =>
          Array.from({ length: 36 }).map((_, j) => {
            const lng = -180 + i * 5;
            const lat = 90 - j * 5;
            const { x, y } = project(lat, lng);
            const land =
              (lat > -55 && lat < 72) &&
              ((lng > -168 && lng < -52 && lat > 8 && lat < 72) ||
                (lng > -82 && lng < -34 && lat > -55 && lat < 12) ||
                (lng > -10 && lng < 40 && lat > 35 && lat < 70) ||
                (lng > -18 && lng < 52 && lat > -35 && lat < 36) ||
                (lng > 25 && lng < 180 && lat > -12 && lat < 72) ||
                (lng > 110 && lng < 156 && lat > -45 && lat < -10));
            if (!land) return null;
            return <circle key={`${i}-${j}`} cx={x} cy={y} r={0.9} fill="var(--neon-blue)" opacity={0.25} />;
          }),
        )}

        <circle cx={o.x} cy={o.y} r={16} fill="url(#hub)" />
        <circle cx={o.x} cy={o.y} r={3.5} fill="var(--neon-cyan)" />

        {items.map((e) => {
          const p = project(e.lat, e.lng);
          const mx = (o.x + p.x) / 2;
          const my = Math.min(o.y, p.y) - 80;
          const d = `M ${p.x} ${p.y} Q ${mx} ${my} ${o.x} ${o.y}`;
          const color = e.severity === "critical" ? "var(--neon-red)" : e.severity === "high" ? "var(--neon-amber)" : "var(--neon-cyan)";
          return (
            <g key={e.id}>
              <path d={d} fill="none" stroke="url(#arc)" strokeWidth={0.8} opacity={0.55} />
              <circle cx={p.x} cy={p.y} r={2.5} fill={color}>
                <animate attributeName="r" values="2;5;2" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}