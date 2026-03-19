"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STEPS = [
  {
    number: "01",
    label: "Selection Process",
    color: "#e8c97e",
    gradient: "from-amber-400/20 to-amber-600/5",
    items: [
      {
        icon: "📋",
        title: "Fill out the Podcast Form",
        tag: "5 minutes",
        desc: "Takes just 5 minutes. Tell us about your startup, traction, and vision.",
        sub: "Quick and focused form",
      },
      {
        icon: "🔍",
        title: "We Review Your Podcast Form",
        tag: "48 hours",
        desc: "Our team goes through your story within 48 hours. We look for clarity, traction, and founder mindset.",
        sub: "Comprehensive review process",
      },
      {
        icon: "📞",
        title: "We Let You Know",
        tag: "Email + Call",
        desc: "You'll get an email + call from us.",
        sub: "Clear communication on status",
      },
    ],
  },
  {
    number: "02",
    label: "Preparation & Booking",
    color: "#a78bfa",
    gradient: "from-purple-400/20 to-purple-600/5",
    items: [
      {
        icon: "☎️",
        title: "Quick 15-Minute Call With Our Team",
        tag: "15 minutes",
        desc: "You'll speak with our production team to align on the process, shoot expectations, and final Q&A.",
        sub: "Production alignment call",
      },
      {
        icon: "💳",
        title: "Pay the Remaining Amount",
        tag: "Payment",
        desc: "Once you're ready, you'll pay the remaining ₹99,000 + GST to lock your podcast shoot date in Bangalore.",
        sub: "Secure your podcast shoot slot",
      },
    ],
  },
  {
    number: "03",
    label: "Shooting & Publishing",
    color: "#4ade80",
    gradient: "from-green-400/20 to-green-600/5",
    items: [
      {
        icon: "🎙️",
        title: "Your Studio Interview Day",
        tag: "90 minutes",
        desc: "We shoot your 90-minute deep-dive podcast — professionally filmed with multi-camera setup.",
        sub: "Professional studio recording session",
      },
      {
        icon: "🚀",
        title: "Go Live & Get Amplified",
        tag: "6–8 weeks",
        desc: "Your episode goes live across all platforms and we run paid amplification to maximise reach.",
        sub: "Full distribution + paid promotion",
      },
    ],
  },
];

export default function ProcessSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-28 px-4 bg-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Floating orbs */}
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
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/5 via-purple-500/5 to-green-500/5 blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-white/60 uppercase">
              Your Journey Starts Here
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Simple 3-Step
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Podcast Process
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto"
          >
            From unknown to industry leader in 3 easy steps
          </motion.p>
        </div>

        {/* Modern Timeline Layout */}
        <div className="relative">
          {/* Central Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Steps */}
          <div className="space-y-16 lg:space-y-0">
            {STEPS.map((step, stepIndex) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onHoverStart={() => setHoveredStep(stepIndex)}
                onHoverEnd={() => setHoveredStep(null)}
                className={`relative lg:flex lg:items-center ${
                  stepIndex % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step Number - Desktop */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-12 h-12">
                  <motion.div
                    animate={{
                      scale: hoveredStep === stepIndex ? 1.2 : 1,
                      backgroundColor: hoveredStep === stepIndex ? step.color : "rgba(255,255,255,0.05)",
                    }}
                    className="w-full h-full rounded-full flex items-center justify-center font-bold text-sm border border-white/10 backdrop-blur-sm"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className={`lg:w-1/2 ${stepIndex % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                  {/* Step Header - Mobile */}
                  <div className="lg:hidden flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: `${step.color}20`, color: step.color }}
                    >
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-white/90">{step.label}</h3>
                  </div>

                  {/* Items Container */}
                  <div className="space-y-4">
                    {step.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: stepIndex % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        className="group relative"
                      >
                        {/* Glass card */}
                        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                          {/* Glow effect on hover */}
                          <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                            style={{ background: step.color }}
                          />
                          
                          <div className="relative flex gap-4">
                            {/* Icon container */}
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                                border: `1px solid ${step.color}30`,
                              }}
                            >
                              {item.icon}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-2">
                                <h4 className="font-semibold text-white/90">{item.title}</h4>
                                <span
                                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                                  style={{
                                    background: `${step.color}15`,
                                    color: step.color,
                                    border: `1px solid ${step.color}20`,
                                  }}
                                >
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                              <p className="text-white/30 text-xs mt-2 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                {item.sub}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Connector line between items */}
                        {itemIndex < step.items.length - 1 && (
                          <div className="absolute left-6 -bottom-4 w-px h-4 bg-gradient-to-b from-white/20 to-transparent" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Empty side for desktop layout */}
                <div className="hidden lg:block lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-24"
        >
          <div className="relative inline-block group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-purple-400 to-green-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            
            <motion.a
              href="/apply"
              className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-black text-white font-semibold text-lg border border-white/20 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background */}
              <motion.div
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              />
              
              <span>Start Your Journey</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </div>
          
          <p className="text-white/30 text-sm mt-4">
            Join hundreds of founders who've shared their story
          </p>
        </motion.div>
      </div>
    </section>
  );
}