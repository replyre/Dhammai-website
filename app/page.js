import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./@Home/components/Hero/Hero";
import { Info } from "./@Home/components/Info/Info";
import Points from "./@Home/components/Points/Points";
import Sigma from "./@Home/components/Sigma/Sigma";
import Bloom from "./@Home/components/Bloom/Bloom";
import FaqSection from "./@Home/components/FAQ/FAQ";

export const metadata = {
  title: "DHAMM.AI | AI-Powered Educational Solutions & Personalized Learning",
  description: "Transform education with DHAMM.AI's privacy-first AI platform. Personalized learning, institutional memory, and secure educational technology for universities, schools, and enterprises.",
  keywords: "AI in Education, Personalized Learning, Educational AI, Secure Learning Platforms",
  openGraph: {
    title: "DHAMM.AI | AI-Powered Educational Solutions",
    description: "Privacy-first AI platform transforming education",
    url: "https://dhamm.ai",
    images: [{ url: "https://dhamm.ai/og-home.png", width: 1200, height: 630 }]
  }
};

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
     <Info/>
     <Points/>
     <Sigma/>
     <Bloom/>
     <FaqSection/>
     
    </div>
  );
}
