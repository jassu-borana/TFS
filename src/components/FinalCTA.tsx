"use client";

import { motion } from "framer-motion";

const LINES = ["REAL STORIES", "REAL FOUNDERS", "REAL IMPACT"];

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
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-30 w-full px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Brand */}
          <div className="text-center md:text-left">
            <p className="font-bebas text-lg tracking-[0.15em] text-white/60">
              THE FOUNDER SHOW
            </p>
            <p className="font-inter text-xs text-white/30 tracking-wider mt-1">
              Presented by {""}
              <a 
                href="https://twitter.com/girishsingania" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#e8c97e] transition-colors duration-300"
              >
                Girish Singania
              </a>
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6 text-xs font-inter tracking-wider">
            <a 
              href="/privacy" 
              className="text-white/30 hover:text-white/60 transition-all duration-300 hover:tracking-[0.1em]"
            >
              PRIVACY
            </a>
            <span className="text-white/20 text-lg font-thin">|</span>
            <a 
              href="/terms" 
              className="text-white/30 hover:text-white/60 transition-all duration-300 hover:tracking-[0.1em]"
            >
              TERMS
            </a>
            <span className="text-white/20 text-lg font-thin hidden sm:inline">|</span>
            <a 
              href="/contact" 
              className="text-white/30 hover:text-white/60 transition-all duration-300 hover:tracking-[0.1em] hidden sm:inline"
            >
              CONTACT
            </a>
          </div>

          {/* Right side - Social & Copyright */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/30 hover:text-[#e8c97e] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/30 hover:text-[#e8c97e] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/30 hover:text-[#e8c97e] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </motion.a>
            </div>
            
            {/* Copyright */}
            <p className="font-inter text-[0.65rem] text-white/20 tracking-wider border-l border-white/10 pl-4">
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <div className="max-w-7xl mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.footer>
    </section>
  );
}