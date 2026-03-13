import HomeBanner from "@/components/common/HomeBanner";
import About from "@/components/home/AboutPreview";
import { fetchBannerBySlug } from "@/lib/getBannerData";
const banner = await fetchBannerBySlug("about");
export default function AboutPage() {
  return <>
        <HomeBanner slug={banner} />
  <About />
  </>;
}