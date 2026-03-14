import Container from "@/components/layout/Container";
import ProductCategories from "@/components/home/ProductCategories";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Ecatalogue from "@/components/home/Ecatalogue";
import OurProductCategory from "@/components/home/OurProductCategory";
import ProductTools from "@/components/home/ProductTools";
import { getProducts } from "@/lib/getProducts";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import Partners from "@/components/home/Partners";
import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
export default async function Home() {
  const posts = await getProducts();
const banner = await fetchBannerBySlug("home");
 
 
  return (
    <div>
    <Container>
      <HomeBanner slug={banner} />
      {/* <HeroSection/>
      <ProductCategories />
      <Ecatalogue /> */}
      <OurProductCategory /> 
      <ProductTools />
      <Partners/>
      <GlobalNetworkSection/> 
    </Container>
          {/* <WhyChooseUs/> */}
</div> 
  );
}
