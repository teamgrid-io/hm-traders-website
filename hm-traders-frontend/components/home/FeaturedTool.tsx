import Image from "next/image";
import './FeaturedTool.css'
import { getFeaturedTool } from "@/lib/getFeaturedTool";

export default async function FeaturedTool() {

  const data = await getFeaturedTool();
  console.log("data",data)
  const section = data?.docs?.[0];

  return ( 
    <section className="feartureTools-section">
 
      <div className="featureTools-header">

        <div>
          <p className="featureTools-tag">★ {section?.smallTitle}</p>

          <h2>
            {section?.heading} <span>{section?.highlightWord}</span>
          </h2>
        </div>

        <a className="view-all">
          {section?.viewAllText} →
        </a>

      </div>

      <div className="featureTools-grid">
        {section?.tools?.map((tool: any) => (
          <div key={tool.id} className="tool-card">

  <div className="tool-image-wrapper">
    {tool?.image?.url && (
      <Image
        src={`http://localhost:3000${tool.image.url}`}
        alt={tool.image.alt || tool.title}
        fill
        className="tool-img"
      />
    )}
  </div>

  <div className="tool-content">

    <p className="tool-title">{tool.title}</p>

    <div className="tool-rating">
      <span className="stars">★★★★★</span>
      <span className="rating">(5.0)</span>
      <span className="reviews">• 120 Reviews</span>
    </div>

    <p className="tool-price">₹589.70</p>

  </div>

</div>
        ))}
      </div>

    </section>
  );
}