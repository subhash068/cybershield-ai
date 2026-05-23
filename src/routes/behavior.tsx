import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { userBehavior } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/behavior")({
  head: () => ({ meta: [{ title: "User Behavior Analytics — CyberShield AI" }] }),
  component: BehaviorPage,
});

function riskColor(r: number) {
  if (r >= 70) return "var(--neon-red)";
  if (r >= 40) return "var(--neon-amber)";
  return "var(--neon-green)";
}

function BehaviorPage() {
  const series = Array.from({ length: 30 }, (_, i) => ({
    d: `D${i + 1}`,
    risk: 30 + Math.sin(i / 2) * 12 + (i > 22 ? i - 22 : 0) * 3,
    anomalies: Math.max(0, Math.floor(Math.sin(i / 3) * 4 + (i > 24 ? 6 : 0))),
  }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="UEBA"
        title="User & Entity Behavior Analytics"
        description="Risk scoring, anomalous patterns and insider-threat detection across the workforce."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel
          className="xl:col-span-2"
          title="Behavior Timeline"
          subtitle="Aggregate risk & anomaly count"
        >
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={series}>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="d"
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="var(--neon-red)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="anomalies"
                  stroke="var(--neon-cyan)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="AI Risk Indicators">
          <ul className="space-y-3 text-xs">
            {[
              ["Lateral movement signal", 91, "var(--neon-red)"],
              ["Off-hours access pattern", 73, "var(--neon-amber)"],
              ["Unusual data egress", 64, "var(--neon-amber)"],
              ["Privilege drift", 48, "var(--neon-blue)"],
              ["Anomalous geolocation", 31, "var(--neon-green)"],
            ].map(([l, v, c]) => (
              <li key={l as string}>
                <div className="flex items-center justify-between mb-1">
                  <span>{l as string}</span>
                  <span className="font-mono" style={{ color: c as string }}>
                    {v}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full"
                    style={{ width: `${v}%`, background: c as string, boxShadow: `0 0 10px ${c}` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="User Risk Scoreboard">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border">
              <tr className="text-left">
                <th className="py-2 px-2 font-medium">User</th>
                <th className="py-2 px-2 font-medium">Risk Score</th>
                <th className="py-2 px-2 font-medium">Sessions</th>
                <th className="py-2 px-2 font-medium">Anomalies</th>
                <th className="py-2 px-2 font-medium">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {userBehavior
                .sort((a, b) => b.risk - a.risk)
                .map((u) => (
                  <tr key={u.user} className="hover:bg-card/40">
                    <td className="py-2 px-2 font-mono">{u.user}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-28 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${u.risk}%`,
                              background: riskColor(u.risk),
                              boxShadow: `0 0 10px ${riskColor(u.risk)}`,
                            }}
                          />
                        </div>
                        <span className="font-mono" style={{ color: riskColor(u.risk) }}>
                          {u.risk}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-2 font-mono text-muted-foreground">{u.sessions}</td>
                    <td className="py-2 px-2 font-mono">{u.anomalies}</td>
                    <td className="py-2 px-2 text-muted-foreground">{u.lastSeen}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
