import Link from "next/link";
import { MapPin, Globe, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav, services, contactInfo } from "@/data/navigation";

const infoItems = [
  { icon: MapPin, label: "الموقع", value: contactInfo.location, href: undefined },
  { icon: Globe, label: "الموقع الإلكتروني", value: contactInfo.website, href: `https://${contactInfo.website}` },
  { icon: Mail, label: "البريد الإلكتروني", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: "الهاتف", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
];

/**
 * Global Footer, per spec: navy background, 4-column contact grid
 * (matching the PDF's own Contact slide layout exactly), repeated CTA,
 * services sitemap column, slim legal row.
 */
export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-center">
          <Logo variant="white" />
          <Button href="/get-started" variant="ghost-light">
            ابدأ شراكتك مع رحالة الآن
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {infoItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <item.icon size={18} aria-hidden="true" className="text-gold-400" />
              </div>
              <div>
                <p className="font-arabic text-sm font-semibold text-gold-400">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-arabic text-[15px] text-white/80 transition-colors hover:text-white" dir="ltr">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-arabic text-[15px] text-white/80">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 py-10 sm:grid-cols-3 lg:grid-cols-4">
          <div>
            <p className="mb-3 font-arabic text-sm font-semibold text-white/50">الصفحات</p>
            <ul className="flex flex-col gap-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-arabic text-sm text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-2 lg:col-span-3">
            <p className="mb-3 font-arabic text-sm font-semibold text-white/50">خدماتنا</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="font-arabic text-sm text-white/70 transition-colors hover:text-white">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-arabic text-xs text-white/40">
            © {new Date().getFullYear()} رحالة للنمو الرقمي. جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-arabic text-xs text-white/40">
            <span>شريكك الاستراتيجي في النمو الرقمي</span>
            <span aria-hidden="true">·</span>
            <Link href="/privacy-policy" className="transition-colors hover:text-white/70">
              سياسة الخصوصية
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white/70">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
