import { getContactInfo } from "@/lib/getContactInfo";
import ContactForm from "./ContactForm";
import "./Contact.css";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import Image from "next/image";
import { getEnquiryForm } from "@/lib/contact";
export default async function ContactSection() {
  const contact = await getContactInfo();
  const enquiryForm = await getEnquiryForm();
  const contactItems = [
    {
      icon: contact?.addressIcon?.url,
      label: contact?.addressLabel,
      value: contact?.address,
    },
    {
      icon: contact?.phoneIcon?.url,
      label: contact?.phoneLabel,
      value: contact?.phone,
    },
    {
      icon: contact?.emailIcon?.url,
      label: contact?.emailLabel,
      value: contact?.email,
    },
  ];

  return (
    <section className="contactSection">
      {/* LEFT SIDE FORM */}
      <div className="formBox">
        <ContactForm title={enquiryForm?.formTitle} />
      </div>

      {/* RIGHT SIDE INFO */}
      <div className="infoBox">
        <h2 className="contactTitle">{contact?.formTitle}</h2>

        <div className="contactDivider"></div>

        {contactItems.map((item, index) => (
          <div className="infoItem" key={index}>
            {item?.icon && (
              <Image
                src={constructMediaUrl(item.icon)}
                alt="contact icon"
                width={24}
                height={24}
              />
            )}

            <div>
              <strong className="contactLabel">{item?.label}</strong>
              <p className="contactText lato">
                {item?.value?.split(",").map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
