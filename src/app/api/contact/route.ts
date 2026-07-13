import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactInfo } from "@/data/navigation";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form submission endpoint — Phase 6.0.
 *
 * Requires the RESEND_API_KEY environment variable (see .env.example).
 * Without it, this returns a clear 500 rather than crashing the build
 * or silently failing — the route compiles and deploys fine either
 * way; email sending simply won't work until a real API key is set.
 *
 * CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL are configurable via env vars
 * with sensible defaults (the approved contact email, and a
 * no-reply address on the same domain) — see .env.example for the
 * exact configuration a real deployment needs, since a "from" address
 * must be on a domain verified with Resend.
 */
export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "طلب غير صالح." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const service = payload.service?.trim() ?? "";

  // Server-side validation mirrors the client-side checks — defense in
  // depth, since the client's JS validation can always be bypassed.
  const errors: Record<string, string> = {};
  if (!name) errors.name = "الاسم مطلوب";
  if (!email) errors.email = "البريد الإلكتروني مطلوب";
  else if (!EMAIL_REGEX.test(email)) errors.email = "الرجاء إدخال بريد إلكتروني صحيح";
  if (!message) errors.message = "الرسالة مطلوبة";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, fieldErrors: errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { success: false, error: "تعذر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا أو التواصل عبر البريد الإلكتروني مباشرة." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || contactInfo.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Resala Website <no-reply@resalaagency.com>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `رسالة جديدة من نموذج التواصل — ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8;">
          <h2>رسالة جديدة من نموذج التواصل</h2>
          <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
          ${company ? `<p><strong>الشركة:</strong> ${escapeHtml(company)}</p>` : ""}
          <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>رقم الهاتف:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${service ? `<p><strong>الخدمة المطلوبة:</strong> ${escapeHtml(service)}</p>` : ""}
          <p><strong>الرسالة:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { success: false, error: "تعذر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}

/** Minimal HTML-escaping for values interpolated into the email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
