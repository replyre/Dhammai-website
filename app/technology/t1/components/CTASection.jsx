import React from 'react'
import styles from '../TechnologyT1.module.css'

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>
          Build the Classroom <span className={styles.ctaHighlight}>of tomorrow</span>
        </h2>
        
        <button className={styles.ctaButton}>
          Book a Demo
        </button>
      </div>
    </div>
  )
}

export default CTASection 