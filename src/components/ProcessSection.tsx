"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    label: "Selection Process",
    color: "#e8c97e",
    items: [
      {
        icon: "📋",
        title: "Fill out the Podcast Form",
        tag: "5 min",
        desc: "Tell us about your startup, traction, and vision.",
      },
      {
        icon: "🔍",
        title: "We Review Your Form",
        tag: "48 hrs",
        desc: "Our team reviews your story within 48 hours.",
      },
      {
        icon: "📞",
        title: "We Let You Know",
        tag: "Email/Call",
        desc: "You'll get an email + call from us.",
      },
    ],
  },
  {
    label: "Preparation & Booking",
    color: "#a78bfa",
    items: [
      {
        icon: "☎️",
        title: "15-Minute Call With Team",
        tag: "15 min",
        desc: "Align on process and shoot expectations.",
      },
      {
        icon: "💳",
        title: "Pay Remaining Amount",
        tag: "Payment",
        desc: "Pay ₹99,000 + GST to lock your date.",
      },
    ],
  },
  {
    label: "Shooting & Publishing",
    color: "#4ade80",
    items: [
      {
        icon: "🎙️",
        title: "Studio Interview Day",
        tag: "90 min",
        desc: "90-minute deep-dive with multi-camera setup.",
      },
      {
        icon: "🚀",
        title: "Go Live & Get Amplified",
        tag: "6-8 weeks",
        desc: "Episode goes live across all platforms.",
      },
    ],
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out effect for steps
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.3, 1, 0.3]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0.3, 0.6, 0.2]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-28 px-4 bg-black">
      {/* Black Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        
        {/* Animated orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#a78bfa]/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#e8c97e] animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-white/80 uppercase">
              Your Journey Map
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="text-white">The Path to</span>
            <br />
            <span className="bg-gradient-to-r from-[#e8c97e] via-[#a78bfa] to-[#4ade80] bg-clip-text text-transparent">
              Podcast Stardom
            </span>
          </motion.h2>
          <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto mt-4">
            Your journey from application to episode launch - transparent, structured, and designed for your success
          </p>
        </div>

        {/* Steps without numbers - Alternating left/right */}
        <div className="space-y-24 md:space-y-32">
          {STEPS.map((step, stepIndex) => {
            // Different opacity based on scroll position
            let stepOpacity = 1;
            if (stepIndex === 0) stepOpacity = opacity1.get();
            if (stepIndex === 1) stepOpacity = opacity2.get();
            if (stepIndex === 2) stepOpacity = opacity3.get();

            return (
              <motion.div
                key={step.label}
                style={{ opacity: stepOpacity }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: stepIndex * 0.2 }}
                className={`flex flex-col ${
                  stepIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-12`}
              >
                {/* Content Card - Left side */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: stepIndex % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    {/* Step Label with underline */}
                    <div className="mb-6 md:mb-8">
                      <h3 
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                        style={{ color: step.color }}
                      >
                        {step.label}
                      </h3>
                      <div 
                        className="h-1 w-20 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                      />
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      {step.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="group"
                        >
                          {/* Item card */}
                          <div
                            className="relative p-5 rounded-xl bg-white/5 backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02]"
                            style={{
                              borderColor: `${step.color}30`,
                              background: `linear-gradient(135deg, ${step.color}05, transparent)`,
                            }}
                          >
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0 transition-all duration-300 group-hover:scale-110"
                                style={{
                                  background: `${step.color}20`,
                                  border: `1px solid ${step.color}40`,
                                }}
                              >
                                {item.icon}
                              </div>

                              <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                  <h4 className="font-semibold text-white text-sm sm:text-base">
                                    {item.title}
                                  </h4>
                                  <span
                                    className="text-[10px] px-2 py-1 rounded-full font-medium"
                                    style={{
                                      background: `${step.color}20`,
                                      color: step.color,
                                      border: `1px solid ${step.color}40`,
                                    }}
                                  >
                                    {item.tag}
                                  </span>
                                </div>
                                <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </div>

                            {/* Hover gradient */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              style={{
                                background: `radial-gradient(circle at 100% 0%, ${step.color}10, transparent)`,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Right side - Visual Element */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                  >
                    {/* Animated Circle */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(from 0deg, ${step.color}, ${step.color}40, transparent)`,
                          opacity: 0.3,
                        }}
                      />
                      
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full flex items-center justify-center"
                        style={{
                          background: `${step.color}10`,
                          backdropFilter: "blur(10px)",
                          border: `2px solid ${step.color}30`,
                        }}
                      >
                        <div className="text-center">
                         <div className="text-4xl md:text-5xl font-bold text-white">
  0{stepIndex + 1}
</div>
                          <div className="text-xs md:text-sm text-white/40">
                            {step.items.length} steps
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          background: step.color,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          x: [0, 10, 0],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 2 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Connector - Visible line connecting steps */}
        <div className="relative my-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#e8c97e] via-[#a78bfa] to-[#4ade80] opacity-30" />
          
          {/* Milestone markers */}
          <div className="relative flex justify-between items-center">
            {STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10"
              >
                <div className="w-3 h-3 rounded-full" style={{ background: step.color }} />
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[10px] text-white/40 whitespace-nowrap">
                  Step {idx + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Distance indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#e8c97e]" />
              <div className="w-2 h-2 rounded-full bg-[#a78bfa]" />
              <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
            </div>
            <span className="text-white/40 text-xs sm:text-sm">
              {STEPS.length} phases · Complete journey in 2-3 months
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/apply"
            className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-[#e8c97e] via-[#a78bfa] to-[#4ade80] text-black font-semibold text-sm sm:text-base md:text-lg shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Journey
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}