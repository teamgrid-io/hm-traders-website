// components/TestimonialsSection.tsx
import { getTestimonials } from "@/lib/getTestimonials";
import { Testimonial } from "@/types/testimonial";
import TestimonialCard from "./TestimonialCard";

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  if (!testimonials?.length) return null;

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-orange-400 text-sm font-medium flex items-center gap-1 mb-2">
          ★ Testimonial
        </p>
        <h2 className="text-3xl font-bold text-gray-900">
          What Our Customers <span className="text-orange-400">Say</span>
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((card: Testimonial) => (
          <TestimonialCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
