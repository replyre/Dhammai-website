import React from 'react';
import styles from './ImpactSection.module.css';

const ImpactSection = () => {
  const impactData = [
    {
      percentage: "40%",
      description: "faculty time returned to teaching and research"
    },
    {
      percentage: "15%",
      description: "higher learner retention through adaptive guidance"
    },
    {
      percentage: "30 - 45%",
      description: "less downtime in enterprise workflows"
    },
    {
      percentage: "100%",
      description: "data residency—no content ever leaves your premises"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Impact — In One Glance
        </h1>
        
        <p className={styles.subtitle}>
          Accelerated learning, leaner operations, zero data leakage.
        </p>
        
        <div className={styles.impactCard}>
         
          <div className={styles.statsContainer}>
            {impactData.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.percentage}>{stat.percentage}</span>
                <span className={styles.description}>{stat.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;