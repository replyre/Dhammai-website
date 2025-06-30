"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import styles from '../TechnologyT2.module.css'

const productHighlights = [
  {
    title: "Unified Real-Time Dashboards",
    description: "Access key reports, analytics, and institutional metrics from a single, intuitive interface designed for all stakeholders."
  },
  {
    title: "Smart ERP (Enterprise Resource Planning)",
    description: "Streamlined administrative workflows covering admissions, fee management, HR, and resource allocation with intelligent automation."
  },
  {
    title: "Lecture Capture System",
    description: "Automated recording, transcription, and content analysis to enhance accessibility and enable flexible learning modalities."
  },
  {
    title: "Workflow & Project Automation",
    description: "Intelligent task management that automates routine processes, from approvals to notifications, reducing administrative overhead."
  },
  {
    title: "Facial Recognition Attendance",
    description: "Contactless and accurate attendance tracking using advanced biometric technology, ensuring security and convenience."
  },
  {
    title: "AR/VR Labs",
    description: "Bring virtual reality to classrooms with immersive learning experiences that make complex concepts tangible and engaging."
  },
  {
    title: "Adaptive Assessment Generator",
    description: "This feature dynamically creates personalized quizzes and tests based on individual learning progress and curriculum requirements."
  },
  {
    title: "Research Paper Recommender",
    description: "Our smart research assistant suggests relevant academic papers, citations, and resources tailored to specific research interests."
  },
  {
    title: "Student Sentiment Mining",
    description: "AI-powered insights into student engagement, satisfaction, and emotional well-being through advanced sentiment analysis."
  },
  {
    title: "Alumni & Grants Tracker",
    description: "Automated tracking and management of alumni networks, donations, and grant opportunities to strengthen institutional relationships."
  },
  {
    title: "Intelligent Personalized Tutoring",
    description: "Tailored study paths with AI-driven recommendations that adapt to individual learning styles and pace for optimal outcomes."
  },
  {
    title: "Micro-Interventions & Re-Coaching",
    description: "Precision-targeted support interventions that identify and address learning gaps before they become significant challenges."
  },
  {
    title: "Intelligent Learning Workspaces",
    description: "AI assistants help students organize resources, manage deadlines, and optimize study sessions for maximum productivity."
  },
  {
    title: "Self-Assessment Suite",
    description: "Empower students with tools for self-evaluation, progress tracking, and reflective learning to develop metacognitive skills."
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