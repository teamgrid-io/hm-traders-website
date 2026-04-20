import "./Partners.css";
import { getBrands, getMedia } from "@/lib/api";

interface Media {
  source_url: string;
  alt_text?: string;
}

interface Brand {
  id: string;
  name: string;
  link: string;
  acf?: {
    brand_image?: number;
  };
  logo?: string | null;
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
  buttontool?: ButtonTool[];
  imagetool?: { image: number }[];
}

interface PartnersProps {
  sections: Section[];
}

export default async function Partners({ sections }: PartnersProps) {
  // ✅ find correct section
  const section = sections.find(
    (item) =>
      item.acf_fc_layout === "toolsection" &&
      item.sectionkey === "our_partners"
  );
  if (!section) return null;

  // ✅ fetch all images
  const images: (Media | null)[] = await Promise.all(
    (section.imagetool || []).map(async (item) => {
      if (!item.image) return null;
      return await getMedia(item.image);
    })
  );
  const brands: Brand[] = await getBrands();
  const brandImages: Brand[] = await Promise.all(
    brands.map(async (brand) => {
      if (!brand?.acf?.brand_image) {
        return { ...brand, logo: null };
      }
      const img = await getMedia(brand.acf.brand_image);
      return {
        ...brand,
        logo: img?.source_url ?? null,
      };
    })
  );
  return (
    <section className="partners-section">
      <div className="partners-container">
        {/* ✅ tagline */}
        <p className="partners-tag">★{section?.tagline}</p>
        {/* ✅ title */}
        <h2
          className="partners-title"
          dangerouslySetInnerHTML={{ __html: section?.title || "" }}
        />
        {/* ✅ logos */}
        <div className="partners-logos">
          {brandImages.map((brand) => (
            <a key={brand.id} href={brand.link} className="partner-card">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} />
              ) : (
                <span>{brand.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}