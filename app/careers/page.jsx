"use client"
import React, { useState } from "react";
import styles from "./CareerSection.module.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const positions = [
  {
    title: "Data Analyst",
    content: [
      "Analyze data trends using SQL and BI tools.",
      "Create dashboards to track KPIs and performance.",
      "Deliver insights that support business decisions.",
    ]
  },
  {
    title: "Product Designer II",
    content: [
      "Enhance UI/UX for our core platform.",
      "Collaborate with product managers and developers.",
      "Create wireframes, prototypes, and design systems."
    ]
  },
  {
    title: "Data Science Engineer",
    content: [
      "Build and deploy machine learning models.",
      "Design scalable data pipelines using Python.",
      "Collaborate on A/B testing and model evaluation."
    ]
  },
  {
    title: "Marketing Associate",
    content: [
      "Plan and execute digital marketing campaigns.",
      "Analyze ROI from SEO/SEM efforts.",
      "Manage social media and content strategy."
    ]
  },
  {
    title: "Full stack Developer",
    content: [
      "Develop frontend using React or Next.js.",
      "Build REST APIs and microservices.",
      "Ensure application performance and security."
    ]
  }
];

export const metadata = {
  title: "Careers at DHAMM.AI | Join the Future of AI in Education",
  description: "Join DHAMM.AI's mission to transform education through AI. Explore career opportunities in EdTech, AI research, engineering, and product development.",
  openGraph: {
    title: "Careers at DHAMM.AI | Join the Future of AI in Education",
    description: "Build the future of AI in education with our team",
    url: "https://dhamm.ai/careers"
  }
};
const CareerSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className={styles.container}>
      <div className={styles.leftTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
       <div className={styles.rightTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
        <div className={styles.rightmiddleShade}>
        <img src="careerbg2.png" alt="" height={"100%"} width={"100%"} />
      </div>
        <div className={styles.leftendShade}>
        <img src="careerbg2.png" alt="" height={"100%"} width={"100%"} />
      </div>
      <button className={styles.exploreButton}> <img src="star.svg"  height={"20px"} alt="" /> Explore Career Opportunities</button>

      <div className={styles.textArea}>
        <h1>
          <span>Transforming</span> Ideas Into <br />
          <span>Intelligent</span> Solutions
        </h1>
        <p>
          Empowering businesses with tailored AI solutions, innovative strategies, and cutting-edge
          technology to drive success and efficiency.
        </p>
      </div>

      {/* Placeholder for Image */}
      <div className={styles.imagePlaceholder}>
        <img src="./careers.jpg" alt="" height={"100%"} width={"100%"} />
      </div>

      <div className={styles.accordion}>
        {positions.map((job, index) => (
          <div key={index} className={styles.accordionItem}>
            <button className={styles.accordionButton} onClick={() => toggleAccordion(index)}>
              {activeIndex === index ? <img src="star.svg"  height={"30px"} alt="" style={{transform:"rotate(45deg)"}} /> : <img src="star.svg"  height={"30px"} alt="" />}
              {job.title}
            </button>
           {activeIndex === index && (
  <div className={styles.accordionContent}>
    <ul>
      {job.content.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
    <button className={styles.applyButton}>Apply Now</button>
  </div>
)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerSection;
