// components/Navbar/Navbar.js
import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <img src="/logo.png" alt="" />
          </div>
          <span className={styles.logoText}>Dhamm AI</span>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/company" className={styles.navLink}>
            Company
          </Link>
          <Link href="/technology" className={styles.navLink}>
            Technology
          </Link>
          <Link href="/careers" className={styles.navLink}>
            Careers
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Our Blog
          </Link>
        </div>

        {/* Contact Button */}
        <div className={styles.contactSection}>
          <Link href="/contact" className={styles.contactButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;