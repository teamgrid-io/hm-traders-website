import {  getMedia } from "@/lib/api";
import "./Partners.css";

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
          {images.map((img, i) =>
            img?.source_url ? (
              <div key={i} className="partner-card">
                <img
                  src={img.source_url}
                  alt={img.alt_text || "partner"}
                />
              </div>
            ) : null
          )}
        </div>

      </div>
    </section>
  );
}