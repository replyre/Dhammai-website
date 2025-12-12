"use client"
import React from "react";

import styles from "./BlogPage.module.css";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { blogPosts } from "@/app/data/blog";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation'; 



const BlogSection = () => {
    const {blogId} = useParams();
    const router = useRouter();
  const featured = blogPosts[blogId];
  
  const others = blogPosts.slice(blogId+1,blogId+3);
      const handleBack = () => {
       
        router.back();
      };

  return (
    <section className={styles.container}>
      <div className={styles.leftTopShade}>
        <img src="/careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
       <div className={styles.rightTopShade}>
        <img src="/careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
      <FaArrowLeft color="gray" className={styles.arrow} onClick={handleBack}/>
       <div className={styles.featuredDate}>{featured.date}</div>

      <div className={styles.latestBlogs}>
       
         <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <p className={styles.featuredDescription}>{featured.description}</p>
             <img
            src={featured.image}
            alt="Blog Visual"
            className={styles.featuredImg}
          />
<div className={styles.featuredData}>
  {featured.data.split('\n').map((line, idx) => {
    return (
      <div key={idx}>
        <p>{line}</p>
        <br />
      </div>
    );
  })}
</div>           
        {/* Featured Blog */}
        <div className={styles.featured}>
         
         
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

