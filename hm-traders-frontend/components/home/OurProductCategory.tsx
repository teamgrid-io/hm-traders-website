import Image from "next/image";
import "./OurProductCategory.css";
import Container from "../layout/Container";
import ToolsSection from "../common/ToolSection";
import { getMedia } from "@/lib/api";
import { getCategories } from "@/lib/getCategories";
export default async function OurProductCategory({sections}: any) {
const categories = await getCategories();   
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
  return (
    <section className="category-section">
      <Container>
        <ToolsSection slug={"home"} sectionKey="our_category" sections={sections} />
<div className="tools-grid">
  {categories?.slice(0,4).map((cat: any) => (
    <a
      key={cat.id}
      href={cat.link}
      className="tools-cards"
    >
      <Image
        src={cat.image_url}
        alt={cat.name}
        fill
        className="tools-img"
      />

      {/* Overlay */}
      <div className="tool-overlay">
        <p
          dangerouslySetInnerHTML={{
            __html: cat.name,
          }}
        />
      </div>
    </a>
  ))}
</div>
      </Container>
    </section>
  );
}
