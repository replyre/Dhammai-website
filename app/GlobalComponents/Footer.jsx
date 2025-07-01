// FooterSection.jsx
"use client"
import React from 'react';
import styles from './Footer.module.css';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa6';
import { GiShipWheel } from 'react-icons/gi';
import Link from 'next/link';

const FooterSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Email submitted!');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Navigation Links */}
          <nav className={styles.navigation}>
            {/* Logo */}
           
              <img src="logo.png" height={"30px"} />

            
            {/* Navigation Links */}
           <ul className={styles.navLinks}>
 
  <li><Link href="/company">Company</Link></li>
  <li><Link href="/technology">Technology</Link></li>
  <li><Link href="/careers">Careers</Link></li>
  <li><Link href="/blog">Blog</Link></li>
</ul>
            
            {/* Social Icons */}
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Twitter"><FaXTwitter /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </nav>
          
          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h2 className={styles.heading}>Get in touch with us</h2>
            
            <form className={styles.emailForm} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.emailIcon} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  className={styles.emailInput}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;