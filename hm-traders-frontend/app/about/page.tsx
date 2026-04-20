import HomeBanner from "@/components/common/HomeBanner";
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
import { getPageById } from "@/lib/api";
const banner = await fetchBannerBySlug(146);
import { getProducts } from "@/lib/getProducts";
export default async function AboutPage() {
  const ProductData = await getProducts();
   const sections = await getPageById(146);
  
    const featuredProducts = ProductData.filter(
    (product: any) => product.acf.is_featured === true
  );
  return <>
        <HomeBanner slug={banner} />
          <Container className="mb-8">
          <AboutHmTraders sections={sections} />
        </Container>
        <StatsSection sections={sections} /> 
        <Container className="mb-12">
        <ToolSection sectionKey={"product_expertise"} sections={sections}/>
        <ToolsGrid tools={featuredProducts} />  
        </Container>
         <AdvancedInfrastructure sections={sections} />
        <Partners sections={sections}/> 
      <GlobalNetworkSection sections={sections}/> 
      <CTASection sections={sections} /> 
  </>;
}  