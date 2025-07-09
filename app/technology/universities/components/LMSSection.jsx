"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../TechnologyT2.module.css'

const LMSSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const lmsFeatures = [
    {
      title: "Custom-fit to your workflows",
      subtitle: "no one-size-fits-all"
    },
    {
      title: "Personalised learning paths", 
      subtitle: "adaptive modules for every learner"
    },
    {
      title: "Integrated toolset",
      subtitle: "stop hop-scotching between apps" 
    },
    {
      title: "Seamless plug-ins",
      subtitle: "hooks for SIS, ERP, SSO, payments, research repos"
    }
  ]

  return (
    <div className={styles.lmsSection}>
      <div className={styles.overlaylms}></div>
      <div className={styles.lmsContainer}>
        <h2 className={styles.lmsTitle}>The LMS Without Limits</h2>
        
        <div 
          className={`${styles.lmsCardsWrapper} ${hoveredCard !== null ? styles.cardsExpanded : ''}`}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {lmsFeatures.map((feature, index) => (
            <div
              key={index}
              className={`${styles.lmsCard} ${hoveredCard === index ? styles.cardHovered : ''} ${hoveredCard !== null && hoveredCard !== index ? styles.cardShrunk : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              style={{
                '--card-index': index,
                '--total-cards': lmsFeatures.length
              }}
            >
              <div className={styles.cardIcon}>
                <Image
                  src="/Technologyt2Lightening.svg"
                  alt="Lightning icon"
                  width={32}
                  height={36}
                />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardSubtitle}>{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LMSSection 