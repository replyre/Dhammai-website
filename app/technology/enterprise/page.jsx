import React from 'react'
import styles from './TechnologyT3.module.css'
import HeroSection from './components/HeroSection'
import ProductHighlightsSection from './components/ProductHighlightsSection'
import ProblemAndFixMiniTable from './components/ProblemAndFixMiniTable'
import CTASection from './components/CTASection'
export const metadata = {
  title: "Enterprise AI Solutions | Corporate Training & Predictive Maintenance | DHAMM.AI",
  description: "Scale your enterprise with DHAMM.AI's corporate solutions: predictive maintenance, knowledge memory hubs, employee upskilling programs.",
  openGraph: {
    title: "Enterprise AI Solutions | Corporate Training by DHAMM.AI",
    description: "Intelligent enterprise solutions for training and maintenance",
    url: "https://dhamm.ai/technology/enterprise"
  }
};
const Technology = () => {
  return (
    <>
    <div className={styles.overlay}></div>
    <div className={styles.container}>
      <HeroSection />
      <ProductHighlightsSection />
      <ProblemAndFixMiniTable />
      <CTASection />
    </div>
    </>
  )
}

export default Technology   