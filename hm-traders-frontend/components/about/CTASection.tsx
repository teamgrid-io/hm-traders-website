import styles from "./CTASection.module.css";
import Link from "next/link";

export default function CTASection({ sections }: any) {

  // ✅ find CTA section
  const section = sections?.find(
    (item: any) =>
      item.acf_fc_layout === "toolsection" &&
      item.sectionkey === "cta_section"
  );

  if (!section) return null;

  const buttons = section?.buttontool || [];

  return (
    <section className={styles["cta-section"]}>
      <div className={styles["cta-container"]}>

        {/* ✅ Title (HTML from WP) */}
        <h2
          className={styles["cta-title"]}
          dangerouslySetInnerHTML={{ __html: section?.title || ""}}
        />

        {/* ✅ Subtitle */}
        <p className={styles["cta-desc"]}>
          {section?.subtitle}
        </p>

        {/* ✅ Buttons */}
        <div className={styles["cta-buttons"]}>

          {buttons[0]?.button && (
            <Link
              href={buttons[0].button.url || "#"}
              className={styles["btn-primary"]}
              target={buttons[0].button.target || "_self"}
            >
              {buttons[0].button.title}
            </Link>
          )}

          {buttons[1]?.button && (
            <Link
              href={buttons[1].button.url || "#"}
              className={styles["btn-secondary"]}
              target={buttons[1].button.target || "_self"}
            >
              {buttons[1].button.title}
            </Link>
          )}

        </div>

      </div>
    </section>
  );
}