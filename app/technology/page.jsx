import React from 'react'
import styles from './Technology.module.css'
import AgenticStack from './components/AgenticStack'
import Values from './components/Values'
import ProductsSection from './components/ProductsSection'
import ImpactSection from './components/ImpactSection'
import KPICounterSection from './components/KPICounterSection'
import PartnerTrustSection from './components/PartnerTrustSection'
import Head from "next/head";

export const metadata = {
  title: "Technology Solutions | DHAMM.AI",
  description: "Explore our Agentic AI, Deep Learning Infrastructure, Digital Twin Technology, and AI-Native Learning Graph solutions for educational institutions.",
  openGraph: {
    title: "Technology Solutions | DHAMM.AI",
    description: "Agentic AI, Deep Learning, and Digital Twin Technology for education",
    url: "https://dhamm.ai/technology"
  }
};
const Technology = () => {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Technology Solutions",
    "description": "AI technology solutions for educational institutions",
    "url": "https://dhamm.ai/technology",
    "mainEntity": {
      "@type": "Service",
      "name": "Educational AI Technology",
      "description": "Agentic AI, Deep Learning Infrastructure, Digital Twin Technology"
    }
  };
  return (
    <>
     <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageStructuredData)
          }}
        />
      </Head>
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
    </>
  )
}

export default Technology   