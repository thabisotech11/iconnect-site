import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/section";
import { FaqContent } from "@/components/shared/faq-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about buying, trading in, selling, warranty, repairs, delivery and payments at iConnect Pre-Owned.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="section-y !pt-12">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about buying, selling, warranty and delivery."
          align="center"
          className="mx-auto"
        />

        <FaqContent />

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-line bg-surface p-8 text-center">
          <h2 className="text-lg font-bold text-ink">Still have a question?</h2>
          <p className="mt-2 text-sm text-ink-soft">Our support team typically replies within a few hours.</p>
          <a href="/contact" className="btn-primary btn-md mt-5 inline-flex">
            Contact us
          </a>
        </div>
      </Container>
    </div>
  );
}
