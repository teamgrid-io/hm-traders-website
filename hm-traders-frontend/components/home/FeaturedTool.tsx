import { getProducts } from "@/lib/getProducts";
import ToolSection from "../common/ToolSection";
import Container from "../layout/Container";
import ToolsGrid from "../common/ToolsGrid";

interface FeaturedToolProps {
  slug: string;
  sections: any[];
}

interface Product {
  acf: {
    is_featured?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

export default async function FeaturedTool({ slug, sections }: FeaturedToolProps) {
  const ProductData: Product[] = await getProducts();

  // Map ProductData to Tool[] for ToolsGrid
  const featuredProducts = ProductData.filter(
    (product) => product.acf.is_featured === true
  ).map((product) => ({
    id: product.id,
    slug: product.slug,
    title: product.title,
    imgUrl: product.imgUrl,
    acf: product.acf,
    categorySlug: product.categorySlug,
    rating: product.rating,
    reviewCount: product.reviewCount,
  }));

  return (
    <Container>
      <ToolSection sectionKey="featured_products" sections={sections} />
      <ToolsGrid tools={featuredProducts}  />
    </Container>
  );
}