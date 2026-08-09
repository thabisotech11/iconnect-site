import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { TradeInProcess } from "@/components/home/trade-in-process";
import { FinancingSection } from "@/components/home/financing-section";
import { WarrantySection } from "@/components/home/warranty-section";
import { LatestArrivals } from "@/components/home/latest-arrivals";
import { Newsletter } from "@/components/home/newsletter";

export const metadata: Metadata = {
  title: "Premium Pre-Owned Devices You Can Trust",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <TradeInProcess />
      <FinancingSection />
      <WarrantySection />
      <LatestArrivals />
      <Newsletter />
    </>
  );
}
