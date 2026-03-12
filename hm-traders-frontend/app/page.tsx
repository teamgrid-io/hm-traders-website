import Container from "@/components/layout/Container";
import ProductCategories from "@/components/home/ProductCategories";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Ecatalogue from "@/components/home/Ecatalogue";
import { getProducts } from "@/lib/getProducts";
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
