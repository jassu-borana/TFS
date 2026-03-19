"use client";

import { motion } from "framer-motion";
import { Mic, Heart, TrendingUp, Users, Star, Sparkles } from "lucide-react";

export default function WhyThisPodcast() {
  return (
    <section className="relative bg-black py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Decorative top line */}
          <motion.div 
            className="flex justify-center gap-2 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-12 h-0.5 bg-[#e8c97e]/30 rounded-full" />
            <div className="w-4 h-0.5 bg-[#e8c97e]/60 rounded-full" />
            <div className="w-2 h-0.5 bg-[#e8c97e] rounded-full" />
          </motion.div>

          <motion.h2 
            className="font-bebas text-6xl md:text-8xl text-white tracking-wide mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            WHY THIS{' '}
            <span className="bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] bg-clip-text text-transparent">
              PODCAST
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Not just another interview podcast. This is a space for real conversations.
          </motion.p>
        </motion.div>

        {/* Main Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative mb-32"
        >
          {/* Quote card */}
          <div className="relative max-w-4xl mx-auto">
            {/* Large decorative quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute -top-20 -left-10 text-[200px] font-serif text-[#e8c97e] select-none"
            >
              "
            </motion.div>

            <div className="relative p-12 md:p-16 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-white/80 text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-center">
                Each episode is designed to bring you:
              </p>

              {/* Animated underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-[#e8c97e] to-transparent mx-auto mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Value Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Honest founder journeys",
              desc: "Raw, unfiltered stories of struggle and triumph from the trenches.",
              color: "#e8c97e",
              delay: 0.1
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Practical business insights",
              desc: "Actionable wisdom you can apply to your own startup journey.",
              color: "#a78bfa",
              delay: 0.2
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "A deeper look into success and failure",
              desc: "The real reasons behind the wins and the lessons from the losses.",
              color: "#4ade80",
              delay: 0.3
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Stories that actually stay with you",
              desc: "Narratives that resonate long after the episode ends.",
              color: "#f87171",
              delay: 0.4
            },
            {
              icon: <Mic className="w-8 h-8" />,
              title: "Recognised as a top interview podcast",
              desc: "Featured among India's best podcasts for entrepreneurs.",
              color: "#60a5fa",
              delay: 0.5
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Trending podcast for entrepreneurs",
              desc: "Built for those who want direction, not just motivation.",
              color: "#fbbf24",
              delay: 0.6
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                style={{ background: item.color }}
              />

              {/* Card */}
              <div
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e8c97e]/30 transition-all duration-300 h-full backdrop-blur-sm"
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3" style={{ color: item.color }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-base leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay + 0.3, duration: 0.6 }}
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative p-10 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
            <motion.p
              className="text-white/80 text-xl md:text-2xl font-light leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              This show is built for those who want more than just motivation —{' '}
              <span className="text-[#e8c97e] font-semibold">they want direction.</span>
            </motion.p>

            {/* Decorative quote marks */}
            <motion.div
              className="absolute -bottom-4 -right-4 text-6xl text-[#e8c97e]/20 font-serif"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "
            </motion.div>
            <motion.div
              className="absolute -top-4 -left-4 text-6xl text-[#e8c97e]/20 font-serif rotate-180"
              animate={{ rotate: [180, 185, 180] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "
            </motion.div>
          </div>
        </motion.div>

        {/* Recognition Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {[
            "🎙️ Top Interview Podcast • India",
            "📈 Trending • Entrepreneurs",
            "⭐ 4.9 Rating • Apple Podcasts",
            "🎧 500K+ Downloads"
          ].map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(232,201,126,0.1)" }}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium backdrop-blur-sm"
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-center mt-20"
        >
          <motion.a
            href="/apply"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Experience the Difference</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}