"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import styles from '../TechnologyT3.module.css'

const productHighlights = [
  {
    title: "Predictive Maintenance",
    description: "Continuously listens to sensor data, forecasts part failures weeks in advance, and schedules service automatically, cutting unplanned downtime by 30-45%."
  },
  {
    title: "Vision Quality Control",
    description: "High-speed cameras and edge AI inspect every unit on the line, flagging surface or dimensional defects with > 95% accuracy before they reach packing."
  },
  {
    title: "Production Planner",
    description: "AI matches live demand, inventory, and machine capacity to generate shift-by-shift schedules that reduce over-production and raw-material waste."
  },
  {
    title: "Lead Scorer & Upsell AI",
    description: "Analyses CRM histories and website intent signals to rank prospects, suggest tailored offers, and improve close rates and cross-sell revenue."
  },
  {
    title: "Marketing Automation Suite",
    description: "Orchestrates multi-channel campaigns—email, WhatsApp, SMS, ads—and retunes budgets in real time based on engagement and ROAS metrics."
  },
  {
    title: "Geo Heat-Mapping",
    description: "Combines sales, service, and demographic layers into interactive maps to pinpoint the best new outlet locations or optimise field-service routes."
  },
  {
    title: "Chatbots & Assistants",
    description: "24/7 multilingual bots answer FAQs instantly and hand off nuanced issues to human agents with full context, enhancing customer experience."
  },
  {
    title: "Knowledge Memory Hub",
    description: "Creates a unified, zero-ETL graph of SOPs, manuals, and tickets so staff can retrieve the right document or fix script in seconds with natural language."
  },
  {
    title: "Employee Re-Skill LMS",
    description: "Provides adaptive micro-courses, tracks competency gaps, and recommends next modules—keeping teams ready for new machinery and workflows."
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
    <div className={`${styles.section4} `}>
      <h2 className={styles.productTitle}>Product Highlights</h2>
      
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
              src="/technologyt1right.svg"
              alt="Scroll right"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductHighlightsSection 