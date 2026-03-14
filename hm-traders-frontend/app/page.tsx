import Container from "@/components/layout/Container";
import ProductCategories from "@/components/home/ProductCategories";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Ecatalogue from "@/components/home/Ecatalogue";
import OurProductCategory from "@/components/home/OurProductCategory";
import ProductTools from "@/components/home/ProductTools";
import { getProducts } from "@/lib/getProducts";
import { getBanner } from "@/lib/getBanner";

import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import FeaturedTool from "@/components/home/FeaturedTool";
export default async function Home() {
  const posts = await getProducts();
const banner = await fetchBannerBySlug("home");
 
 
  return (
    <div>
       <HomeBanner slug={banner} />
    <Container>
     
      {/* <HeroSection/>
      <ProductCategories />
      <Ecatalogue /> */}
      <OurProductCategory /> 
      <ProductTools />
      <FeaturedTool />
    </Container>
          {/* <WhyChooseUs/> */}
</div> 
  );
}
