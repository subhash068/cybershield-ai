import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { WorldMap } from "@/components/soc/WorldMap";
import { attacks, topCountries } from "@/lib/mock-data";

export const Route = createFileRoute("/geo")({
  head: () => ({ meta: [{ title: "Geolocation Intelligence — CyberShield AI" }] }),
  component: GeoPage,
});

function GeoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Geolocation Intelligence"
        title="Global Cyber Attack Map"
        description="Origin countries, attack density, regional heatmaps and animated attack lines."
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <Panel className="xl:col-span-3" title="Global Attack Visualization" padded={false}>
          <div className="h-[520px] p-3">
            <WorldMap events={attacks} max={90} />
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Top Attacking Countries">
            <ul className="space-y-2">
              {topCountries.map((c) => {
                const pct = (c.attacks / topCountries[0].attacks) * 100;
                return (
                  <li key={c.code} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span>
                        <span className="font-mono text-muted-foreground mr-2">{c.code}</span>
                        {c.country}
                      </span>
                      <span className="font-mono">{c.attacks.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[color:var(--neon-red)] to-[color:var(--neon-amber)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel title="Suspicious Regions">
            <ul className="space-y-2 text-xs">
              {[
                { r: "East Europe / RU", lvl: "Critical", c: "var(--neon-red)" },
                { r: "East Asia / CN, KP", lvl: "Critical", c: "var(--neon-red)" },
                { r: "Middle East / IR", lvl: "High", c: "var(--neon-amber)" },
                { r: "West Africa / NG", lvl: "Elevated", c: "var(--neon-blue)" },
              ].map((r) => (
                <li
                  key={r.r}
                  className="flex items-center justify-between rounded border border-border bg-card/40 px-2 py-1.5"
                >
                  <span>{r.r}</span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: r.c }}>
                    {r.lvl}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
