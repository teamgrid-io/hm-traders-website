import { getGlobalNetwork } from "@/lib/getGlobalNetworkSection";
import "./GlobalNetworkSection.css";


export default async function GlobalNetworkSection() {

  const data = await getGlobalNetwork();
  const section = data?.docs?.[0]; 

  return (
    <section className="global-section">

  <div className="global-header"> 
    <p className="global-tag">{section?.tag}</p>

    <h2>
      {section?.title} <span>{section?.highlight}</span>
    </h2>
  </div>

  <div className="map-container">

    {section?.mapImage?.url && (
      <img
        src={`http://localhost:3000${section.mapImage.url}`}
        className="world-map"
        alt="World Map"
      />
    )}

    {section?.locations?.map((loc: any) => (
      <div
        key={loc.id}
        className="map-pin"
        style={{
          top: `${loc.top}%`,
          left: `${loc.left}%`,
        }}
      >
        <span>{loc.country}</span>
          <img
        src="/images/vector.svg"
        className="pin-icon" 
        alt="location"
      />

      </div>
    ))}

  </div>

  <div className="global-features">

    {section?.features?.map((item: any) => (
      <div key={item.id} className="feature-card">

        {item?.icon?.url && (
          <img
            src={`http://localhost:3000${item.icon.url}`}
            alt={item.title}
          />
        )}

        <p>{item.title}</p>

      </div>
    ))}

  </div>

</section> 
  );
} 