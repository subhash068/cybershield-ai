import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { SeverityBadge } from "@/components/soc/SeverityBadge";
import { incidents } from "@/lib/mock-data";
import { Clock, User } from "lucide-react";

export const Route = createFileRoute("/incidents")({
  head: () => ({ meta: [{ title: "Incident Management — CyberShield AI" }] }),
  component: IncidentsPage,
});

const statusColor: Record<string, string> = {
  open: "var(--neon-red)",
  investigating: "var(--neon-amber)",
  contained: "var(--neon-cyan)",
  resolved: "var(--neon-green)",
};

function ago(t: number) {
  const m = Math.floor((Date.now() - t) / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

function IncidentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Incident Response" title="Case Management & Workflows" description="Active incidents, severity gauges, analyst assignment and response status timeline." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Open", v: incidents.filter(i => i.status === "open").length, c: "var(--neon-red)" },
          { l: "Investigating", v: incidents.filter(i => i.status === "investigating").length, c: "var(--neon-amber)" },
          { l: "Contained", v: incidents.filter(i => i.status === "contained").length, c: "var(--neon-cyan)" },
          { l: "Avg MTTR", v: "2h 41m", c: "var(--neon-green)" },
        ].map((k) => (
          <div key={k.l} className="glass-panel rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k.l}</div>
            <div className="mt-1 text-2xl font-mono font-semibold" style={{ color: k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {incidents.map((i) => (
          <div key={i.id} className="glass-panel rounded-lg p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: statusColor[i.status] }} />
            <div className="flex items-start gap-3">
              <div>
                <div className="text-[10px] tracking-widest text-muted-foreground font-mono">{i.id}</div>
                <div className="text-sm font-semibold mt-0.5">{i.title}</div>
              </div>
              <SeverityBadge s={i.severity} className="ml-auto" />
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{i.description}</p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded border border-border bg-card/40 p-2">
                <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Category</div>
                <div className="font-medium">{i.category}</div>
              </div>
              <div className="rounded border border-border bg-card/40 p-2">
                <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Status</div>
                <div className="font-medium capitalize" style={{ color: statusColor[i.status] }}>{i.status}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><User className="h-3 w-3" /> {i.assignee}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ago(i.opened)}</span>
              <span className="ml-auto font-mono">{i.affected.join(", ")}</span>
            </div>

            <div className="mt-3 flex items-center gap-1">
              {["Detected", "Triaged", "Contained", "Resolved"].map((s, idx) => {
                const order = ["open", "investigating", "contained", "resolved"];
                const active = order.indexOf(i.status) >= idx;
                return (
                  <div key={s} className="flex-1 flex items-center gap-1">
                    <div className="h-1.5 flex-1 rounded-full" style={{ background: active ? statusColor[i.status] : "var(--color-secondary)", boxShadow: active ? `0 0 8px ${statusColor[i.status]}` : "none" }} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}