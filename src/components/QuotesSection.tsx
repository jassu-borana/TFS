"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-24 bg-black"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,201,126,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.03)_30%,transparent_70%)]" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${QUOTES[i % QUOTES.length].color}, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Main heading */}
      <div className="relative z-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-amber-400/60 uppercase mb-4 block">
            Founder Wisdom
          </span>
          <h2 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              REAL TALK FROM
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              REAL FOUNDERS
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Main Quote Carousel */}
      <div className="relative max-w-5xl mx-auto px-4 z-20">
        <div className="relative h-[500px] flex items-center justify-center">
          
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
              }}
              className="absolute w-full"
            >
              <QuoteCard quote={QUOTES[currentIndex]} />
            </motion.div>
         
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {QUOTES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="group relative"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#e8c97e]"
                    : "bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-[#e8c97e]/40 transition-all z-30"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-[#e8c97e]/40 transition-all z-30"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-16"
      >
        <motion.a
          href="/apply"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Share Your Insight</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}

function QuoteCard({ quote }: { quote: typeof QUOTES[0] }) {
  return (
    <motion.div
      className="relative mx-auto max-w-4xl"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
        style={{ background: quote.color }}
      />

      {/* Main card */}
      <div
        className="relative p-12 md:p-16 rounded-3xl backdrop-blur-xl"
        style={{
          background: `linear-gradient(135deg, ${quote.color}15, ${quote.color}05)`,
          border: `2px solid ${quote.color}30`,
          boxShadow: `0 25px 50px -12px ${quote.color}`,
        }}
      >
        {/* Large decorative quote mark */}
        <div
          className="absolute top-8 right-8 text-[12rem] font-serif opacity-20 select-none"
          style={{ color: quote.color }}
        >
          "
        </div>

        {/* Quote mark - foreground */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl font-serif leading-none mb-6"
            style={{ color: quote.color }}
          >
            "
          </motion.div>

          {/* Quote text */}
          <p
            className="text-3xl md:text-5xl font-light leading-relaxed text-white mb-8 relative z-10"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {quote.quote}
          </p>

        

          {/* Animated border */}
          <motion.div
            animate={{
              width: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ background: `linear-gradient(90deg, transparent, ${quote.color}, transparent)` }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 rounded-tl-xl"
             style={{ borderColor: `${quote.color}60` }} />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 rounded-br-xl"
             style={{ borderColor: `${quote.color}60` }} />
      </div>
    </motion.div>
  );
}