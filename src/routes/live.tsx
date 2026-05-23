import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { LiveFeed } from "@/components/soc/LiveFeed";
import { WorldMap } from "@/components/soc/WorldMap";
import { attacks } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { attackTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: [{ title: "Live Attack Feed — CyberShield AI" }] }),
  component: LivePage,
});

function LivePage() {
  const cats = [
    { l: "Brute Force", v: 412, c: "var(--neon-red)" },
    { l: "Credential Stuffing", v: 318, c: "var(--neon-amber)" },
    { l: "Suspicious Logins", v: 247, c: "var(--neon-cyan)" },
    { l: "Bot Activity", v: 198, c: "var(--neon-blue)" },
    { l: "Privilege Escalation", v: 73, c: "var(--neon-purple)" },
    { l: "Abnormal Behavior", v: 121, c: "var(--neon-green)" },
  ];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Live Surveillance"
        title="Real-Time Attack Monitoring"
        description="Streaming events, brute-force detection, active sessions and pulse-driven anomaly indicators."
        action={
          <div className="flex items-center gap-2 px-3 h-9 rounded-md border border-[color:var(--neon-red)]/40 bg-[color:var(--neon-red)]/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--neon-red)] opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--neon-red)]" />
            </span>
            <span className="text-xs neon-text-red">STREAMING</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cats.map((c) => (
          <div key={c.l} className="glass-panel rounded-lg p-3 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full" style={{ background: c.c, opacity: 0.18, filter: "blur(14px)" }} />
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.l}</div>
            <div className="text-2xl font-mono font-semibold mt-1" style={{ color: c.c }}>{c.v}</div>
            <div className="text-[10px] text-muted-foreground">last hour</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2" title="Live Attack Stream" subtitle="Auto-refreshing every 1.8s" padded>
          <LiveFeed rows={16} />
        </Panel>
        <Panel title="Attack Pulse" subtitle="Origin → SOC HQ" padded={false}>
          <div className="h-[460px] p-2"><WorldMap events={attacks} max={50} /></div>
        </Panel>
      </div>

      <Panel title="Attack Volume" subtitle="Anomaly band shaded · last 24h">
        <div className="h-[220px]">
          <ResponsiveContainer>
            <AreaChart data={attackTrend}>
              <defs>
                <linearGradient id="lv1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--neon-red)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--neon-red)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="t" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} interval={5} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="attacks" stroke="var(--neon-red)" fill="url(#lv1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}