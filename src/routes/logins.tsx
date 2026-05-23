import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { SeverityBadge } from "@/components/soc/SeverityBadge";
import { loginTrend, attacks } from "@/lib/mock-data";

export const Route = createFileRoute("/logins")({
  head: () => ({ meta: [{ title: "Login Analytics — CyberShield AI" }] }),
  component: LoginsPage,
});

const auth = [
  { name: "Password", value: 6420, fill: "var(--neon-blue)" },
  { name: "MFA", value: 4218, fill: "var(--neon-cyan)" },
  { name: "SSO", value: 3120, fill: "var(--neon-green)" },
  { name: "Token", value: 982, fill: "var(--neon-amber)" },
];

function LoginsPage() {
  const susp = attacks.filter(a => a.type === "Brute Force" || a.type === "Credential Stuffing").slice(0, 10);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Login Analytics" title="Authentication Intelligence" description="Successful, failed and suspicious authentication patterns across the estate." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Successful Logins", v: "182,431", d: "+4.1%", c: "text-[color:var(--neon-green)]" },
          { l: "Failed Logins", v: "8,421", d: "+12.4%", c: "text-[color:var(--neon-red)]" },
          { l: "MFA Challenges", v: "42,118", d: "+1.8%", c: "text-[color:var(--neon-blue)]" },
          { l: "Suspicious Sessions", v: "147", d: "+22%", c: "text-[color:var(--neon-amber)]" },
        ].map((k) => (
          <div key={k.l} className="glass-panel rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k.l}</div>
            <div className="mt-1 text-2xl font-mono font-semibold">{k.v}</div>
            <div className={`text-xs mt-0.5 ${k.c}`}>{k.d} vs 7d</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2" title="Login Trend — 24h">
          <div className="h-[280px]">
            <ResponsiveContainer>
              <LineChart data={loginTrend}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" fontSize={10} interval={2} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="success" stroke="var(--neon-green)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="failed" stroke="var(--neon-red)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="suspicious" stroke="var(--neon-amber)" strokeWidth={2} dot={false} strokeDasharray="4 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Authentication Methods">
          <div className="h-[280px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={auth} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                  {auth.map((d, i) => <Cell key={i} fill={d.fill as string} stroke="var(--background)" />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Failed Login Heatmap" subtitle="Hour × Day · last 7 days">
        <div className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 text-[10px]">
          <div />
          {Array.from({ length: 24 }).map((_, h) => <div key={h} className="text-center text-muted-foreground">{h}</div>)}
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, dy) => (
            <Fragment key={d}>
              <div className="text-muted-foreground self-center">{d}</div>
              {Array.from({ length: 24 }).map((_, h) => {
                const intensity = (Math.sin(h / 3 + dy) * 0.5 + 0.5) * (h > 18 || h < 6 ? 1 : 0.6);
                return <div key={`${d}-${h}`} className="h-6 rounded-sm" style={{ background: `oklch(0.65 0.25 25 / ${intensity.toFixed(2)})` }} />;
              })}
            </Fragment>
          ))}
        </div>
      </Panel>

      <Panel title="Suspicious Login Sessions">
        <ul className="divide-y divide-border">
          {susp.map((e) => (
            <li key={e.id} className="py-2 flex items-center gap-3 text-xs">
              <SeverityBadge s={e.severity} />
              <span className="font-mono w-28 text-muted-foreground">{e.ip}</span>
              <span className="w-32 truncate">{e.user}</span>
              <span className="text-muted-foreground hidden md:inline w-28">{e.country}</span>
              <span className="flex-1 truncate">{e.type} on {e.target}</span>
              <span className="font-mono text-muted-foreground">{new Date(e.ts).toLocaleTimeString([], { hour12: false })}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}