import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import styles from './KPICounterSection.module.css';

const KPICounterSection = () => {
  const kpiData = [
    {
      metric: "Median AI Response Time",
      target: "< 800 Ms",
      whyItMatters: "Fast Round-Trips Keep Users Engaged And Prove The System's Back End Efficiency"
    },
    {
      metric: "Staff-Hours Saved",
      target: "Live Counter",
      isLiveCounter: true,
      whyItMatters: "Adds Up Time Removed From Grading, Scheduling, And Support - Easy ROI Story"
    },
    {
      metric: "Data Processed On-Prem",
      target: "≥ 99 %",
      whyItMatters: "Quantifies The Privacy Pledge That Data Never Leaves The Client Firewall"
    },
    {
      metric: "RAG Recall @ 5",
      target: "≥ 95 %",
      whyItMatters: "Shows Retrieval Accuracy; Higher Recall Means Answers Use The Right Sources"
    },
    {
      metric: "Languages Supported",
      target: "12 +",
      whyItMatters: "Signals Hyper-Local Coverage And Future Growth Range"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>KPI Counter Strip</h1>
        
        <div className={styles.kpiTable}>
          {/* Table Header */}
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>METRIC</div>
            <div className={styles.headerCell}>TARGET</div>
            <div className={styles.headerCell}>WHY IT MATTERS</div>
          </div>
          
          {/* Table Rows */}
          <div className={styles.tableBody}>
            {kpiData.map((item, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.metricCell}>
                  {item.metric}
                </div>
                <div className={styles.targetCell}>
                  {item.isLiveCounter ? (
                    <span className={styles.liveCounter}>
                      {item.target} <FiArrowUp className={styles.arrowIcon} />
                    </span>
                  ) : (
                    item.target
                  )}
                </div>
                <div className={styles.whyItMattersCell}>
                  {item.whyItMatters}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICounterSection;