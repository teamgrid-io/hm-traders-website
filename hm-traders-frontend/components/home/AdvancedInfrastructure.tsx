import Image from "next/image";
import "./AdvancedInfrastructure.css";
import Container from "../layout/Container";
import {  getMedia } from "@/lib/api";

export default async function AdvancedInfrastructure({sections}: any) {

  // ✅ Get all sections

  // ✅ Find correct section
  const section2 = sections.find(
    (item) =>
      item.acf_fc_layout === "toolsection" &&
      item.sectionkey === "advanced_Infrastructure"
  );

  if (!section2) return null;

  // ✅ Get image IDs
  const topImageId = section2?.imagetool?.[0]?.image;
  const bottomImageId = section2?.imagetool?.[1]?.image;

  // ✅ Fetch images
  const topImage = topImageId ? await getMedia(topImageId) : null;
  const bottomImage = bottomImageId ? await getMedia(bottomImageId) : null;

  return (
    <section className="infra-section">
      <Container>

        <div className="infra-container">

          {/* LEFT CONTENT */}
          <div className="infra-left">

            {/* was: smallTitle */}
            <p className="infra-tag">★ {section2?.tagline}</p>

            {/* was: heading + highlightWord */}
            <h2
              className="infra-title"
              dangerouslySetInnerHTML={{ __html: section2?.title }}
            />

            {/* was: description1 + description2 */}
            <p
              className="infra-desc lato"
              dangerouslySetInnerHTML={{ __html: section2?.subtitle }}
            />

            <button className="button">
              {section2?.buttontool?.[0]?.button?.title}
            </button>

          </div>

          {/* RIGHT IMAGES */}
          <div className="infra-right">

            <div className="img-box large">
              {topImage?.source_url && (
                <Image
                  src={topImage.source_url}
                  alt={topImage.alt_text || "top"}
                  fill
                  className="img"
                />
              )}
            </div>

            <div className="img-box small">
              {bottomImage?.source_url && (
                <Image
                  src={bottomImage.source_url}
                  alt={bottomImage.alt_text || "bottom"}
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