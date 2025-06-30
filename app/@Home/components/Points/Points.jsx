import React from 'react'
import styles from './Points.module.css'; // Assuming you have a CSS file for styling
const Points = () => {
  return (
    <div className={styles.container}>
        <div className={styles.pointsContainer1}>
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
            <img className={styles.img} src="/ball1.gif" />
            <div className={styles.text}>
                <h2 >Connecting Minds</h2>
                <p><span>Unify people and data on</span> one AI-native learning graph</p>
            </div>
        </div>
        <div className={styles.pointsContainer1}>
            <div className={styles.box1}></div>
            <div className={styles.box12}></div>
            <img className={styles.img2} src="/ball2.gif" />
            <div className={styles.text2}>
                <h2 >Bridiging Gaps</h2>
                <p>Adaptive agents<span> close knowledge, access, and support gaps in</span> real-time</p>
            </div>
        </div>
         <div className={styles.pointsContainer1}>
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
            <img className={styles.img} src="/ball3.gif" />
            <div className={styles.text}>
                <h2 >Transforming Lives</h2>
                <p><span>Insight-driven pathways</span>  turn today’s courses into tomorrow’s careers.</p>
            </div>
        </div>
    </div>
  )
}

export default Points