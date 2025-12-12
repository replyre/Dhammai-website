import Link from "next/link";
import Image from "next/image";
import styles from "./blog.module.css";
import { blogPosts } from "./posts";
import FooterSection from "../GlobalComponents/Footer";

const BlogPage = () => {
  const featuredPost = blogPosts;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.topLeft}>
            <button className={styles.blogButton}>+ Our Blog</button>
            <h1 className={styles.mainHeading}>Read about us</h1>
            <p className={styles.subtitle}>
              Read about our latest product and research announcements
            </p>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.searchIcon}
              >
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L14.65 14.65"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search or type keywords"
                className={styles.searchInput}
              />
            </div>
          </div>
        </div>

        {/* Main Content - Featured Posts */}
        <div className={styles.mainContent}>
          {featuredPost.map((post, index) => (
            <div key={post.slug} className={styles.featuredColumn}>
              <div className={styles.featuredContent}>
                <h2 className={styles.featuredTitle}>{post.title}</h2>
                <p className={styles.featuredSummary}>{post.summary}</p>
                <div className={styles.featuredMeta}>
                  <span className={styles.featuredDate}>{post.date}</span>
                  <Link href={`/blog/${post.slug}`} className={styles.readButton}>
                    READ
                  </Link>
                </div>
              </div>
              <div className={styles.featuredImage}>
                <Image
                  src={post.hero}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className={styles.featuredImg}
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </main>
  );
};

export default BlogPage;



