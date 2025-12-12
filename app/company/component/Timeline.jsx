'use client';

import React, { useState } from 'react';
import styles from './Timeline.module.css';
import { motion } from 'framer-motion'; // correct import

const majorEvents = [
  { year: 1943, title: 'McCulloch-Pitts neuron Model', description: 'McCulloch-Pitts neuron model published in', link: 'https://www.cs.cmu.edu', linkLabel: 'CMU School of Computer Science' },
  { year: 1950, title: 'Turing Test Proposed', description: 'Alan Turing proposed a test to determine AI intelligence', link: 'https://en.wikipedia.org/wiki/Turing_test', linkLabel: 'Wikipedia' },
  { year: 1956, title: 'Dartmouth Conference', description: 'Birth of AI as a field at the Dartmouth Summer Research Project', link: 'https://en.wikipedia.org/wiki/Dartmouth_workshop', linkLabel: 'Wikipedia' },
  { year: 1958, title: 'Dartmouth Conference', description: 'Birth of AI as a field at the Dartmouth Summer Research Project', link: 'https://en.wikipedia.org/wiki/Dartmouth_workshop', linkLabel: 'Wikipedia' },
  { year: 1986, title: 'Backpropagation Popularized', description: 'Backpropagation algorithm gained prominence', link: 'https://en.wikipedia.org/wiki/Backpropagation', linkLabel: 'Wikipedia' },
  { year: 1997, title: 'Backpropagation Popularized', description: 'Backpropagation algorithm gained prominence', link: 'https://en.wikipedia.org/wiki/Backpropagation', linkLabel: 'Wikipedia' },
  { year: 2012, title: 'Deep Learning Breakthrough', description: 'ImageNet competition won using deep convolutional neural networks', link: 'https://en.wikipedia.org/wiki/ImageNet', linkLabel: 'Wikipedia' },
  { year: 2020, title: 'GPT-3 Released', description: 'OpenAI released the powerful GPT-3 model', link: 'https://openai.com', linkLabel: 'OpenAI' },
  { year: 2025, title: 'The Future', description: 'AI continues to evolve...', link: '#', linkLabel: 'Explore' },
];

const Timeline = () => {
  const [hoveredYear, setHoveredYear] = useState(null);
  const [hoveredIndex, sethoveredIndex] = useState(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timelineLine} />

      <div className={styles.ticks}>
        {majorEvents.map((event, index) => (
          <React.Fragment key={event.year}>
            <div className={styles.majorWrapper}>
              <div className={styles.yearLabel}>{event.year}</div>
              <motion.div
                className={styles.majorTick}
                onHoverStart={() => {setHoveredYear(event.year) ;sethoveredIndex(index);}}
                onHoverEnd={() => {setHoveredYear(null); sethoveredIndex(null);}}
                whileHover={{ scaleY: 1.6, backgroundColor: '#FFB6C1', y: 20 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              
            </div>
            {index < majorEvents.length - 1 &&
              Array.from({ length: 10 }).map((_, i) => (
                <div key={`${event.year}-minor-${i}`} className={styles.minorTick} />
              ))}
          </React.Fragment>
        ))}
      </div>

      {/* Show HoverCard only on first or last major tick */}
      {hoveredYear && (
        <motion.div
          className={`${styles.hoverCard} `}
          initial={{ opacity: 0, y: 10, x: hoveredIndex<2 ?`${hoveredIndex*100}px`: hoveredIndex<5? `${hoveredIndex*100+100}px`:`${hoveredIndex*150}px` }}
          animate={{ opacity: 1, y: 0,x: hoveredIndex<2 ?`${hoveredIndex*100}px`: hoveredIndex<5? `${hoveredIndex*100+100}px`:`${hoveredIndex*150}px` }}
          transition={{ duration: 0.3 }}
          
        >
          {(() => {
            const item = majorEvents.find((e) => e.year === hoveredYear);
            return (
              <>
                <h3>{item.title}</h3>
                <p>
                  {item.description}{' '}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.linkLabel}
                  </a>
                </p>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default Timeline;
