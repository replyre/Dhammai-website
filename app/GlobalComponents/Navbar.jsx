"use client"
// components/Navbar/Navbar.js
import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import styles from './navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link href={"/"}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <img src="/logo.png" alt="" />
          </div>
          <span className={styles.logoText}>Dhamm AI</span>
        </div>
</Link>
        {/* Desktop Navigation Links */}
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

        {/* Desktop Contact Button */}
        <div className={styles.contactSection}>
          <Link href="/contact" className={styles.contactButton}>
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
            <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
              <div className={styles.mobileMenuHeader}>
                <div className={styles.mobileMenuLogo}>
                  <div className={styles.logoIcon}>
                    <img src="/logo.png" alt="" />
                  </div>
                  <span className={styles.logoText}>Dhamm AI</span>
                </div>
                <button 
                  className={styles.mobileMenuClose}
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <HiX size={24} />
                </button>
              </div>
              
              <div className={styles.mobileMenuLinks}>
                <Link href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                  Home
                </Link>
                <Link href="/company" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                  Company
                </Link>
                <Link href="/technology" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                  Technology
                </Link>
                <Link href="/careers" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                  Careers
                </Link>
                <Link href="/blog" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                  Our Blog
                </Link>
                <Link href="/contact" className={styles.mobileContactButton} onClick={closeMobileMenu}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;