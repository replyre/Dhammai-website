"use client";
import React, { useRef } from 'react';
import styles from './FAQ.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FaqSection = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const faqs = [
    {
      question: 'What is Dhamm AI?',
      answer: 'Dhamm AI creates AI-driven agentic solutions. Our systems personalise learning, manage institutional memory and operations while ensuring top-notch privacy.',
    },
    {
      question: 'Who benefits from Dhamm AI solutions?',
      answer: 'Everyone - students, teachers, educational institutions, researchers, and businesses can enhance their learning outcomes and operational efficiency.',
    },
    {
      question: 'What makes your technology different?',
      answer: 'We focus on privacy, local data management, personalisation, and inclusivity, tailoring each solution to user and institutional needs.',
    },
  ];

  return (
    <section className={styles.faqWrapper}>
      <div className={styles.headingWrapper}>
        <div>
        <h2 className={styles.title}>
          Frequently asked questions
        </h2>
        <p className={styles.subtitle}>All the things you need to know about us</p>
        </div>
        <div className={styles.navIcons}>
        <button onClick={() => scroll('left')}><FaArrowLeft /></button>
        <button onClick={() => scroll('right')}><FaArrowRight /></button>
      </div>
      </div>

      

      <div className={styles.faqList} ref={scrollRef}>
        {faqs.map((item, index) => (
          <div className={styles.faqCard} key={index}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
