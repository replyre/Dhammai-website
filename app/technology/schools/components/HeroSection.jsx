
"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation' // For App Router (Next.js 13+)
import styles from '../TechnologyT1.module.css'

const HeroSection = () => {
  const router = useRouter()

  const handleBackClick = () => {
    // Option 1: Go back to previous page in browser history
    
    router.back()
    
    // Option 2: Navigate to a specific route (uncomment if needed)
    // router.push('/')
    
    // Option 3: Use browser's native back (alternative approach)
    // window.history.back()
  }

  return (
    <div className={`${styles.contentContainer} ${styles.section}`}>
      {/* Back Arrow */}
      <div className={styles.backButtonContainer} onClick={handleBackClick}>
        <button className={styles.backButton} >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

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