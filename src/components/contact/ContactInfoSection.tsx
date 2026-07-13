import { MapPin, Globe, Mail, Phone } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "تواصل معنا" / Contact slide.
 * Same contactInfo data Footer already uses (data/navigation.ts) — no
 * duplication of the underlying values, just a richer Card-based
 * presentation appropriate for this page vs. the Footer's compact list.
 * No "working hours" field: not present in the approved content, so
 * not invented here.
 */
const items = [
  { icon: MapPin, label: "الموقع", value: contactInfo.location, href: undefined },
  { icon: Globe, label: "الموقع الإلكتروني", value: contactInfo.website, href: `https://${contactInfo.website}` },
  { icon: Mail, label: "البريد الإلكتروني", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: "الهاتف", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
];

export function ContactInfoSection() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="flex flex-col items-center gap-3 text-center">
          <IconBadge icon={item.icon} tone="navy" size="lg" />
          <h3 className="font-arabic text-base font-semibold text-navy-900">{item.label}</h3>
          {item.href ? (
            <a
              href={item.href}
              dir="ltr"
              className="font-arabic text-[15px] text-gray-500 transition-colors hover:text-gold-600"
            >
              {item.value}
            </a>
          ) : (
            <p className="font-arabic text-[15px] text-gray-500">{item.value}</p>
          )}
        </Card>
      ))}
    </div>
  );
}
