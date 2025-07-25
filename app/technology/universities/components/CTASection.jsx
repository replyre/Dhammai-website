import React from 'react'
import styles from '../TechnologyT2.module.css'
import Link from 'next/link'

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={`${styles.ctaTitle} gradient-text`}>
          Need something unique ?
        </h2>
        <p className={styles.ctaSubtitle}>
          We build bespoke, pain-point-driven solutions on demand<br />
          Future-Proof Your Campus!
        </p>
        
        <Link href={"/contact"} className={styles.ctaButton}>
          Request a Guided Tour
        </Link>
      </div>
    </div>
  )
}

export default CTASection 