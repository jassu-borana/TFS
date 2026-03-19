"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const EPISODES = [
  {
    number: "01",
    title: "From ₹10K to ₹100Cr",
    guest: "Rahul Mehta",
    role: "Founder, FintechForge",
    duration: "1h 14m",
    tag: "Fintech",
    videoId: "FcNivo1CTLc",
    views: "245K",
    date: "2 weeks ago",
  },
  {
    number: "02",
    title: "Burning the Boats",
    guest: "Priya Kapoor",
    role: "Co-Founder, HealthStack",
    duration: "58m",
    tag: "HealthTech",
    videoId: "Lu8vXrFQ6Ac",
    views: "189K",
    date: "1 month ago",
  },
  {
    number: "03",
    title: "Edunova",
    guest: "Special Episode",
    role: "EdTech Founder",
    duration: "1h 02m",
    tag: "EdTech",
    videoId: "-GuO0d2Gkdc",
    views: "312K",
    date: "3 weeks ago",
  },
  {
    number: "04",
    title: "Medical Marvel",
    guest: "Dr. Aryan Bose",
    role: "Healthcare Innovator",
    duration: "1h 10m",
    tag: "Health",
    videoId: "D2TrM7Rx80Q",
    views: "178K",
    date: "5 days ago",
  },
  {
    number: "05",
    title: "Stars & Startups",
    guest: "Astrology Episode",
    role: "Lifestyle Creator",
    duration: "52m",
    tag: "Lifestyle",
    videoId: "qXDTJ977yfg",
    views: "156K",
    date: "2 days ago",
  },
  {
    number: "06",
    title: "Medical Marvel II",
    guest: "Dr. Meera Kapoor",
    role: "Healthcare Innovator",
    duration: "1h 18m",
    tag: "Health",
    videoId: "MA8dw1_f-yg",
    views: "203K",
    date: "1 week ago",
  },
  {
    number: "07",
    title: "Medical Marvel III",
    guest: "Dr. Rajan Verma",
    role: "Healthcare Innovator",
    duration: "1h 05m",
    tag: "Health",
    videoId: "pZU4vnleXIU",
    views: "167K",
    date: "4 days ago",
  },
];

// ─── YT API loader ────────────────────────────────────────────────
let ytApiLoaded = false;
const ytReadyCallbacks: (() => void)[] = [];

function loadYTApi(onReady: () => void) {
  if (typeof window === "undefined") return;
  if (window.YT?.Player) { onReady(); return; }
  ytReadyCallbacks.push(onReady);
  if (!ytApiLoaded) {
    ytApiLoaded = true;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      ytReadyCallbacks.forEach((cb) => cb());
      ytReadyCallbacks.length = 0;
    };
  }
}

// ─── Featured Player ──────────────────────────────────────────────
function FeaturedPlayer({ ep }: { ep: (typeof EPISODES)[0] }) {
  const playerDivRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    try { playerRef.current?.unMute(); } catch { }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    try { playerRef.current?.mute(); } catch { }
  };

  useEffect(() => {
    let destroyed = false;
    setReady(false);
    loadYTApi(() => {
      if (destroyed || !playerDivRef.current) return;
      playerRef.current = new window.YT.Player(playerDivRef.current, {
        videoId: ep.videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: ep.videoId,
          controls: 0,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          start: 3,
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            e.target.playVideo();
            setReady(true);
          },
        },
      });
    });
    return () => {
      destroyed = true;
      try { playerRef.current?.destroy(); } catch { }
    };
  }, [ep.videoId]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e8c97e] via-purple-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-50 blur transition-opacity duration-500" />
      
      {/* Video container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
        {/* Mute / unmute indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
          className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300"
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(232,201,126,0.3)",
          }}
        >
          <motion.div
            animate={{ scale: hovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: hovered ? Infinity : 0 }}
          >
            {hovered ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </motion.div>
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: hovered ? "#e8c97e" : "rgba(255,255,255,0.6)" }}>
            {hovered ? "Sound On" : "Muted"}
          </span>
        </motion.div>

        {/* Video */}
        <div className="absolute inset-0">
          <div
            ref={playerDivRef}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: "130%", height: "130%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
          
          {/* Loading overlay */}
          <motion.div
            animate={{ opacity: ready ? 0 : 1 }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#e8c97e]/30 border-t-[#e8c97e] animate-spin" />
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        {/* Gold top bar with animation */}
        <motion.div
          animate={{
            width: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#e8c97e] to-transparent"
        />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
          {/* Tag with animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-[#e8c97e]/10 text-[#e8c97e] border border-[#e8c97e]/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8c97e] animate-pulse" />
              {ep.tag} · {ep.views} views
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={ep.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
                {ep.title}
              </h3>
              <p className="text-white/80 text-lg">
                {ep.guest} · {ep.role}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-4">
            <motion.a
              href={`https://youtu.be/${ep.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              <div className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold shadow-lg">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                  <path d="M0 0l12 7L0 14V0z" />
                </svg>
                Watch Episode
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
            
            <div className="flex items-center gap-3 text-white/40">
              <span className="text-sm">{ep.duration}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-sm">{ep.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Episode Row ──────────────────────────────────────────────────
function EpisodeRow({
  ep,
  isActive,
  onClick,
  index,
}: {
  ep: (typeof EPISODES)[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group w-full text-left relative"
    >
      <motion.div
        whileHover={{ x: 4 }}
        className="relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300"
        style={{
          background: isActive
            ? "linear-gradient(90deg, rgba(232,201,126,0.1) 0%, transparent 100%)"
            : "transparent",
        }}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeEpisode"
            className="absolute left-0 w-1 h-8 rounded-full bg-gradient-to-b from-[#e8c97e] to-[#f0d89a]"
          />
        )}

        {/* Number */}
        <span
          className="text-sm font-mono w-8"
          style={{ color: isActive ? "#e8c97e" : "rgba(255,255,255,0.3)" }}
        >
          {ep.number}
        </span>

        {/* Thumbnail with play overlay */}
        <div className="relative shrink-0 w-16 h-10 rounded-lg overflow-hidden shadow-md">
          <img
            src={`https://img.youtube.com/vi/${ep.videoId}/mqdefault.jpg`}
            alt={ep.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0, background: "rgba(0,0,0,0.5)" }}
          >
            <svg width="8" height="10" viewBox="0 0 12 14" fill="#e8c97e">
              <path d="M0 0l12 7L0 14V0z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm truncate transition-colors duration-300"
            style={{ color: isActive ? "#e8c97e" : "rgba(255,255,255,0.9)" }}
          >
            {ep.title}
          </p>
          <p
            className="text-xs truncate transition-colors duration-300"
            style={{ color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)" }}
          >
            {ep.guest} · {ep.role}
          </p>
        </div>

        {/* Duration */}
        <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
          {ep.duration}
        </span>
      </motion.div>
    </motion.button>
  );
}

// ─── Section ──────────────────────────────────────────────────────
export default function EpisodesSection() {
  const [active, setActive] = useState(0);
  const ep = EPISODES[active];

  return (
    <section className="relative overflow-hidden bg-black py-28 px-4 md:px-8 lg:px-16">
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8c97e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e8c97e]" />
            </span>
            <span className="text-xs font-medium tracking-wider text-white/60 uppercase">
              Latest Episodes
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold">
                <span className="text-white">
                  Featured
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#e8c97e] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Episodes
                </span>
              </h2>
              <p className="text-white/40 text-lg mt-4 max-w-2xl">
                Insights from founders who've built and scaled successful startups
              </p>
            </div>
            
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
            >
              <span className="text-sm font-medium">View all episodes</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          {/* Left: Featured player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <FeaturedPlayer ep={ep} />

            {/* Episode stats */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] bg-clip-text text-transparent">
                  {ep.number}
                </span>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-white/40 text-xs">Episode stats</p>
                  <p className="text-white/60 text-sm">{ep.views} views · {ep.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-[#e8c97e]/50"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Episode list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
          >
            {/* List header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] flex items-center justify-center text-black font-bold shadow-md">
                  {EPISODES.length}
                </div>
                <div>
                  <p className="text-white/90 font-semibold">All Episodes</p>
                  <p className="text-white/40 text-xs">Click to play</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                {["All", "Recent", "Popular"].map((filter) => (
                  <button
                    key={filter}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Episode rows */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
              {EPISODES.map((item, i) => (
                <EpisodeRow
                  key={item.number}
                  ep={item}
                  isActive={i === active}
                  onClick={() => setActive(i)}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
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
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(232, 201, 126, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 201, 126, 0.5);
        }
      `}</style>
    </section>
  );
}