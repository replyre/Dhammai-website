import React from 'react'
import styles from './Sigma.module.css'; 
const Sigma = () => {
  return (
    <div className={styles.sigmaContainer}>
        <video src="/sigma.mp4" loop muted autoPlay></video>
        <img src="/graph.png" alt="" />
        <div className={styles.sigmaHeading}>
        <h2>Optimising How <br/>Humans Learn</h2>
        <p>From 1 : 1 to 1 : ∞ - without losing the magic</p>
        </div>
        <div className={styles.sigmaTitle}>
        <div>Turning every classroom into a  <span>2-sigma classroom</span></div>
         <a href="#" className={styles.ctaButton}>Know More</a></div>
        
    </div>
  )
}

export default Sigma