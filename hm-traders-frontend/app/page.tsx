import Container from "@/components/layout/Container";
import { getProducts } from "../lib/api";
import ProductCategories from "@/components/home/ProductCategories";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Ecatalogue from "@/components/home/Ecatalogue";

export default async function Home() {
  const posts = await getProducts();

  return (
    <div>
    <Container>
      <HeroSection/>
      <ProductCategories />
      <Ecatalogue />
    </Container>
          <WhyChooseUs/>
</div>
  );
}
