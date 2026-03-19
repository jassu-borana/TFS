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
    setTimeout(() => setShowContent(true), 800); // Content fade in after video shrinks
  };

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Container */}
      <motion.div
        className="absolute inset-0 w-full h-full flex items-start justify-center"
        animate={{
          scale: videoEnded ? 1 : 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth animation
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
          animate={{
            width: videoEnded ? "50%" : "100%",
            marginTop: videoEnded ? "250px" : "0",
            borderRadius: videoEnded ? "32px" : "0px",
            boxShadow: videoEnded 
              ? "0 40px 80px -20px rgba(232,201,126,0.3), 0 0 0 2px rgba(232,201,126,0.1)" 
              : "none",
          }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
            width: { duration: 1.2 },
            marginTop: { duration: 1.2, delay: 0.1 },
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

      {/* Content that appears after video ends - Hidden on mobile */}
      {!isMobile && (
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-[80%] max-w-5xl"
              style={{
                top: "calc(250px + 400px)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              {/* Text Content */}
              <motion.div className="text-center space-y-8">
                {/* "Be The Next" with highlight effect */}
                <motion.div className="relative inline-block">
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#e8c97e]/30 to-transparent blur-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 0.5], scale: [0.8, 1.2, 1] }}
                    transition={{ 
                      duration: 2,
                      times: [0, 0.5, 1],
                      delay: 0.3
                    }}
                  />
                  
                  {/* Main text */}
                  <motion.p
                    className="relative text-2xl md:text-3xl tracking-[0.3em] uppercase font-bold z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <span className="text-white/40">BE THE</span>{" "}
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
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e8c97e] to-transparent"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                    </motion.span>
                  </motion.p>

                  {/* Floating particles around text */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-[#e8c97e]"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, i % 2 === 0 ? 10 : -10, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: 1 + i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  ))}
                </motion.div>

                {/* "GUEST" with staggered animation */}
                <motion.div className="overflow-hidden">
                  <motion.h2
                    className="text-7xl md:text-8xl font-bold"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 80 }}
                  >
                    {["G", "U", "E", "S", "T"].map((letter, i) => (
                      <motion.span
                        key={i}
                        className="inline-block text-white"
                        animate={{
                          color: ["#ffffff", "#e8c97e", "#ffffff"],
                          scale: [1, 1.1, 1],
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

                {/* Button with enhanced animation */}
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
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold text-xl group relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: "0 20px 40px -10px rgba(232,201,126,0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Button content */}
                    <span className="relative flex items-center gap-3">
                      Apply as Guest
                      <motion.svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </span>

                    {/* Ripple effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      whileHover={{
                        boxShadow: "0 0 0 8px rgba(232,201,126,0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.div>

                {/* Decorative animated line */}
                <motion.div
                  className="flex justify-center gap-2 mt-8"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <motion.div 
                    className="w-12 h-0.5 bg-[#e8c97e]/30 rounded-full"
                    animate={{ scaleX: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-4 h-0.5 bg-[#e8c97e]/60 rounded-full"
                    animate={{ scaleX: [1, 1.3, 1] }}
                    transition={{ duration: 2, delay: 0.2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-2 h-0.5 bg-[#e8c97e] rounded-full"
                    animate={{ scaleX: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: 0.4, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Mobile message */}
      {isMobile && (
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center w-full px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a
            href="/apply"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold"
          >
            Apply as Guest
          </a>
        </motion.div>
      )}

      {/* Video progress indicator with glow */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#e8c97e] via-[#f0d89a] to-[#e8c97e]"
        initial={{ width: "0%" }}
        animate={{ width: videoEnded ? "100%" : "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          boxShadow: "0 0 20px #e8c97e",
        }}
      />
    </section>
  );
}