"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const VIDEOS = [
  {
    videoId: "Lu8vXrFQ6Ac",
    title: "From ₹10K to ₹100Cr",
    guest: "Rahul Mehta",
    tag: "Fintech",
    views: "245K",
    duration: "1:14:00",
  },
  {
    videoId: "FcNivo1CTLc",
    title: "Burning the Boats",
    guest: "Priya Kapoor",
    tag: "HealthTech",
    views: "189K",
    duration: "58:00",
  },
  {
    videoId: "-GuO0d2Gkdc",
    title: "Edunova",
    guest: "Special Episode",
    tag: "EdTech",
    views: "312K",
    duration: "1:02:00",
  },
  {
    videoId: "D2TrM7Rx80Q",
    title: "Medical Marvel",
    guest: "Dr. Aryan Bose",
    tag: "Health",
    views: "178K",
    duration: "1:10:00",
  },
  {
    videoId: "qXDTJ977yfg",
    title: "Stars & Startups",
    guest: "Astrology Episode",
    tag: "Lifestyle",
    views: "156K",
    duration: "52:00",
  },
  {
    videoId: "MA8dw1_f-yg",
    title: "Medical Marvel II",
    guest: "Dr. Meera Kapoor",
    tag: "Health",
    views: "203K",
    duration: "1:18:00",
  },
  {
    videoId: "pZU4vnleXIU",
    title: "Medical Marvel III",
    guest: "Dr. Rajan Verma",
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

  const sendCmd = (fn: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: fn, args: "" }),
      "*"
    );
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden bg-black shadow-2xl"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => { setHovered(true); sendCmd("unMute"); }}
      onMouseLeave={() => { setHovered(false); sendCmd("mute"); }}
    >
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 rounded-3xl opacity-30 group-hover:opacity-50 blur transition-opacity duration-500" />
      
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
        {/* Top bar with shine */}
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        />

        {/* Mute badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
          style={{ 
            background: "rgba(0,0,0,0.6)", 
            border: "1px solid rgba(232,201,126,0.3)",
          }}
        >
          <motion.div
            animate={{ scale: hovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: hovered ? Infinity : 0 }}
          >
            {hovered ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </motion.div>
          <span
            className="text-[10px] font-semibold tracking-widest uppercase transition-colors duration-300"
            style={{ color: hovered ? "#e8c97e" : "rgba(255,255,255,0.6)" }}
          >
            {hovered ? "Sound On" : "Muted"}
          </span>
        </motion.div>

        {/* Play/Pause badge */}
        <motion.button
          onClick={() => {
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
          className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md cursor-pointer"
          style={{ 
            background: "rgba(0,0,0,0.6)", 
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </motion.button>

        {/* Duration badge */}
        <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md backdrop-blur-md text-xs font-mono"
          style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.8)" }}>
          1:24 / 1:14:00
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10" />
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
      className="relative shrink-0 w-48 rounded-2xl overflow-hidden text-left group"
    >
      {/* Card glow */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl blur-xl"
      />
      
      {/* Card content */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Active indicator */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Play button on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="#000">
                <path d="M0 0l12 7L0 14V0z" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] font-semibold tracking-wider px-2 py-1 rounded-full"
              style={{ 
                background: isActive ? "#e8c97e20" : "#f0f0f0",
                color: isActive ? "#e8c97e" : "#666",
              }}
            >
              {video.tag}
            </span>
            <span className="text-xs text-gray-400">{video.views} views</span>
          </div>
          
          <h3 className={`font-bold text-sm mb-1 line-clamp-1 transition-colors ${
            isActive ? "text-gray-900" : "text-gray-600"
          }`}>
            {video.title}
          </h3>
          
          <p className="text-xs text-gray-400">{video.guest}</p>
          
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "100%" : "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
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
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-50 py-28 px-4 md:px-8 lg:px-16">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-200/30 via-purple-200/30 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-pink-200/30 via-amber-200/30 to-transparent blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:32px_32px]" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-xs font-medium tracking-wider text-amber-700 uppercase">
              Fresh Content
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold">
                <span className="text-gray-900">
                  Latest
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Podcast
                </span>
              </h2>
              <p className="text-gray-600 text-lg mt-4 max-w-2xl">
                Fresh insights from successful founders every week
              </p>
            </div>
            
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-sm font-medium text-gray-700">View all episodes</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
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
          className="mb-8"
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

          {/* Enhanced episode info */}
          <div className="mt-6 flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.videoId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-gray-200">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <div className="h-8 w-px bg-gray-200" />
                  <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                    {current.tag}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{current.title}</h3>
                  <p className="text-gray-600">with {current.guest}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm">{current.views}</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <span className="text-sm text-gray-500">{current.duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gradient-to-b from-amber-50 via-white to-amber-50 text-sm text-gray-400">
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
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-amber-50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-amber-50 to-transparent" />

          {/* Scroll buttons */}
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
              }
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
              }
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable rail */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
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
          className="mt-12 flex items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {VIDEOS.slice(0, 3).map((v, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-[10px] font-bold text-white"
                >
                  {v.guest[0]}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500">+{VIDEOS.length} episodes</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
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