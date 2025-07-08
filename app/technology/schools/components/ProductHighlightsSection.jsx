"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import styles from '../TechnologyT1.module.css'

const productHighlights = [
  {
    title: "AdminFlow Automator",
    description: "Agents run fees, timetables, and compliance reports—no spreadsheets."
  },
  {
    title: "AR/VR Lab Kit",
    description: "Immersive experiments and virtual field trips on any device."
  },
  {
    title: "Parent Pulse App",
    description: "Marks, mood, homework—all in one scroll for parents."
  },
  {
    title: "Adaptive Mastery Paths",
    description: "Dynamic pathways that evolve with every quiz and activity."
  },
  {
    title: "Teacher Toolkit",
    description: "AI coach suggests resources, benchmarks, and micro-training."
  },
  {
    title: "NEP Planner & Assess",
    description: "Drag-and-drop syllabus builder with auto-generated, policy-aligned tests."
  }
];

const ProductHighlightsSection = () => {
  const scrollContainerRef = useRef(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -340,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 340,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
     <div className={styles.overlay2}></div>
    <div className={`${styles.section4} `}>
       
      <h2 className={`${styles.productTitle} gradient-text2`}>Product Highlights</h2>
      
      <div className={styles.carouselContainer}>
        <div className={styles.productGrid} ref={scrollContainerRef}>
          {productHighlights.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.checkIcon}>
                <Image
                  src="/technologyt1checkcircle.svg"
                  alt="Check circle"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.productCardTitle}>{product.title}</h3>
              <p className={styles.productCardDescription}>{product.description}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.carouselNavigation}>
          <button className={styles.navButton} onClick={scrollLeft}>
            <Image
              src="/technologyt1left.svg"
              alt="Scroll left"
              width={24}
              height={24}
            />
          </button>
          <button className={styles.navButton} onClick={scrollRight}>
            <Image
              src="/technologyt1left.svg"
              alt="Scroll right"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductHighlightsSection 