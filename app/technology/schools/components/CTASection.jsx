import React from 'react'
import styles from '../TechnologyT1.module.css'

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={`${styles.ctaTitle} gradient-text`}>
          Build the Classroom of tomorrow
        </h2>
        
        <button className={styles.ctaButton}>
          Book a Demo
        </button>
      </div>
    </div>
  )
}

export default CTASection;