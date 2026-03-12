"use client";

import { useState } from "react";
import Image from "next/image";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default function ProductGallery({ images, name }: any) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const activeImage = constructMediaUrl(images?.[activeIndex]?.url);

  return (
    <div className="gallery">

      {/* Main Image */}
      <div className="mainImage">
        <button className="arrow left" onClick={prevImage}>‹</button>

        <Image
          src={activeImage}
          alt={name}
          width={500}
          height={450}
          className="mainImg"
        />

        <button className="arrow right" onClick={nextImage}>›</button>
      </div>

      {/* Thumbnails */}
      <div className="thumbnails">
        {images?.map((img: any, i: number) => {
          const thumbUrl = constructMediaUrl(img.url);

          return (
            <div
              key={i}
              className={`thumb ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <Image src={thumbUrl} alt={name} width={80} height={80} />
            </div>
          );
        })}
      </div>
    </div>
  );
}