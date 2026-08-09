import type { Product, ProductReview } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";

export function ReviewsSection({ product, reviews }: { product: Product; reviews: ProductReview[] }) {
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const maxCount = Math.max(1, ...distribution.map((d) => d.count));

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-bold text-ink">{product.rating.toFixed(1)}</span>
          <div>
            <Rating value={product.rating} showValue={false} size={16} />
            <p className="mt-1 text-sm text-ink-soft">{product.reviewCount} reviews</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-3 text-xs text-ink-soft">
              <span className="w-3">{d.star}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-caution"
                  style={{ width: `${(d.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="w-4 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="space-y-6">
        {reviews.length === 0 && (
          <li className="text-sm text-ink-soft">No reviews yet for this exact listing — check back soon.</li>
        )}
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-line pb-6 last:border-0">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent-deep">
                {initials(review.author)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-ink">{review.author}</span>
                  <span className="text-xs text-ink-faint">{review.location}</span>
                  {review.verifiedPurchase && (
                    <Badge tone="positive" className="!py-0.5 !text-[10px]">
                      Verified purchase
                    </Badge>
                  )}
                </div>
                <Rating value={review.rating} showValue={false} size={12} className="mt-1" />
                <p className="mt-2 text-sm font-medium text-ink">{review.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{review.body}</p>
                <p className="mt-2 text-xs text-ink-faint">{formatDate(review.createdAt)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
