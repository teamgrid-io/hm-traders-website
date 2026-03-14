
import Contact from "@/components/home/Contact";
import ContactSection from "@/components/contact/ContactSection";
import Container from "@/components/layout/Container";
import ContactMap from "@/components/contact/ContactMap";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
const banner = await fetchBannerBySlug("contact");
export default function Page() {
    // return <Contact />;

  return (
    <>
  <HomeBanner slug={banner} />
  <Container>
    <ContactSection />
  </Container>
  <ContactMap />
  </>
  )
}