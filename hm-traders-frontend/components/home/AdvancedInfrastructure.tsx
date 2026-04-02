import Image from "next/image";
import "./AdvancedInfrastructure.css";
import { getFeatureSections } from "@/lib/getFeatureSections";
import Container from "../layout/Container";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default async function AdvancedInfrastructure({ slug }: any) {

  console.log("slug in advanced infrastructure", slug);

  const data = await getFeatureSections(slug);

  console.log("feature sections adv data", data);

  const section2 = data?.sections?.find(
    (item: any) => item.sectionKey === "advanced_infrastructure"
  );

  console.log("advanced infrastructure section", section2);

  if (!section2) return null;

  // ✅ images from array
  const topImage = section2?.images?.[0]?.image;
  const bottomImage = section2?.images?.[1]?.image;

  return (
    <section className="infra-section">
      <Container>

        <div className="infra-container">

          {/* LEFT CONTENT */}
          <div className="infra-left">
            <p className="infra-tag">★ {section2.smallTitle}</p>

            <h2 className="infra-title">
              {section2.heading}
              <span> {section2.highlightWord}</span>
            </h2>

            {/* ✅ descriptions */}
            {section2?.descriptions?.map((desc: any, i: number) => (
              <p key={i} className="infra-desc">
                {desc.text}
              </p>
            ))}

            {/* ✅ button */}
            {section2?.buttons?.[0] && (
              <button className="infra-btn">
                {section2.buttons[0].label}
              </button>
            )}
          </div>

          {/* RIGHT IMAGES */}
          <div className="infra-right">

            <div className="img-box large">
              {topImage?.url && (
                <Image
                  src={constructMediaUrl(topImage.url)}
                  alt={section2?.images?.[0]?.alt || "top"}
                  fill
                  className="img"
                />
              )}
            </div>

            <div className="img-box small">
              {bottomImage?.url && (
                <Image
                  src={constructMediaUrl(bottomImage.url)}
                  alt={section2?.images?.[1]?.alt || "bottom"}
                  fill
                  className="img"
                />
              )}
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}