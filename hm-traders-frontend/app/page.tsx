import Container from "@/components/layout/Container";
import ProductCategories from "@/components/home/ProductCategories";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Ecatalogue from "@/components/home/Ecatalogue";
import AboutHmTraders from "@/components/home/AboutHmTraders";
import OurProductCategory from "@/components/home/OurProductCategory";
import { getProducts } from "@/lib/getProducts";
import { getBanner } from "@/lib/getBanner";

import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import FeaturedTool from "@/components/home/FeaturedTool";
import Partners from "@/components/home/Partners";
import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
import AdvancedInfrastructure from "@/components/home/AdvancedInfrastructure";
import { getPageById } from "@/lib/api";

export default async function Home() {
  const posts = await getProducts();
  const banner = await fetchBannerBySlug("home");
  const sections = await getPageById(56)
  return (
    <div>
      <HomeBanner slug={banner} />
      <Container>
        <div className="home-product-spacing">
          <AboutHmTraders sections={sections} />
        </div>
      </Container>
      <OurProductCategory sections={sections}/>
      <FeaturedTool slug={"home"} />
      <AdvancedInfrastructure sections={sections}/>
      <Partners sections={sections}/>
      <GlobalNetworkSection sections={sections}/>
    </div>
  );
}
