import Image from "next/image";
import "./ProductTools.css";
import { getProductToolsSection } from "@/lib/getProductToolsSection";
import Container from "../layout/Container";

export default async function ProductTools() {

  const data = await getProductToolsSection();
  const section = data?.docs?.[0];

  return ( 
    <section className="tools-section">
 
      <Container>
        <div className="tools-header">

        <div>
          <p className="tools-tag">★ {section?.smallTitle}</p>

          <h2>
            {section?.heading} <span>{section?.highlightWord}</span>
          </h2>
        </div>

        <a className="view-all">
          {section?.viewAllText} →
        </a>

      </div>

      <div className="tools-grid">
        {section?.tools?.map((tool: any) => (
          <div key={tool.id} className="tool-card">

            {tool?.image?.url && (
              <Image
                src={`http://localhost:3000${tool.image.url}`}
                alt={tool.image.alt || tool.title}
                fill
                className="tool-img"
              />
            )}

            <div className="tool-overlay">
              <p>{tool.title}</p>
            </div>

          </div>
        ))}
      </div>

      </Container>
    </section>
  );
}