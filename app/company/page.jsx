import React from 'react'
import styles from './Company.module.css'

const Company = () => {
  return (
    <div class={styles.contianer} 
    >
      <div className={styles.dome}>
       <p>Our Mission</p> 
       <h1>Technology for All</h1>
       <h1>Barrier for None</h1>
     
      </div>
      <div className={styles.imgs}>
        <img className={styles.light} src="/light_beam.png" alt="" />
        <div className={styles.brain} ><img  src="/brain.png" alt="" /></div>
       
       <img  className={styles.brainbelow} src="/brainbelow.png" alt="" />
       </div>
       <div className={styles.text}>
        <h1>Who are we ?</h1>
        <p> <span>Dhamm AI</span> was established to make technology and education accessible, inclusive, and impactful. Inspired by the principle of "Dhamm"—<span>the essential knowledge required to fulfill one's duties</span>—we actively empower individuals and communities by creating practical, intelligent solutions tailored to their real-world needs.</p>
       </div>
    </div>
  )
}

export default Company