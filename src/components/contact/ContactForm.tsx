"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { services } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const inputClass =
  "w-full rounded-input border border-gray-200 bg-white px-4 py-3 font-arabic text-[15px] text-navy-900 " +
  "placeholder:text-gray-300 transition-colors duration-200 " +
  "focus:border-blue-600 focus:outline-none focus-visible:outline-none";

const labelClass = "mb-2 block font-arabic text-sm font-semibold text-navy-900";

/**
 * Contact form — semantic <form>/<label>/<input> throughout, native
 * HTML5 validation only (required / type="email" / type="tel"), no
 * client-side JS validation library, no backend, no API call, no
 * submission logic: submitting simply prevents the default page
 * reload and shows an inline confirmation message. Wiring this to a
 * real endpoint is explicitly out of scope for this phase.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
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
    <form
      className="rounded-card border border-gray-200 bg-white p-6 shadow-soft md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            الاسم <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            الشركة <span className="font-normal text-gray-300">(اختياري)</span>
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            البريد الإلكتروني <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            className={cn(inputClass, "text-right")}
          />
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
            className={cn(inputClass, "text-right")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelClass}>
            الخدمة المطلوبة <span className="font-normal text-gray-300">(اختياري)</span>
          </label>
          <div className="relative">
            <select id="service" name="service" defaultValue="" className={cn(inputClass, "appearance-none pe-10")}>
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
          <textarea id="message" name="message" required rows={5} className={cn(inputClass, "resize-none")} />
        </div>
      </div>

      <Button type="submit" variant="primary" className="mt-8 w-full justify-center sm:w-auto">
        إرسال الرسالة
      </Button>
    </form>
  );
}
