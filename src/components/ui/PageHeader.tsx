import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  eyebrow: string;
  /** Matches the PDF's alternating eyebrow convention — English caps
   * for technical section slides (OUR SERVICES, INDUSTRIES, ADVANTAGES). */
  eyebrowLatin?: boolean;
  number?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}

/**
 * Shared page-header pattern (eyebrow + H1 + intro line) used at the
 * top of every content page — first extracted here for the Services
 * page, since Industries, Methodology, Why Rahala, and Contact all
 * need the identical pattern per the approved spec. Renders only the
 * heading content; the caller wraps it in whatever `Section` it needs.
 *
 * Renders an <h1> — every page uses this exactly once as its single
 * top-level heading.
 */
export function PageHeader({
  eyebrow,
  eyebrowLatin = false,
  number,
  title,
  description,
  align = "start",
  className,
}: PageHeaderProps) {
  const isCentered = align === "center";

  return (
    <div className={cn(isCentered && "mx-auto flex flex-col items-center text-center", className)}>
      <EyebrowLabel number={number} latin={eyebrowLatin}>
        {eyebrow}
      </EyebrowLabel>
      <h1 className="mt-4 font-arabic text-h2 text-navy-900">{title}</h1>
      {description && (
        <p className={cn("mt-4 max-w-2xl font-arabic text-body text-gray-500", isCentered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
