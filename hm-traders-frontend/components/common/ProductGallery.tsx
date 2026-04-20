"use client";

import { useState } from "react";
import Image from "next/image";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

// ✅ 👉 PUT TYPE HERE
type ProductGalleryProps = {
  images: (string | null)[];
  name: string;
};

export default function ProductGallery({
  images = [],
  name,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage =
    constructMediaUrl(images?.[activeIndex]) || "/fallback.png";

  return (
    <div className="gallery">
      {/* Main Image */}
      <div className="mainImage">
        <Image src={activeImage} alt={name} fill className="mainImg" />
      </div>

      {/* Thumbnails */}
      <div className="thumbnails">
        {images.map((img, i) => {
          const thumbUrl = constructMediaUrl(img) || "/fallback.png";

          return (
            <div
              key={i}
              className={`thumb ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <Image src={thumbUrl} alt={name} fill />
            </div>
          );
        })}
      </div>
    </div>
  );
}