import "./Partners.css";
import { getBrands, getMedia } from "@/lib/api";

export default async function Partners({sections}: any) {

  // ✅ find correct section
  const section = sections.find(
    (item) =>
      item.acf_fc_layout === "toolsection" &&
      item.sectionkey === "our_partners"
  );

  if (!section) return null;

  // ✅ fetch all images
  const images = await Promise.all(
    (section.imagetool || []).map(async (item) => {
      if (!item.image) return null;
      return await getMedia(item.image);
    })
  );
const brands = await getBrands();
console.log("brands", brands);
const brandImages = await Promise.all(
  brands.map(async (brand: any) => {
    if (!brand?.acf?.brand_image) {
      return { ...brand, logo: null };
    }

    const img = await getMedia(brand.acf.brand_image);

    return {
      ...brand,
      logo: img?.source_url,
    };
  })
);
console.log("Fetched brands with logos:", brandImages); // Debug log  
  return (
    <section className="partners-section">
      <div className="partners-container">

        {/* ✅ tagline */}
        <p className="partners-tag">★{section?.tagline}</p>

        {/* ✅ title */}
        <h2
          className="partners-title"
          dangerouslySetInnerHTML={{ __html: section?.title }}
        />

        {/* ✅ logos */}
       <div className="partners-logos">
  {brandImages.map((brand: any) => (
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