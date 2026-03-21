"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroVideo() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Smooth transition for video size
    setTimeout(() => setShowContent(true), 800);
  };

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Container - Center mein */}
      <motion.div
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        animate={{
          scale: videoEnded ? 1 : 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          controls={false}
          onEnded={handleVideoEnd}
          className="object-cover shadow-2xl"
          animate={!isMobile && videoEnded ? {
            width: "65%",
            borderRadius: "32px",
            boxShadow: "0 40px 80px -20px rgba(232,201,126,0.3), 0 0 0 2px rgba(232,201,126,0.1)",
          } : {
            width: "100%",
            borderRadius: "0px",
            boxShadow: "none",
          }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
            width: { duration: 1.2 },
            borderRadius: { duration: 1 },
          }}
        >
          {isMobile ? (
            <source src="/mobile.mp4" type="video/mp4" />
          ) : (
            <source src="/Jasveer.mp4" type="video/mp4" />
          )}
        </motion.video>
      </motion.div>

      {/* Desktop Content - Bottom Center (Pushed Further Down) */}
{!isMobile && (
  <AnimatePresence>
    {showContent && (
      <motion.div
        // 'bottom-2' se ye screen ke aur niche chala jayega. 
        // Agar bilkul niche touch karwana hai toh 'bottom-0' use kar sakte ho.
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50"
        initial={{ opacity: 0, y: 50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -50, x: "-50%" }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut"
        }}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          
          {/* "BE THE NEXT" Section */}
          <motion.div className="relative inline-block">
            <motion.p
              className="relative text-2xl md:text-3xl tracking-[0.3em] uppercase font-bold z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="text-white">BE THE</span>{" "}
              <motion.span
                className="text-[#e8c97e] relative"
                animate={{
                  textShadow: [
                    "0 0 0px #e8c97e",
                    "0 0 20px #e8c97e",
                    "0 0 0px #e8c97e",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                NEXT
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e8c97e] to-transparent"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.span>
            </motion.p>
          </motion.div>

          {/* "GUEST" Section */}
          <motion.div className="overflow-hidden">
            <motion.h2
              className="text-7xl md:text-8xl font-bold leading-tight"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 80 }}
            >
              {["G", "U", "E", "S", "T"].map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-white"
                  animate={{
                    color: ["#ffffff", "#ffecc1", "#ffffff"],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h2>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.9, 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <motion.a
              href="/apply"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-bold text-lg group relative overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative flex items-center gap-3">
                Apply as Guest
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.a>
          </motion.div>

          {/* Bottom Decorative Line (Optional - removed extra space here) */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className="w-10 h-1 bg-[#e8c97e]/20 rounded-full" />
            <div className="w-2 h-1 bg-[#e8c97e]/40 rounded-full" />
          </motion.div>
          
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)}


      {/* Mobile - Sirf video */}

      {/* Video progress indicator - Sirf desktop pe */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#e8c97e] via-[#f0d89a] to-[#e8c97e]"
          initial={{ width: "0%" }}
          animate={{ width: videoEnded ? "100%" : "0%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            boxShadow: "0 0 20px #e8c97e",
          }}
        />
      )}
    </section>
  );
}