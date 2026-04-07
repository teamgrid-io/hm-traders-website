import ContactForm from "./ContactForm";
import "./Contact.css";
import Image from "next/image";
import { getMedia } from "@/lib/api"; // 👈 use this

export default async function ContactSection({ sections }: any) {

  const section = sections?.find(
    (item: any) => item.acf_fc_layout === "contact_section"
  );

  if (!section) return null;

  // ✅ fetch all icons
  const contactItemsWithIcons = await Promise.all(
    section.contact_items.map(async (item: any) => {
      const media = item.icon ? await getMedia(item.icon) : null;

      return {
        ...item,
        iconUrl: media?.source_url || "",
        iconAlt: media?.alt_text || "icon",
      };
    })
  );

  return (
    <section className="contactSection">

      {/* LEFT FORM */}
      <div className="formBox">
        <ContactForm section={section} />
      </div>

      {/* RIGHT INFO */}
      <div className="infoBox">
        <h2 className="contactTitle">{section?.form_title}</h2>

        <div className="contactDivider"></div>

        {contactItemsWithIcons.map((item: any, index: number) => (
          <div className="infoItem" key={index}>

            {item?.iconUrl && (
              <Image
                src={item.iconUrl}
                alt={item.iconAlt}
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