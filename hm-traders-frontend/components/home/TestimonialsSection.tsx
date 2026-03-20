// // components/TestimonialsSection.tsx
// import { getTestimonials } from "@/lib/getTestimonials";
// import { Testimonial } from "@/types/testimonial";
// import TestimonialCard from "./TestimonialCard";

// export default async function TestimonialsSection() {
//   const testimonials = await getTestimonials();

//   if (!testimonials?.length) return null;

//   return (
//     <section className="px-6 py-16 max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="mb-10">
//         <p className="text-orange-400 text-sm font-medium flex items-center gap-1 mb-2">
//           ★ Testimonial
//         </p>
//         <h2 className="text-3xl font-bold text-gray-900">
//           What Our Customers <span className="text-orange-400">Say</span>
//         </h2>
//       </div>

//       {/* Cards grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {testimonials.map((card: Testimonial) => (
//           <TestimonialCard key={card.id} card={card} />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/getTestimonials";
import { Testimonial } from "@/types/testimonial";
import TestimonialCard from "./TestimonialCard";
import "./TestimonialsSection.css";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getTestimonials();
      setTestimonials(data || []);
      setIsLoading(false);
    };
    fetchTestimonials();
  }, []);

  if (isLoading || !testimonials?.length) return null;

  const cardsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - cardsPerView);
  const showArrows = testimonials.length > cardsPerView;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsPerView,
  );

  return (
    <section className="testimonials">
      <div className="testimonials__header">
        <div className="testimonials__header-content">
          <p className="testimonials__label">
            <Image src="/images/star-1.png" alt="star" width={14} height={14} />
            Testimonial
          </p>
          <h2 className="testimonials__heading">
            What Our Customers <span>Say</span>
          </h2>
        </div>

        {showArrows && (
          <div className="testimonials__navigation">
            <button
              className="testimonials__arrow testimonials__arrow--prev"
              onClick={handlePrev}
              aria-label="Previous testimonials"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="testimonials__arrow testimonials__arrow--next"
              onClick={handleNext}
              aria-label="Next testimonials"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="testimonials__container">
        <div className="testimonials__grid">
          {visibleTestimonials.map((card: Testimonial) => (
            <TestimonialCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
