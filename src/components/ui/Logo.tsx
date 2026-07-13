import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "white" | "navy";
  className?: string;
}

export function Logo({ variant = "white", className }: LogoProps) {
  const src = variant === "white" ? "/assets/logo-white.png" : "/assets/logo-navy.png";

  return (
    <Link href="/" aria-label="رسالة — الصفحة الرئيسية" className={className}>
      <Image
        src={src}
        alt="رسالة"
        width={140}
        height={79}
        priority
        className="h-14 w-auto md:h-16"
      />
    </Link>
  );
}
