import { getPartners } from "@/lib/getPartners";
import "./Partners.css";


export default async function Partners() {
  const partner = await getPartners();
  const section = partner?.docs?.[0]; 

  return (
   <section className="partners-section">
  <div className="partners-container">

    <p className="partners-tag">{section?.tag}</p>

    <h2 className="partners-title">
      {section?.title} <span>{section?.highlight}</span>
    </h2>

    <div className="partners-logos">
      {section?.partners?.map((item: any) => (
        <div key={item.id} className="partner-card">

          {item?.logo?.url && (
            <img
              src={`http://localhost:3000${item.logo.url}`}
              alt={item.name}
            />
          )}

        </div>
      ))}
    </div>

  </div>
</section>
  );
} 