import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckListItem {
  title: string;
  description?: string;
}

interface CheckListProps {
  items: CheckListItem[];
  className?: string;
}

/**
 * Generic checklist-row primitive: icon + title (+ optional
 * description). Built fresh for the Service Detail pages' Key
 * Benefits section, where each item is a short phrase with no
 * sub-description needed.
 *
 * Note: this is visually similar to the checklist patterns already
 * used on the (frozen) Methodology and Why Rahala pages — but those
 * were built before this shared primitive existed, and refactoring
 * them now would mean modifying frozen pages. Logged as TD-005.
 */
export function CheckList({ items, className }: CheckListProps) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-3">
          <CheckCircle2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-navy-900" strokeWidth={1.75} />
          <div>
            <p className="font-arabic text-[15px] font-medium text-navy-900">{item.title}</p>
            {item.description && (
              <p className="mt-0.5 font-arabic text-sm leading-relaxed text-gray-500">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
