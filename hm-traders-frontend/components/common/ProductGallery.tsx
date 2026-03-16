"use client";

import { useState } from "react";
import Image from "next/image";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default function ProductGallery({ images, name }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = constructMediaUrl(images?.[activeIndex]?.url);

  return (
    <div className="gallery">

      {/* Main Image */}
      <div className="mainImage">
        <Image
          src={activeImage}
          alt={name}
          width={500}
          height={450}
          className="mainImg"
        />
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