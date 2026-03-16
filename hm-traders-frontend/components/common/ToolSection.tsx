import Image from "next/image";
import './ToolSection.css'
import { getFeaturedTool } from "@/lib/getFeaturedTool";
import { getProducts } from "@/lib/getProducts";

export default async function ToolSection({ slug }:any) {

  const data = await getFeaturedTool(slug);
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

        <a className="feature-view-all">
          {section?.viewAllText} →
        </a>

      </div>

    </section>
  );
}