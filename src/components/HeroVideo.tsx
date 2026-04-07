"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroVideo() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showFlip, setShowFlip] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Step 1: shrink video (already triggers via animate)
    // Step 2: flip after shrink
    setTimeout(() => setShowFlip(true), 1200);
    // Step 3: show content after flip completes
    setTimeout(() => setShowContent(true), 2200);
  };

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* ─── DESKTOP ─── */}
      {!isMobile && (
        <>
          {/* Video with shrink + flip */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <motion.div
              style={{ perspective: 1200 }}
              animate={
                videoEnded
                  ? { width: "55%", borderRadius: "32px" }
                  : { width: "100%", borderRadius: "0px" }
              }
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative overflow-hidden"
            >
              {/* Flip container */}
              <motion.div
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: showFlip ? 180 : 0 }}
                transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-full"
              >
                {/* FRONT - Video */}
                <motion.video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  controls={false}
                  onEnded={handleVideoEnd}
                  className="w-full object-cover block"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    height: videoEnded ? "70vh" : "100vh",
                    transition: "height 1.2s ease",
                    borderRadius: videoEnded ? "32px" : "0px",
                    boxShadow: videoEnded
                      ? "0 40px 80px -20px rgba(232,201,126,0.3), 0 0 0 2px rgba(232,201,126,0.1)"
                      : "none",
                  }}
                >
                  <source src="/Jasveer.mp4" type="video/mp4" />
                </motion.video>

                {/* BACK - Gold card (shows after flip) */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(145deg, rgba(20,20,20,0.97) 0%, rgba(10,10,10,0.99) 100%)",
                    border: "1px solid rgba(222, 163, 25, 0.7)",
                    borderRadius: "32px",
                    boxShadow:
                      "0 0 80px rgba(232,201,126,0.15), 0 40px 80px rgba(0,0,0,0.6)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.5rem",
                    height: "70vh",
                  }}
                >
                  <AnimatePresence>
                    {showContent && (
                      <>
                        {/* Gold top line */}
                        <motion.div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            height: "2px",
                            borderRadius: "999px",
                            background:
                              "linear-gradient(90deg, transparent, #e8c97e, transparent)",
                            boxShadow: "0 0 12px #e8c97e",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: "60%" }}
                          transition={{ delay: 0.2, duration: 0.8 }}
                        />

                        {/* BE THE NEXT */}
                        <motion.p
                          className="text-2xl tracking-[0.35em] uppercase font-black"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          <span
                            style={{
                              color: "#ffffff",
                              textShadow: "0 0 20px rgba(255,255,255,0.3)",
                            }}
                          >
                            BE THE
                          </span>{" "}
                          <motion.span
                            style={{ color: "#e8c97e" }}
                            animate={{
                              textShadow: [
                                "0 0 10px #fedf96, 0 0 25px #e8c97e44",
                                "0 0 30px #fedf96, 0 0 60px #e8c97eaa",
                                "0 0 10px #fedf96, 0 0 25px #e8c97e44",
                              ],
                            }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                          >
                            NEXT
                          </motion.span>
                        </motion.p>

                        {/* GUEST */}
                        <motion.h2
                          className="text-8xl font-black leading-none"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.35,
                            type: "spring",
                            stiffness: 100,
                            damping: 12,
                          }}
                        >
                          {["G", "U", "E", "S", "T"].map((letter, i) => (
                            <motion.span
                              key={i}
                              className="inline-block"
                              style={{ color: "#ffffff" }}
                              animate={{
                                color: ["#ffffff", "#ffecc1", "#ffffff"],
                              }}
                              transition={{
                                duration: 3,
                                delay: 0.6 + i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                            >
                              {letter}
                            </motion.span>
                          ))}
                        </motion.h2>

                        {/* Divider */}
                        <motion.div
                          style={{
                            width: "4rem",
                            height: "1px",
                            background: "rgba(232,201,126,0.4)",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.55, duration: 0.6 }}
                        />

                        {/* CTA */}
                        <motion.a
                          href="/apply"
                          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg text-black group"
                          style={{
                            background:
                              "linear-gradient(135deg, #e8c97e 0%, #f5e09a 50%, #e8c97e 100%)",
                            boxShadow: "0 8px 30px rgba(232,201,126,0.4)",
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
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
                        </motion.a>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#e8c97e] via-[#f0d89a] to-[#e8c97e]"
            initial={{ width: "0%" }}
            animate={{ width: videoEnded ? "100%" : "0%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ boxShadow: "0 0 20px #e8c97e" }}
          />
        </>
      )}

      {/* ─── MOBILE ─── */}
      {isMobile && (
        <>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              controls={false}
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            >
              <source src="/mobile.mp4" type="video/mp4" />
            </video>
          </div>

          <AnimatePresence>
            {showContent && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-50 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <motion.div
                  className="relative z-10 flex flex-col items-center text-center space-y-5 px-8 py-10 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)",
                    border: "1px solid rgba(232,201,126,0.25)",
                    boxShadow:
                      "0 0 60px rgba(232,201,126,0.15), 0 30px 60px rgba(0,0,0,0.6)",
                  }}
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #e8c97e, transparent)",
                      boxShadow: "0 0 12px #e8c97e",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />

                  <motion.p
                    className="text-xl tracking-[0.3em] uppercase font-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <span
                      style={{
                        color: "#ffffff",
                        textShadow: "0 0 20px rgba(255,255,255,0.3)",
                      }}
                    >
                      BE THE
                    </span>{" "}
                    <motion.span
                      style={{ color: "#e8c97e" }}
                      animate={{
                        textShadow: [
                          "0 0 10px #fedf96, 0 0 25px #e8c97e44",
                          "0 0 25px #fedf96, 0 0 50px #e8c97eaa",
                          "0 0 10px #fedf96, 0 0 25px #e8c97e44",
                        ],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    >
                      NEXT
                    </motion.span>
                  </motion.p>

                  <motion.h2
                    className="text-7xl font-black leading-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.55,
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    }}
                  >
                    {["G", "U", "E", "S", "T"].map((letter, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        style={{ color: "#ffffff" }}
                        animate={{ color: ["#ffffff", "#ffecc1", "#ffffff"] }}
                        transition={{
                          duration: 3,
                          delay: 0.8 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.h2>

                  <motion.div
                    className="w-16 h-px"
                    style={{ background: "rgba(232,201,126,0.4)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />

                  <motion.a
                    href="/apply"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-base text-black group"
                    style={{
                      background:
                        "linear-gradient(135deg, #e8c97e 0%, #f5e09a 50%, #e8c97e 100%)",
                      boxShadow: "0 8px 30px rgba(232,201,126,0.4)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply as Guest
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}
