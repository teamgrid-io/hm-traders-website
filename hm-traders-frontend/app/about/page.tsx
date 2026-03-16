import HomeBanner from "@/components/common/HomeBanner";
import About from "@/components/home/AboutPreview";
import OurProductCategory from "@/components/home/OurProductCategory";
import Partners from "@/components/home/Partners";
import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/about/CTASection";

import { fetchBannerBySlug } from "@/lib/getBannerData";
const banner = await fetchBannerBySlug("about");
export default function AboutPage() {
  return <>
        <HomeBanner slug={banner} />
        <OurProductCategory /> 
        <StatsSection /> 
        <Partners/> 
      <GlobalNetworkSection/> 
      <CTASection /> 
  {/* <About /> */}
  </>;
}  