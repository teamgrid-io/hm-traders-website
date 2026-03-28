import Image from "next/image";
import "./ProductTools.css";
import { getProductToolsSection } from "@/lib/getProductToolsSection";
import { getCategories } from "@/lib/getCategories";
import Container from "../layout/Container";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import ToolsSection from "../common/ToolSection";
export default async function ProductTools() {
  const data = await getCategories();
  const section = data;

  return (
    <section className="category-section">
      <Container>
        <ToolsSection slug={"home"} sectionKey="our_category" />

        <div className="tools-grid">
          {section?.slice(0, 4)?.map((tool: any) => (
            <div key={tool.id} className="tools-cards">
              {tool?.images?.[0]?.url && (
                <Image
                  src={constructMediaUrl(tool.images[0].url)}
                  alt={tool.images[0].alt || tool.name}
                  fill
                  className="tools-img"
                />
              )}

              <div className="tool-overlay">
                <p>{tool.name}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
