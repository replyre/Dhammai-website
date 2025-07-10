import React from "react";
import styles from "./BlogSection.module.css";
import { FaSearch } from "react-icons/fa";
import { blogPosts } from "../data/blog";
import Link from "next/link";

export const metadata = {
  title: "DHAMM.AI Blog | AI Education Insights & Research Updates",
  description: "Stay updated with the latest in AI education, research insights, product announcements, and thought leadership from DHAMM.AI.",
  openGraph: {
    title: "DHAMM.AI Blog | AI Education Insights & Research",
    description: "Latest insights in AI education and research updates",
    url: "https://dhamm.ai/blog"
  }
};

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
                <Link href={`blog/${0}`}>
              <button className={styles.readBtn}>READ</button>
              </Link>
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
