import React from 'react'
import Image from 'next/image'
import styles from '../TechnologyT1.module.css'

const StakeholderSection = () => {
  return (
    <div className={`${styles.section3} ${styles.section}`}>
      <h2 className={styles.stakeholderTitle}>What do you get as a stakeholder</h2>
      
      <div className={styles.stakeholderGrid}>
        {/* Students Card */}
        <div className={styles.stakeholderCard}>
          <div className={styles.cardImageContainer}>
            <Image
              src="/technologyt1boy.png"
              alt="Student in school uniform"
              width={300}
              height={400}
              className={styles.stakeholderImage}
              priority
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Students</h3>
            <p className={styles.cardDescription}>
              Live progress checks | Topic-wise mastery | 1-to-1 guidance | Visual, hands-on learning
            </p>
          </div>
        </div>

        {/* School & Teachers Card */}
        <div className={`${styles.stakeholderCard} ${styles.centerCard}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>School & Teachers</h3>
            <p className={styles.cardDescription}>
              Unified real-time dashboards | Outcome-based lesson & test planners (NEP-ready) | Early-alert benchmarks | Teacher up-skilling toolkit
            </p>
          </div>
          <div className={styles.cardImageContainer}>
            <Image
              src="/technologyt1lady.png"
              alt="Teacher"
              width={300}
              height={400}
              className={styles.stakeholderImage}
              priority
            />
          </div>
        </div>

        {/* Parents Card */}
        <div className={styles.stakeholderCard}>
          <div className={styles.cardImageContainer}>
            <Image
              src="/technologyt1couple.png"
              alt="Parents"
              width={300}
              height={400}
              className={styles.stakeholderImage}
              priority
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Parents</h3>
            <p className={styles.cardDescription}>
              Transparent reports | Higher engagement | Learn-anywhere app | One dashboard for homework | fees, and messages
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeholderSection 