
import Contact from "@/components/home/Contact";
import ContactSection from "@/components/contact/ContactSection";
import Container from "@/components/layout/Container";
import ContactMap from "@/components/contact/ContactMap";
export default function Page() {
    // return <Contact />;

  return (
    <>
  <Container>
    <ContactSection />
  </Container>
  <ContactMap />
  </>
  )
}