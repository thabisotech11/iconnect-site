import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRating } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function Rating({ value, count, size = 14, showValue = true, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${formatRating(value)} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-caution text-caution" : "fill-line text-line"}
              aria-hidden="true"
            />
          );
        })}
      </div>
      {showValue && <span className="text-xs font-medium text-ink-soft">{formatRating(value)}</span>}
      {typeof count === "number" && <span className="text-xs text-ink-faint">({count})</span>}
    </div>
  );
}
