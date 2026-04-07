"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Insight = {
  number: string;
  headline: string;
  quote: string;
  icon: string;
};

const INSIGHTS: Insight[] = [
  {
    number: "01",
    headline: "Just Start",
    quote: "You don't feel ready. You just start… and figure things out along the way.",
    icon: "🚀",
  },
  {
    number: "02",
    headline: "People Matter More",
    quote: "Most big opportunities came from people I knew, not from plans I made.",
    icon: "🤝",
  },
  {
    number: "03",
    headline: "You Learn the Hard Way",
    quote: "The mistakes taught me more than anything that went right.",
    icon: "💪",
  },
  {
    number: "04",
    headline: "Growth Feels Uncomfortable",
    quote: "Every time the business grew, I had to step up first. It's never easy.",
    icon: "📈",
  },
];

function InsightCard({ item, index }: { item: Insight; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-brand-accent/0 via-brand-accent/5 to-brand-accent/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />

      <div className="relative flex flex-col gap-3 p-4 md:p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-brand-accent/20 transition-all duration-500 h-full">
        {/* Top row: number + icon */}
        <div className="flex items-center justify-between">
          <motion.span
            className="font-bebas text-4xl md:text-6xl text-white/5 leading-none select-none"
            animate={isHovered ? { scale: 1.1, color: "rgba(232,201,126,0.2)" } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {item.number}
          </motion.span>

          <motion.div
            className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-lg md:text-2xl border border-white/10 group-hover:border-brand-accent/30 group-hover:bg-brand-accent/10 transition-all duration-300"
            animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {item.icon}
          </motion.div>
        </div>

        {/* Headline */}
        <div className="relative inline-block">
          <h3 className="font-bebas text-2xl md:text-4xl tracking-wide text-white">
            {item.headline}
          </h3>
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-brand-accent/30 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
          />
        </div>

        {/* Quote */}
        <motion.p
          className="text-white/60 text-xs md:text-base leading-relaxed border-l-2 border-white/10 group-hover:border-brand-accent/30 transition-colors duration-300 pl-3"
          animate={isHovered ? { x: 3, color: "rgba(255,255,255,0.8)" } : { x: 0 }}
        >
          <span className="text-brand-accent text-lg mr-0.5 font-serif">"</span>
          {item.quote}
          <span className="text-brand-accent text-lg ml-0.5 font-serif">"</span>
        </motion.p>

        {/* Listen indicator */}
        <motion.div
          className="mt-auto flex items-center gap-2 text-brand-accent/60 text-xs"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1, x: 4 } : { opacity: 0, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span>Listen to episode</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function InsightsSection() {
  return (
    <section className="relative bg-black py-28 px-6 md:px-16 lg:px-24 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        <motion.div
          className="absolute top-20 right-0 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-0 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0, 0.2, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.2 }}
            className="absolute w-1 h-1 rounded-full bg-[#e8c97e]/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-30">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20 text-center relative"
        >
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

          <motion.p
            className="text-sm font-semibold tracking-[0.3em] text-[#e8c97e]/70 uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Wisdom from the trenches
          </motion.p>

          <motion.h2
            className="font-bebas text-5xl sm:text-7xl md:text-8xl leading-none tracking-wide text-white relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Real Founder Thoughts
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#e8c97e] to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.h2>
        </motion.div>

        {/* 2x2 Grid on mobile, single column on md+ */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-6">
          {INSIGHTS.map((item, i) => (
            <InsightCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
      </div>
    </section>
  );
}