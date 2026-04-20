import Image from "next/image";
import "./AboutHmTraders.css";
import { getMedia } from "@/lib/api";

interface Media {
  source_url: string;
  alt_text?: string;
}

interface ButtonTool {
  button: {
    title: string;
    url: string;
  };
}

interface Section {
  acf_fc_layout: string;
  sectionkey: string;
  tagline?: string;
  title?: string;
  subtitle?: string;
  buttontool?: ButtonTool[];
  imagetool?: { image: number }[];
}

interface AboutHmTradersProps {
  sections: Section[];
}

export default async function AboutHmTraders({ sections }: AboutHmTradersProps) {
  // ✅ Get all sections
  const section = sections.find(
    (item) =>
      item.acf_fc_layout === "toolsection" &&
      item.sectionkey === "about_hm_traders"
  );
  // ✅ Get image IDs
  const topImageId = section?.imagetool?.[0]?.image;
  const bottomImageId = section?.imagetool?.[1]?.image;

  // ✅ Fetch media (WordPress image)
  const topImage: Media | null = topImageId ? await getMedia(topImageId) : null;
  const bottomImage: Media | null = bottomImageId ? await getMedia(bottomImageId) : null;

  const heroSection = sections.find(
    (item) => item.acf_fc_layout === "hero"
  );
  const isHome = (heroSection as any)?.hero_slug === "home";
  return (
    <section className="product-section" style={{paddingTop: isHome ? "120px" : "80px"}}>
      <div className="product-container">

        {/* LEFT IMAGES */}
        <div className="product-images">

          <div className="left-image">
            {topImage?.source_url && (
              <Image
                src={topImage.source_url}
                alt={topImage.alt_text || "image"}
                fill
                className="img"
              />
            )}
          </div>

          <div className="right-image">
            {bottomImage?.source_url && (
              <Image
                src={bottomImage.source_url}
                alt={bottomImage.alt_text || "image"}
                fill
                className="img"
              />
            )}
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="product-content">

          <p className="tag">★ {section?.tagline}</p>

          {/* Title with span */}
          <h2
            dangerouslySetInnerHTML={{ __html: section?.title || "" }}
          />

          {/* Subtitle with <br> */}
          <p
            className="desc lato"
            dangerouslySetInnerHTML={{ __html: section?.subtitle || ""}}
          />

          <button className="explore-btn">
            {section?.buttontool?.[0]?.button?.title}
          </button>

        </div>

      </div>
    </section>
  );
}