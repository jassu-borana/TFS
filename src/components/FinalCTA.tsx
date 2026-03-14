"use client";

import { motion } from "framer-motion";

const LINES = ["REAL STORIES.", "REAL FOUNDERS.", "REAL IMPACT."];

export default function FinalCTA() {
  return (
    <section
      id="apply"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-28 px-8"
      style={{
        background: "linear-gradient(160deg, #0a0a0a 0%, #0f0c1a 40%, #0a0a0a 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,201,126,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Headline lines */}
      <div className="relative z-30 text-center mb-14">
        {LINES.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 50, skewY: 3 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block font-bebas leading-none tracking-[0.08em]"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 10rem)",
                background: "linear-gradient(135deg, #ffffff 0%, #e8c97e 40%, #ffffff 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {line}
            </span>
          </motion.div>
        ))}
      </div>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        className="relative z-30 text-center"
      >
        <p className="text-white/40 font-inter text-sm tracking-widest uppercase mb-8">
          Your story deserves to be heard
        </p>
        <motion.a
          href="/apply"
          id="final-apply-btn"
          className="inline-block px-10 py-5 rounded-full font-bebas text-2xl tracking-[0.12em] text-black relative overflow-hidden group"
          style={{ background: "linear-gradient(135deg, #e8c97e 0%, #f0e09a 100%)" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">APPLY AS GUEST</span>
          {/* Shine sweep */}
          <motion.span
            className="absolute inset-0 bg-white/30"
            initial={{ x: "-100%", skewX: -20 }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.a>

        {/* Footnote */}
        <p className="mt-8 text-white/25 text-xs font-inter tracking-wider">
          © 2024 The Founder Show · Hosted by Girish Singania
        </p>
      </motion.div>
    </section>
  );
}
