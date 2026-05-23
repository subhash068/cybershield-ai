import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { SeverityBadge } from "@/components/soc/SeverityBadge";
import { alerts, severityClass } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alert Center — CyberShield AI" }] }),
  component: AlertsPage,
});

const tabs = ["all", "critical", "high", "medium", "low"] as const;

function AlertsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("all");
  const list = tab === "all" ? alerts : alerts.filter((a) => a.severity === tab);
  const counts = {
    critical: alerts.filter((a) => a.severity === "critical").length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
  };
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Alert Center"
        title="Critical & Warning Notifications"
        description="Filter, triage and route alerts to the appropriate playbook."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["critical", "high", "medium", "low"] as const).map((s) => (
          <div key={s} className={cn("glass-panel rounded-lg p-4 border-l-2", severityClass(s))}>
            <div className="text-[11px] uppercase tracking-[0.18em] opacity-80">{s}</div>
            <div className="mt-1 text-2xl font-mono font-semibold">{counts[s]}</div>
          </div>
        ))}
      </div>

      <Panel
        title="Alert Stream"
        action={
          <div className="flex items-center gap-1 text-[10px]">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-2 py-1 rounded uppercase tracking-wider",
                  tab === t
                    ? "bg-[color:var(--neon-blue)]/15 text-[color:var(--neon-cyan)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        <ul className="divide-y divide-border">
          {list.map((a) => (
            <li
              key={a.id}
              className={cn(
                "py-3 flex items-center gap-3 text-xs",
                a.severity === "critical" && "",
              )}
            >
              {a.severity === "critical" && (
                <span className="h-2 w-2 rounded-full bg-[color:var(--neon-red)] animate-blink" />
              )}
              <SeverityBadge s={a.severity} />
              <span className="font-mono text-muted-foreground w-20">{a.id}</span>
              <span className="font-medium flex-1 truncate">{a.title}</span>
              <span className="text-muted-foreground hidden md:inline w-32 truncate">
                source: {a.source}
              </span>
              <span className="font-mono text-muted-foreground w-24 text-right">
                {new Date(a.ts).toLocaleTimeString([], { hour12: false })}
              </span>
              <button className="text-[10px] px-2 py-1 rounded border border-border hover:bg-card/60">
                Triage
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
