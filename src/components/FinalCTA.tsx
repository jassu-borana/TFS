"use client";

import { motion } from "framer-motion";

const LINES = ["REAL STORIES", "REAL FOUNDERS", "REAL IMPACT"];

export default function FinalCTA() {
  return (
    <section
      id="apply"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-5 sm:px-8 bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Soft radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

        {/* Single subtle gold orb - desktop only, toned down */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8c97e]/5 rounded-full blur-[80px]" />
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8c97e]/20 to-transparent" />

      {/* Headline */}
      <div className="relative z-10 text-center mb-10 sm:mb-14 w-full">
        {LINES.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block font-bebas leading-none tracking-[0.06em] sm:tracking-[0.08em]"
              style={{
                fontSize: "clamp(2.8rem, 10vw, 9rem)",
                background:
                  i === 1
                    ? "linear-gradient(135deg, #e8c97e 0%, #f5e09a 50%, #e8c97e 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #c8c8c8 100%)",
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

      {/* CTA area */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/40 text-xs tracking-widest uppercase mb-6 flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8c97e] animate-pulse" />
          Your story deserves to be heard
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8c97e] animate-pulse" />
        </motion.p>

        {/* Button */}
        <motion.a
          href="/apply"
          className="inline-block px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bebas text-xl sm:text-2xl tracking-[0.12em] text-black relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #e8c97e 0%, #f0d89a 100%)",
            boxShadow: "0 8px 24px -6px rgba(232,201,126,0.35)",
          }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 16px 36px -8px rgba(232,201,126,0.45)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">APPLY AS GUEST</span>
          <motion.span
            className="absolute inset-0 bg-white/25"
            initial={{ x: "-110%", skewX: -15 }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />
        </motion.a>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-7"
        >
          {[
            "48hr response",
            "No fees ever",
            "500K+ listeners",
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-1.5 text-white/35 text-[11px] tracking-wider"
            >
              <span className="w-1 h-1 rounded-full bg-[#e8c97e]" />
              {badge}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-5"
      >
        {/* Top border */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-bebas text-base tracking-[0.15em] text-white/70">
              THE FOUNDER SHOW
            </p>
            <p className="text-[11px] text-white/35 tracking-wider mt-0.5">
              Presented by{" "}
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

          {/* Center links */}
          <div className="flex items-center gap-5 text-[11px] tracking-wider">
            {["PRIVACY", "TERMS", "CONTACT"].map((link, i) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-white/35 hover:text-white/70 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Socials + copyright */}
          <div className="flex items-center gap-3">
            {/* X / Twitter */}
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="w-7 h-7 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/50 hover:text-[#e8c97e] hover:border-[#e8c97e]/30 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="w-7 h-7 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/50 hover:text-[#e8c97e] hover:border-[#e8c97e]/30 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="w-7 h-7 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/50 hover:text-[#e8c97e] hover:border-[#e8c97e]/30 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
              </svg>
            </motion.a>

            <p className="text-[10px] text-white/25 tracking-wider border-l border-white/15 pl-3">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
