import { Search, Bell, Sparkles, Activity, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function TopNav() {
  const [counter, setCounter] = useState(642);
  useEffect(() => {
    const id = setInterval(() => setCounter((c) => c + Math.floor(Math.random() * 7) - 2), 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-[color:var(--background)]/70 backdrop-blur-xl">
      <div className="h-full px-4 flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search IPs, users, IOCs, incidents…"
              className="w-full h-9 rounded-md bg-[color:var(--input)]/60 border border-border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--neon-blue)]/40"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-md border border-border bg-card/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--neon-red)] opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--neon-red)]" />
            </span>
            <span className="text-xs text-muted-foreground">LIVE</span>
            <span className="text-sm font-mono neon-text-red">{counter}/min</span>
          </div>

          <button className="hidden md:flex items-center gap-2 px-3 h-9 rounded-md border border-border bg-card/40 text-xs text-muted-foreground hover:text-foreground">
            <Activity className="h-3.5 w-3.5 text-[color:var(--neon-green)]" /> Systems Nominal
          </button>

          <button className="h-9 px-3 rounded-md border border-[color:var(--neon-blue)]/40 bg-[color:var(--neon-blue)]/10 text-xs flex items-center gap-2 hover:bg-[color:var(--neon-blue)]/20 transition">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--neon-cyan)]" />
            <span className="neon-text">Ask AI</span>
          </button>

          <button className="relative h-9 w-9 grid place-items-center rounded-md border border-border bg-card/40 hover:bg-card/70 transition">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full text-[10px] bg-[color:var(--neon-red)] text-white grid place-items-center animate-blink">
              14
            </span>
          </button>

          <button className="flex items-center gap-2 h-9 pl-2 pr-3 rounded-md border border-border bg-card/40 hover:bg-card/70 transition">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[color:var(--neon-blue)] to-[color:var(--neon-purple)]" />
            <span className="text-xs hidden sm:inline">k.amaya</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* live threat ticker */}
      <div className="h-7 overflow-hidden border-t border-border bg-card/30">
        <div className="animate-ticker whitespace-nowrap py-1 text-[11px] tracking-wider flex gap-10 will-change-transform">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10">
              <span className="text-[color:var(--neon-red)]">● CRITICAL</span>
              <span className="text-muted-foreground">
                Brute-force burst from 185.244.0.0/22 — 4,212 attempts/min
              </span>
              <span className="text-[color:var(--neon-amber)]">● HIGH</span>
              <span className="text-muted-foreground">
                Anomalous token reuse — svc-payments → k8s-prod
              </span>
              <span className="text-[color:var(--neon-cyan)]">● AI</span>
              <span className="text-muted-foreground">
                87% similarity to LockBit 3.0 staging on smb-share
              </span>
              <span className="text-[color:var(--neon-red)]">● CRITICAL</span>
              <span className="text-muted-foreground">
                Outbound DNS tunneling to unknown TLD — dmz-srv-03
              </span>
              <span className="text-[color:var(--neon-green)]">● INFO</span>
              <span className="text-muted-foreground">
                EDR signatures updated — 14,221 new IOCs
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
