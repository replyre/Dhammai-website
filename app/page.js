import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./@Home/components/Hero/Hero";
import { Info } from "./@Home/components/Info/Info";
import Points from "./@Home/components/Points/Points";
import Sigma from "./@Home/components/Sigma/Sigma";
import Bloom from "./@Home/components/Bloom/Bloom";
import FaqSection from "./@Home/components/FAQ/FAQ";
import FooterSection from "./GlobalComponents/Footer";

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
