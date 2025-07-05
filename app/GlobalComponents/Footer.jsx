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
              <a href="https://x.com/dhammxai?t=W-9J_ftSeyGQTW8OGLWyjw&s=08" aria-label="Twitter"><FaXTwitter /></a>
              <a href="https://www.facebook.com/share/16dhiS4Ae8/" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/dhamm.ai?igsh=OWc0bzMwZ2M1a2k3&utm_source=qr" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/dhamm-ai/" aria-label="LinkedIn"><FaLinkedinIn /></a>
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