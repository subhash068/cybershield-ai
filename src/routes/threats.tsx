import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, PolarAngleAxis, PolarGrid, Radar, PolarRadiusAxis,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { SeverityBadge } from "@/components/soc/SeverityBadge";
import { attacks, threatCategoryData, radarThreats, aiSummaries } from "@/lib/mock-data";

export const Route = createFileRoute("/threats")({
  head: () => ({ meta: [{ title: "Threat Intelligence — CyberShield AI" }] }),
  component: ThreatsPage,
});

function ThreatsPage() {
  const iocs = attacks.slice(0, 14);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Threat Intelligence" title="Adversary & IOC Intelligence" description="Correlated threat actors, indicators of compromise, attack categories and AI-generated context." />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel title="Attack Categories" subtitle="Last 24h — by volume">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={threatCategoryData} dataKey="value" nameKey="category" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {threatCategoryData.map((d, i) => <Cell key={i} fill={d.fill as string} stroke="var(--background)" />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Threat Surface Radar" subtitle="Vector exposure vs baseline">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <RadarChart data={radarThreats}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} stroke="var(--color-border)" />
                <Radar dataKey="baseline" stroke="var(--neon-blue)" fill="var(--neon-blue)" fillOpacity={0.15} />
                <Radar dataKey="current" stroke="var(--neon-red)" fill="var(--neon-red)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Severity Distribution">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={[
                { name: "Critical", v: 87 }, { name: "High", v: 214 }, { name: "Medium", v: 412 }, { name: "Low", v: 631 },
              ]}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "var(--color-accent)", opacity: 0.2 }} />
                <Bar dataKey="v" fill="var(--neon-blue)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2" title="Indicators of Compromise" subtitle="Correlated across endpoints, network, identity">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-muted-foreground border-b border-border">
                <tr className="text-left">
                  <th className="py-2 px-2 font-medium">IOC</th>
                  <th className="py-2 px-2 font-medium">Type</th>
                  <th className="py-2 px-2 font-medium">Origin</th>
                  <th className="py-2 px-2 font-medium">Target</th>
                  <th className="py-2 px-2 font-medium">Confidence</th>
                  <th className="py-2 px-2 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {iocs.map((e) => (
                  <tr key={e.id} className="hover:bg-card/40">
                    <td className="py-2 px-2 font-mono">{e.ip}</td>
                    <td className="py-2 px-2">{e.type}</td>
                    <td className="py-2 px-2">{e.country}</td>
                    <td className="py-2 px-2 text-muted-foreground">{e.target}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[color:var(--neon-blue)] to-[color:var(--neon-cyan)]" style={{ width: `${e.confidence}%` }} />
                        </div>
                        <span className="font-mono">{e.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-2"><SeverityBadge s={e.severity} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="AI Threat Briefs">
          <div className="space-y-3">
            {aiSummaries.map((s) => (
              <div key={s.title} className="rounded-md border border-border bg-card/40 p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-sm font-medium">{s.title}</div>
                  <SeverityBadge s={s.severity} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}