"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const QUOTES = [
  {
    quote: "There were days I questioned everything - not the business, but myself. No one really talks about that part",
    color: "#e8c97e",
  },
  {
    quote: "People see growth charts. They don’t see the nights you’re figuring out salaries with barely anything in the account.",
    color: "#a78bfa",
  },
  {
    quote: "It’s not the failure that gets to you. It’s having to show up the next day like nothing shook you.",
    color: "#4ade80",
  },
  {
    quote: "Everyone celebrates the launch. No one prepares you for what it takes to keep it running.",
    color: "#f87171",
  },
  {
    quote: "You don’t realise how heavy decisions are until you’re the one making them - and living with them.",
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
      className="relative overflow-hidden py-16 md:py-20 bg-black"
    >
      {/* Animated background - reduced particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,201,126,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.03)_30%,transparent_70%)]" />
        
        {/* Floating particles - fewer for better performance */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${QUOTES[i % QUOTES.length].color}, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Main heading - more compact */}
      <div className="relative z-10 text-center mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-amber-400/60 uppercase mb-3 block">
            Founder Wisdom
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
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

      {/* Main Quote Carousel - reduced height */}
      <div className="relative max-w-5xl mx-auto px-4 z-20">
        <div className="relative h-[280px] md:h-[320px] flex items-center justify-center">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8
            }}
            className="absolute w-full"
          >
            <QuoteCard quote={QUOTES[currentIndex]} />
          </motion.div>
        </div>

        {/* Navigation Dots - more compact */}
        <div className="flex justify-center gap-2 mt-6">
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-[#e8c97e]"
                    : "w-1.5 bg-white/30 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Navigation Arrows - smaller and positioned better */}
        <button
          onClick={handlePrevious}
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-[#e8c97e]/40 transition-all z-30"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-[#e8c97e]/40 transition-all z-30"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom CTA - more compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-10 md:mt-12"
      >
        <motion.a
          href="/apply"
          className="inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold text-sm md:text-base group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Share Your Insight</span>
          <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      className="relative mx-auto max-w-3xl"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow effect - reduced */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-15"
        style={{ background: quote.color }}
      />

      {/* Main card - slimmer */}
      <div
        className="relative p-6 md:p-8 lg:p-10 rounded-2xl backdrop-blur-xl"
        style={{
          background: `linear-gradient(135deg, ${quote.color}12, ${quote.color}03)`,
          border: `1px solid ${quote.color}30`,
          boxShadow: `0 15px 35px -10px ${quote.color}30`,
        }}
      >
        {/* Large decorative quote mark - smaller */}
        <div
          className="absolute top-4 right-6 text-7xl md:text-8xl font-serif opacity-20 select-none"
          style={{ color: quote.color }}
        >
          "
        </div>

        {/* Quote mark - foreground */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl md:text-6xl font-serif leading-none mb-3 md:mb-4"
            style={{ color: quote.color }}
          >
            "
          </motion.div>

          {/* Quote text - smaller font */}
          <p
            className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white mb-4 md:mb-5 relative z-10"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {quote.quote}
          </p>

          {/* Animated border - thinner */}
          <motion.div
            animate={{
              width: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ background: `linear-gradient(90deg, transparent, ${quote.color}, transparent)` }}
          />
        </div>

        {/* Corner accents - smaller */}
        <div className="absolute top-4 left-4 w-4 h-4 border-l border-t rounded-tl-lg"
             style={{ borderColor: `${quote.color}50` }} />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b rounded-br-lg"
             style={{ borderColor: `${quote.color}50` }} />
      </div>
    </motion.div>
  );
}