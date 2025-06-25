import React from 'react';
import styles from './Timeline2.module.css';

const Timeline2 = () => {
  const timelineData = [
    {
      title: "Democratise AI",
      description: "for every campus, classroom, and factory floor with lightweight yet powerful models tuned to local languages and contexts."
    },
    {
      title: "Shrink latency to insight", 
      description: "AI through on-prem RAG pipelines and real-time inference streams, turning raw organisational data into actionable knowledge within milliseconds."
    },
    {
      title: "Engineer trust",
      description: "by aligning with frameworks such as the DPDP Act, zero-data-leak architectures, and audited model cards."
    },
    {
      title: "Cultivate innovation",
      description: "via an in-house R&D lab that iterates on vision models, deep-knowledge tracing, and cognitive analytics—laying milestones that the next timeline will celebrate."
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}> <p>Optimising the <br />Next Wave</p></h1>
      <p className={styles.mainDescription}>
        At Dhamm AI, 2025 is the dawn of hyper-local, privacy-first agentic intelligence.
      </p>
      <div className={styles.timelineContainer}>
        {timelineData.map((item, index) => (
          <div 
            key={index}
            className={index === timelineData.length - 1 ? styles.timelineItemLast : styles.timelineItem}
          >
            <div className={styles.timelineBullet}></div>
            {index !== timelineData.length - 1 && (
              <div className={styles.timelineLine}></div>
            )}
            
            <h2 className={styles.timelineTitle}>
              {item.title}
            </h2>
            <p className={styles.timelineDescription}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline2;