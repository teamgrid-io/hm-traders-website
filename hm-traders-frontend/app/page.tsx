import Container from "@/components/layout/Container";
import AboutHmTraders from "@/components/home/AboutHmTraders";
import OurProductCategoriesTools from "@/components/home/OurProductCategoriesTools";
import { getProducts } from "@/lib/getProducts";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import OurCategoriesTool from "@/components/home/FeaturedProductsTool";
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
        <AboutHmTraders slug={"home"} />
         </Container>
        <OurProductCategoriesTools  slug={"home"} />
        <OurCategoriesTool slug={"home"}  />
        <AdvancedInfrastructure slug={"home"} /> 
        <Partners/>
      <GlobalNetworkSection/> 
         <TestimonialsSection />

   
      {/* <WhyChooseUs/> */}
    </div>
  );
}
