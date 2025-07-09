import React from 'react';
import styles from '../TechnologyT3.module.css';

const ProblemAndFixMiniTable = () => {
  const metricsData = [
    {
      metric: "Unplanned Downtime",
      target: "30-45 % ↓"
    },
    {
      metric: "Maintenance Cost",
      target: "18-35 % ↓"
    },
    {
      metric: "Time-To-Insight",
      target: "< 2 S"
    },
    {
      metric: "Defect Detection Accuracy",
      target: "> 95 %"
    },
    {
      metric: "Compliance Pass Rate",
      target: "≥ 99 %"
    }
  ];

  return (
    
    <div className={`${styles.section4} `}>
      <div className={styles.overlaylms}></div>
       <div className={styles.overlay2}></div>
      <h2 className={`${styles.productTitle} gradient-text`}>Metrics & Targets</h2>
      <div className={styles.kpiTable}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>METRICS</div>
          <div className={styles.headerCell}>TARGET</div>
        </div>

        {/* Table Rows */}
        <div className={styles.tableBody}>
          {metricsData.map((item, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.painPointCell}>
                {item.metric}
              </div>
              <div className={styles.solutionCell}>
                {item.target}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemAndFixMiniTable;