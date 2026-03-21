"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const VIDEOS = [
  {
    videoId: "Lu8vXrFQ6Ac",
    title: "Natural vs Lab Diamond 💎 | Which One Is Better in 2026?",
    guest: "Anjali Seervi",
    tag: "Lab-Grown Dimaonds",
    views: "245K",
    duration: "1:14:00",
  },
  {
    videoId: "FcNivo1CTLc",
    title: "Content Creation vs Govt Job (2026) 🚗 | India’s #1 Female Auto Creator Reveals the Truth",
    guest: "Anshika Pandit",
    tag: "Auto Mobile",
    views: "189K",
    duration: "58:00",
  },
  {
    videoId: "-GuO0d2Gkdc",
    title: "450 दिनों में सरकारी नौकरी का क्लियर पाथ | EduNova Gurukul Founder की प्रेरणादायक कहानी",
    guest: "Pankaj Sandhu",
    tag: "सरकारी नौकरी ",
    views: "312K",
    duration: "1:02:00",
  },
  {
    videoId: "D2TrM7Rx80Q",
    title: "Doctors Only: Before You Start or Run a Hospital, Watch This.",
    guest: "Dr Achal Patel",
    tag: "Health",
    views: "178K",
    duration: "1:10:00",
  },
  {
    videoId: "qXDTJ977yfg",
    title: "What is the Real Difference Between Vastu Vs Astrology ",
    guest: "Rakesh Kumar ( Vastu Consultant )",
    tag: "Astrology Episode",
    views: "156K",
    duration: "52:00",
  },
  {
    videoId: "MA8dw1_f-yg",
    title: "Patients Don't Trust Titles. They Trust What They Feel",
    guest: " Dr. Pritesh Pate",
    tag: "Health",
    views: "203K",
    duration: "1:18:00",
  },
  {
    videoId: "pZU4vnleXIU",
    title: "More Than Medicine: Leadership, Innovation & Growth for Modern Doctors ",
    guest: "Dr. Pradeep Kumar",
    tag: "Health",
    views: "167K",
    duration: "1:05:00",
  },
];

// ─── Featured iframe player with hover-unmute ─────────────────────
function FeaturedPlayer({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sendCmd = (fn: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: fn, args: "" }),
      "*"
    );
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setHovered(true);
      sendCmd("unMute");
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHovered(false);
      sendCmd("mute");
    }
  };

  const handleTap = () => {
    if (isMobile) {
      setHovered(!hovered);
      if (!hovered) {
        sendCmd("unMute");
      } else {
        sendCmd("mute");
      }
    }
  };

  return (
    <div
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-2xl"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      {/* Animated border gradient - hide on mobile */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e8c97e] via-purple-400 to-pink-400 rounded-2xl md:rounded-3xl opacity-30 group-hover:opacity-50 blur transition-opacity duration-500 hidden md:block" />
      
      {/* iframe */}
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`}
        title="YouTube video"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      {/* Click to open YT */}
      <a
        href={`https://youtu.be/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
        aria-label="Watch on YouTube"
      />

      {/* Floating elements */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Top bar with shine - hide on mobile */}
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#e8c97e] to-transparent hidden md:block"
        />

        {/* Mute badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-md"
          style={{ 
            background: "rgba(0,0,0,0.8)", 
            border: "1px solid rgba(232,201,126,0.3)",
          }}
        >
          <motion.div
            animate={{ scale: hovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: hovered ? Infinity : 0 }}
          >
            {hovered ? (
              <svg width="10" height="10" className="md:w-[12px] md:h-[12px]" viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="10" height="10" className="md:w-[12px] md:h-[12px]" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </motion.div>
          <span
            className="text-[8px] md:text-[10px] font-semibold tracking-widest uppercase transition-colors duration-300"
            style={{ color: hovered ? "#e8c97e" : "rgba(255,255,255,0.6)" }}
          >
            {hovered ? "Sound On" : "Muted"}
          </span>
        </motion.div>

        {/* Play/Pause badge */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            if (isPlaying) {
              sendCmd("pauseVideo");
              setIsPlaying(false);
            } else {
              sendCmd("playVideo");
              setIsPlaying(true);
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-2 left-2 md:bottom-4 md:left-4 flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-md cursor-pointer z-40"
          style={{ 
            background: "rgba(0,0,0,0.8)", 
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {isPlaying ? (
            <svg width="8" height="8" className="md:w-[10px] md:h-[10px]" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="8" height="8" className="md:w-[10px] md:h-[10px]" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </motion.button>

        {/* Duration badge - hide on mobile */}
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md backdrop-blur-md text-[8px] md:text-xs font-mono z-40 hidden md:block"
          style={{ background: "rgba(0,0,0,0.8)", color: "rgba(255,255,255,0.8)" }}>
          1:24 / 1:14:00
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10 hidden md:block" />
    </div>
  );
}

// ─── Thumbnail card ───────────────────────────────────────────────
function ThumbCard({
  video,
  isActive,
  onClick,
  index,
}: {
  video: (typeof VIDEOS)[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative shrink-0 w-40 sm:w-44 md:w-48 rounded-xl md:rounded-2xl overflow-hidden text-left group"
    >
      {/* Card glow */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute -inset-1 bg-gradient-to-r from-[#e8c97e] to-amber-500 rounded-xl md:rounded-2xl blur-xl"
      />
      
      {/* Card content */}
      <div className="relative bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-white/10">
        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <img
            src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Active indicator */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute top-1 left-1 md:top-2 md:left-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#e8c97e]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Play button on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#e8c97e] flex items-center justify-center">
              <svg width="8" height="10" className="md:w-[12px] md:h-[14px]" viewBox="0 0 12 14" fill="#000">
                <path d="M0 0l12 7L0 14V0z" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Info - responsive padding */}
        <div className="p-2 sm:p-3 md:p-4">
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <span
              className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full"
              style={{ 
                background: isActive ? "#e8c97e20" : "rgba(255,255,255,0.1)",
                color: isActive ? "#e8c97e" : "rgba(255,255,255,0.5)",
              }}
            >
              {video.tag}
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-xs text-white/40">{video.views} views</span>
          </div>
          
          <h3 className={`font-bold text-[10px] sm:text-xs md:text-sm mb-0.5 md:mb-1 line-clamp-2 transition-colors ${
            isActive ? "text-[#e8c97e]" : "text-white/80"
          }`}>
            {video.title}
          </h3>
          
          <p className="text-[8px] sm:text-[9px] md:text-xs text-white/40 truncate">{video.guest}</p>
          
          {/* Progress bar */}
          <div className="mt-2 md:mt-3 h-0.5 md:h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "100%" : "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#e8c97e] to-amber-500"
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Section ──────────────────────────────────────────────────────
export default function LatestPodcastSection() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const current = VIDEOS[active];

  return (
    <section className="relative overflow-hidden bg-black py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16">
      {/* Black Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px]" />
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        
        {/* Animated orbs - hide on mobile */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl hidden md:block"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl hidden md:block"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles - fewer on mobile */}
        {[...Array(15)].map((_, i) => (
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
            className="absolute w-0.5 h-0.5 rounded-full bg-[#e8c97e]/30 hidden sm:block"
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
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-3 md:mb-6"
          >
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8c97e] opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-[#e8c97e]" />
            </span>
            <span className="text-[10px] md:text-xs font-medium tracking-wider text-white/80 uppercase">
              Fresh Content
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                <span className="text-white">
                  Conversations That Go 
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#e8c97e] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Beyond the Surface
                </span>
              </h2>
              <p className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg mt-2 md:mt-4 max-w-2xl">
                Fresh insights from successful founders every week
              </p>
            </div>
            
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all text-xs md:text-sm"
            >
              <span className="font-medium text-white/80">Explore Conversations</span>
              <svg
                width="12" height="12" className="md:w-[16px] md:h-[16px]" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                className="text-white/40 group-hover:text-[#e8c97e] group-hover:translate-x-1 transition-all"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Featured player with enhanced info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 md:mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.videoId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <FeaturedPlayer videoId={current.videoId} />
            </motion.div>
          </AnimatePresence>

          {/* Enhanced episode info - FIXED: Responsive text sizes */}
          <div className="mt-3 sm:mt-4 md:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.videoId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/20">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <div className="h-5 sm:h-6 md:h-8 w-px bg-white/20" />
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full bg-[#e8c97e]/10 text-[#e8c97e] text-[9px] sm:text-[10px] md:text-xs font-semibold border border-[#e8c97e]/30">
                    {current.tag}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1 line-clamp-2">
                    {current.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-white/50 truncate">
                    with {current.guest}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-2 text-white/50">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-[10px] sm:text-xs md:text-sm">{current.views}</span>
              </div>
              <div className="w-px h-3 sm:h-4 bg-white/20" />
              <span className="text-[10px] sm:text-xs md:text-sm text-white/50">{current.duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative divider */}
        <div className="relative my-6 md:my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 sm:px-4 bg-black text-[10px] sm:text-xs md:text-sm text-white/40">
              More episodes
            </span>
          </div>
        </div>

        {/* Thumbnail rail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />

          {/* Scroll buttons - hide on mobile */}
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
              }
            }}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hidden sm:flex"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
              }
            }}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hidden sm:flex"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable rail */}
          <div
            ref={scrollRef}
            className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VIDEOS.map((video, i) => (
              <ThumbCard
                key={video.videoId}
                video={video}
                isActive={i === active}
                onClick={() => setActive(i)}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex -space-x-1 sm:-space-x-2">
              {VIDEOS.slice(0, 3).map((v, i) => (
                <div
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black bg-gradient-to-r from-[#e8c97e] to-amber-500 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-black"
                >
                  {v.guest[0]}
                </div>
              ))}
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-white/50">+{VIDEOS.length} episodes</span>
          </div>
          <div className="w-px h-3 sm:h-4 bg-white/20" />
          <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm text-white/50">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#e8c97e]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.9 (128 reviews)</span>
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}