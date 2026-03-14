import Image from "next/image";
import "./productCategory.css";
import { getCategorySection } from "@/lib/getCategorySection";

export default async function OurProductCategory() {

  const data = await getCategorySection();

  const section = data?.docs?.[0];

  return (
    <section className="product-section">
      <div className="product-container">

        {/* LEFT IMAGES */}
        <div className="product-images"> 

          <div className="left-image">
            {section?.images?.topImage?.url && (
              <Image
                src={`http://localhost:3000${section.images.topImage.url}`}
                alt={section.images.topImage.alt || "image"}
                fill
                className="img"
              />
            )}
          </div>

          <div className="right-image">
            {section?.images?.bottomImage?.url && (
              <Image
                src={`http://localhost:3000${section.images.bottomImage.url}`}
                alt={section.images.bottomImage.alt || "image"}
                fill
                className="img"
              />
            )}
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="product-content">

          <p className="tag">★ {section?.smallTitle}</p>

          <h2>
            {section?.heading}
            <span>{section?.highlightWord}</span>
          </h2>

          <p className="desc"> 
          {section?.description1 }
          </p>

          <p className="desc">
            {section?.description2}
          </p>

          <button className="explore-btn">
            {section?.buttonText}
          </button>

        </div>

      </div>
    </section>
  );
} 