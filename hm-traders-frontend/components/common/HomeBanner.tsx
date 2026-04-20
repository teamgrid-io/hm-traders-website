import { constructMediaUrl } from "@/lib/constructMediaUrl";
import "./HomeBanner.css";
// import Container from "../layout/Container";
import Image from 'next/image'

interface BannerButton {
  label: string;
  link: string;
  id?: string | null;
}

export interface BannerFeature {
  title: string;
  description?: string | null;
  icon?: string | null;
  id?: string | null;
  column_items_icon?: string | number | null;
  column_items_icon_url?: string | null;
  column_items_content?: string;
}

interface Banner {
  id: string;
  title: string;
  slug: string;
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_image_url?: string | null;
  hero_slug?: string | null;
  hero_button_1?: { url: string; title: string };
  hero_button_2?: { url: string; title: string };
  buttons?: BannerButton[] | null;
  heroFeatures?: BannerFeature[] | null;
  updatedAt?: string;
  createdAt?: string;
}

interface ThreeBannerCards {
  column_items: BannerFeature[];
}

type HomeBannerProps = {
  slug: Banner;
  heroFeatures?: ThreeBannerCards;
};

export default function HomeBanner({ slug, heroFeatures }: HomeBannerProps) {
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
        {heroFeatures?.column_items && heroFeatures.column_items.length > 0 && (
          <div className="banner-features">
            {(heroFeatures?.column_items ?? []).map((feature, idx) => {
              const iconUrl = feature.column_items_icon_url ?? "";
              return (
                <div
                  key={idx}
                  style={
                    idx === 1 ? { background: "#04316D", color: "#fff" } : {}
                  }
                  className="feature-card"
                >
                  {iconUrl !== "" && (
                    <Image
                      src={iconUrl}
                      alt={feature.column_items_content || feature.title || "Feature icon"}
                      className="feature-icon"
                      width={50}
                      height={50}
                    />
                  )}
                  <h3>{feature.column_items_content || feature.title}</h3>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
