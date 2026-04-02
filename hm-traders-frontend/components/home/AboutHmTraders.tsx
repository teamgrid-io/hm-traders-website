import Image from "next/image";
import "./AboutHmTraders.css";
import { getFeatureSections } from "@/lib/getFeatureSections";
import {constructMediaUrl} from "@/lib/constructMediaUrl";
export default async function AboutHmTraders({ slug }: any) {

  const data = await getFeatureSections(slug);
console.log("feature sections data", data); 
  // ✅ correct section filtering
  const section = data?.sections?.find(
    (item: any) => item.sectionKey === "about_hm_traders"
  );
console.log("filtered section", section);
  // ✅ images from array
  const topImage = section?.images?.[0]?.image;
  const bottomImage = section?.images?.[1]?.image;

  return (
    <section className="product-section">
      <div className="product-container">

        {/* LEFT IMAGES */}
        <div className="product-images">

          <div className="left-image">
            {topImage?.url && (
              <Image
                src={constructMediaUrl(topImage.url)}
                alt={section?.images?.[0]?.alt || "image"}
                fill
                className="img"
              />
            )}
          </div>

          <div className="right-image">
            {bottomImage?.url && (
              <Image
                src={constructMediaUrl(bottomImage.url)}
                alt={section?.images?.[1]?.alt || "image"}
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
            <span> {section?.highlightWord}</span>
          </h2>

          {/* ✅ descriptions array */}
          {section?.descriptions?.map((desc: any, i: number) => (
            <p key={i} className="desc">
              {desc.text}
            </p>
          ))}

          {/* ✅ button */}
          {section?.buttons?.[0] && (
            <button className="explore-btn">
              {section.buttons[0].label}
            </button>
          )}

        </div>

      </div>
    </section>
  );
}