import Image from "next/image";
import "./OurProductCategory.css";
import Container from "../layout/Container";
import ToolsSection from "../common/ToolSection";
import { getMedia } from "@/lib/api";
import { getCategories } from "@/lib/getCategories";

interface Media {
  source_url: string;
  alt_text?: string;
}

interface ButtonTool {
  button: {
    title: string;
    url: string;
  };
}

interface Section {
  acf_fc_layout: string;
  sectionkey: string;
  tagline?: string;
  title?: string;
  subtitle?: string;
  buttontool?: ButtonTool[];
  imagetool?: { image: number }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  link: string;
  image_url: string;
}

interface OurProductCategoryProps {
  sections: Section[];
}

export default async function OurProductCategory({ sections }: OurProductCategoryProps) {
  const categories: Category[] = await getCategories();
  // ✅ find "our_category"
  const wpSection = sections.find(
    (item) =>
      item.acf_fc_layout === "toolsection" &&
      item.sectionkey === "our_category"
  );

  // ✅ get image IDs from ACF
  const imageIds = wpSection?.imagetool || [];

  // ✅ fetch all images
  const images: (Media | null)[] = await Promise.all(
    imageIds.map(async (img) => {
      if (!img?.image) return null;
      return await getMedia(img.image);
    })
  );
  return (
    <section className="category-section">
      <Container>
        <ToolsSection  sectionKey="our_category" sections={sections} />
        <div className="tools-grid">
          {categories?.slice(0, 4).map((cat) => (
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
