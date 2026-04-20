import Container from "@/components/layout/Container";
import AboutHmTraders from "@/components/home/AboutHmTraders";
import OurProductCategory from "@/components/home/OurProductCategory";
import { getProducts } from "@/lib/getProducts";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import FeaturedTool from "@/components/home/FeaturedTool";
import Partners from "@/components/home/Partners";
import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
import AdvancedInfrastructure from "@/components/home/AdvancedInfrastructure";
import { getPageById } from "@/lib/api";
import { fetchThreeBannerCards } from "@/lib/getThreeBannerCards";

export default async function Home() {
  const posts = await getProducts();
  const banner = await fetchBannerBySlug(56);
  const sections = await getPageById(56)
  const threeBannerCards = await fetchThreeBannerCards(56);
  return (
    <div>
      <HomeBanner slug={banner} heroFeatures={threeBannerCards} />
      <Container>
        <div className="home-product-spacing">
          <AboutHmTraders sections={sections} />
        </div>
      </Container>
      <OurProductCategory sections={sections}/>
      <FeaturedTool slug={"home"} sections={sections}/>
      <AdvancedInfrastructure sections={sections}/>
      <Partners sections={sections}/>
      <GlobalNetworkSection sections={sections}/>
    </div>
  );
}
