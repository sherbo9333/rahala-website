"use client";

import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { services } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const inputBaseClass =
  "w-full rounded-input border bg-white px-4 py-3 font-arabic text-[15px] text-navy-900 " +
  "placeholder:text-gray-300 transition-colors duration-200 " +
  "focus:outline-none focus-visible:outline-none";

const labelClass = "mb-2 block font-arabic text-sm font-semibold text-navy-900";

type FieldName = "name" | "email" | "message";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const initialState: FormState = { name: "", company: "", email: "", phone: "", service: "", message: "" };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form — Phase 6.0: now wired to a real backend
 * (/api/contact, Resend) instead of a client-only preventDefault stub,
 * and uses JS-driven Arabic validation messages instead of the
 * browser's native (often English or inconsistent) validation
 * tooltips. Still semantic HTML throughout (label/input association,
 * aria-invalid, aria-describedby, role="alert" on error text) —
 * removing native `required` didn't remove accessibility, it moved
 * the same information into explicit, always-visible Arabic text.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(current: FormState): Partial<Record<FieldName, string>> {
    const next: Partial<Record<FieldName, string>> = {};
    if (!current.name.trim()) next.name = "الاسم مطلوب";
    if (!current.email.trim()) next.email = "البريد الإلكتروني مطلوب";
    else if (!EMAIL_REGEX.test(current.email.trim())) next.email = "الرجاء إدخال بريد إلكتروني صحيح";
    if (!current.message.trim()) next.message = "الرسالة مطلوبة";
    return next;
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear that field's error as soon as the person starts fixing it.
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as FieldName];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.error || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card border border-gray-200 bg-white p-10 text-center shadow-soft">
        <h3 className="font-arabic text-h3 text-navy-900">شكرًا لتواصلك معنا</h3>
        <p className="mt-3 font-arabic text-body text-gray-500">
          استلمنا رسالتك وسنعاود التواصل معك في أقرب وقت ممكن.
        </p>
      </div>
    );
  }

  return (
    <form className="rounded-card border border-gray-200 bg-white p-6 shadow-soft md:p-10" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            الاسم <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputBaseClass, errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-navy-900")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 font-arabic text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            الشركة <span className="font-normal text-gray-300">(اختياري)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => updateField("company", e.target.value)}
            className={cn(inputBaseClass, "border-gray-200 focus:border-navy-900")}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            البريد الإلكتروني <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              inputBaseClass,
              "text-right",
              errors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-navy-900"
            )}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 font-arabic text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            رقم الهاتف <span className="font-normal text-gray-300">(اختياري)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={cn(inputBaseClass, "text-right border-gray-200 focus:border-navy-900")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelClass}>
            الخدمة المطلوبة <span className="font-normal text-gray-300">(اختياري)</span>
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={(e) => updateField("service", e.target.value)}
              className={cn(inputBaseClass, "appearance-none pe-10 border-gray-200 focus:border-navy-900")}
            >
              <option value="" disabled>
                اختر الخدمة التي تهمك
              </option>
              {services.map((service) => (
                <option key={service.href} value={service.label}>
                  {service.label}
                </option>
              ))}
              <option value="other">أخرى</option>
            </select>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-300"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            الرسالة <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => updateField("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              inputBaseClass,
              "resize-none",
              errors.message ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-navy-900"
            )}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-1.5 font-arabic text-sm text-red-500">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="mt-6 font-arabic text-sm text-red-500">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="mt-8 w-full justify-center gap-2 sm:w-auto"
      >
        {status === "submitting" && <Loader2 size={18} aria-hidden="true" className="animate-spin" />}
        {status === "submitting" ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </Button>
    </form>
  );
}
