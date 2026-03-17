import Image from "next/image";
import "./ProductTools.css";
import { getProductToolsSection } from "@/lib/getProductToolsSection";
import {getCategories} from "@/lib/getCategories";
import Container from "../layout/Container";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import ToolsSection from "../common/ToolSection";
export default async function ProductTools() {

  const data = await getCategories();
  console.log("categories data", data);
  const section = data;

  return ( 
    <section className="category-section">

       <Container>
        {/* <div className="tools-header"> */}
<ToolsSection slug={"home" }sectionKey="our_category" />
        {/* <div>
          <p className="tools-tag">★ {section?.smallTitle}</p>

          <h2>
            {section?.heading} <span>{section?.highlightWord}</span>
          </h2>
        </div>

        <a className="view-all">
          {section?.viewAllText} →
        </a> */}

      {/* </div> */}
<div className="tools-grid">
  {section?.slice(0, 4)?.map((tool: any) => (
    <div key={tool.id} className="tool-card">

      {tool?.images?.[0]?.url && (
        <Image
          src={constructMediaUrl(tool.images[0].url)}
          alt={tool.images[0].alt || tool.name}
          fill
          className="tool-img"
        />
      )}

      <div className="tool-overlay">
        <p>{tool.name}</p> {/* ✅ use name instead of title */}
      </div>

    </div>
  ))}
</div>

      </Container>
    </section>
  );
}