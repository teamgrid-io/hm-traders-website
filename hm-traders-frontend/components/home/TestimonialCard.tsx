//
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import "./TestimonialCard.css";

export default function TestimonialCard({ card }: { card: Testimonial }) {
  const featured = card.featured;
  const avatarUrl = constructMediaUrl(card.author.avatar?.url);

  return (
    <div className={`card ${featured ? "card--featured" : "card--default"}`}>
      <h3 className="card__title">{card.title}</h3>

      <p
        className={`card__review ${featured ? "card__review--featured" : "card__review--default"}`}
      >
        {card.review}
      </p>

      <div className="card__author">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={card.author.avatar?.alt || card.author.name}
            width={63}
            height={63}
            className="card__avatar"
          />
        )}
        <div className="card__author-info">
          {" "}
          {/* ← change this */}
          <p className="card__author-name">{card.author.name}</p>
          <Stars rating={card.rating} featured={featured} />
        </div>
      </div>
    </div>
  );
}

function Stars({ rating, featured }: { rating: number; featured: boolean }) {
  return (
    <div className={`stars ${featured ? "stars--featured" : "stars--default"}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Image
          key={star}
          src={star <= rating ? "/images/svg.png" : "/images/svg (1).png"}
          alt={star <= rating ? "filled star" : "empty star"}
          width={16}
          height={16}
          className={`star ${star <= rating ? "star--filled" : "star--empty"} ${featured ? "star--featured" : "star--default"}`}
        />
      ))}
    </div>
  );
}
