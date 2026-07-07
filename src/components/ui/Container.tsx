import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Global grid container per spec:
 * Desktop ≥1280px: max-width 1280px, 96px outer margin
 * Tablet 768-1279px: 32px outer margin
 * Mobile <768px: 20px outer margin
 */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-content px-5 md:px-8 xl:px-24", className)}>
      {children}
    </Tag>
  );
}
