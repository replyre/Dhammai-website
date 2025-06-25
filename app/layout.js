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
  title: "Dhamm.ai",
  description: "hamm AI combines Agentic RAG, Deep Knowledge Tracing, and edge-speed inference into a single, privacy-first stack. Everything runs on your servers or private cloud, so content never leaves campus. Learners, faculty, and administrators get real-time, multilingual, multimodal answers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <FooterSection/>
      </body>
    </html>
  );
}
