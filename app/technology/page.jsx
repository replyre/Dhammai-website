import React from 'react'
import styles from './Technology.module.css'
import AgenticStack from './components/AgenticStack'
const Technology = () => {
  return (
    <div className={styles.container}>
        <p>Our Innovation</p>
        <h1>Hyper-Local, on-prem AI <br />that learns with you</h1>
        <div className={styles.imgContainer}>
            <img src="/technologyhome.png" alt="" />
            <p>Dhamm AI combines Agentic RAG, Deep Knowledge Tracing, and edge-speed inference into a single, privacy-first stack. Everything runs on your servers or private cloud, so content never leaves campus. Learners, faculty, and administrators get real-time, multilingual, multimodal answers.</p>
        </div>
       <AgenticStack/>
    </div>
  )
}

export default Technology   