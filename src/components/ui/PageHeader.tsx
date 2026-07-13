import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}

/**
 * Shared page-header pattern (eyebrow + H1 + intro line) used at the
 * top of every content page. Renders only the heading content; the
 * caller wraps it in whatever `Section` it needs.
 *
 * Renders an <h1> — every page uses this exactly once as its single
 * top-level heading.
 */
export function PageHeader({ eyebrow, title, description, align = "start", className }: PageHeaderProps) {
  const isCentered = align === "center";

  return (
    <div className={cn(isCentered && "mx-auto flex flex-col items-center text-center", className)}>
      <EyebrowLabel>{eyebrow}</EyebrowLabel>
      <h1 className="mt-5 font-arabic text-h2 text-navy-900">{title}</h1>
      {description && (
        <p className={cn("mt-5 max-w-2xl font-arabic text-body text-gray-500", isCentered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
