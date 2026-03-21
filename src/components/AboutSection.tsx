"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black py-28 px-8 md:px-16 lg:px-24 overflow-hidden">
      
      {/* Black Grid Background - Exactly like other sections */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern - white lines with low opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Animated orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-0.5 h-0.5 rounded-full bg-[#e8c97e]/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-30">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Left — big heading with badge */}
          <motion.div variants={fadeUp} className="relative max-w-5xl">
  
  {/* Tag */}
  <div className="inline-block mb-6">
    <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/50 uppercase bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
      SINCE 2020
    </span>
  </div>

  {/* Heading */}
  <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-wide text-white">
    
    Where Real{" "}
    
    <span className="relative inline-block">
      <span className="relative z-10">Founders Share</span>
      
      {/* Underline */}
      <div className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#e8c97e]/60 rounded-full" />
    </span>

    <br />

    <span className="bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] bg-clip-text text-transparent">
      What It Truly Takes
    </span>

  </h2>

</motion.div>

          {/* Right — concise copy with visual elements */}
          <motion.div variants={fadeUp} className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
  {[
    { number: "200+", label: "Episodes" },
    { number: "50K+", label: "Monthly Listeners" },
    { number: "4.9★", label: "Rating" },
  ].map((stat) => (
    <motion.div 
      key={stat.label} 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 hover:border-[#e8c97e]/40 transition-all duration-300 group"
    >
      {/* Minimal top line instead of emoji */}
      <div className="w-6 h-[2px] mx-auto mb-3 bg-[#e8c97e]/60 group-hover:w-10 transition-all duration-300" />
      
      <div className="font-bebas text-3xl text-white">{stat.number}</div>
      <div className="text-[0.7rem] text-white/40 tracking-wide mt-1">{stat.label}</div>
    </motion.div>
  ))}
</div>

            {/* Main description - concise */}
            <div className="space-y-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
  <p className="text-base md:text-lg leading-relaxed text-white/80 font-inter">
    <span className="text-[#e8c97e] font-bold text-xl mr-2">"</span>
    Welcome to <span className="text-white font-semibold">The Founder Show</span> — a video podcast built around real journeys, not rehearsed success.
  </p>

  <p className="text-base md:text-lg leading-relaxed text-white/80 font-inter">
    This is where India’s founders, entrepreneurs, and business leaders open up about what it really takes to build something meaningful — the wins, the setbacks, and the pivots.
  </p>

  <p className="text-base md:text-lg leading-relaxed text-white/80 font-inter">
    If you're looking for daily inspiration or stories that go beyond surface-level talk, you're exactly where you need to be.
  </p>
</div>

            {/* Host section */}
         
          </motion.div>
        </motion.div>

        {/* Bottom marquee line */}
       
      </div>
    </section>
  );
}