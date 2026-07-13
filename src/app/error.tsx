"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary — must be a Client Component per Next.js's App
 * Router requirements. Catches runtime errors in the page tree below
 * the root layout (Header/Footer keep rendering normally around it).
 *
 * Reuses PageHeader, Section, Container, and Button — same visual
 * language as the 404 page and every other page, per "preserve design
 * system." The Retry button calls `reset()` (Next.js's built-in
 * re-render mechanism); Home is a plain navigational link.
 */
export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Errors caught here are genuine runtime failures worth surfacing
    // to whatever monitoring is wired up later — logging only,
    // no behavior change.
    console.error(error);
  }, [error]);

  return (
    <Section background="white" id="error">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <AlertTriangle size={40} strokeWidth={1.25} className="mb-6 text-gold-400" aria-hidden="true" />

        <PageHeader
          eyebrow="خطأ"
          title="حدث خطأ غير متوقع"
          description="نعتذر عن الإزعاج، يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية."
          align="center"
        />

        <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Button type="button" variant="primary" className="justify-center" onClick={() => reset()}>
            إعادة المحاولة
          </Button>
          <Button href="/" variant="ghost" className="justify-center">
            العودة للرئيسية
          </Button>
        </div>
      </Container>
    </Section>
  );
}
