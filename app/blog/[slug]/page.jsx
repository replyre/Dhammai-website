import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./post.module.css";
import { blogPosts } from "../posts";
import FooterSection from "../../GlobalComponents/Footer";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link href="/blog" className={styles.backLink}>
          <FaArrowLeft /> Back to blog
        </Link>

        <header className={styles.header}>
          <div className={styles.badgeRow}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.badge}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.subtitle}>{post.subtitle}</p>
          <div className={styles.meta}>
            <span className={styles.author}>By {post.author}</span>
            <span className={styles.dot}>•</span>
            <span>{post.date}</span>
            <span className={styles.dot}>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className={styles.heroImage}>
          <Image
            src={post.hero}
            alt={post.title}
            fill
            sizes="100vw"
            className={styles.heroImg}
            priority
          />
        </div>

        <div className={styles.content}>
          {post.sections.map((section, index) => (
            <section key={index} className={styles.section}>
              {section.title && (
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              )}

              {section.paragraphs &&
                section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}

              {section.bullets && (
                <ul className={styles.bulletList}>
                  {section.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className={styles.bullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    {section.table.caption && (
                      <caption className={styles.tableCaption}>
                        {section.table.caption}
                      </caption>
                    )}
                    <thead>
                      <tr>
                        {section.table.columns.map((column, cIndex) => (
                          <th key={cIndex} className={styles.tableHeader}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIndex) => (
                        <tr key={rIndex} className={styles.tableRow}>
                          {row.map((cell, cIndex) => (
                            <td key={cIndex} className={styles.tableCell}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>
      </article>

      
    </main>
  );
}

