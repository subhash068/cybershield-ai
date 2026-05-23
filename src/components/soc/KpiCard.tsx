import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { Severity, severityColor } from "@/lib/mock-data";

function useCountUp(target: number, duration = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

export function KpiCard({
  label, value, delta, severity, unit = "", spark,
}: {
  label: string;
  value: number;
  delta: number;
  severity: Severity;
  unit?: string;
  spark: { v: number }[];
}) {
  const v = useCountUp(value);
  const color = severityColor(severity);
  const up = delta >= 0;
  return (
    <div className="glass-panel rounded-lg p-4 relative overflow-hidden group">
      <div
        className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${color}` }}
      />
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
        <span className="h-2 w-2 rounded-full animate-blink" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
      </div>
      <div className="mt-2 flex items-end gap-2">
        <div className="text-3xl font-semibold font-mono tabular-nums">
          {unit === "%" || unit === "/100" ? v.toFixed(1) : Math.round(v).toLocaleString()}
          <span className="text-base text-muted-foreground ml-1">{unit}</span>
        </div>
        <div className={cn("text-xs flex items-center mb-1", up ? "text-[color:var(--neon-red)]" : "text-[color:var(--neon-green)]")}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(delta)}%
        </div>
      </div>
      <div className="h-10 mt-2 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={spark}>
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.6} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}