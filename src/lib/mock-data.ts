// Deterministic-ish mock cyber data for the CyberShield AI platform.

export type Severity = "critical" | "high" | "medium" | "low";
export type AttackType =
  | "Brute Force"
  | "Credential Stuffing"
  | "Phishing"
  | "Malware"
  | "Ransomware"
  | "Botnet"
  | "Insider Threat"
  | "Privilege Escalation"
  | "SQL Injection"
  | "DDoS";

export interface AttackEvent {
  id: string;
  ts: number;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  type: AttackType;
  severity: Severity;
  user: string;
  target: string;
  status: "blocked" | "investigating" | "allowed" | "contained";
  confidence: number;
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: "open" | "investigating" | "contained" | "resolved";
  assignee: string;
  opened: number;
  affected: string[];
  category: AttackType;
  description: string;
}

const COUNTRIES: { name: string; code: string; lat: number; lng: number; city: string }[] = [
  { name: "Russia", code: "RU", lat: 55.75, lng: 37.61, city: "Moscow" },
  { name: "China", code: "CN", lat: 39.91, lng: 116.4, city: "Beijing" },
  { name: "North Korea", code: "KP", lat: 39.03, lng: 125.75, city: "Pyongyang" },
  { name: "Iran", code: "IR", lat: 35.69, lng: 51.39, city: "Tehran" },
  { name: "Brazil", code: "BR", lat: -23.55, lng: -46.63, city: "São Paulo" },
  { name: "Nigeria", code: "NG", lat: 6.52, lng: 3.38, city: "Lagos" },
  { name: "United States", code: "US", lat: 38.9, lng: -77.04, city: "Washington" },
  { name: "India", code: "IN", lat: 19.07, lng: 72.87, city: "Mumbai" },
  { name: "Ukraine", code: "UA", lat: 50.45, lng: 30.52, city: "Kyiv" },
  { name: "Germany", code: "DE", lat: 52.52, lng: 13.4, city: "Berlin" },
  { name: "Vietnam", code: "VN", lat: 21.03, lng: 105.85, city: "Hanoi" },
  { name: "Turkey", code: "TR", lat: 41.01, lng: 28.97, city: "Istanbul" },
];

const ATTACK_TYPES: AttackType[] = [
  "Brute Force",
  "Credential Stuffing",
  "Phishing",
  "Malware",
  "Ransomware",
  "Botnet",
  "Insider Threat",
  "Privilege Escalation",
  "SQL Injection",
  "DDoS",
];

const SEVERITIES: Severity[] = ["critical", "high", "medium", "low"];
const USERS = [
  "j.connor", "a.ripley", "n.murphy", "t.anderson", "r.deckard",
  "k.amaya", "svc-payments", "admin", "root", "p.shelby", "h.gordon",
];
const TARGETS = ["auth-api", "payments-db", "vpn-gateway", "k8s-prod", "okta-sso", "github-ci", "smb-share", "exchange-srv"];
const STATUS: AttackEvent["status"][] = ["blocked", "investigating", "allowed", "contained"];

function seeded(i: number) {
  // simple deterministic pseudo random
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
function pick<T>(arr: T[], i: number): T {
  return arr[Math.floor(seeded(i) * arr.length)];
}
function randomIP(i: number) {
  return `${10 + Math.floor(seeded(i) * 240)}.${Math.floor(seeded(i + 1) * 255)}.${Math.floor(seeded(i + 2) * 255)}.${Math.floor(seeded(i + 3) * 255)}`;
}

export function generateAttacks(count = 120, baseTs = Date.now()): AttackEvent[] {
  return Array.from({ length: count }, (_, i) => {
    const c = pick(COUNTRIES, i + 1);
    return {
      id: `EVT-${(10000 + i).toString()}`,
      ts: baseTs - Math.floor(seeded(i + 7) * 1000 * 60 * 60 * 6),
      ip: randomIP(i),
      country: c.name,
      countryCode: c.code,
      city: c.city,
      type: pick(ATTACK_TYPES, i + 2),
      severity: pick(SEVERITIES, i + 3),
      user: pick(USERS, i + 4),
      target: pick(TARGETS, i + 5),
      status: pick(STATUS, i + 6),
      confidence: 55 + Math.floor(seeded(i + 8) * 45),
      lat: c.lat + (seeded(i + 9) - 0.5) * 4,
      lng: c.lng + (seeded(i + 10) - 0.5) * 4,
    };
  });
}

export const attacks = generateAttacks(140);

export const kpis = [
  { label: "Active Threats", value: 1247, delta: +18, severity: "critical" as Severity, unit: "" },
  { label: "Failed Logins (24h)", value: 8421, delta: +6, severity: "high" as Severity, unit: "" },
  { label: "High-Risk IPs", value: 312, delta: -3, severity: "high" as Severity, unit: "" },
  { label: "Detection Accuracy", value: 99.4, delta: +0.2, severity: "low" as Severity, unit: "%" },
  { label: "Active Incidents", value: 27, delta: +4, severity: "critical" as Severity, unit: "" },
  { label: "Attack Volume / min", value: 642, delta: +22, severity: "high" as Severity, unit: "" },
  { label: "AI Risk Score", value: 78, delta: +5, severity: "high" as Severity, unit: "/100" },
  { label: "Critical Alerts", value: 14, delta: +2, severity: "critical" as Severity, unit: "" },
];

// trend data
export const attackTrend = Array.from({ length: 48 }, (_, i) => ({
  t: `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`,
  attacks: 200 + Math.floor(seeded(i + 11) * 800) + (i > 30 ? 400 : 0),
  blocked: 180 + Math.floor(seeded(i + 12) * 700) + (i > 30 ? 350 : 0),
  anomalies: 20 + Math.floor(seeded(i + 13) * 80),
}));

export const loginTrend = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  success: 1200 + Math.floor(seeded(i + 21) * 800),
  failed: 200 + Math.floor(seeded(i + 22) * 600),
  suspicious: 20 + Math.floor(seeded(i + 23) * 90),
}));

export const threatCategoryData = [
  { category: "Brute Force", value: 412, fill: "var(--neon-red)" },
  { category: "Phishing", value: 318, fill: "var(--neon-amber)" },
  { category: "Malware", value: 247, fill: "var(--neon-purple)" },
  { category: "Botnet", value: 198, fill: "var(--neon-blue)" },
  { category: "Ransomware", value: 121, fill: "var(--neon-cyan)" },
  { category: "Insider", value: 73, fill: "var(--neon-green)" },
];

export const radarThreats = [
  { subject: "Network", current: 82, baseline: 50 },
  { subject: "Endpoint", current: 67, baseline: 45 },
  { subject: "Identity", current: 91, baseline: 55 },
  { subject: "Cloud", current: 74, baseline: 50 },
  { subject: "Email", current: 58, baseline: 40 },
  { subject: "Data", current: 88, baseline: 60 },
];

export const incidents: Incident[] = [
  { id: "INC-2041", title: "Privileged account lateral movement detected", severity: "critical", status: "investigating", assignee: "K. Amaya", opened: Date.now() - 1000 * 60 * 24, affected: ["okta-sso", "k8s-prod"], category: "Privilege Escalation", description: "Anomalous token reuse from a privileged service account observed across 4 production clusters." },
  { id: "INC-2040", title: "Mass credential stuffing on /auth", severity: "high", status: "contained", assignee: "T. Anderson", opened: Date.now() - 1000 * 60 * 95, affected: ["auth-api"], category: "Credential Stuffing", description: "12,400 login attempts from a rotating residential proxy network. Rate-limit and ASN block active." },
  { id: "INC-2039", title: "Suspicious PowerShell encoded payload", severity: "high", status: "open", assignee: "R. Deckard", opened: Date.now() - 1000 * 60 * 200, affected: ["fin-laptop-014"], category: "Malware", description: "Base64 payload spawning regsvr32 — IOC matches known TA505 toolkit." },
  { id: "INC-2038", title: "Ransomware indicators on file share", severity: "critical", status: "open", assignee: "J. Connor", opened: Date.now() - 1000 * 60 * 320, affected: ["smb-share"], category: "Ransomware", description: "Rapid file renames with .lock extension and shadow copy deletion attempts." },
  { id: "INC-2037", title: "Outbound DNS tunneling to unknown TLD", severity: "medium", status: "investigating", assignee: "N. Murphy", opened: Date.now() - 1000 * 60 * 480, affected: ["dmz-srv-03"], category: "Botnet", description: "High-entropy subdomains queried at 5s intervals — likely C2 beacon." },
  { id: "INC-2036", title: "Insider data exfil via cloud storage", severity: "high", status: "investigating", assignee: "P. Shelby", opened: Date.now() - 1000 * 60 * 600, affected: ["sales-vdi"], category: "Insider Threat", description: "Bulk download from CRM followed by upload to personal Mega account." },
];

export const aiSummaries = [
  { title: "Coordinated brute force campaign", body: "AI correlated 4,212 failed logins across 38 IPs in /24 ranges from RU and IR ASNs. Pattern matches known APT brute-force tooling. Recommend MFA enforcement and ASN block.", confidence: 94, severity: "critical" as Severity },
  { title: "Ransomware staging detected", body: "Unusual SMB enumeration plus shadow copy deletion on smb-share. 87% similarity to LockBit 3.0 staging behavior. Isolate host fin-srv-08 immediately.", confidence: 87, severity: "critical" as Severity },
  { title: "Drift in privileged access usage", body: "Service account svc-payments accessed 6 net-new resources outside its baseline. Risk score climbed from 22 to 71 in 4h.", confidence: 76, severity: "high" as Severity },
];

export const aiRecommendations = [
  "Enforce MFA on all admin accounts within next 24h.",
  "Rotate API keys for svc-payments and audit usage in last 7d.",
  "Quarantine endpoint fin-laptop-014 — TA505 IOC match.",
  "Block ASN 12389 (RU) at edge gateway — 18% of brute-force volume.",
  "Tune EDR rule SOC-117 — false-positive rate at 11%.",
];

export const userBehavior = [
  { user: "j.connor", risk: 18, sessions: 42, anomalies: 0, lastSeen: "2m ago" },
  { user: "a.ripley", risk: 34, sessions: 21, anomalies: 1, lastSeen: "11m ago" },
  { user: "svc-payments", risk: 78, sessions: 312, anomalies: 6, lastSeen: "now" },
  { user: "p.shelby", risk: 88, sessions: 14, anomalies: 4, lastSeen: "4m ago" },
  { user: "admin", risk: 62, sessions: 8, anomalies: 2, lastSeen: "1h ago" },
  { user: "r.deckard", risk: 22, sessions: 19, anomalies: 0, lastSeen: "27m ago" },
  { user: "k.amaya", risk: 12, sessions: 33, anomalies: 0, lastSeen: "now" },
  { user: "t.anderson", risk: 41, sessions: 17, anomalies: 1, lastSeen: "8m ago" },
];

export const alerts = Array.from({ length: 20 }, (_, i) => ({
  id: `ALT-${5000 + i}`,
  severity: pick(SEVERITIES, i + 31),
  title: pick([
    "Anomalous login from new geo",
    "Multiple failed MFA prompts",
    "Suspicious process tree spawned",
    "Token replay detected",
    "Privileged role assignment",
    "Outbound traffic to TOR exit",
    "EDR signature match: Mimikatz",
    "Brute-force burst on VPN",
  ], i + 32),
  source: pick(TARGETS, i + 33),
  ts: Date.now() - i * 1000 * 60 * 7,
}));

export const topCountries = [
  { country: "Russia", code: "RU", attacks: 4218 },
  { country: "China", code: "CN", attacks: 3641 },
  { country: "North Korea", code: "KP", attacks: 1827 },
  { country: "Iran", code: "IR", attacks: 1502 },
  { country: "Brazil", code: "BR", attacks: 988 },
  { country: "Nigeria", code: "NG", attacks: 742 },
  { country: "Vietnam", code: "VN", attacks: 611 },
];

export function severityColor(s: Severity) {
  switch (s) {
    case "critical": return "var(--neon-red)";
    case "high": return "var(--neon-amber)";
    case "medium": return "var(--neon-blue)";
    case "low": return "var(--neon-green)";
  }
}
export function severityClass(s: Severity) {
  switch (s) {
    case "critical": return "text-[color:var(--neon-red)] border-[color:var(--neon-red)]/40 bg-[color:var(--neon-red)]/10";
    case "high": return "text-[color:var(--neon-amber)] border-[color:var(--neon-amber)]/40 bg-[color:var(--neon-amber)]/10";
    case "medium": return "text-[color:var(--neon-blue)] border-[color:var(--neon-blue)]/40 bg-[color:var(--neon-blue)]/10";
    case "low": return "text-[color:var(--neon-green)] border-[color:var(--neon-green)]/40 bg-[color:var(--neon-green)]/10";
  }
}