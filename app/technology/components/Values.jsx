import React from 'react'
import styles from './Values.module.css'
const Values = () => {
  return (
    <div className={styles.values}>
        <h1>Our Values</h1>
        <div className={styles.visionText}>
                <div className={styles.visionblock} style={{backgroundImage: `url('./s1.png')`, backgroundSize: 'cover', backgroundPosition:"center"}}>
                    <div></div>
                    <div>
                <img src="/vision2.png" alt="" />
                <h1>Innovative</h1>
                <p>Hyper-local intelligence</p>
                </div>
                </div>
                <div className={styles.visionblock} style={{backgroundImage: `url('./s2.png')`, backgroundSize: 'cover'}}>
                    <div></div>
                    <div>
                <img src="/vision1.png" alt="" />
                 <h1>Inclusive</h1>
                <p>Integrated platform for all with non-alienating tech tools</p>
                </div>
                </div>
                <div className={styles.visionblock} style={{backgroundImage: `url('./s3.png')`, backgroundSize: 'cover'}}>
                     <div></div>
                     <div >
                <img src="/vision3.png" alt="" />
                 <h1>Transformative</h1>
                <p>Adapts and evolves with users</p>
                </div>
                </div>
        </div>
    </div>
  )
}

export default Values