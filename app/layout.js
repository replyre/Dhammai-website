  // app/layout.js (CORRECTED VERSION)
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import Navbar from "./GlobalComponents/Navbar";
  import FooterSection from "./GlobalComponents/Footer";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata = {
    title: "DHAMM.AI",
    description: "AI in Education, Personalized Learning Platforms, Educational AI, Hyper-Local Information Intelligence Research, Institutional Memory, Data-Driven Decision Making, Secure Learning Platforms. Dhamm AI combines Agentic RAG, Deep Knowledge Tracing, and edge-speed inference into a single, privacy-first stack.",
    keywords: [
      "AI in Education",
      "Personalized Learning Platforms",
      "Educational AI",
      "Hyper-Local Information Intelligence Research",
      "Institutional Memory",
      "Data-Driven Decision Making",
      "Secure Learning Platforms",
      "Learning Ecosystem",
      "Future of Learning",
      "Digitization in Education",
      "Privacy-Focused Educational Technology",
      "AI-Powered Institutional Management",
      "Education 4.0",
      "University 4.0",
      "Industry 5.0",
      "AI-Driven Agentic Solutions",
      "Personalised Virtual Workspace",
      "Exploratory Data Service",
      "Learning Intelligence Systems",
      "Assisted Content Generation",
      "Human in the Loop Solutions",
      "Ecosystem Management Tools",
      "Time Temporal Management Tools",
      "Data Extraction Services",
      "Customizable AI for Educational Institutions",
      "AI to Improve Learning Outcomes",
      "Agentic AI",
      "Deep Learning in Education",
      "Inference Finetuning",
      "Digital Twin Technology",
      "AI-Native Learning Graph",
      "Sigma 2 Problem in AI",
      "Asynchronous Real-Time Approach",
      "Objective Maximisation",
      "Indifference Value Exploration",
      "Action Model",
      "Intelligence System Design Generation 4",
      "Wisdom of the Crowd Technology",
      "Adaptive Agents",
      "End-to-End Encryption in EdTech",
      "Local Data Processing",
      "Human-in-the-Loop AI",
      "Higher Education Institutions",
      "K-12 Schools",
      "Corporate Training & Development",
      "EdTech Providers",
      "Students",
      "Educators",
      "Cognitive Development Tools",
      "Inclusive Education",
      "Culturally Relevant Education",
      "Transforming Learning Outcomes",
      "Enhanced Learning Efficiency",
      "Actionable Insights for Educators"
    ].join(", "),
    openGraph: {
      title: "DHAMM.AI - AI-Powered Educational Solutions",
      description: "Transform education with privacy-first AI solutions. Personalized learning platforms, institutional memory, and secure educational technology.",
      url: "https://dhamm.ai",
      siteName: "DHAMM.AI",
      images: [
        {
          url: "https://dhamm.ai/og-image.png",
          width: 1200,
          height: 630,
          alt: "DHAMM.AI - AI in Education"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "DHAMM.AI - AI-Powered Educational Solutions",
      description: "Transform education with privacy-first AI solutions",
      images: ["https://dhamm.ai/twitter-image.png"]
    }
  };

  // Structured Data for Google Rich Results
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DHAMM.AI",
    "url": "https://dhamm.ai",
    "logo": "https://dhamm.ai/logo.png",
    "description": "AI-powered educational solutions with privacy-first technology",
    "sameAs": [
      "https://twitter.com/dhammai",
      "https://linkedin.com/company/dhammai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://dhamm.ai/contact"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DHAMM.AI",
    "url": "https://dhamm.ai",
    "description": "AI in Education, Personalized Learning Platforms, Educational AI",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dhamm.ai/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const sitelinkSearchBoxData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://dhamm.ai/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dhamm.ai/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          {/* Basic SEO Meta Tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="DHAMM.AI" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://dhamm.ai" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/icon-light.png" media="(prefers-color-scheme: light)" />
          <link rel="icon" type="image/png" href="/icon-dark.png" media="(prefers-color-scheme: dark)" />
          
          {/* Structured Data for Rich Results */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationStructuredData)
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteStructuredData)
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(sitelinkSearchBoxData)
            }}
          />
          
          {/* PWA Manifest */}
         
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          {children}
          <FooterSection/>
        </body>
      </html>
    );
  }