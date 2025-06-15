import React from 'react'
import styles from './Bloom.module.css'; 
const Bloom = () => {
  return (
    <div>
        <div className={styles.bloomheading}>
           <span>Dhamm AI</span>  transforms Bloom’s breakthrough into everyday practice
        </div>
        <div className={styles.fourpartsContainer}>
            <div className={styles.fourparts}
            >
                <div className={styles.fourpartsGrid}>
                    <div>
                        <h3>Hyper-local AI agents</h3>
                        <p>tuned by each teacher’s intent—no generic chatbots</p>
                    </div>
                     <div>
                        <h3>Real-time mastery checks</h3>
                        <p>+ spaced-reinforcement, so knowledge sticks</p>
                    </div>
                     <div>
                        <h3>Private-by-design deployment</h3>
                        <p>data never leaves your campus.</p>
                    </div>
                     <div>
                        <h3>Invisible orchestration</h3>
                        <p>of content, feedback & analytics: the tutor that scales</p>
                    </div>
                </div>
            </div>
            <div className={styles.logos}
            
            >
                <div className={styles.overlay}></div>
                <h5>Trusted by  Primier Institutions</h5>
                <div className={styles.logoSlides}>
                    <img src="partnerlogo0.png" alt="" />
                    <img src="partnerlogo1.png" alt="" />
                    <img src="partnerlogo2.png" alt="" />
                    <img src="partnerlogo3.png" alt="" />
                    <img src="partnerlogo4.png" alt="" />
                    <img src="partnerlogo5.png" alt="" />
                   
                </div>
                <div className={styles.logoSlides}>
                    <img src="partnerlogo0.png" alt="" />
                    <img src="partnerlogo1.png" alt="" />
                    <img src="partnerlogo2.png" alt="" />
                    <img src="partnerlogo3.png" alt="" />
                    <img src="partnerlogo4.png" alt="" />
                    <img src="partnerlogo5.png" alt="" />
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Bloom