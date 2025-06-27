import React from 'react'
import Image from 'next/image'
import styles from '../TechnologyT1.module.css'

const HeroSection = () => {
  return (
    <div className={`${styles.contentContainer} ${styles.section}`}>
      {/* Back Arrow */}
      <button className={styles.backButton} >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>For K12 Schools</h1>
          <h2 className={styles.subtitle}>Smart Schools, Simplified.</h2>
          <p className={styles.description}>
            AI that cares for every child—and everyone who teaches them
          </p>
        </div>

        {/* Classroom Image */}
        <div className={styles.imageContainer}>
          <Image
            src="/technologyt1home.png"
            alt="Modern classroom with wooden desks and warm lighting"
            width={800}
            height={400}
            className={styles.classroomImage}
            priority
          />
        </div>

        {/* Bottom Description */}
        <p className={styles.bottomDescription}>
          Dhammai AI consolidates lessons, data, and support into a single, secure platform. Teachers teach more, parents worry less, and students learn faster.
        </p>
      </div>
    </div>
  )
}

export default HeroSection 