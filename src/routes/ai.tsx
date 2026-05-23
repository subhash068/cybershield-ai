import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { aiRecommendations, aiSummaries } from "@/lib/mock-data";
import { Brain, Sparkles, Zap } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { attackTrend } from "@/lib/mock-data";
import { SeverityBadge } from "@/components/soc/SeverityBadge";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "AI Threat Detection — CyberShield AI" }] }),
  component: AIPage,
});

function Ring({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 42, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-border)" strokeWidth="6" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="6" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-2xl font-mono font-semibold" style={{ color }}>{value}</div>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">score</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function AIPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Detection"
        title="Predictive Threat Intelligence"
        description="Neural anomaly detection, attack-probability forecasting and AI-driven response guidance."
        action={
          <button className="h-9 px-3 rounded-md bg-[color:var(--neon-blue)] text-[color:var(--primary-foreground)] text-xs font-medium flex items-center gap-1.5 glow-blue">
            <Sparkles className="h-3.5 w-3.5" /> Run AI Inference
          </button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Panel padded={false} className="p-4 flex justify-center items-center"><Ring value={87} label="Attack probability · 1h" color="var(--neon-red)" /></Panel>
        <Panel padded={false} className="p-4 flex justify-center items-center"><Ring value={94} label="Model confidence" color="var(--neon-cyan)" /></Panel>
        <Panel padded={false} className="p-4 flex justify-center items-center"><Ring value={78} label="Security posture" color="var(--neon-amber)" /></Panel>
        <Panel padded={false} className="p-4 flex justify-center items-center"><Ring value={62} label="Predicted incidents · 24h" color="var(--neon-purple)" /></Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2" title="Neural Anomaly Stream" subtitle="Hidden-layer activation × time">
          <div className="relative h-[300px]">
            <div className="absolute inset-0 grid-bg opacity-30 rounded" />
            <ResponsiveContainer>
              <AreaChart data={attackTrend}>
                <defs>
                  <linearGradient id="ai1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" stroke="var(--color-muted-foreground)" fontSize={10} interval={5} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="anomalies" stroke="var(--neon-cyan)" fill="url(#ai1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="AI Recommendations" subtitle="Auto-generated playbooks">
          <ul className="space-y-2.5 text-xs">
            {aiRecommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2 rounded-md border border-border bg-card/40 p-2.5">
                <Zap className="h-3.5 w-3.5 mt-0.5 text-[color:var(--neon-amber)] shrink-0" />
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Automated Incident Summaries" subtitle="Generated by CyberShield AI">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {aiSummaries.map((s) => (
            <div key={s.title} className="rounded-md border border-border bg-card/40 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16" style={{ background: "radial-gradient(circle at top right, var(--neon-cyan), transparent 60%)", opacity: 0.35 }} />
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-[color:var(--neon-cyan)]" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Brief</span>
                <span className="ml-auto"><SeverityBadge s={s.severity} /></span>
              </div>
              <div className="text-sm font-medium mb-1.5">{s.title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
              <div className="mt-3 text-[10px] font-mono text-muted-foreground">confidence: <span className="neon-text">{s.confidence}%</span></div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}