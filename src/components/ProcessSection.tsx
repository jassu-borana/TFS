"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STEPS = [
  {
    number: "01",
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
    number: "02",
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
    number: "03",
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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-28 px-4 bg-black">
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

      <div className="max-w-5xl mx-auto relative z-10">
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
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="text-white">The Path to</span>
            <br />
            <span className="bg-gradient-to-r from-[#e8c97e] via-[#a78bfa] to-[#4ade80] bg-clip-text text-transparent">
              Podcast Stardom
            </span>
          </motion.h2>
        </div>

        {/* Vertical Roadmap */}
        <div className="relative">
          {/* Main vertical line - The Road */}
          <div className="absolute left-[2.5rem] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e8c97e] via-[#a78bfa] to-[#4ade80] transform -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-16">
            {STEPS.map((step, stepIndex) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: stepIndex * 0.2 }}
                className="relative"
              >
                {/* Step Marker - Milestone */}
                <div className="absolute left-[2.5rem] md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div
                    animate={{
                      scale: activeStep === stepIndex ? 1.2 : 1,
                      boxShadow: activeStep === stepIndex ? `0 0 30px ${step.color}` : "none",
                    }}
                    onHoverStart={() => setActiveStep(stepIndex)}
                    onHoverEnd={() => setActiveStep(null)}
                    className="relative"
                  >
                    {/* Pulse effect */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: `${step.color}40` }}
                    />
                    
                    {/* Main marker */}
                    <div
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border-4 border-black shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                        color: "#000",
                      }}
                    >
                      {step.number}
                    </div>
                  </motion.div>
                </div>

                {/* Content - Alternating left/right on desktop */}
                <div className={`flex flex-col md:flex-row ${stepIndex % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Left/right spacing */}
                  <div className="hidden md:block md:w-1/2" />
                  
                  {/* Content card */}
                  <div className={`w-full md:w-1/2 ${stepIndex % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    {/* Step label */}
                    <motion.div
                      animate={{ x: activeStep === stepIndex ? 10 : 0 }}
                      className="mb-4 md:mb-6"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold" style={{ color: step.color }}>
                        {step.label}
                      </h3>
                    </motion.div>

                    {/* Items */}
                    <div className="space-y-4">
                      {step.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: stepIndex % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                          onHoverStart={() => setActiveItem(itemIndex)}
                          onHoverEnd={() => setActiveItem(null)}
                          className="group relative"
                        >
                          {/* Connector line to main road */}
                          <div
                            className="absolute left-[-2rem] top-1/2 w-8 h-0.5 hidden md:block"
                            style={{
                              background: `linear-gradient(90deg, ${step.color}, transparent)`,
                            }}
                          />

                          {/* Item card */}
                          <motion.div
                            animate={{
                              y: activeItem === itemIndex ? -2 : 0,
                              scale: activeItem === itemIndex ? 1.02 : 1,
                            }}
                            className="relative p-5 rounded-xl bg-white/5 backdrop-blur-sm border-2 transition-all duration-300"
                            style={{
                              borderColor: activeItem === itemIndex ? step.color : "rgba(255,255,255,0.1)",
                              background: activeItem === itemIndex ? `${step.color}10` : "rgba(255,255,255,0.05)",
                            }}
                          >
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                                style={{
                                  background: `${step.color}20`,
                                  border: `1px solid ${step.color}40`,
                                }}
                              >
                                {item.icon}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <h4 className="font-semibold text-white">{item.title}</h4>
                                  <span
                                    className="text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap"
                                    style={{
                                      background: `${step.color}20`,
                                      color: step.color,
                                      border: `1px solid ${step.color}40`,
                                    }}
                                  >
                                    {item.tag}
                                  </span>
                                </div>
                                <p className="text-white/40 text-xs leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </div>

                            {/* Progress indicator */}
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: activeItem === itemIndex ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                              className="absolute bottom-0 left-0 h-0.5 rounded-b-xl"
                              style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                            />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Start and End markers */}
          <div className="absolute left-[2.5rem] md:left-1/2 transform -translate-x-1/2 -top-6">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#e8c97e] animate-ping absolute" />
              <div className="w-3 h-3 rounded-full bg-[#e8c97e] relative" />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs text-white/40 whitespace-nowrap">
                Start Here
              </span>
            </div>
          </div>

          <div className="absolute left-[2.5rem] md:left-1/2 transform -translate-x-1/2 -bottom-6">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] animate-ping absolute" />
              <div className="w-3 h-3 rounded-full bg-[#4ade80] relative" />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs text-white/40 whitespace-nowrap">
                Episode Live
              </span>
            </div>
          </div>
        </div>

        {/* Distance indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#e8c97e]" />
              <div className="w-2 h-2 rounded-full bg-[#a78bfa]" />
              <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
            </div>
            <span className="text-white/40 text-sm">3 stops · 2-3 months total journey</span>
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
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#e8c97e] via-[#a78bfa] to-[#4ade80] text-black font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Journey
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}