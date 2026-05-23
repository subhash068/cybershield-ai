import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Panel({
  title, subtitle, action, children, className, padded = true,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={cn("glass-panel rounded-lg relative overflow-hidden", className)}>
      {(title || action) && (
        <header className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            {title && <h3 className="text-sm font-semibold tracking-wide">{title}</h3>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={padded ? "p-4" : ""}>{children}</div>
    </section>
  );
}