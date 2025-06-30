"use client"
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../TechnologyT2.module.css'

const DashboardShowcaseSection = () => {
  const scrollContainerRef = useRef(null)
  const [centerIndex, setCenterIndex] = useState(2) // Start with middle card

  const dashboardImages = [
    {
      src: "/Technologyt2Reactangle1.png",
      alt: "Dashboard overview with analytics"
    },
    {
      src: "/Technologyt2Reactangle1.png", 
      alt: "Main dashboard interface"
    },
    {
      src: "/Technologyt2Reactangle1.png",
      alt: "Dashboard with 3D perspective"
    },
    {
      src: "/Technologyt2Reactangle1.png",
      alt: "Detailed dashboard view"
    },
    {
      src: "/Technologyt2Reactangle1.png",
      alt: "Complete dashboard interface"
    }
  ]

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollLeft = container.scrollLeft
      const cardWidth = container.offsetWidth / 3 // Approximate card width in view
      const newCenterIndex = Math.round(scrollLeft / cardWidth)
      setCenterIndex(Math.min(Math.max(newCenterIndex, 0), dashboardImages.length - 1))
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.dashboardSection}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeader}>
          <h2 className={styles.dashboardTitle}>
            OneCampus — <span className={styles.dashboardSubtitle}>One Platform, Infinite Possibilities</span>
          </h2>
        </div>
        
        <div className={styles.dashboardDevices} ref={scrollContainerRef}>
          {dashboardImages.map((image, index) => (
            <div 
              key={index} 
              className={`${styles.deviceWrapper} ${index === centerIndex ? styles.centerDevice : ''}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className={styles.dashboardDevice}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardShowcaseSection 