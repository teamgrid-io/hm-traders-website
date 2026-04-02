import HomeBanner from "@/components/common/HomeBanner";
import About from "@/components/home/AboutPreview";
import AboutHmTraders from "@/components/home/AboutHmTraders";
import Partners from "@/components/home/Partners";
import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/about/CTASection";
import Container from "@/components/layout/Container";
import { fetchBannerBySlug } from "@/lib/getBannerData";
 import ToolSection from "@/components/common/ToolSection";
 import ToolsGrid from "@/components/common/ToolsGrid";
 import AdvancedInfrastructure from "@/components/home/AdvancedInfrastructure";
const banner = await fetchBannerBySlug("about");
import { getProducts } from "@/lib/getProducts";
export default async function AboutPage() {
  const ProductData = await getProducts();
  
    const featuredProducts = ProductData.filter(
      (product: any) => product.isFeatureTool === true
    );
  return <>
        <HomeBanner slug={banner} />
          <Container className="mb-8">
        <AboutHmTraders slug={"about"} /> 
        </Container>
        <StatsSection /> 
        <Container className="mb-12">
        <ToolSection slug={"about"} sectionKey={"featured_products"} />
        <ToolsGrid tools={featuredProducts} />  
        </Container>
         <AdvancedInfrastructure />
        <Partners/> 
      <GlobalNetworkSection/> 
      <CTASection /> 
  {/* <About /> */}
  </>;
}  