import { SearchX } from "lucide-react";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface text-ink-faint">
            <SearchX size={28} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-ink">Page not found</h1>
          <p className="mt-3 text-ink-soft">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on
            track.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" variant="primary" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/shop" variant="outline" size="lg">
              Shop devices
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
