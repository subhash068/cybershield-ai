import { Link, useRouterState } from "@tanstack/react-router";
import {
  Shield,
  Activity,
  LogIn,
  Radio,
  Globe2,
  Users,
  Brain,
  ShieldAlert,
  BellRing,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Executive", icon: Shield },
  { to: "/threats", label: "Threat Intelligence", icon: Activity },
  { to: "/logins", label: "Login Analytics", icon: LogIn },
  { to: "/live", label: "Live Attack Feed", icon: Radio },
  { to: "/geo", label: "Geolocation Intel", icon: Globe2 },
  { to: "/behavior", label: "User Behavior", icon: Users },
  { to: "/ai", label: "AI Detection", icon: Brain },
  { to: "/incidents", label: "Incidents", icon: ShieldAlert },
  { to: "/alerts", label: "Alert Center", icon: BellRing },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[color:var(--sidebar-border)]",
        "bg-[color:var(--sidebar)]/90 backdrop-blur-xl transition-[width] duration-300",
        collapsed ? "w-[68px]" : "w-[244px]",
      )}
    >
      <div className="flex items-center gap-2 px-4 h-16 border-b border-[color:var(--sidebar-border)]">
        <div className="relative h-9 w-9 rounded-md bg-gradient-to-br from-[color:var(--neon-blue)] to-[color:var(--neon-cyan)] grid place-items-center glow-blue shrink-0">
          <Shield className="h-5 w-5 text-[color:var(--primary-foreground)]" />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <div className="font-semibold tracking-wider text-sm">
              CYBER<span className="neon-text">SHIELD</span>
            </div>
            <div className="text-[10px] text-muted-foreground tracking-[0.2em]">SOC · AI</div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all group",
                "text-[color:var(--sidebar-foreground)]/80 hover:text-[color:var(--sidebar-foreground)]",
                "hover:bg-[color:var(--sidebar-accent)]",
                active &&
                  "bg-[color:var(--sidebar-accent)] text-[color:var(--sidebar-foreground)] shadow-[inset_2px_0_0_0_var(--neon-blue)]",
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active && "text-[color:var(--neon-cyan)]")} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[color:var(--neon-cyan)] glow-blue" />
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={onToggle}
        className="m-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-[color:var(--sidebar-accent)] transition"
      >
        {collapsed ? "›" : "‹ Collapse"}
      </button>
    </aside>
  );
}
