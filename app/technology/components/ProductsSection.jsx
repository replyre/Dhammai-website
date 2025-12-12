import React from 'react';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import styles from './ProductsSection.module.css';

const ProductsSection = () => {
  const productsData = [
    {
      title: "Universities",
      subtitle: "For large teams & corporations.",
      features: [
        "Adaptive learning dashboards",
        "Personalised workflows",
        "Unified Campus Ecosystem - LMS, ERP, research data on one hub"
      ],
      link: "technology/universities" 
    },
    {
      title: "K-12 Schools",
      subtitle: "For large teams & corporations.",
      features: [
        "Mastery paths, NEP-aligned",
        "Real-time parent reports",
        "Whole-School Ecosystem - teachers, students, parents in a single loop"
      ],
      link: "technology/schools" 
    },
    {
      title: "Enterprise",
      subtitle: "For large teams & corporations.",
      features: [
        "Zero-ETL knowledge agents",
        "Predictive-maintenance toolkit",
        "End-to-End Ecosystem - OT sensors, CRM, ERP all in one graph"
      ],
      link: "technology/enterprise" 
    }
  ];

  return (
    <div className={styles.container}>
        <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Our Products to choose from<br />
          for your Organization
        </h1>
        
        <div className={styles.cardsGrid}>
          {productsData.map((product, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{product.title}</h2>
                <p className={styles.cardSubtitle}>{product.subtitle}</p>
                
                <div className={styles.featuresList}>
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className={styles.featureItem}>
                      <div className={styles.checkIcon}>
                        <FiCheck />
                      </div>
                      <span className={styles.featureText}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href={product.link} 
                  className={styles.knowMoreBtn}
                >
                  Know More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;