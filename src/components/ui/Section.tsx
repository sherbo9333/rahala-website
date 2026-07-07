import { cn } from "@/lib/cn";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Background per spec: white sections alternate with gray-50 and
   * navy "dark island" bands to create rhythm (see Design System §1.1). */
  background?: "white" | "gray" | "navy";
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}

/**
 * Standardizes section vertical padding: 128px desktop / 80px tablet
 * / 64px mobile, per the Design System's spacing scale. Every Home
 * and page section should be wrapped in this rather than reimplementing
 * padding ad hoc, so the whole site keeps one consistent rhythm.
 */
export function Section({ children, className, background = "white", as: Tag = "section", id }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-16 md:py-20 lg:py-32",
        background === "white" && "bg-white",
        background === "gray" && "bg-gray-50",
        background === "navy" && "bg-navy-900 text-white",
        className
      )}
    >
      {children}
    </Tag>
  );
}
