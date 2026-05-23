import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/soc/Panel";
import { PageHeader } from "@/components/soc/PageHeader";
import { Download, FileText, Printer, Calendar } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports & Analytics — CyberShield AI" }] }),
  component: ReportsPage,
});

const reports = [
  {
    title: "Executive Weekly Brief",
    desc: "Top threats, incidents, posture and AI commentary.",
    date: "May 22, 2026",
    size: "2.4 MB",
  },
  {
    title: "Incident Post-Mortem · INC-2038",
    desc: "Ransomware staging on smb-share — full forensic timeline.",
    date: "May 21, 2026",
    size: "5.1 MB",
  },
  {
    title: "Login Anomaly Report — 30d",
    desc: "Failed logins, geo anomalies and MFA challenge stats.",
    date: "May 20, 2026",
    size: "1.7 MB",
  },
  {
    title: "Threat Intelligence Digest",
    desc: "New IOCs, ASN blocks and campaign attribution.",
    date: "May 19, 2026",
    size: "3.2 MB",
  },
  {
    title: "Quarterly Compliance Pack",
    desc: "ISO 27001 / SOC 2 evidence bundle for auditors.",
    date: "May 14, 2026",
    size: "11.8 MB",
  },
];

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reports & Analytics"
        title="Security Reporting"
        description="Downloadable executive reports, scheduled deliveries and printable security packs."
        action={
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 rounded-md border border-border bg-card/40 text-xs flex items-center gap-1.5 hover:bg-card/70">
              <Calendar className="h-3.5 w-3.5" /> Schedule
            </button>
            <button className="h-9 px-3 rounded-md bg-[color:var(--neon-blue)] text-[color:var(--primary-foreground)] text-xs font-medium flex items-center gap-1.5 glow-blue">
              <FileText className="h-3.5 w-3.5" /> New Report
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {reports.map((r) => (
          <div key={r.title} className="glass-panel rounded-lg p-4 flex items-start gap-3">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-[color:var(--neon-blue)]/30 to-[color:var(--neon-cyan)]/20 grid place-items-center border border-border">
              <FileText className="h-5 w-5 text-[color:var(--neon-cyan)]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{r.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
              <div className="text-[11px] text-muted-foreground mt-2 font-mono">
                {r.date} · {r.size} · PDF
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                className="h-8 w-8 rounded-md border border-border grid place-items-center hover:bg-card/60"
                aria-label="Download"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                className="h-8 w-8 rounded-md border border-border grid place-items-center hover:bg-card/60"
                aria-label="Print"
              >
                <Printer className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Panel title="Scheduled Deliveries">
        <ul className="divide-y divide-border text-xs">
          {[
            {
              name: "Executive Brief",
              cadence: "Every Monday · 08:00",
              channel: "PDF → CISO + Board",
            },
            {
              name: "Daily SOC Digest",
              cadence: "Every day · 06:30",
              channel: "PDF → soc@cybershield.ai",
            },
            { name: "Incident Roll-up", cadence: "Hourly", channel: "JSON → SIEM Webhook" },
          ].map((s) => (
            <li key={s.name} className="py-3 flex items-center gap-3">
              <Calendar className="h-3.5 w-3.5 text-[color:var(--neon-cyan)]" />
              <span className="font-medium w-48">{s.name}</span>
              <span className="text-muted-foreground w-56">{s.cadence}</span>
              <span className="text-muted-foreground flex-1 truncate">{s.channel}</span>
              <button className="text-[10px] px-2 py-1 rounded border border-border hover:bg-card/60">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
