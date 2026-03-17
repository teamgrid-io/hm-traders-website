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
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Partners from "@/components/home/Partners";
import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
import AdvancedInfrastructure from "@/components/home/AdvancedInfrastructure";
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
         </Container>
        <ProductTools />
        <FeaturedTool slug={"home"} />
        <AdvancedInfrastructure /> 
        <Partners/>
      <GlobalNetworkSection/> 
         <TestimonialsSection />

   
      {/* <WhyChooseUs/> */}
    </div>
  );
}
