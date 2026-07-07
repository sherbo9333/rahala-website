import type { LucideIcon } from "lucide-react";

export interface ServiceNavItem {
  /** Arabic label, exact wording from the approved Company Profile PDF. */
  label: string;
  /** One-line description, exact wording from the PDF — never rewritten. */
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
  /** Present only for items that expand into a dropdown/mega-menu. */
  children?: ServiceNavItem[];
}
