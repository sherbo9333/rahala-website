import type { Metadata } from "next";
import { contactInfo } from "@/data/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalSection } from "@/components/legal/LegalSection";

const title = "الشروط والأحكام";
const description = "تحكم هذه الشروط والأحكام استخدامك لموقع رحالة الإلكتروني وتعاملك مع خدماتنا.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: `${title} | رحالة`,
    description,
    url: "/terms-and-conditions",
  },
  twitter: {
    title: `${title} | رحالة`,
    description,
  },
};

/**
 * TERMS & CONDITIONS — Phase 5.11
 * Generic, neutral legal content — not a substitute for review by
 * qualified legal counsel before publication. No company-specific
 * legal claims are invented beyond what the approved company profile
 * supports (e.g. that Rahala is a Saudi company, so KSA law is a safe,
 * factual governing-law statement). Anything genuinely unknown is a
 * clearly bracketed placeholder for later replacement.
 */
export default function TermsAndConditionsPage() {
  return (
    <>
      <Section background="white" id="terms-hero">
        <Container>
          <PageHeader eyebrow="TERMS & CONDITIONS" eyebrowLatin title={title} description={description} />
          <p className="mt-6 font-arabic text-sm text-gray-300">آخر تحديث: [تاريخ آخر تحديث]</p>
        </Container>
      </Section>

      <Section background="white" id="terms-content">
        <Container className="max-w-3xl">
          <LegalSection title="١. مقدمة">
            <p>
              تحدد هذه الشروط والأحكام («الشروط») القواعد الناظمة لاستخدامك لموقع رحالة للنمو الرقمي («رحالة»،
              «نحن») الإلكتروني. يُرجى قراءة هذه الشروط بعناية قبل استخدام الموقع.
            </p>
          </LegalSection>

          <LegalSection title="٢. قبول الشروط">
            <p>
              باستخدامك لهذا الموقع، فإنك تقر بموافقتك على هذه الشروط. إذا كنت لا توافق على أي جزء منها، يُرجى
              التوقف عن استخدام الموقع.
            </p>
          </LegalSection>

          <LegalSection title="٣. استخدام الموقع">
            <p>يلتزم مستخدم الموقع بما يلي:</p>
            <ul>
              <li>استخدام الموقع لأغراض مشروعة فقط.</li>
              <li>عدم محاولة الوصول غير المصرح به إلى أي جزء من الموقع أو أنظمته.</li>
              <li>تقديم معلومات صحيحة عند التواصل معنا عبر نماذج الموقع.</li>
            </ul>
          </LegalSection>

          <LegalSection title="٤. الملكية الفكرية">
            <p>
              جميع المحتويات الموجودة على هذا الموقع — بما في ذلك النصوص والشعارات والتصاميم والرسومات — مملوكة
              لرحالة أو مرخّصة لها، وهي محمية بموجب أنظمة الملكية الفكرية المعمول بها. لا يجوز نسخ أو إعادة نشر أي
              من هذه المحتويات دون إذن كتابي مسبق من رحالة.
            </p>
          </LegalSection>

          <LegalSection title="٥. حدود المسؤولية">
            <p>
              يُقدَّم محتوى هذا الموقع «كما هو» دون أي ضمانات من أي نوع. لا تتحمل رحالة المسؤولية عن أي أضرار
              مباشرة أو غير مباشرة تنشأ عن استخدامك للموقع، إلى أقصى حد يسمح به النظام المعمول به.
            </p>
          </LegalSection>

          <LegalSection title="٦. الروابط الخارجية">
            <p>
              قد يحتوي الموقع على روابط لمواقع خارجية لا تديرها رحالة. لا تتحمل رحالة مسؤولية محتوى أو ممارسات
              خصوصية هذه المواقع الخارجية.
            </p>
          </LegalSection>

          <LegalSection title="٧. التعديلات على الشروط">
            <p>
              تحتفظ رحالة بحق تعديل هذه الشروط في أي وقت. يُعد استمرارك في استخدام الموقع بعد نشر أي تعديلات
              موافقةً على الشروط المعدَّلة.
            </p>
          </LegalSection>

          <LegalSection title="٨. القانون الحاكم">
            <p>
              تخضع هذه الشروط وتُفسَّر وفقًا لأنظمة المملكة العربية السعودية، وتختص محاكم المملكة بالفصل في أي
              نزاع ينشأ عنها.
            </p>
          </LegalSection>

          <LegalSection title="٩. تواصل معنا">
            <p>لأي استفسار بخصوص هذه الشروط والأحكام، يمكنك التواصل معنا عبر:</p>
            <ul>
              <li dir="ltr" className="text-end">
                {contactInfo.email}
              </li>
              <li dir="ltr" className="text-end">
                {contactInfo.phone}
              </li>
              <li>{contactInfo.location}</li>
              <li>الاسم النظامي: رحالة للنمو الرقمي — [رقم السجل التجاري]</li>
            </ul>
          </LegalSection>
        </Container>
      </Section>
    </>
  );
}
