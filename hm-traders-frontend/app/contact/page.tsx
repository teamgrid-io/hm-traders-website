
import Contact from "@/components/home/Contact";
import ContactSection from "@/components/contact/ContactSection";
import Container from "@/components/layout/Container";
import ContactMap from "@/components/contact/ContactMap";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import { getPageById } from "@/lib/api";

const banner = await fetchBannerBySlug("contact");
  const sections = await getPageById(152);
export default function Page() {
    // return <Contact />;

  return (
    <>
  <HomeBanner slug={banner} />
  <Container>
    <ContactSection sections={sections} />
  </Container>
  <ContactMap />
  </>
  )
}