import { Severity, severityClass } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function SeverityBadge({ s, className }: { s: Severity; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] uppercase tracking-wider font-medium", severityClass(s), className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {s}
    </span>
  );
}