import { constructMediaUrl } from "@/lib/constructMediaUrl";
import "./HomeBanner.css";

export default function HomeBanner({ slug }:any) {
  const imageUrl = constructMediaUrl(slug?.heroImage?.url);
 

  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="banner-overlay"></div>

      <div className="banner-content">
        <h1 className="banner-title">
          {slug?.heroTitle || slug?.title}
        </h1>

        {slug?.heroSubtitle && (
          <p className="banner-subtitle">{slug?.heroSubtitle}</p>
        )}

       {slug?.buttons?.length > 0 && (
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
)}

        
      </div>
      {slug?.heroFeatures?.length > 0 && (
          <div className="banner-features">
            {slug.heroFeatures.map((feature, idx) => (
              <div key={idx} style={idx==1 ? { background: "#04316D",color:"#fff" } : {}} className="feature-card">
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
    </section>
  );
}