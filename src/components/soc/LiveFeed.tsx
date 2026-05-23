import { useEffect, useState } from "react";
import { AttackEvent, attacks, severityClass } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour12: false });
}

export function LiveFeed({ rows = 12 }: { rows?: number }) {
  const [items, setItems] = useState<AttackEvent[]>(() => attacks.slice(0, rows));
  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const i = Math.floor(Math.random() * attacks.length);
        const next = { ...attacks[i], id: `EVT-${Date.now()}`, ts: Date.now() };
        return [next, ...prev].slice(0, rows);
      });
    }, 1800);
    return () => clearInterval(id);
  }, [rows]);
  return (
    <ul className="divide-y divide-border">
      {items.map((e) => (
        <li key={e.id} className="px-1 py-2 flex items-center gap-3 text-xs">
          <span className="font-mono text-muted-foreground w-16 shrink-0">{fmt(e.ts)}</span>
          <span className={cn("px-1.5 py-0.5 rounded border text-[10px] uppercase tracking-wider shrink-0", severityClass(e.severity))}>{e.severity}</span>
          <span className="font-medium truncate w-36 shrink-0">{e.type}</span>
          <span className="font-mono text-muted-foreground truncate w-32">{e.ip}</span>
          <span className="text-muted-foreground hidden md:inline w-28 truncate">{e.country}</span>
          <span className="text-muted-foreground hidden lg:inline truncate flex-1">{e.user} → {e.target}</span>
          <span className={cn(
            "ml-auto text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0",
            e.status === "blocked" && "text-[color:var(--neon-green)] bg-[color:var(--neon-green)]/10",
            e.status === "investigating" && "text-[color:var(--neon-amber)] bg-[color:var(--neon-amber)]/10",
            e.status === "contained" && "text-[color:var(--neon-cyan)] bg-[color:var(--neon-cyan)]/10",
            e.status === "allowed" && "text-[color:var(--neon-red)] bg-[color:var(--neon-red)]/10 animate-blink",
          )}>{e.status}</span>
        </li>
      ))}
    </ul>
  );
}