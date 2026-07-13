import Link from "next/link";
import { MapPin, Mail, Phone, Instagram } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { primaryNav, services, contactInfo } from "@/data/navigation";

const INSTAGRAM_URL = "https://www.instagram.com/resala.agency";

/**
 * Global Footer.
 *
 * Phase 6.1 rebuild: replaced the earlier stacked-blocks layout (logo
 * row / 4-card info grid / 2-col links / legal row — four visually
 * separate containers with borders between them) with one cohesive
 * 12-column grid, closer to how premium agency footers actually
 * compose (brand column + link columns + contact, side by side, not
 * stacked). This removes the "empty gaps" and "unfinished" feel by
 * giving every column real content weight instead of thin strips.
 *
 * The social section uses "رسالة على المنصات" instead of a generic
 * "Follow us" — a label that names the brand rather than the action.
 */
export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <Container className="pt-16 pb-6 md:pt-20 md:pb-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo variant="white" />
            <p className="mt-5 max-w-xs font-arabic text-[15px] leading-relaxed text-white/60">
              شريكك الاستراتيجي في النمو الرقمي — منظومة متكاملة تجمع بين الاستراتيجية والتنفيذ والقياس لتحقيق نمو
              رقمي حقيقي.
            </p>

            <div className="mt-7">
              <p className="font-arabic text-xs font-semibold tracking-wide text-gold-400/90">رسالة على المنصات</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
                aria-label="رسالة على إنستغرام"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <p className="mb-4 font-arabic text-xs font-semibold tracking-wide text-gold-400/90">الصفحات</p>
            <ul className="flex flex-col gap-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-arabic text-sm text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <p className="mb-4 font-arabic text-xs font-semibold tracking-wide text-gold-400/90">خدماتنا</p>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="font-arabic text-sm text-white/70 transition-colors hover:text-white">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="mb-4 font-arabic text-xs font-semibold tracking-wide text-gold-400/90">تواصل معنا</p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-400" />
                <span className="font-arabic text-sm text-white/70">{contactInfo.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-400" />
                <a href={`mailto:${contactInfo.email}`} dir="ltr" className="font-arabic text-sm text-white/70 transition-colors hover:text-white">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-400" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="font-arabic text-sm text-white/70 transition-colors hover:text-white"
                >
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-arabic text-xs text-white/40">
            © {new Date().getFullYear()} رسالة للنمو الرقمي. جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-arabic text-xs text-white/40">
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
