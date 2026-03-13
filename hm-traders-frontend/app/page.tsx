import Container from "@/components/layout/Container";
import ProductCategories from "@/components/home/ProductCategories";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Ecatalogue from "@/components/home/Ecatalogue";
import { getProducts } from "@/lib/getProducts";
import { getBanner } from "@/lib/getBanner";

export default async function Home() {
  const posts = await getProducts();
  const banner = await getBanner("home");

  return (
    <div>
      <Container>
        <HeroSection banner={banner} /> <ProductCategories />
        <Ecatalogue />
      </Container>
      <WhyChooseUs />
    </div>
  );
}
