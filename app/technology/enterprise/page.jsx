import React from 'react'
import styles from './TechnologyT3.module.css'
import HeroSection from './components/HeroSection'
import ProductHighlightsSection from './components/ProductHighlightsSection'
import ProblemAndFixMiniTable from './components/ProblemAndFixMiniTable'
import CTASection from './components/CTASection'

const Technology = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <ProductHighlightsSection />
      <ProblemAndFixMiniTable />
      <CTASection />
    </div>
  )
}

export default Technology   