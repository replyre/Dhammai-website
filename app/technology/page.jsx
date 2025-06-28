import React from 'react'
import styles from './Technology.module.css'
import AgenticStack from './components/AgenticStack'
import Values from './components/Values'
import ProductsSection from './components/ProductsSection'
import ImpactSection from './components/ImpactSection'
import KPICounterSection from './components/KPICounterSection'
import PartnerTrustSection from './components/PartnerTrustSection'
const Technology = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
        <p>Our Innovation</p>
        <h1>Hyper-Local, on-prem AI <br />that learns with you</h1>
        <div className={styles.imgContainer}>
            <img src="/technologyhome.png" alt="" />
            <p>Dhamm AI combines <span>Agentic RAG, Deep Knowledge Tracing,</span> and <span>edge-speed inference</span> into a single, privacy-first stack. Everything runs on your servers or private cloud, so content never leaves campus. Learners, faculty, and administrators get real-time, multilingual, multimodal answers.</p>
        </div>
       <AgenticStack/>
       <Values/>
       <ProductsSection/>
       <ImpactSection/>
       <KPICounterSection/>
       <PartnerTrustSection/>
    </div>
  )
}

export default Technology   