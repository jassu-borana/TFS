"use client";

import { motion } from "framer-motion";

export default function HostSection() {
  return (
    <section id="host" className="bg-brand-dark py-28 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-30">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
        >
          {/* Avatar card */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #e8c97e33, transparent 40%, #e8c97e33 80%, transparent)",
                  animation: "spin 8s linear infinite",
                }}
              />
              {/* Avatar placeholder */}
              <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10">
                <img
                  src="/girishsir.png"
                  alt="Girish Singaria"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge */}
              <motion.div
                className="absolute -bottom-3 -right-3 bg-brand-accent text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                TFS
              </motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } } }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-brand-accent uppercase mb-2">Your Host</p>
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-8xl leading-none tracking-wide text-white">
                GIRISH<br />SINGARIA
              </h2>
            </div>
            <p className="text-white/70 text-lg leading-relaxed font-inter">
              Entrepreneur, investor, and storyteller — Girish Singaria has spent years in the trenches of the startup world. His natural curiosity and deep empathy unlock conversations that founders rarely have in public.
            </p>
            <p className="text-white/70 text-lg leading-relaxed font-inter">
              With a gift for asking the questions others avoid, Girish creates a space where founders feel seen, understood, and heard.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {["Entrepreneur", "Investor", "Storyteller", "Podcast Host"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm border border-white/15 text-white/60 font-inter tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
