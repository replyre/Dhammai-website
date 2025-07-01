import React from 'react'
import Image from 'next/image'
import styles from '../TechnologyT1.module.css'

const ImpactSnapshotSection = () => {
  const impactStats = [
    {
      percentage: "40%",
      description: "faculty time returned to teaching and research"
    },
    {
      percentage: "15%", 
      description: "higher learner retention through adaptive guidance"
    },
    {
      percentage: "30-45%",
      description: "Less downtime in enterprise workflows"
    },
    {
      percentage: "100%",
      description: "Data residency—no content ever leaves your premises"
    }
  ];

  return (
    <div className={styles.impactSection}>
      <div className={styles.impactContainer}>
        <div className={styles.impactContent}>
          <h2 className={styles.impactTitle}>Impact Snapshot</h2>
          
          <div className={styles.statsGrid}>
            {impactStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <h3 className={styles.statPercentage}>{stat.percentage}</h3>
                <p className={styles.statDescription}>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.deviceContainer}>
          <Image
            src="/technologyt1mobile.svg"
            alt="Digital device showing platform interface"
            width={400}
            height={500}
            className={styles.deviceImage}
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default ImpactSnapshotSection 