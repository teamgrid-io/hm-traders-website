import { constructMediaUrl } from "@/lib/constructMediaUrl";
import "./HomeBanner.css";
import Container from "../layout/Container";

export default function HomeBanner({ slug }: any) {
  const imageUrl = constructMediaUrl(slug?.hero_image_url);

  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${imageUrl})`,
        marginBottom: slug?.slug === "home" ? "50px" : "0px",
      }}
    >
      <div className="banner-overlay"></div>
      <div
        className="banner-container"
        style={
          slug?.hero_slug == "home"
            ? { justifyContent: "space-between" }
            : { justifyContent: "center" }
        }
      >
        <div className="banner-content">
          <h1 className="banner-title ">{slug?.hero_title || slug?.title}</h1>

          {slug?.hero_subtitle && (
            <p
              className="banner-subtitle lato"
              style={{
                textAlign: slug?.hero_slug !== "home" ? "center" : undefined,
              }}
              dangerouslySetInnerHTML={{ __html: slug.hero_subtitle }}
            />
          )}
          {/* {slug?.buttons?.length > 0 && (
            <div className="banner-buttons">
              {slug.buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.link}
                  className={`banner-btn ${idx === 1 ? "btn-outline" : ""}`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )} */}

          <div className="banner-buttons">
            {slug?.hero_button_1?.url && slug?.hero_button_1?.title && (
              <a href={slug.hero_button_1.url} className="banner-btn">
                {slug.hero_button_1.title}
              </a>
            )}

            {slug?.hero_button_2?.url && slug?.hero_button_2?.title && (
              <a href={slug.hero_button_2.url} className="btn-outline">
                {slug.hero_button_2.title}
              </a>
            )}
          </div>
        </div>
        {slug?.heroFeatures?.length > 0 && (
          <div className="banner-features">
            {slug.heroFeatures.map((feature, idx) => (
              <div
                key={idx}
                style={idx == 1 ? { background: "#04316D", color: "#fff" } : {}}
                className="feature-card"
              >
                {feature.icon?.url && (
                  <img
                    src={constructMediaUrl(feature.icon.url)}
                    alt={feature.title}
                    className="feature-icon"
                  />
                )}
                <h3>{feature.title}</h3>
                {feature.description && <p>{feature.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
