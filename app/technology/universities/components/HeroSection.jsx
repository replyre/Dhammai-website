'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from '../TechnologyT2.module.css'

const HeroSection = () => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <div className={`${styles.contentContainer} ${styles.section}`}>
      {/* Back Arrow */}
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>For Universities</h1>
          <h2 className={styles.subtitle}>Multi-Agent Framework for University 4.0 → 5.0</h2>
          <p className={styles.description}>
             End-to-end academic and administrative AI, built for flexible, human-centred, sustainable learning.
          </p>
        </div>

        {/* Classroom Image */}
        <div className={styles.imageContainer}>
          <Image
            src="/Technologyt2home.png"
            alt="Modern classroom with wooden desks and warm lighting"
            width={800}
            height={400}
            className={styles.classroomImage}
            priority
          />
        </div>

       
      </div>
    </div>
  )
}

export default HeroSection