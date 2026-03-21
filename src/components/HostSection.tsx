"use client";

import { motion } from "framer-motion";

export default function HostSection() {
  return (
    <section id="host" className="relative bg-black py-28 px-8 md:px-16 lg:px-24 overflow-hidden">
      
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
        {[...Array(30)].map((_, i) => (
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
              {/* Multiple glow rings */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #e8c97e33, transparent 40%, #e8c97e33 80%, transparent)",
                  animation: "spin 8s linear infinite",
                }}
              />
              <div
                className="absolute inset-[-10px] rounded-full opacity-30 blur-xl"
                style={{
                  background: "radial-gradient(circle, #e8c97e20 0%, transparent 70%)",
                  animation: "pulse 3s ease-in-out infinite",
                }}
              />
              
              {/* Avatar container with border */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-[#e8c97e]/30 shadow-2xl">
                <img
                  src="/girishsir.png"
                  alt="Girish Singaria"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div
                className="absolute -bottom-3 -right-3 bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                The Host
              </motion.div>

            <motion.div
  className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#e8c97e]/20 border border-[#e8c97e]/40 flex items-center justify-center backdrop-blur-sm overflow-hidden"
  animate={{ rotate: [0, 360] }}
  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
>
  <img
    src="/logo.png"
    alt="Host"
    className="w-[85%] h-[85%] object-contain"
  />
</motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } } }}
            className="space-y-6"
          >
            <div>
              <motion.div 
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-8 h-0.5 bg-[#e8c97e]/60 rounded-full" />
                <p className="text-sm font-semibold tracking-[0.25em] text-[#e8c97e] uppercase">
               Meet the Voice Behind the Conversations

                </p>
              </motion.div>

              <h2 className="text-center font-bebas text-6xl sm:text-7xl lg:text-8xl leading-none tracking-wide text-white">
                GIRISH<br />
                <span className="bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] bg-clip-text text-transparent">
                  SINGARIA
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-white/70 text-lg leading-relaxed font-inter border-l-4 border-[#e8c97e]/30 pl-4">
              Hosted by Girish Singaria, a startup mentor, investor in India, and seasoned business leader, The Founder Show brings a perspective that goes beyond basic questioning.
With years of experience working closely with founders and businesses, Girish understands what truly matters - and asks the questions most people don’t.

              </p>
              <p className="text-white/70 text-lg leading-relaxed font-inter">
               As a podcast host in India and a startup expert, his approach is simple: keep it real, keep it meaningful, and always bring value to the listener.
This isn’t just a podcast for founders.
It’s a platform built by someone who has been in the trenches himself.
</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Entrepreneur", "Investor", "Storyteller", "Podcast Host"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(232,201,126,0.15)" }}
                  className="px-4 py-2 rounded-full text-sm border border-[#e8c97e]/30 text-[#e8c97e]/80 font-inter tracking-wide hover:border-[#e8c97e]/60 transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Social proof */}
            <motion.div 
              className="flex items-center gap-6 pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#e8c97e]/30 to-[#f0d89a]/30 border-2 border-black flex items-center justify-center text-xs text-white"
                  >
                    👤
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-sm">
                <span className="text-[#e8c97e] font-semibold">50+</span> founders interviewed
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative bottom line */}
        <motion.div 
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#e8c97e]/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}