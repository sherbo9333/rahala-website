import type { Metadata } from "next";
import { contactInfo } from "@/data/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalSection } from "@/components/legal/LegalSection";

const title = "سياسة الخصوصية";
const description = "توضح هذه الصفحة كيفية جمع رحالة للمعلومات واستخدامها وحمايتها عند تعاملك مع موقعنا وخدماتنا.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: `${title} | رحالة`,
    description,
    url: "/privacy-policy",
  },
  twitter: {
    title: `${title} | رحالة`,
    description,
  },
};

/**
 * PRIVACY POLICY — Phase 5.11
 * Generic, neutral legal content — not a substitute for review by
 * qualified legal counsel before publication. No company-specific
 * legal claims are invented: real approved contact details
 * (data/navigation.ts) are used where genuinely known; anything not
 * covered by the approved company profile is a clearly bracketed
 * placeholder (e.g. [رقم السجل التجاري]) for later replacement.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <Section background="white" id="privacy-hero">
        <Container>
          <PageHeader eyebrow="PRIVACY POLICY" eyebrowLatin title={title} description={description} />
          <p className="mt-6 font-arabic text-sm text-gray-300">آخر تحديث: [تاريخ آخر تحديث]</p>
        </Container>
      </Section>

      <Section background="white" id="privacy-content">
        <Container className="max-w-3xl">
          <LegalSection title="١. مقدمة">
            <p>
              تحترم رحالة للنمو الرقمي («رحالة»، «نحن») خصوصية زوار موقعنا الإلكتروني وعملائنا. توضح هذه السياسة
              أنواع المعلومات التي قد نجمعها، وكيفية استخدامها وحمايتها، والخيارات المتاحة لك بخصوص معلوماتك.
              باستخدامك لهذا الموقع، فإنك توافق على الممارسات الموضحة في هذه السياسة.
            </p>
          </LegalSection>

          <LegalSection title="٢. المعلومات التي نجمعها">
            <p>قد نجمع المعلومات التالية عند تفاعلك مع موقعنا أو تواصلك معنا:</p>
            <ul>
              <li>معلومات التعريف الشخصي التي تقدمها طواعيةً، مثل الاسم والبريد الإلكتروني ورقم الهاتف واسم الشركة.</li>
              <li>محتوى الرسائل التي ترسلها إلينا عبر نموذج التواصل.</li>
              <li>بيانات تقنية أساسية تتعلق باستخدام الموقع (مثل نوع المتصفح)، تُجمع بشكل عام دون تحديد هويتك.</li>
            </ul>
          </LegalSection>

          <LegalSection title="٣. كيف نستخدم معلوماتك">
            <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
            <ul>
              <li>الرد على استفساراتك وطلبات التواصل.</li>
              <li>تقديم خدماتنا والتواصل بخصوص الشراكة معك.</li>
              <li>تحسين موقعنا وخدماتنا بناءً على الاستخدام العام.</li>
            </ul>
          </LegalSection>

          <LegalSection title="٤. مشاركة المعلومات">
            <p>
              لا تبيع رحالة معلوماتك الشخصية لأي طرف ثالث. قد تتم مشاركة المعلومات فقط مع مزودي الخدمة الذين
              يساعدوننا في تشغيل أعمالنا (مثل استضافة الموقع)، وذلك في الحدود اللازمة لتقديم خدماتنا، أو عند
              الالتزام بذلك بموجب النظام في المملكة العربية السعودية.
            </p>
          </LegalSection>

          <LegalSection title="٥. ملفات تعريف الارتباط">
            <p>
              قد يستخدم الموقع ملفات تعريف ارتباط أساسية لضمان عمل الموقع بشكل صحيح. لمزيد من المعلومات حول
              الملفات التي قد تُستخدم مستقبلًا، يرجى التواصل معنا عبر البيانات أدناه.
            </p>
          </LegalSection>

          <LegalSection title="٦. أمن المعلومات">
            <p>
              نتخذ إجراءات معقولة لحماية معلوماتك من الوصول أو الاستخدام أو الإفصاح غير المصرح به. مع ذلك، لا
              توجد وسيلة نقل عبر الإنترنت آمنة بشكل كامل، ولا يمكننا ضمان الأمان المطلق للمعلومات.
            </p>
          </LegalSection>

          <LegalSection title="٧. حقوقك">
            <p>
              يحق لك طلب الاطلاع على معلوماتك الشخصية التي نحتفظ بها، أو طلب تصحيحها أو حذفها، وذلك بالتواصل معنا
              عبر بيانات التواصل الموضحة أدناه.
            </p>
          </LegalSection>

          <LegalSection title="٨. التغييرات على هذه السياسة">
            <p>
              قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ آخر
              تعديل أعلاه.
            </p>
          </LegalSection>

          <LegalSection title="٩. تواصل معنا">
            <p>لأي استفسار بخصوص سياسة الخصوصية هذه، يمكنك التواصل معنا عبر:</p>
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
