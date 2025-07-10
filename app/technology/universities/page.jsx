import React from 'react'
import styles from './TechnologyT2.module.css'
import HeroSection from './components/HeroSection'
import DashboardShowcaseSection from './components/DashboardShowcaseSection'
import LMSSection from './components/LMSSection'
import ProductHighlightsSection from './components/ProductHighlightsSection'
import CTASection from './components/CTASection'

export const metadata = {
  title: "AI Solutions for Universities | Higher Education Technology by DHAMM.AI",
  description: "Transform higher education with DHAMM.AI's university solutions: intelligent dashboards, research automation, institutional memory, accreditation tools.",
  openGraph: {
    title: "AI Solutions for Universities | DHAMM.AI",
    description: "Intelligent university solutions for research and administration",
    url: "https://dhamm.ai/technology/universities"
  }
};

const Technology2 = () => {
    return (
        <>
         <div className={styles.overlay}></div>
        <div className={styles.container}>
            <HeroSection />
            <DashboardShowcaseSection />
            <LMSSection />
            <ProductHighlightsSection />
            <CTASection />
        </div>
        </>
    )
}

export default Technology2   