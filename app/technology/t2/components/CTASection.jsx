import React from 'react'
import styles from '../TechnologyT2.module.css'

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>
          Need something <span className={styles.ctaHighlight}>unique?</span>
        </h2>
        <p className={styles.ctaSubtitle}>
          We build bespoke, pain-point-driven solutions on demand<br />
          Future-Proof Your Campus!
        </p>
        
        <button className={styles.ctaButton}>
          Request a Guided Tour
        </button>
      </div>
    </div>
  )
}

export default CTASection 