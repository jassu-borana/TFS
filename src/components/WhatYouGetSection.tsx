"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ITEMS = [
  {
    emoji: "🎙️",
    title: "90-Minute Deep Dive Interview",
    desc: "Professional in-studio recording with our top-rated host + Full copyright for your marketing campaigns",
    gradient: "from-amber-500/20 to-amber-600/5",
    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  },
  {
    emoji: "🎬",
    title: "Professional Video Production",
    desc: "Multi-camera studio shoot with NETFLIX style cinematic editing by India's leading editors",
    gradient: "from-purple-500/20 to-purple-600/5",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    emoji: "📱",
    title: "Social Media Amplification Package",
    desc: "6 professionally edited reels/shorts + organic distribution across all major platforms",
    gradient: "from-blue-500/20 to-blue-600/5",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    emoji: "📊",
    title: "Startup Community Reach",
    desc: "Paid distribution to high-intent founder & investor groups via Meta/Google/LinkedIn ads",
    gradient: "from-green-500/20 to-green-600/5",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    emoji: "©️",
    title: "Lifetime Content Usage Rights",
    desc: "Own the content forever — use in ads, client proposals, decks, landing pages, or pitch materials",
    gradient: "from-red-500/20 to-red-600/5",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    emoji: "🌐",
    title: "TFD Power Network Access",
    desc: "Direct sharing with our private network of unicorn founders, startup CEOs, and top operators",
    gradient: "from-indigo-500/20 to-indigo-600/5",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function WhatYouGetSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-28 px-4 bg-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-blue-500/10 via-green-500/10 to-transparent blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-xs font-medium tracking-wider text-white/60 uppercase">
              Complete Package
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Everything You Get
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              All-In-One Package
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto"
          >
            Everything you need to build authority and visibility — all included in one comprehensive package
          </motion.p>
        </div>

        {/* Items grid with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${item.gradient.split(' ')[0].replace('from-', '')}, ${item.gradient.split(' ')[1].replace('to-', '')})`
                }}
              />
              
              {/* Main card */}
              <div className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                {/* Animated shine effect */}
                <motion.div
                  animate={{
                    x: ["0%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                />

                {/* Icon container with emoji */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  
                  {/* Floating indicator */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === i ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradient.split(' ')[0].replace('from-', '')}, ${item.gradient.split(' ')[1].replace('to-', '')})`
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white/90 mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                  {item.desc}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${item.gradient.split(' ')[0].replace('from-', '')}, ${item.gradient.split(' ')[1].replace('to-', '')})`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "100+", label: "Founders Featured", color: "from-amber-400 to-amber-600" },
            { value: "50M+", label: "Total Reach", color: "from-purple-400 to-purple-600" },
            { value: "6-8", label: "Weeks to Launch", color: "from-green-400 to-green-600" },
            { value: "100%", label: "Content Ownership", color: "from-blue-400 to-blue-600" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-white/40 text-xs mt-1">{stat.label}</div>
            </div>
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
              className="absolute -inset-3 bg-gradient-to-r from-amber-400 via-purple-400 to-green-400 rounded-full blur-xl opacity-30"
            />
            
            <motion.a
              href="/apply"
              className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-black text-white font-semibold text-lg border border-white/20 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background gradient */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
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
            className="mt-6 flex items-center justify-center gap-4 text-sm"
          >
            <div className="flex items-center gap-2 text-white/30">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Limited slots available</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 text-white/30">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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