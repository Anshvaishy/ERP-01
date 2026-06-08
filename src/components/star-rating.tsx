"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  totalStars?: number;
  rating: number;
  setRating: (rating: number) => void;
};

export function StarRating({ totalStars = 5, rating, setRating }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className={cn(
              "cursor-pointer transition-colors",
              starValue <= (hover || rating) ? "text-yellow-400" : "text-muted-foreground"
            )}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star className="w-6 h-6 fill-current" />
            <span className="sr-only">Rate {starValue} out of {totalStars}</span>
          </button>
        );
      })}
    </div>
  );
}
