import Image from "next/image";
import "./OurProductCategory.css";
import Container from "../layout/Container";
import ToolsSection from "../common/ToolSection";
import { getMedia } from "@/lib/api";
export default async function OurProductCategory({sections}: any) {

  // ✅ get WP sections

  // ✅ find "our_category"
  const wpSection = sections.find(
    (item) =>
      item.acf_fc_layout === "toolsection" &&
      item.sectionkey === "our_category"
  );

  // ✅ get image IDs from ACF
  const imageIds = wpSection?.imagetool || [];

  // ✅ fetch all images
  const images = await Promise.all(
    imageIds.map(async (img) => {
      if (!img?.image) return null;
      return await getMedia(img.image);
    })
  );
console.log("Fetched images:", images); // Debug log  

  return (
    <section className="category-section">
      <Container>
        <ToolsSection slug={"home"} sectionKey="our_category" sections={sections} />

    <div className="tools-grid">

  {images?.map((img, index) => (
    img?.source_url && (
      <div key={index} className="tools-cards">

        <Image
          src={img.source_url}
          alt={img.alt_text || img.title?.rendered || "tool"}
          fill
          className="tools-img"
        />

        {/* ✅ SAME OVERLAY LIKE CATEGORY */}
        <div className="tool-overlay">
          <p
            dangerouslySetInnerHTML={{
              __html: img?.title?.rendered || "Tool",
            }}
          />
        </div>

      </div>
    )
  ))}

</div>
      </Container>
    </section>
  );
}
