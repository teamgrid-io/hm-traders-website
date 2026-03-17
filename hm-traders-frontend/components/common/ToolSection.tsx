import Image from "next/image";
import "./ToolSection.css";
import { getFeaturedTool } from "@/lib/getFeaturedTool";
import { getProducts } from "@/lib/getProducts";

export default async function ToolSection({ slug, sectionKey }: any) {
  const data = await getFeaturedTool(slug);
  const doc = data?.docs?.[0];

  const section = doc?.sections?.find(
    (sec: any) => sec.sectionKey === sectionKey
  );

  if (!section) return null;

  // ✅ 👉 ADD HERE
  const variantClassMap: any = {
    our_category: {
      section: "tools-section",
      header: "tools-header",
      tag: "tools-tag",
      btn: "view-all",
    },
    featured_products: {
      section: "feartureTools-section",
      header: "featureTools-header",
      tag: "featureTools-tag",
      btn: "feature-view-all",
    },
  };

  const styles =
    variantClassMap[sectionKey] || variantClassMap.featured_products;

  // ✅ USE BELOW
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.tag}>★ {section?.smallTitle}</p>

          <h2>
            {section?.heading} <span>{section?.highlightWord}</span>
          </h2>
        </div>

        <a className={styles.btn}>
          {doc?.viewAllText} →
        </a>
      </div>
    </section>
  );
}
