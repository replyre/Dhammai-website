import React from 'react'
import styles from './Company.module.css'
import Timeline from './component/Timeline'
import Timeline2 from './component/Timeline2'
import Link from 'next/link'

export const metadata = {
  title: "About DHAMM.AI | Our Mission for Inclusive AI Education",
  description: "Learn about DHAMM.AI's mission to democratize AI in education. We build inclusive, culturally relevant learning platforms that respect privacy and empower every learner worldwide.",
  openGraph: {
    title: "About DHAMM.AI | Our Mission for Inclusive AI Education",
    description: "Building inclusive AI education solutions that respect privacy",
    url: "https://dhamm.ai/company"
  }
};
const Company = () => {
  return (
    <div className={styles.contianer}  >
      <div className={styles.overlay} ></div>
      <div className={styles.dome}>
       <p>Our Mission</p> 
       <h1>Technology for All</h1>
       <h1>Barrier for None</h1>
     
      </div>
      <div className={styles.imgs}>
        <img className={styles.light} src="/light_beam.png" alt="" />
        <img className={styles.lightbeam} src="/light_beam_mob.png" alt="" />
        <div className={styles.brain} ><img  src="/brain.png" alt="" /></div>
       
       <img  className={styles.brainbelow} src="/brainbelow.png" alt="" />
       </div>
       <div className={styles.text}>
        <h1>Who are we ?</h1>
        <p> <span>Dhamm AI</span> was established to make technology and education accessible, inclusive, and impactful. Inspired by the principle of "Dhamm"—<span>the essential knowledge required to fulfill one's duties</span>—we actively empower individuals and communities by creating practical, intelligent solutions tailored to their real-world needs.</p>
       </div>
       <div className={styles.world}>
        <img src="/world.jpg" alt="" />
        <div className={styles.worldtext}>
        <h1>Our Mission</h1>
        <p>Our mission actively bridges the gap between global innovation and local requirements, delivering cutting-edge AI-driven solutions that integrate effortlessly into daily routines. We serve a diverse audience—from students and educators to average working professionals—providing secure, locally-contextualized solutions that enhance productivity and learning outcomes.</p>
        </div>
       
       </div>
        <div className={styles.worldtext2}>
        <h1> Our Vision</h1>
        <div className={styles.vision}>
          <div className={styles.comp}>
            <img className={styles.overlay1}  src="/backvision1.png" alt="" />
            <div >
            <img src="/vision1.png" alt="" />
            <p>Inclusivity</p>
            <p>Making technology accessible and impactful for everyone, irrespective of background or proficiency.</p> </div>
            </div>
          <div className={styles.comp}>
              <img  className={styles.overlay2} src="/backvision2.png" alt="" />
              <div>
            <img src="/vision2.png" alt="" />
              <p>Innovation</p>
            <p>Constantly delivering pioneering solutions that meet practical challenges and evolve with user needs.</p></div>
          </div>
          <div className={styles.comp}>
            <img  className={styles.overlay3} src="/backvision3.png" alt="" />
             <div>
            <img src="/vision3.png" alt="" />
             <p>Integrity</p>
            <p>Prioritizing privacy, transparency, and ethical standards in every solution we provide.</p>
            </div>
          </div>
        </div>
        </div>
       <div className={styles.evolve}>
        <h1>The AI Timeline</h1>
        <p>Evolution of Artificial Intelligence (1943 – 2025)</p>
         </div>
         <Timeline/>
         <div className={styles.timeline2}>
         <Timeline2/>
         <div className={styles.compimg}>
          <img  src="/comp.gif" alt="" />
         </div>
         </div>       
    <section className={styles.journeySection}>
      <div className={styles.journeyContainer}>
    <div className={styles.journeyContent}>
      <h2 className={styles.journeyTitle}>
        The journey <span className={styles.journeyTitleMuted}>continues</span>
      </h2>
      <p className={styles.journeySubtitle}>
        this time with you on board!
      </p>
    </div>
    <Link href={"/contact"} className={styles.ctaButton}>
      Reach out Now!
    </Link>
  </div>
</section>
    </div>
  )
}

export default Company