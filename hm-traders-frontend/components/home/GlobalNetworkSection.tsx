import { getGlobalNetwork } from "@/lib/getGlobalNetworkSection";
import "./GlobalNetworkSection.css";

export default async function GlobalNetworkSection() {
  const data = await getGlobalNetwork();
  const section = data?.docs?.[0];

  return (
    <section className="global-network">

      <div className="global-network__header">
        <p className="global-network__tag">{section?.tag}</p>

        <h2 className="global-network__title">
          {section?.title} <span className="global-network__highlight">{section?.highlight}</span>
        </h2>
      </div>

      <div className="global-network__map">

        {section?.mapImage?.url && (
          <img
            src={`http://localhost:3000${section.mapImage.url}`}
            className="global-network__map-image"
            alt="World Map"
          />
        )}

        {section?.locations?.map((loc: any) => (
          <div
            key={loc.id}
            className="global-network__pin"
            style={{
              top: `${loc.top}%`,
              left: `${loc.left}%`,
            }}
          >
            <span className="global-network__pin-label">{loc.country}</span>

            <img
              src="/images/vector.svg"
              className="global-network__pin-icon"
              alt="location"
            />
          </div>
        ))}

      </div>

      <div className="global-network__features">

        {section?.features?.map((item: any) => (
          <div key={item.id} className="global-network__card">

            {item?.icon?.url && (
              <img
                src={`http://localhost:3000${item.icon.url}`}
                className="global-network__card-icon"
                alt={item.title}
              />
            )}

            <p className="global-network__card-text">{item.title}</p>

          </div>
        ))}

      </div>

    </section>
  );
}