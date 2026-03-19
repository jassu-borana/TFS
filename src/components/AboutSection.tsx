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
    <section id="about" className="bg-brand-cream text-brand-dark py-28 px-8 md:px-16 lg:px-24 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#e8c97e]/5 rounded-full blur-3xl" />
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
          <motion.div variants={fadeUp} className="relative">
            <div className="inline-block mb-6">
              <span className="text-xs font-semibold tracking-[0.3em] text-brand-dark/40 uppercase bg-brand-dark/5 px-4 py-2 rounded-full">
                SINCE 2020
              </span>
            </div>
            <h2 className="font-bebas text-7xl sm:text-8xl lg:text-9xl leading-[0.9] tracking-wide text-brand-dark">
              WHERE{" "}
              <span className="relative inline-block">
                FOUNDERS
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#e8c97e]/30 rounded-full" />
              </span>
              <br />
              <span className="text-[blue]">COME ALIVE</span>
            </h2>
            {/* Quote card */}
            
          </motion.div>

          {/* Right — concise copy with visual elements */}
          <motion.div variants={fadeUp} className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "200+", label: "Episodes", icon: "🎙️" },
                { number: "50K+", label: "Monthly Listeners", icon: "🎧" },
                { number: "4.9★", label: "Rating", icon: "⭐" },
              ].map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-brand-dark/5 hover:border-[#e8c97e]/30 transition-all duration-300 group"
                >
                  <span className="text-2xl mb-1 block opacity-70 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </span>
                  <div className="font-bebas text-3xl text-brand-dark">{stat.number}</div>
                  <div className="text-[0.7rem] text-brand-dark/50 tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main description - concise */}
            <div className="space-y-4 bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-brand-dark/5">
              <p className="text-base md:text-lg leading-relaxed text-brand-dark/80 font-inter">
                <span className="text-[#e8c97e] font-bold text-xl mr-2">"</span>
                Raw, unfiltered conversations with founders who've built empires from nothing. No PR scripts, no corporate speak — just the real stories.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-brand-dark/80 font-inter">
                From bootstrap to billion, we dive deep into the crucibles of entrepreneurship: the failures, the pivots, and the moments that define greatness.
              </p>
            </div>

            {/* Host section */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[blue] to-[black] flex items-center justify-center text-white font-bebas text-2xl shadow-lg">
                TFS
              </div>
              <div>
                <p className="text-sm text-brand-dark/40 font-inter tracking-wide">HOSTED BY</p>
                <p className="font-bebas text-2xl text-brand-dark tracking-wide">GIRISH SINGARIA</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-brand-dark/50">Entrepreneur & Storyteller</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom marquee line */}
       
      </div>
    </section>
  );
}