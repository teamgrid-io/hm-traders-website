

import Image from "next/image";
import { getTestimonials } from "@/lib/getTestimonials";
import { Testimonial } from "@/types/testimonial";
import TestimonialCard from "./TestimonialCard";
import "./TestimonialsSection.css";

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  if (!testimonials?.length) return null;

  return (
    <section className="testimonials">
      <div className="testimonials__header">
        <p className="testimonials__label">
         ★ Testimonial
        </p>
        <h2 className="testimonials__heading">
          What Our Customers <span>Say</span>
        </h2>
      </div>

      <div className="testimonials__grid">
        {testimonials.map((card: Testimonial) => (
          <TestimonialCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
