import React from 'react'
import styles from './TechnologyT2.module.css'
import HeroSection from './components/HeroSection'
import DashboardShowcaseSection from './components/DashboardShowcaseSection'
import ProductHighlightsSection from './components/ProductHighlightsSection'
import CTASection from './components/CTASection'

const Technology2 = () => {
    return (
        <div className={styles.container}>
            <HeroSection />
            <DashboardShowcaseSection />
            <ProductHighlightsSection />
            <CTASection />
        </div>
    )
}

export default Technology2   