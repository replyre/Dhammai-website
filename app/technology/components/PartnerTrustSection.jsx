import React from 'react';
import { FiShield, FiTriangle, FiAward } from 'react-icons/fi';
import styles from './PartnerTrustSection.module.css';
import Link from 'next/link';

const PartnerTrustSection = () => {
  const badges = [
    {
      icon: <img src='shield.png' height={"64px"}/>,
      title: "DPDP",
      subtitle: "READY"
    },
    {
      icon: <img src='azure.png'  height={"72px"}/>,
      title: "AZURE",
      subtitle: "SECURED"
    },
    {
      icon: <img src='iso.png'  height={"72px"}/>,
      title: "ISO 27001",
      subtitle: "COMPANY"
    }
  ];

  return (
    <div className={styles.container}>
       <video className={styles.vid1} src="/partner.mp4" loop autoPlay muted></video>
      <div className={styles.content}>
        
          <video className={styles.vid2} src="/partner.mp4" loop autoPlay muted></video>
        <h1 className={styles.title}>Partner & Trust Wall</h1>
        <p className={styles.subtitle}>OUR BADGES</p>
        
        <div className={styles.badgesCard}>
          <div className={styles.badgesContainer}>
            {badges.map((badge, index) => (
              <div key={index} className={styles.badge}>
                <div className={styles.badgeIcon}>
                  {badge.icon}
                </div>
                <div className={styles.badgeText}>
                  <span className={styles.badgeTitle}>{badge.title}</span>
                  <span className={styles.badgeSubtitle}>{badge.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <p className={styles.description}>
          We Collaborate As True Partners - Not Off-The-Shelf Vendors - Crafting<br />
          Tailor-Made AI Solutions For Every Unique Use Case.
        </p>
        
        <Link  href={"/contact"} className={styles.demoButton}>
          Book a Demo
        </Link>
      </div>
    </div>
  );
};

export default PartnerTrustSection;