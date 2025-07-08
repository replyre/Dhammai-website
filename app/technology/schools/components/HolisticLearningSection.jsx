import React from 'react'
import Image from 'next/image'
import styles from '../TechnologyT1.module.css'

const HolisticLearningSection = () => {
  return (
    <div className={`${styles.section2}`}>
        <video className={styles.vid1} src="/partner.mp4" loop autoPlay muted></video>
                  <video className={styles.vid2} src="/partner.mp4" loop autoPlay muted></video>

      <div className={styles.holisticContainer}>
        <Image
          src="/technologyt1HolisticLearning.png"
          alt="Holistic Learning Ecosystem diagram"
          width={800}
          height={400}
          className={styles.holisticImage}
          priority
        />
        <div className={styles.holisticTextOverlay}>
          <h2 className={styles.holisticText}>
            HOLISTIC<br />
            LEARNING<br />
            ECOSYSTEM
          </h2>
        </div>
      </div>
    </div>
  )
}

export default HolisticLearningSection 