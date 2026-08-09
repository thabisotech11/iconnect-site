import { getFeaturedProducts } from "@/lib/mock-data";
import { Container, SectionHeading, Reveal } from "@/components/ui/section";
import { ProductGrid } from "@/components/product/product-grid";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="section-y" aria-labelledby="featured-heading" id="featured">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Handpicked"
            title="Featured devices"
            description="Our top-certified picks this week, chosen for exceptional condition and value."
          />
          <Reveal delay={0.1}>
            <ButtonLink href="/shop" variant="ghost" size="md" className="shrink-0">
              View all
              <ArrowRight size={15} aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
