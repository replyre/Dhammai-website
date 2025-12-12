import React from 'react';
import styles from './Info.module.css';
import Link from 'next/link';

export const Info = () => {
  return (
    <div className={styles.infoSection}>
      <img src="/dham.png" alt="" />
      <div className={styles.content}>
        <h1 className={styles.mainHeading}>Dhamma + AI</h1>
        
        <p className={styles.subtitle}>
          <span className={styles.term}>"Dhamm" (धम्म) Means</span>{' '}
          <span className={styles.definition}>"Knowledge Required To Perform Duty"</span>
        </p>
        <div className={styles.gradientLine}></div>
        <p className={styles.description}>
          Dhamm AI Delivers <span className={styles.highlight}>Learning Intelligence</span>, Tailored For Individuals & Institutions. 
          Our AI-Driven Tools Respect Your Privacy, Are Locally Developed, And Are 
          Designed To Enhance Learning Efficiency For Everyone, Simplifying Technology 
          So You Can <span className={styles.highlight}>Focus On What Truly Matters: Knowledge</span>
        </p>
        
        <Link href="/contact" className={styles.ctaButton}>Know More</Link>
      </div>
    </div>
  );
};