import Container from "@/components/layout/Container";
import { getProducts } from "../lib/api";
import ProductCategories from "@/components/home/ProductCategories";
import Ecatalogue from "@/components/home/Ecatalogue";

export default async function Home() {
  const posts = await getProducts();

  return (
    <Container>
      <ProductCategories />
      <Ecatalogue />
    </Container>
  );
}
