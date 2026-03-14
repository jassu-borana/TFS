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
    <section id="about" className="bg-brand-cream text-brand-dark py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto relative z-30">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Left — big heading */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/50 uppercase mb-4">
              About
            </p>
            <h2 className="font-bebas text-7xl sm:text-8xl lg:text-9xl leading-none tracking-wide text-brand-dark">
              THE<br />FOUNDER<br />SHOW
            </h2>
            {/* Gold accent line */}
            <div className="mt-6 w-24 h-1 rounded-full" style={{ background: "#e8c97e" }} />
          </motion.div>

          {/* Right — copy */}
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-brand-dark/80 font-inter">
              The Founder Show is a raw, unfiltered podcast that goes behind the headlines to uncover the real stories of building companies. No PR polish — just honest conversations with the people brave enough to bet everything on an idea.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-brand-dark/80 font-inter">
              Each episode dives deep into the crucibles of entrepreneurship: the late nights, the pivots, the failures that teach more than any success, and the moments that make it all worth it.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { number: "200+", label: "Episodes" },
                { number: "50K+", label: "Monthly Listeners" },
                { number: "4.9★", label: "Avg. Rating" },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-brand-dark/20 pl-4">
                  <div className="font-bebas text-4xl text-brand-dark">{stat.number}</div>
                  <div className="text-sm text-brand-dark/60 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
