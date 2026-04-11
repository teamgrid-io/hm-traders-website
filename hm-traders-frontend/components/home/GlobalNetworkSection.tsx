import "./GlobalNetworkSection.css";
import Container from "../layout/Container";
import {  getMedia } from "@/lib/api";

export default async function GlobalNetworkSection({sections}: any) {
  // ✅ get all sections

  // ✅ find global section
  const wpSection = sections.find(
    (item) =>
      item.acf_fc_layout === "global_section" &&
      item.sectionkey === "global_Import"
  );
  // ❌ safety check
  if (!wpSection) return null;

  // ✅ FETCH MAP IMAGE
  const mapImage = wpSection?.mapimage
    ? await getMedia(wpSection.mapimage)
    : null;

  // ✅ FETCH FEATURE ICONS
  const featuresWithImages = await Promise.all(
    (wpSection?.features || []).map(async (item: any) => {
      if (!item?.icon) return { ...item, iconData: null };

      const iconData = await getMedia(item.icon);

      return {
        ...item,
        iconData,
      };
    })
  );

  return (
    <section className="global-network">
      <Container>

        {/* HEADER */}
        <div className="global-network__header">

          {/* tagline */}
          <p className="global-network__tag">
           ★ {wpSection?.tagline}
          </p>

          {/* title (HTML from WP) */}
          <h2
            className="global-network__title"
            dangerouslySetInnerHTML={{
              __html: wpSection?.title || "",
            }}
          />

        </div>

        {/* MAP */}
        <div className="global-network__map">

          {mapImage?.source_url && (
            <img
              src={mapImage.source_url}
              className="global-network__map-image"
              alt="World Map"
            />
          )}

          {wpSection?.locations?.map((loc: any, index: number) => (
            <div
              key={index}
              className="global-network__pin"
              style={{
                top: `${loc.top}%`,
                left: `${loc.left}%`,
              }}
            >
              <span className="global-network__pin-label">
                {loc.country}
              </span>

              <img
                src="/images/vector.svg"
                className="global-network__pin-icon"
                alt="location"
              />
            </div>
          ))}

        </div>

        {/* FEATURES */}
        <div className="global-network__features">

          {featuresWithImages.map((item: any, index: number) => (
            <div key={index} className="global-network__card">

              {item?.iconData?.source_url && (
                <img
                  src={item.iconData.source_url}
                  className="global-network__card-icon"
                  alt={item.title}
                />
              )}

              <p className="global-network__card-text">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}