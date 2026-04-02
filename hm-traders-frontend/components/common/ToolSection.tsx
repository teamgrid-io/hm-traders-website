import "./ToolSection.css";
import { getFeatureSections } from "@/lib/getFeatureSections";

export default async function ToolSection({ slug, sectionKey }: any) {
  const data = await getFeatureSections(slug);

  console.log("data in ToolSection", data);

  // ✅ FIX: use data directly (NO docs)
  const section = data?.sections?.find(
    (sec: any) => sec.sectionKey === sectionKey
  );

  if (!section) return null;

  console.log("section in ToolSection", section);

  // ✅ style variants
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

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.tag}>★ {section?.smallTitle}</p>

          <h2>
            {section?.heading} <span>{section?.highlightWord}</span>
          </h2>
        </div>

        {/* ✅ FIX: viewAllText from data */}
        <a className={styles.btn}>
          {data?.viewAllText} →
        </a>
      </div>
    </section>
  );
}