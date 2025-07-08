import React from 'react'
import styles from '../TechnologyT3.module.css'
import Link from 'next/link';

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={`${styles.ctaTitle} gradient-text`}>
          Scale smarter, safer, faster with <span className={styles.ctaHighlight}>Dhamm.AI</span>
        </h2>
        
        <Link href={"/contact"} className={styles.ctaButton}>
          Book a Demo
        </Link>
      </div>
    </div>
  )
}

export default CTASection;