import React from "react";
import styles from "./BlogSection.module.css";
import { FaSearch } from "react-icons/fa";

const BlogSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div>
        <button className={styles.blogButton}>+ Our Blog</button>
        <h1>
          Read about us
        </h1>
        <p>Read about our latest product and research announcements</p>
        </div>  
        <div className={styles.searchBox}>
          <FaSearch className={styles.icon} />
          <input type="text" placeholder="Search or type keywords" />
        </div>
      </div>

      <div className={styles.latestBlogs}>
        <h2>
          <span>Latest Blogs</span>
        </h2>
        <div className={styles.featured}>
          <div className={styles.featuredText}>
            <h3>Grok 3 Beta — The Age of Reasoning Agents</h3>
            <p>
              We are thrilled to unveil an early preview of Grok 3, our most
              advanced model yet, blending superior reasoning with extensive
              pretraining knowledge.
            </p>
            <div className={styles.meta}>
              <span>February 19, 2025</span>
              <button className={styles.readBtn}>READ</button>
            </div>
          </div>
          <img
            src="/blog1.png"
            alt="Blog Visual"
            className={styles.featuredImg}
          />
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <img src="/placeholder2.jpg" alt="Blog Visual" />
            <div>
              <h4>xAI raises $6B Series C</h4>
              <p>
                We are partnering with A16Z, Blackrock, Fidelity Management &
                Research Company, Kingdom Holdings, Lightspeed, MGX, Morgan
                Stanley, QIA, Ol...
              </p>
              <div className={styles.meta}>
                <span>December 25, 2024</span>
                <button className={styles.readBtn}>READ</button>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <img src="/placeholder3.jpg" alt="Blog Visual" />
            <div>
              <h4>xAI raises $6B Series C</h4>
              <p>
                We are partnering with A16Z, Blackrock, Fidelity Management &
                Research Company, Kingdom Holdings, Lightspeed, MGX, Morgan
                Stanley, QIA, Ol...
              </p>
              <div className={styles.meta}>
                <span>December 25, 2024</span>
                <button className={styles.readBtn}>READ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
