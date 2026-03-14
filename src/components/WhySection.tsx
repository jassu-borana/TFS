"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Zap, Heart } from "lucide-react";

const WHY_POINTS = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Raw & Unfiltered",
    description: "No corporate fluff. We dive deep into the real struggles and triumphs of founders."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Actionable Insights",
    description: "Learn practical strategies and lessons from those who have actually built successful companies."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "High Energy",
    description: "Dynamic conversations that inspire and motivate you to take the next step in your own journey."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Founder Community",
    description: "Connect with a network of like-minded builders who understand the grind."
  }
];

export default function WhySection() {
  return (
    <section id="why" className="bg-brand-cream py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/50 uppercase mb-4">
            The Value
          </p>
          <h2 className="font-bebas text-7xl sm:text-8xl lg:text-9xl leading-none tracking-wide text-brand-dark">
            WHY THE<br />FOUNDER SHOW?
          </h2>
          <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-[#e8c97e]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {WHY_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/50 border border-brand-dark/5 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-brand-dark/5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#e8c97e]/10 flex items-center justify-center mb-6 text-[#e8c97e] group-hover:scale-110 transition-transform">
                {point.icon}
              </div>
              <h3 className="font-bebas text-3xl text-brand-dark mb-3 tracking-wide">{point.title}</h3>
              <p className="text-brand-dark/60 text-lg leading-relaxed font-inter">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}