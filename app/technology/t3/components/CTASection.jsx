import React from 'react'
import styles from '../TechnologyT3.module.css'

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={`${styles.ctaTitle} gradient-text`}>
          Scale smarter, safer, faster with <span className={styles.ctaHighlight}>Dhamm.AI</span>
        </h2>
        
        <button className={styles.ctaButton}>
          Book a Demo
        </button>
      </div>
    </div>
  )
}

export default CTASection;