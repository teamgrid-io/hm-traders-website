import { getProducts } from "@/lib/getProducts";
import ToolSection from "../common/ToolSection";
import Container from "../layout/Container";
import ToolsGrid from "../common/ToolsGrid";

export default async function FeaturedProductsTool({ slug }: any) {
  console.log("slug in featured tool", slug);
  const ProductData = await getProducts();
  const featuredProducts = ProductData.filter(
    (product: any) => product.isFeatureTool === true
  );

  return (
    <Container className="mb-12">
      <ToolSection slug={slug} sectionKey="featured_products" />

      {/* ✅ Reusable Component */}
      <ToolsGrid tools={featuredProducts} />
    </Container>
  );
}