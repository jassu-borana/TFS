"use client";

import { motion, useTransform, useSpring, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TravelingBottle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 60,
    damping: 25,
    mass: 1.2,
  });

  /*
  Animation Path

  0px - 1000px   : Center
  1000px - 2000px: Move LEFT
  2000px - 3000px: Move RIGHT
  3000px - 4000px: Fade Out
  */

  const x = useTransform(
    smoothScrollY,
    [0, 1000, 2000, 3000],
    ["0vw", "0vw", "-30vw", "30vw"]
  );

  const rotate = useTransform(
    smoothScrollY,
    [0, 1000, 2000, 3000],
    [0, 0, -8, 8]
  );

  const scale = useTransform(
    smoothScrollY,
    [0, 1000, 2000, 3000, 4000],
    [0.8, 1, 1.05, 1.05, 0.9]
  );

  const opacity = useTransform(
    smoothScrollY,
    [0, 100, 3000, 4000],
    [0, 1, 1, 0]
  );

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div
        style={{
          x,
          rotate,
          scale,
          opacity,
        }}
        className="will-change-transform flex items-center justify-center w-full h-full"
      >
        <Image
          src="/images/mug.png"
          alt="Traveling Mug"
          width={1000}
          height={1000}
          priority
          className="select-none pointer-events-none"
          style={{
            width: "auto",
            maxHeight: "clamp(25vh, 40vh, 50vh)",
            objectFit: "contain",
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.85))",
          }}
        />
      </motion.div>
    </div>
  );
}