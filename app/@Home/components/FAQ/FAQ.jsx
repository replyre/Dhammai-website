"use client";
import React, { useRef, useState, useEffect } from 'react';
import styles from './FAQ.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FaqSection = () => {
  const scrollRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = isMobile ? clientWidth * 0.8 : clientWidth;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
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
    {
      question: 'How secure is your platform?',
      answer: 'Our platform prioritizes security with end-to-end encryption, local data processing, and compliance with international privacy standards.',
    },
    {
      question: 'Can I customize the AI for my needs?',
      answer: 'Yes, our AI solutions are highly customizable and can be tailored to your specific requirements and use cases.',
    },
  ];

  return (
    <section className={styles.faqWrapper}>
      <div className={styles.headingWrapper}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>
            Frequently asked questions
          </h2>
          <p className={styles.subtitle}>All the things you need to know about us</p>
        </div>
        <div className={styles.navIcons}>
          <button onClick={() => scroll('left')} aria-label="Scroll left">
            <FaArrowLeft />
          </button>
          <button onClick={() => scroll('right')} aria-label="Scroll right">
            <FaArrowRight />
          </button>
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