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
  
  0px - 100px    : Pop up
  100px - 300px  : Center
  300px - 1000px : Left move
  1000px - 1800px: Right move
  1800px - 2500px: Left move (-8vw)
  2500px - 2600px: Gayab
  */

  const x = useTransform(
    smoothScrollY,
    [0, 100, 300, 1000, 1800, 2500, 2600, 3000],
    ["0vw", "0vw", "0vw", "-30vw", "30vw", "-8vw", "-8vw", "-8vw"]
  );

  const rotate = useTransform(
    smoothScrollY,
    [0, 100, 300, 1000, 1800, 2500, 2600, 3000],
    [0, 0, 0, -8, 8, -8, -8, -8]
  );

  const scale = useTransform(
    smoothScrollY,
    [0, 100, 300, 1000, 1800, 2500, 2600, 3000],
    [0, 1, 1, 1.05, 1.05, 1.05, 0, 0]
  );

  const opacity = useTransform(
    smoothScrollY,
    [0, 100, 300, 2500, 2600, 3000],
    [0, 1, 1, 1, 0, 0]
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