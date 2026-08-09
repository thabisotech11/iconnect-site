import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PRODUCTS, getProductBySlug, getRelatedProducts, getReviewsForProduct } from "@/lib/mock-data";
import { formatZAR } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel, ProductViewTracker } from "@/components/product/purchase-panel";
import { ReviewsSection } from "@/components/product/reviews";
import { ProductGrid } from "@/components/product/product-grid";
import { RecentlyViewed } from "@/components/product/recently-viewed";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.condition} Condition | ${formatZAR(product.price)}`,
    description: `${product.tagline} Certified pre-owned, ${product.condition.toLowerCase()} condition${
      product.batteryHealth ? `, ${product.batteryHealth}% battery health` : ""
    }. 30-day warranty, nationwide delivery.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const reviews = getReviewsForProduct(product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    brand: { "@type": "Brand", name: product.brand },
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      price: product.price,
      availability:
        product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating:
      product.reviewCount > 0
        ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount }
        : undefined,
  };

  return (
    <div className="py-8 sm:py-12">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductViewTracker productId={product.id} />

      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">
            {product.category}
          </Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span className="text-ink-soft">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />
          <PurchasePanel product={product} />
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_320px]">
          <div>
            <section aria-labelledby="description-heading">
              <h2 id="description-heading" className="text-2xl font-semibold text-ink">
                Description
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{product.description}</p>
            </section>

            <section aria-labelledby="specs-heading" className="mt-14">
              <h2 id="specs-heading" className="text-2xl font-semibold text-ink">
                Specifications
              </h2>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-2 gap-4 py-3.5 text-sm">
                    <dt className="text-ink-soft">{spec.label}</dt>
                    <dd className="font-medium text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="reviews-heading" className="mt-14">
              <h2 id="reviews-heading" className="mb-6 text-2xl font-semibold text-ink">
                Customer Reviews
              </h2>
              <ReviewsSection product={product} reviews={reviews} />
            </section>
          </div>

          <aside className="space-y-6 lg:mt-16">
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-ink">In the box</h3>
              <ul className="mt-3 space-y-2">
                {product.accessoriesIncluded.map((item) => (
                  <li key={item} className="text-sm text-ink-soft">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-ink">Need help deciding?</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Chat with our team on WhatsApp or explore financing plans to spread the cost.
              </p>
              <Link href="/financing" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                View financing options →
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-8 text-2xl font-semibold text-ink">
              You may also like
            </h2>
            <ProductGrid products={related} />
          </section>
        )}
      </Container>

      <RecentlyViewed excludeId={product.id} />
    </div>
  );
}
