import React from "react";
import styles from "./BlogSection.module.css";
import { FaSearch } from "react-icons/fa";

const blogPosts = [
  {
    title: "Grok 3 Beta — The Age of Reasoning Agents",
    description:
      "We are thrilled to unveil an early preview of Grok 3, our most advanced model yet, blending superior reasoning with extensive pretraining knowledge.",
    date: "February 19, 2025",
    image: "/blog1.png",
  },
  {
    title: "xAI raises $6B Series C",
    description:
      "We are partnering with A16Z, Blackrock, Fidelity Management & Research Company, Kingdom Holdings, Lightspeed, MGX, Morgan Stanley, QIA, Ol...",
    date: "December 25, 2024",
    image: "/blog2.png",
  },
  {
    title: "New AI Benchmarks Released",
    description:
      "Our team released a new suite of benchmarks to evaluate real-world reasoning and performance in critical AI tasks.",
    date: "November 14, 2024",
    image: "/blog3.png",
  },
];

const BlogSection = () => {
  const featured = blogPosts[0];
  const others = blogPosts.slice(1);

  return (
    <section className={styles.container}>
      <div className={styles.leftTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
       <div className={styles.rightTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
      <div className={styles.header}>
        <div>
          <button className={styles.blogButton}>+ Our Blog</button>
          <h1>Read about us</h1>
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

        {/* Featured Blog */}
        <div className={styles.featured}>
          <div className={styles.featuredText}>
            <div>            
              <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            </div>
            <div className={styles.meta}>
              <span>{featured.date}</span>
              <button className={styles.readBtn}>READ</button>
            </div>
          </div>
          <img
            src={featured.image}
            alt="Blog Visual"
            className={styles.featuredImg}
          />
        </div>
      <div className={styles.divider}></div>
        {/* Other Blogs */}
        <div className={styles.cards}>
          {others.map((blog, index) => (
            <div key={index} className={styles.card}>
              <img src={blog.image} alt="Blog Visual" />
              <div>
                <h4>{blog.title}</h4>
                <p>{blog.description}</p>
                <div className={styles.meta}>
                  <span>{blog.date}</span>
                  <button className={styles.readBtn}>READ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
