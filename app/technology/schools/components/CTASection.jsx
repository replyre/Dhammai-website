import React from 'react'
import styles from '../TechnologyT1.module.css'
import Link from 'next/link';

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={`${styles.ctaTitle} gradient-text`}>
          Build the Classroom of tomorrow
        </h2>
        
        <Link href={"/contact"} className={styles.ctaButton}>
          Book a Demo
        </Link>
      </div>
    </div>
  )
}

export default CTASection;