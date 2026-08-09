import type { Metadata } from "next";
import { Container } from "@/components/ui/section";
import { AccountContent } from "@/components/shared/account-content";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <div className="section-y !pt-12">
      <Container>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">My Account</h1>
        <p className="mt-2 text-ink-soft">Track orders, manage addresses and update your details.</p>
        <div className="mt-10">
          <AccountContent />
        </div>
      </Container>
    </div>
  );
}
