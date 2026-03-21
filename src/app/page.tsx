"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import TravelingBottle from "@/components/TravelingBottle";
import AboutSection from "@/components/AboutSection";
import HostSection from "@/components/HostSection";
import Whythispodcast from "@/components/Whythispodcast";
import LatestPodcastSection from "@/components/LatestPodcastSection";
import EpisodesSection from "@/components/EpisodesSection";
import InsightsSection from "@/components/InsightsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuotesSection from "@/components/QuotesSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import ProcessSection from "@/components/ProcessSection";
import FinalCTA from "@/components/FinalCTA";
import ScrollTextOverlay from "@/components/ScrollTextOverlay";
import { ApplyGuestContent } from "@/components/ApplyGuestContent";
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

      <div ref={contentRef}>
        <AboutSection />
        <LatestPodcastSection />
        <HostSection />
        <Whythispodcast />
        <QuotesSection />
        <WhatYouGetSection />
        <EpisodesSection />
        <ProcessSection />
        <InsightsSection />
        <TestimonialsSection />

        {/* ✅ Apply section seedha homepage mein */}
        <section id="apply">
          <ApplyGuestContent />
        </section>

        <FinalCTA />
      </div>

      <TravelingBottle />
      <ScrollTextOverlay progress={scrollProgress} />
    </main>
  );
}