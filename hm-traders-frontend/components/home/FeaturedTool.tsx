import Image from "next/image";
import { getFeaturedTool } from "@/lib/getFeaturedTool";
import { getProducts } from "@/lib/getProducts";
import ToolSection from "../common/ToolSection";
import Container from "../layout/Container";

export default async function FeaturedTool({ slug }: any) {
  const data = await getFeaturedTool(slug);
  const section = data?.docs?.[0];
  const ProductData = await getProducts();
  const featuredProducts = ProductData.filter((product: any) => {
    return product.isFeatureTool === true;
  });
  return (
    <>
      <Container>
        <ToolSection slug={"home"} />
        <div className="featureTools-grid">
          {featuredProducts?.map((tool: any) => (
            <div key={tool.id} className="tool-card">
              <div className="tool-image-wrapper">
                {tool?.images[0]?.url && (
                  <Image
                    src={`http://localhost:3000${tool.images[0].url}`}
                    alt={tool.images[0].alt || tool.title}
                    fill
                    className="tool-img"
                  />
                )}
              </div>

              <div className="tool-content">
                <p className="tool-title">{tool.name}</p>

                <div className="tool-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating">({tool.rating})</span>
                  <span className="reviews">• {tool.reviewCount} Reviews</span>
                </div>

                <p className="tool-price">₹{tool.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
