import { getFeaturedTool } from "@/lib/getFeaturedTool";
import { getProducts } from "@/lib/getProducts";
import ToolSection from "../common/ToolSection";
import Container from "../layout/Container";
import ToolsGrid from "../common/ToolsGrid";

export default async function FeaturedTool({ slug }: any) {

  const data = await getFeaturedTool(slug);
  const section = data?.docs?.[0];

  const ProductData = await getProducts();

  const featuredProducts = ProductData.filter(
    (product: any) => product.isFeatureTool === true
  );

  return (
    <Container className="mb-12">
      <ToolSection slug="home" sectionKey="featured_products" />

      {/* ✅ Reusable Component */}
      <ToolsGrid tools={featuredProducts} />
    </Container>
  );
}