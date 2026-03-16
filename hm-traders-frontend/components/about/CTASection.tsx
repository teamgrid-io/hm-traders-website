import {fetchCtaData} from "../../lib/getCta";
import styles from "./CTASection.module.css";
import Link from "next/link";


export default async function CTASection() {
  const cta = await fetchCtaData();

  return ( 
<section className={styles['cta-section']}>
  <div className={styles['cta-container']}>

    <h2 className={styles['cta-title']}>
      {cta?.docs?.[0]?.title} 
      <span> {cta?.docs?.[0]?.highlightWord}</span>
    </h2>

    <p className={styles['cta-desc']}>
      {cta?.docs?.[0]?.description}
    </p>

    <div className={styles['cta-buttons']}>

      <Link href="#" className={styles['btn-primary']}>
        {cta?.docs?.[0]?.primaryButtonText}
      </Link>

      <Link href="#" className={styles['btn-secondary']}>
        {cta?.docs?.[0]?.secondaryButtonText}
      </Link>

    </div>

  </div>
</section>
  );
}