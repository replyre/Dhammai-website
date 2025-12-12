import React from 'react'
import styles from './TechnologyT1.module.css'
import HeroSection from './components/HeroSection'
import HolisticLearningSection from './components/HolisticLearningSection'
import StakeholderSection from './components/StakeholderSection'
import ProductHighlightsSection from './components/ProductHighlightsSection'
import ImpactSnapshotSection from './components/ImpactSnapshotSection'
import CTASection from './components/CTASection'

export const metadata = {
  title: "AI for K-12 Schools | Adaptive Learning & Parent Engagement | DHAMM.AI",
  description: "Empower K-12 education with DHAMM.AI's school solutions: adaptive mastery paths, parent engagement apps, AR/VR labs, teacher toolkits.",
  openGraph: {
    title: "AI for K-12 Schools | Adaptive Learning by DHAMM.AI",
    description: "Adaptive learning solutions for K-12 schools",
    url: "https://dhamm.ai/technology/schools"
  }
};
const Technology = () => {
  return (
    <>
    <div className={styles.overlay}></div>
    <div className={styles.container}>
      <HeroSection />
      <HolisticLearningSection />
      <StakeholderSection />
      <ProductHighlightsSection />
      <ImpactSnapshotSection />
      <CTASection />
    </div>
    </>
  )
}

export default Technology   