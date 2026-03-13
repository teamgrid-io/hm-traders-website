import Container from "@/components/layout/Container";
import ProductCategories from "@/components/home/ProductCategories";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Ecatalogue from "@/components/home/Ecatalogue";
import { getProducts } from "@/lib/getProducts";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
export default async function Home() {
  const posts = await getProducts();
const banner = await fetchBannerBySlug("home");
 
 
  return (
    <div>
    <Container>
      <HomeBanner slug={banner} />
      <HeroSection/>
      <ProductCategories />
      <Ecatalogue />
    </Container>
          <WhyChooseUs/>
</div>
  );
}
