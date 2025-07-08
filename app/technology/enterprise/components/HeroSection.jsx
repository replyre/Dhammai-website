import React from 'react'
import Image from 'next/image'
import styles from '../TechnologyT3.module.css'

const HeroSection = () => {
  return (
    <div className={`${styles.contentContainer} ${styles.section}`}>
      {/* Back Arrow */}
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>For Enterprises</h1>
          <h2 className={styles.subtitle}>From Industry 4.0 to 5.0 - Together.</h2>
          <p className={styles.description}>
            Intelligence that synchronises equipment with human insight.
          </p>
        </div>

        {/* Corporate Office Image */}
        <div className={styles.imageContainer}>
          <Image
            src="/Technologyt3Home.png"
            alt="Corporate office with city skyline view"
            width={800}
            height={400}
            className={styles.classroomImage}
            priority
          />
        </div>

        {/* Bottom Description */}
        <p className={styles.bottomDescription}>
          Dhammai AI weaves predictive analytics, human-in-the-loop agents, and secure on-prem deployment into one platform. You get digital-first efficiency (4.0) plus people-centred collaboration and sustainability (5.0).
        </p>
      </div>
    </div>
  )
}

export default HeroSection 