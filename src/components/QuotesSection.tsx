"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const QUOTES = [
  {
    quote: "The day I stopped chasing funding and started chasing customers — everything changed.",
    color: "#e8c97e",
  },
  {
    quote: "Most founders fail not because they lack talent, but because they quit too early.",
    color: "#a78bfa",
  },
  {
    quote: "Your first 100 customers are your real investors. Treat them like it.",
    color: "#4ade80",
  },
  {
    quote: "I'd rather be misunderstood today than irrelevant tomorrow.",
    color: "#f87171",
  },
  {
    quote: "Build something people want, not something investors want to hear.",
    color: "#60a5fa",
  },
  {
    quote: "The best pitch deck is a profitable business.",
    color: "#fbbf24",
  },
];

export default function QuotesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]), { 
    stiffness: 25, 
    damping: 15,
    mass: 0.3,
  });
  
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), { 
    stiffness: 25, 
    damping: 15,
    mass: 0.3,
  });

  const x3 = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]), { 
    stiffness: 25, 
    damping: 15,
    mass: 0.3,
  });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-32 bg-black min-h-screen flex items-center"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,201,126,0.03)_0%,transparent_70%)]" />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-1 h-1 rounded-full bg-amber-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main heading */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-amber-400/60 uppercase mb-4 block">
            Founder Wisdom
          </span>
          <h2 className="text-7xl md:text-9xl font-bold">
            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              RAW
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              INSIGHTS
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Quote rows - full screen width */}
      <div className="relative w-full z-10 mt-40">
        {/* First row - scroll left */}
        <div className="overflow-hidden py-6">
          <motion.div 
            style={{ x: x1 }} 
            className="flex gap-8 w-max"
          >
            {[...QUOTES, ...QUOTES, ...QUOTES].map((q, i) => (
              <motion.div
                key={`row1-${i}`}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <QuoteCard 
                  quote={q.quote}
                  color={q.color}
                  isHovered={hoveredIndex === i}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second row - scroll right */}
        <div className="overflow-hidden py-6">
          <motion.div 
            style={{ x: x2 }} 
            className="flex gap-8 w-max"
          >
            {[...QUOTES.slice(2), ...QUOTES, ...QUOTES.slice(0, 2)].map((q, i) => (
              <motion.div
                key={`row2-${i}`}
                onHoverStart={() => setHoveredIndex(i + 10)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <QuoteCard 
                  quote={q.quote}
                  color={q.color}
                  variant="outline"
                  isHovered={hoveredIndex === i + 10}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Third row - scroll left */}
        <div className="overflow-hidden py-6">
          <motion.div 
            style={{ x: x3 }} 
            className="flex gap-8 w-max"
          >
            {[...QUOTES.slice(1), ...QUOTES, ...QUOTES.slice(0, 1)].map((q, i) => (
              <motion.div
                key={`row3-${i}`}
                onHoverStart={() => setHoveredIndex(i + 20)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <QuoteCard 
                  quote={q.quote}
                  color={q.color}
                  variant="glass"
                  isHovered={hoveredIndex === i + 20}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="/apply"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium group"
          whileHover={{ scale: 1.05, borderColor: "#e8c97e" }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Share Your Insight</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}

function QuoteCard({ 
  quote, 
  color,
  variant = "filled",
  isHovered,
}: { 
  quote: string; 
  color: string;
  variant?: "filled" | "outline" | "glass";
  isHovered: boolean;
}) {
  return (
    <motion.div
      className="w-[32rem] shrink-0 rounded-3xl p-10 relative cursor-pointer"
      animate={{
        background: variant === "filled" 
          ? `linear-gradient(135deg, ${color}12, ${color}02)`
          : variant === "glass"
          ? "rgba(255,255,255,0.03)"
          : "rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        borderColor: isHovered ? `${color}60` : "rgba(255,255,255,0.06)",
        boxShadow: isHovered ? `0 20px 40px -20px ${color}` : "none",
      }}
      style={{
        border: "1.5px solid",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.2 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        className="absolute inset-0 rounded-3xl blur-2xl"
        style={{ background: color }}
      />

      {/* Decorative quote mark - background */}
      <div className="absolute top-6 right-8 text-[12rem] font-serif opacity-10 select-none">
        "
      </div>

      {/* Quote mark - foreground */}
      <motion.div
        animate={{
          color: isHovered ? color : "rgba(255,255,255,0.2)",
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        className="text-8xl font-serif leading-none mb-6 relative z-10"
      >
        "
      </motion.div>

      {/* Quote text - large and prominent */}
      <motion.p
        animate={{
          color: isHovered ? "white" : "rgba(255,255,255,0.9)",
        }}
        className="text-3xl md:text-4xl font-light leading-relaxed tracking-tight relative z-10"
        style={{
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        {quote}
      </motion.p>

      {/* Animated underline on hover */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
        style={{ 
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-3 h-3 border-l-2 border-t-2 rounded-tl-lg"
           style={{ borderColor: `${color}40` }} />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 rounded-br-lg"
           style={{ borderColor: `${color}40` }} />
    </motion.div>
  );
}