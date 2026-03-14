"use client";

import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden">

      <video
        autoPlay
        muted
        playsInline
        controls={false}
        className="absolute inset-0 w-full h-full object-cover"
      >
        {isMobile ? (
          <source src="/mobile.mp4" type="video/mp4" />
        ) : (
          <source src="/Jasveer.mp4" type="video/mp4" />
        )}
      </video>

    </section>
  );
}