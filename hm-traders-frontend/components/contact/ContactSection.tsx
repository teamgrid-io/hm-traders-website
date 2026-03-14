import { getContactInfo } from "@/lib/getContactInfo";
import ContactForm from "./ContactForm";
import "./Contact.css"

export default async function ContactSection() {
  const contact = await getContactInfo();
  console.log("contact", contact);

  return (
    <section className="contactSection">

      {/* LEFT SIDE FORM */}
      <div className="formBox">
        <h2>Any Questions?</h2>
        <ContactForm />
      </div>

      {/* RIGHT SIDE INFO */}
      <div className="infoBox">
        <h2>Get In Touch</h2>

        <div className="infoItem">
          <strong>Address</strong>
          <p>{contact?.address}</p>
        </div>

        <div className="infoItem">
          <strong>Contact</strong>
          <p>{contact?.phone}</p>
        </div>

        <div className="infoItem">
          <strong>Email Address</strong>
          <p>{contact?.email}</p>
        </div>
      </div>

    </section>
  );
}