"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ITEMS = [
  {
    emoji: "🎙️",
    title: "90-Minute Deep Dive Interview",
    desc: "Professional in-studio recording with our top-rated host + Full copyright for your marketing campaigns",
    color: "#e8c97e",
    bgColor: "rgba(232,201,126,0.1)",
    borderColor: "rgba(232,201,126,0.2)",
  },
  {
    emoji: "🎬",
    title: "Professional Video Production",
    desc: "Multi-camera studio shoot with NETFLIX style cinematic editing by India's leading editors",
    color: "#a78bfa",
    bgColor: "rgba(167,139,250,0.1)",
    borderColor: "rgba(167,139,250,0.2)",
  },
  {
    emoji: "📱",
    title: "Social Media Amplification Package",
    desc: "6 professionally edited reels/shorts + organic distribution across all major platforms",
    color: "#4ade80",
    bgColor: "rgba(74,222,128,0.1)",
    borderColor: "rgba(74,222,128,0.2)",
  },
  {
    emoji: "📊",
    title: "Startup Community Reach",
    desc: "Paid distribution to high-intent founder & investor groups via Meta/Google/LinkedIn ads",
    color: "#f87171",
    bgColor: "rgba(248,113,113,0.1)",
    borderColor: "rgba(248,113,113,0.2)",
  },
  {
    emoji: "©️",
    title: "Lifetime Content Usage Rights",
    desc: "Own the content forever — use in ads, client proposals, decks, landing pages, or pitch materials",
    color: "#60a5fa",
    bgColor: "rgba(96,165,250,0.1)",
    borderColor: "rgba(96,165,250,0.2)",
  },
  {
    emoji: "🌐",
    title: "TFD Power Network Access",
    desc: "Direct sharing with our private network of unicorn founders, startup CEOs, and top operators",
    color: "#fbbf24",
    bgColor: "rgba(251,191,36,0.1)",
    borderColor: "rgba(251,191,36,0.2)",
  },
];

export default function WhatYouGetSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-28 px-4 bg-black">
      {/* Black Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        
        {/* Animated orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 rounded-full bg-[#e8c97e]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8c97e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e8c97e]" />
            </span>
            <span className="text-xs font-medium tracking-wider text-white/80 uppercase">
              Complete Package
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="text-white">
              Everything You Get
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#e8c97e] via-purple-400 to-pink-400 bg-clip-text text-transparent">
              All-In-One Package
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Everything you need to build authority and visibility — all included in one comprehensive package
          </motion.p>
        </div>

        {/* Items grid - 3x2 layout for 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative h-full"
            >
              {/* Card glow on hover */}
              <motion.div
                animate={{
                  opacity: hoveredIndex === i ? 0.5 : 0,
                  scale: hoveredIndex === i ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute -inset-2 rounded-3xl blur-2xl"
                style={{ background: item.color }}
              />
              
              {/* Main card */}
              <motion.div
                animate={{
                  y: hoveredIndex === i ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border-2 transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: hoveredIndex === i ? item.color : "rgba(255,255,255,0.1)",
                  background: hoveredIndex === i ? item.bgColor : "rgba(255,255,255,0.05)",
                }}
              >
                {/* Icon container */}
                <div className="relative mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all duration-300"
                    style={{
                      background: item.bgColor,
                      border: `2px solid ${item.borderColor}`,
                      color: item.color,
                    }}
                  >
                    {item.emoji}
                  </div>
                  
                  {/* Floating indicator dot */}
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black"
                      style={{ background: item.color }}
                    />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredIndex === i ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />

                {/* Corner accents */}
                <div 
                  className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: item.color }}
                />
                <div 
                  className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: item.color }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats section - 2x2 grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "100+", label: "Founders Featured", color: "#e8c97e" },
            { value: "50M+", label: "Total Reach", color: "#a78bfa" },
            { value: "6-8", label: "Weeks to Launch", color: "#4ade80" },
            { value: "100%", label: "Content Ownership", color: "#60a5fa" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center p-6 rounded-2xl bg-white/5 border-2 border-white/10 hover:border-[#e8c97e]/30 transition-all backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="relative inline-block group">
            {/* Animated rings */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-3 bg-gradient-to-r from-[#e8c97e] via-purple-400 to-pink-400 rounded-full blur-xl opacity-30"
            />
            
            <motion.a
              href="/apply"
              className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold text-lg overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shine effect */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              
              <span className="relative">Claim Your Spot</span>
              <svg
                className="relative w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.a>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2 text-white/40">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Limited slots available</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-white/40">
              <svg className="w-4 h-4 text-[#e8c97e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Next batch starting soon</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}