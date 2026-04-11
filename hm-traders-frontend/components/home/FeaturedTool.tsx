import { getProducts } from "@/lib/getProducts";
import ToolSection from "../common/ToolSection";
import Container from "../layout/Container";
import ToolsGrid from "../common/ToolsGrid";

export default async function FeaturedTool({ slug ,sections}: any) {


  const ProductData = await getProducts();

  const featuredProducts = ProductData.filter(
    (product: any) => product.acf.is_featured === true
  );


  return (
    <Container >
      <ToolSection slug="home" sectionKey="featured_products" sections={sections}/>

      <ToolsGrid tools={featuredProducts} enableLink={true} basePath = {`/products`}/>
    </Container>
  );
}