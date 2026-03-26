import Image from "next/image";
import "./AdvancedInfrastructure.css";
import { getCategorySection } from "@/lib/getCategorySection";
import Container from "../layout/Container";
import {constructMediaUrl} from "@/lib/constructMediaUrl";
export default async function AdvancedInfrastructure() {

  const data = await getCategorySection();

  const section2 = data?.docs?.find(
    (item: any) => item.sectionName === "section2"
  );

  if (!section2) return null;

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

          <p className="infra-desc">{section2.description1}</p>
          <p className="infra-desc">{section2.description2}</p>

          <button className="infra-btn"> 
            {section2.buttonText}
          </button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="infra-right">
          <div className="img-box large">
            <Image
              src={constructMediaUrl(section2?.images?.topImage?.url)}
              alt={section2?.images?.topImage?.alt || "top"}
              fill
              className="img"
            />
          </div>

          <div className="img-box small">
            <Image
              src={constructMediaUrl(section2?.images?.bottomImage?.url)}
              alt={section2?.images?.bottomImage?.alt || "bottom"}
              fill
              className="img"
            />
          </div>
        </div>

      </div>
          </Container>

    </section>
  );
} 