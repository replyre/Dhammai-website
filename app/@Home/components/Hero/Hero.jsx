import React from 'react'
import styles from'./Hero.module.css'; // Assuming you have a CSS file for styling
import './RadialGradientText.css';
import { Info } from '../Info/Info';
const Hero = () => {
  return (
    <div className={styles.hero}>
       <div className="gradient-container">
      <div className="gradient-background"></div>
      
      <div className="text-content">
        <p className="main-heading">
          Hyper Local Information <br />
          Intelligence Research
        </p>
        <p className="sub-heading">
          Innovative <span className="separator">|</span> Inclusive <span className="separator">|</span> Transformative
        </p>
      </div>
      
      <div className={styles.wheel}>
        <div className={styles.wheelcontainer}>
        <img src="wheel.png" alt="" />
        <div className={styles.overlay}></div>
      </div>
      </div>
      <div className={styles.light}>
        <div className={styles.lightcontainer}>
        <video src="light.mp4" loop muted autoPlay></video>
        <div className={styles.lightoverlay}></div>
        </div>
      </div>
      
    </div>
  
    </div>  
  )
}

export default Hero