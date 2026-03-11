import Container from "@/components/layout/Container";
import {getProducts } from "../lib/api";
import ProductCategories from "@/components/home/ProductCategories";
export default async function Home() {
  const posts = await getProducts();

  return (
    <Container>
      <ProductCategories />
    </Container>
  );
}