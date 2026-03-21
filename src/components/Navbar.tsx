"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

 useEffect(() => {
  if (typeof window === "undefined") return;

  const onScroll = () => setScrolled(window.scrollY > 20);

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => window.removeEventListener("scroll", onScroll);
}, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? "rgba(8,8,8,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-[80px] flex items-center justify-between">

        {/* ── Logo ── */}
        <motion.a
          href="#"
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative w-24 h-24">
            <Image
              src="/Logo.png"
              alt="The Founder Show"
              fill
              priority
              className="object-contain"
            />
          </div>
        </motion.a>
        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#episodes">Episodes</NavLink>
          <NavLink href="#host">Host</NavLink>

          {/* Divider */}
          <div className="w-px h-4 bg-white/15 mx-3" />

          <motion.a
            href="#apply"
            id="nav-apply-btn"
            className="relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide text-black overflow-hidden"
            style={{ background: "linear-gradient(135deg, #e8c97e, #f0e09a)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shine sweep */}
            <motion.span
              className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full"
              whileHover={{ translateX: "200%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span className="relative z-10">Apply As Guest</span>
          </motion.a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1.5px] bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-6 h-[1.5px] bg-white origin-center"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1.5px] bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(8,8,8,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <motion.div
              className="flex flex-col gap-1 px-8 py-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {["About", "Episodes", "Host"].map((label) => (
                <motion.a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-bebas text-2xl tracking-[0.2em] text-white/70 hover:text-brand-accent transition-colors py-2 border-b border-white/5"
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="#apply"
                onClick={() => setMenuOpen(false)}
                className="mt-4 px-5 py-3 text-center rounded-full font-semibold tracking-wide text-black"
                style={{ background: "linear-gradient(135deg, #e8c97e, #f0e09a)" }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Apply As Guest
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide group"
    >
      {children}
      {/* Underline hover effect */}
      <span className="absolute bottom-1 left-4 right-4 h-px bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </a>
  );
}