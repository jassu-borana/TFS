"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    role: "Founder & CEO, NutrifyAI",
    stars: 5,
    text: "I’ve done a few podcasts before, but this felt different. The conversation went deeper than I expected, and it stayed with me even after the shoot.",
    initial: "AS",
  },
  {
    name: "Dev Patel",
    role: "Co-Founder, LogistIQ",
    stars: 5,
    text: "What I liked most was the clarity. It wasn’t just talking — it helped me see my own journey more clearly.",
    initial: "DP",
  },
  {
    name: "Meera Joshi",
    role: "Founder, GreenThread",
    stars: 5,
    text: "The response after the episode surprised me. People reached out saying they finally understood what we’re building.",
    initial: "MJ",
  },
  {
    name: "Rohan Verma",
    role: "CEO, CloudKraft",
    stars: 5,
    text: "It didn’t feel like an interview. It felt like a real conversation — and that made all the difference.",
    initial: "RV",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#e8c97e">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const prev = () => goTo(active === 0 ? TESTIMONIALS.length - 1 : active - 1);
  const next = () => goTo(active === TESTIMONIALS.length - 1 ? 0 : active + 1);

  const t = TESTIMONIALS[active];

  return (
    <section className="relative bg-black overflow-hidden py-28 px-8 md:px-16 lg:px-24">
      
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
        {[...Array(20)].map((_, i) => (
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

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <motion.div 
            className="flex justify-center gap-2 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-0.5 bg-[#e8c97e]/30 rounded-full" />
            <div className="w-4 h-0.5 bg-[#e8c97e]/60 rounded-full" />
            <div className="w-2 h-0.5 bg-[#e8c97e] rounded-full" />
          </motion.div>

          <p className="text-sm font-semibold tracking-[0.25em] text-[#e8c97e]/70 uppercase mb-3">
            Voices
          </p>
          <h2 className="font-bebas text-4xl sm:text-6xl leading-none tracking-wide text-white">
           WHAT FOUNDERS ARE SAYING

          </h2>
        </motion.div>

        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-between mb-16 border-b border-white/10 pb-6"
        >
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/30 font-inter">
              {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </p>
          </div>

          {/* Arrow nav */}
          <div className="flex gap-3">
            {[prev, next].map((fn, idx) => (
              <button
                key={idx}
                onClick={fn}
                className="group w-11 h-11 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 hover:border-[#e8c97e]/60 hover:bg-[#e8c97e]/10"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={`text-white/40 group-hover:text-[#e8c97e] transition-colors ${idx === 0 ? "rotate-180" : ""}`}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">

          {/* LEFT — Big quote */}
          <div className="relative">

            {/* Decorative quote mark */}
            <div
              className="absolute -top-6 -left-4 font-bebas text-[160px] leading-none select-none pointer-events-none"
              style={{ color: "#e8c97e", opacity: 0.07 }}
            >
              "
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10"
              >
                <Stars count={t.stars} />

                <p className="mt-8 text-white/85 text-2xl md:text-3xl lg:text-[2rem] leading-[1.5] font-light tracking-[-0.01em] max-w-2xl"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-10 flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bebas text-sm tracking-wider"
                    style={{
                      background: "linear-gradient(135deg, #e8c97e22, #e8c97e44)",
                      border: "1px solid #e8c97e55",
                      color: "#e8c97e",
                    }}
                  >
                    {t.initial}
                  </div>

                  <div>
                    <p className="font-bebas text-lg tracking-widest text-[#e8c97e]">
                      {t.name}
                    </p>
                    <p className="text-white/35 text-sm font-inter mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom accent line */}
            <div className="mt-12 flex items-center gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-px transition-all duration-500"
                  style={{
                    width: i === active ? 48 : 16,
                    background: i === active ? "#e8c97e" : "rgba(255,255,255,0.15)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Stacked list */}
          <div className="hidden lg:flex flex-col gap-2 pt-1">
            {TESTIMONIALS.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group text-left px-5 py-4 rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  background: i === active ? "rgba(232,201,126,0.07)" : "transparent",
                  border: i === active ? "1px solid rgba(232,201,126,0.18)" : "1px solid transparent",
                }}
              >
                {/* Left accent line */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full transition-all duration-300"
                  style={{
                    background: i === active ? "#e8c97e" : "transparent",
                  }}
                />

                <p
                  className="font-bebas text-base tracking-widest transition-colors duration-300"
                  style={{ color: i === active ? "#e8c97e" : "rgba(255,255,255,0.35)" }}
                >
                  {item.name}
                </p>
                <p
                  className="text-xs font-inter mt-0.5 transition-colors duration-300"
                  style={{ color: i === active ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)" }}
                >
                  {item.role}
                </p>

                {/* Preview text on hover */}
                <p
                  className="text-xs font-inter mt-2 leading-relaxed line-clamp-2 transition-all duration-300"
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    maxHeight: i === active ? 60 : 0,
                    overflow: "hidden",
                    opacity: i === active ? 1 : 0,
                  }}
                >
                  {item.text}
                </p>
              </motion.button>
            ))}
          </div>

        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
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
            <span>Share Your Story</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>-

      </div>
    </section>
  );
}