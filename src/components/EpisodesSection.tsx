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
    title: "Content Creation vs Govt Job (2026)",
    guest: "Anshika Pandit",
    role: "Founder, Basttl Auto India",
    duration: "1h 14m",
    tag: "Auto Mobile",
    videoId: "FcNivo1CTLc",
 
    date: "2 weeks ago",
  },
  
  {
    number: "02",
    title: "Natural vs Lab Diamond 💎 | Which One Is Better in 2026?",
    guest: "Anjali Seervi",
    role: "Lab-Grown Diamonds Expert",
    duration: "1:14:00",
    tag: "Lab-Grown Diamonds",
    videoId: "Lu8vXrFQ6Ac",
    
    date: "Recent",
  },
  {
    number: "03",
    title: "450 दिनों में सरकारी नौकरी का क्लियर पाथ | EduNova Gurukul Founder की प्रेरणादायक कहानी",
    guest: "Pankaj Sandhu",
    role: "EdTech Founder",
    duration: "1:02:00",
    tag: "सरकारी नौकरी",
    videoId: "-GuO0d2Gkdc",
 
    date: "Recent",
  },
  {
    number: "04",
    title: "Doctors Only: Before You Start or Run a Hospital, Watch This.",
    guest: "Dr Achal Patel",
    role: "Healthcare Innovator",
    duration: "1:10:00",
    tag: "Health",
    videoId: "D2TrM7Rx80Q",
    
    date: "Recent",
  },
  {
    number: "05",
    title: "What is the Real Difference Between Vastu Vs Astrology",
    guest: "Rakesh Kumar (Vastu Consultant)",
    role: "Lifestyle Creator",
    duration: "52:00",
    tag: "Astrology Episode",
    videoId: "qXDTJ977yfg",
 
    date: "Recent",
  },
  {
    number: "06",
    title: "Patients Don't Trust Titles. They Trust What They Feel",
    guest: "Dr. Pritesh Patel",
    role: "Healthcare Innovator",
    duration: "1:18:00",
    tag: "Health",
    videoId: "MA8dw1_f-yg",

    date: "Recent",
  },
  {
    number: "07",
    title: "More Than Medicine: Leadership, Innovation & Growth for Modern Doctors",
    guest: "Dr. Pradeep Kumar",
    role: "Healthcare Innovator",
    duration: "1:05:00",
    tag: "Health",
    videoId: "pZU4vnleXIU",
  
    date: "Recent",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    setHovered(true);
    try { playerRef.current?.unMute(); } catch { }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHovered(false);
    try { playerRef.current?.mute(); } catch { }
  };

  const handleTap = () => {
    if (!isMobile) return;
    setHovered(!hovered);
    if (!hovered) {
      try { playerRef.current?.unMute(); } catch { }
    } else {
      try { playerRef.current?.mute(); } catch { }
    }
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
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      {/* Video container */}
      <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-black">
        {/* Mute / unmute indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-30 flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-md transition-all duration-300"
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
              <svg width="10" height="10" className="md:w-[14px] md:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="10" height="10" className="md:w-[14px] md:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </motion.div>
          <span className="text-[8px] md:text-[10px] font-semibold tracking-widest uppercase">
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
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#e8c97e]/30 border-t-[#e8c97e] animate-spin" />
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Content - FIXED: Properly sized text for mobile */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-1 sm:mb-2 md:mb-3 lg:mb-4"
          >
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-wider bg-[#e8c97e]/10 text-[#e8c97e] border border-[#e8c97e]/30 backdrop-blur-sm">
              <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#e8c97e] animate-pulse" />
              {ep.tag} 
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
              {/* Title - Mobile me chhota */}
              <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-0.5 sm:mb-1 md:mb-2">
                
              </h3>
              
              {/* Guest & Role - Mobile me chhota */}
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white/80">
                {ep.guest} · {ep.role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Buttons - Mobile optimized */}
          <div className="mt-1.5 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3">
            <motion.a
              href={`https://youtu.be/${ep.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full"
            >
              <div className="relative flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold shadow-lg text-[10px] sm:text-xs md:text-sm">
                <svg width="8" height="10" className="sm:w-[10px] sm:h-[12px] md:w-3 md:h-4" viewBox="0 0 12 14" fill="currentColor">
                  <path d="M0 0l12 7L0 14V0z" />
                </svg>
                Watch
                <span className="hidden xs:inline sm:inline">Episode</span>
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
            
            {/* Duration & Date - Mobile me chhota */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-white/40 text-[8px] sm:text-[9px] md:text-xs">
              <span>{ep.duration}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
              <span>{ep.date}</span>
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
        className="relative flex items-center gap-2 md:gap-4 px-2 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300"
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
            className="absolute left-0 w-0.5 md:w-1 h-6 md:h-8 rounded-full bg-gradient-to-b from-[#e8c97e] to-[#f0d89a]"
          />
        )}

        {/* Number */}
        <span
          className="text-[10px] md:text-sm font-mono w-6 md:w-8"
          style={{ color: isActive ? "#e8c97e" : "rgba(255,255,255,0.3)" }}
        >
          {ep.number}
        </span>

        {/* Thumbnail */}
        <div className="relative shrink-0 w-12 h-8 md:w-16 md:h-10 rounded-lg overflow-hidden shadow-md">
          <img
            src={`https://img.youtube.com/vi/${ep.videoId}/mqdefault.jpg`}
            alt={ep.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0, background: "rgba(0,0,0,0.5)" }}
          >
            <svg width="6" height="8" className="md:w-[8px] md:h-[10px]" viewBox="0 0 12 14" fill="#e8c97e">
              <path d="M0 0l12 7L0 14V0z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-xs md:text-sm truncate transition-colors duration-300"
            style={{ color: isActive ? "#e8c97e" : "rgba(255,255,255,0.9)" }}
          >
            {ep.title}
          </p>
          <p
            className="text-[10px] md:text-xs truncate transition-colors duration-300"
            style={{ color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)" }}
          >
            {ep.guest} · {ep.role}
          </p>
        </div>

        {/* Duration */}
        <span className="text-[9px] md:text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
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
    <section className="relative overflow-hidden bg-black py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4 md:mb-6"
          >
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8c97e] opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-[#e8c97e]" />
            </span>
            <span className="text-[10px] md:text-xs font-medium tracking-wider text-white/60 uppercase">
              Latest Episodes
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                <span className="text-white">Featured</span>
                <br />
                <span className="bg-gradient-to-r from-[#e8c97e] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Episodes
                </span>
              </h2>
              <p className="text-white/40 text-xs sm:text-sm md:text-base lg:text-lg mt-2 md:mt-4 max-w-2xl">
                Insights from founders who've built and scaled successful startups
              </p>
            </div>
            
           <motion.a
  href="https://youtube.com"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ x: 5 }}
  className="group flex items-center gap-1.5 md:gap-2 text-white/40 hover:text-white transition-colors duration-300 text-xs md:text-sm"
>
  <span className="font-medium">View all episodes</span>
  <svg
    width="14"
    height="14"
    className="md:w-[16px] md:h-[16px] group-hover:translate-x-1 transition-transform"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</motion.a>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left: Featured player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <FeaturedPlayer ep={ep} />

            {/* Episode stats */}
            <div className="mt-3 sm:mt-4 md:mt-6 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] bg-clip-text text-transparent">
                  {ep.number}
                </span>
                <div className="h-5 md:h-8 w-px bg-white/10" />
                <div>
                  <p className="text-white/40 text-[8px] sm:text-[9px] md:text-xs">Episode stats</p>
                  <p className="text-white/60 text-[9px] sm:text-[10px] md:text-sm">{ep.title}· {ep.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 md:gap-2">
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
                    className="w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#e8c97e]/50"
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
            className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10"
          >
            {/* List header */}
            <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] flex items-center justify-center text-black font-bold shadow-md text-xs md:text-sm">
                  {EPISODES.length}
                </div>
                <div>
                  <p className="text-white/90 font-semibold text-sm md:text-base">All Episodes</p>
                  <p className="text-white/40 text-[10px] md:text-xs">Click to play</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                {["All", "Recent", "Popular"].map((filter) => (
                  <button
                    key={filter}
                    className="px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-xs rounded-full bg-white/5 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Episode rows */}
            <div className="space-y-1 max-h-[350px] sm:max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar pr-1 md:pr-2">
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
          className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="/apply"
            className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold group text-xs sm:text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Share Your Story</span>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(232, 201, 126, 0.3);
          border-radius: 20px;
        }
        
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
        }
        
        /* Extra small devices ke liye */
        @media (max-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
        }
      `}</style>
    </section>
  );
}