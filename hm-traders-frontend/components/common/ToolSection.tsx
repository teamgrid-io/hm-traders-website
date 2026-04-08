import Image from "next/image";
import "./ToolSection.css";

export default async function ToolSection({ sectionKey, sections }: any) {

  // ✅ USE PASSED DATA (NO API CALL)
  const section = sections?.find(
    (sec: any) =>
      sec.acf_fc_layout === "toolsection" &&
      sec.sectionkey === sectionKey
  );

  if (!section) return null;
console.log("ToolSection data:", section);
  const variantClassMap: any = {
    our_category: {
      section: "tools-section",
      header: "tools-header",
      tag: "tools-tag",
      btn: "view-all",
    },
    featured_products: {
      section: "featureTools-section",
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

          <p className={styles.tag}>★ {section?.tagline}</p>

          <h2
            dangerouslySetInnerHTML={{ __html: section?.title }}
          />

        </div>

        <a
          href={section?.buttontool?.[0]?.button?.url}
          className={styles.btn}
        >
          {section?.buttontool?.[0]?.button?.title} →
        </a>

      </div>
    </section>
  );
}