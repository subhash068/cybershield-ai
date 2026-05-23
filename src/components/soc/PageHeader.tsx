import { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        {eyebrow && <div className="text-[10px] tracking-[0.3em] text-[color:var(--neon-cyan)] uppercase mb-1">{eyebrow}</div>}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}