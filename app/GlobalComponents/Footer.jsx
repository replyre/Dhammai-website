import React from 'react';
import styles from './Footer.module.css';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa6';

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          {/* Replace with actual logo or image if needed */}
          <span><img src="/logo.png" height={"50px"} alt="" /></span>
        </div>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>Company</li>
          <li>Technology</li>
          <li>Careers</li>
          <li>Our Blog</li>
        </ul>
        <div className={styles.socialIcons}>
          <FaXTwitter />
          <FaFacebookF />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.subscribeBox}>
        <h2 className={styles.heading}>
          Get in touch with us
        </h2>
        <form className={styles.form}>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.icon} />
            <input type="email" placeholder="Enter your email" />
          </div>
          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </footer>
  );
};

export default FooterSection;
