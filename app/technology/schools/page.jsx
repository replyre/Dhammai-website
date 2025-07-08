import React from 'react'
import styles from './TechnologyT1.module.css'
import HeroSection from './components/HeroSection'
import HolisticLearningSection from './components/HolisticLearningSection'
import StakeholderSection from './components/StakeholderSection'
import ProductHighlightsSection from './components/ProductHighlightsSection'
import ImpactSnapshotSection from './components/ImpactSnapshotSection'
import CTASection from './components/CTASection'

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