import HomeBanner from "@/components/common/HomeBanner";
import About from "@/components/home/AboutPreview";
import OurProductCategory from "@/components/home/OurProductCategory";
import Partners from "@/components/home/Partners";
import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/about/CTASection";
import Container from "@/components/layout/Container";
import { fetchBannerBySlug } from "@/lib/getBannerData";
 import ToolSection from "@/components/common/ToolSection";
 import AdvancedInfrastructure from "@/components/home/AdvancedInfrastructure";
const banner = await fetchBannerBySlug("about");
export default function AboutPage() {
  return <>
        <HomeBanner slug={banner} />
          <Container>
        <OurProductCategory /> 
        </Container>
        <StatsSection /> 
        <Container>
        <ToolSection slug={"about us"} />
        <AdvancedInfrastructure /> 
        </Container>
        <Partners/> 
      <GlobalNetworkSection/> 
      <CTASection /> 
  {/* <About /> */}
  </>;
}  