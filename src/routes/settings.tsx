import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — CyberShield AI" }] }),
  component: SettingsPage,
});

function Toggle({ on = false, label, desc }: { on?: boolean; label: string; desc: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <button className={`relative h-5 w-9 rounded-full transition ${on ? "bg-[color:var(--neon-blue)] glow-blue" : "bg-secondary"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${on ? "left-4" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Platform Configuration" description="Detection thresholds, notification routing, integrations and AI model preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Detection & AI">
          <div className="divide-y divide-border">
            <Toggle on label="AI Anomaly Detection" desc="Use neural model for streaming anomaly inference." />
            <Toggle on label="Auto-Triage Critical Alerts" desc="Page on-call engineer for severity=critical." />
            <Toggle label="Block Suspicious ASNs Automatically" desc="Apply edge block on AI confidence ≥ 92%." />
            <Toggle on label="Generate AI Incident Summaries" desc="Append AI brief to every new incident ticket." />
          </div>
        </Panel>

        <Panel title="Notification Routing">
          <div className="space-y-3 text-xs">
            {[
              ["Critical", "PagerDuty · #soc-warroom · SMS"],
              ["High", "Slack #soc-alerts · Email"],
              ["Medium", "Slack #soc-noise"],
              ["Low", "Daily digest"],
            ].map(([s, ch]) => (
              <div key={s} className="flex items-center justify-between rounded-md border border-border bg-card/40 p-3">
                <span className="font-medium">{s}</span>
                <span className="text-muted-foreground">{ch}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Integrations">
          <ul className="grid grid-cols-2 gap-2 text-xs">
            {["Okta", "Splunk", "CrowdStrike", "Datadog", "AWS GuardDuty", "MS Sentinel", "Slack", "PagerDuty"].map((n) => (
              <li key={n} className="rounded-md border border-border bg-card/40 p-3 flex items-center justify-between">
                <span>{n}</span>
                <span className="text-[10px] text-[color:var(--neon-green)] uppercase tracking-wider">connected</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="AI Model">
          <div className="space-y-3 text-xs">
            {[
              ["Primary model", "gemini-3-flash-preview"],
              ["Reasoning effort", "medium"],
              ["Confidence threshold", "85%"],
              ["Inference window", "rolling 60s"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-md border border-border bg-card/40 p-3">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-mono">{v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}