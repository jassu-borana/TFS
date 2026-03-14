"use client";

import { useCallback, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import TravelingBottle from "@/components/TravelingBottle";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import HostSection from "@/components/HostSection";
import LatestPodcastSection from "@/components/LatestPodcastSection";
import EpisodesSection from "@/components/EpisodesSection";
import InsightsSection from "@/components/InsightsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import ScrollTextOverlay from "@/components/ScrollTextOverlay";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function HomePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  return (
    <main>
      <Navbar />

      <HeroVideo />

      {/* Content sections wrapper for scroll tracking */}
      <div ref={contentRef}>
        <AboutSection />
        <WhySection />
        <HostSection />
        <LatestPodcastSection />
        <EpisodesSection />
        <InsightsSection />
        <TestimonialsSection />
        <FinalCTA />
      </div>

      {/* Global Antigravity Object */}
      <TravelingBottle />
      
      {/* Scroll Text Overlay based on progress */}
      <ScrollTextOverlay progress={scrollProgress} />
    </main>
  );
}
