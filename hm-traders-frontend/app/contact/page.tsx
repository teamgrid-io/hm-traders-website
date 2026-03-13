
import HomeBanner from "@/components/common/HomeBanner";
import Contact from "@/components/home/Contact";
import { fetchBannerBySlug } from "@/lib/getBannerData";
const banner = await fetchBannerBySlug("contact");

export default function Page() {
  return <>
      <HomeBanner slug={banner} />
      <Contact />
        </>;
}