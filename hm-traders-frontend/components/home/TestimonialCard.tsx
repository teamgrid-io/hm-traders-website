// components/home/TestimonialCard.tsx
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";

export default function TestimonialCard({ card }: { card: Testimonial }) {
  const featured = card.featured;

  return (
    <div
      className={`
      rounded-2xl p-6 flex flex-col justify-between gap-4
      ${featured ? "bg-orange-400 text-white" : "bg-white text-gray-800 shadow-md"}
    `}
    >
      {/* Title */}
      <h3 className="text-lg font-bold">{card.title}</h3>

      {/* Review */}
      <p className={`text-sm ${featured ? "text-white/90" : "text-gray-500"}`}>
        {card.review}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        {card.author.avatar?.url && (
          <Image
            src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${card.author.avatar.url}`}
            alt={card.author.avatar.alt || card.author.name}
            width={44}
            height={44}
            className="rounded-full object-cover w-11 h-11"
          />
        )}
        <div>
          <p className="font-semibold text-sm">{card.author.name}</p>
          <Stars rating={card.rating} featured={featured} />
        </div>
      </div>
    </div>
  );
}

// Star renderer
function Stars({ rating, featured }: { rating: number; featured: boolean }) {
  return (
    <div className="flex gap-0.5 mt-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-base ${
            star <= rating
              ? "text-orange-400"
              : featured
                ? "text-white/40"
                : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
