"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const VIDEOS = [
  {
    videoId: "Lu8vXrFQ6Ac",
    title: "From ₹10K to ₹100Cr",
    guest: "Rahul Mehta",
    tag: "Fintech",
  },
  {
    videoId: "FcNivo1CTLc",
    title: "Burning the Boats",
    guest: "Priya Kapoor",
    tag: "HealthTech",
  },
  {
    videoId: "-GuO0d2Gkdc",
    title: "Edunova",
    guest: "Special Episode",
    tag: "EdTech",
  },
  {
    videoId: "D2TrM7Rx80Q",
    title: "Medical Marvel",
    guest: "Dr. Aryan Bose",
    tag: "Health",
  },
  {
    videoId: "qXDTJ977yfg",
    title: "Stars & Startups",
    guest: "Astrology Episode",
    tag: "Lifestyle",
  },
  {
    videoId: "MA8dw1_f-yg",
    title: "Medical Marvel II",
    guest: "Dr. Meera Kapoor",
    tag: "Health",
  },
  {
    videoId: "pZU4vnleXIU",
    title: "Medical Marvel III",
    guest: "Dr. Rajan Verma",
    tag: "Health",
  },
];

// ─── Featured iframe player with hover-unmute ─────────────────────
function FeaturedPlayer({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hovered, setHovered] = useState(false);

  const sendCmd = (fn: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: fn, args: "" }),
      "*"
    );
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-black"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => { setHovered(true); sendCmd("unMute"); }}
      onMouseLeave={() => { setHovered(false); sendCmd("mute"); }}
    >
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

      {/* Gold top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-30"
        style={{ background: "linear-gradient(90deg, #e8c97e, #f5e9b0, transparent)" }}
      />

      {/* Mute badge */}
      <motion.div
        className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-none"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
        animate={{ opacity: 1 }}
      >
        {hovered ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
        <span
          className="text-[10px] font-inter font-semibold tracking-widest uppercase transition-colors duration-300"
          style={{ color: hovered ? "#e8c97e" : "rgba(255,255,255,0.35)" }}
        >
          {hovered ? "Sound On" : "Muted"}
        </span>
      </motion.div>

      {/* Bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
}

// ─── Thumbnail card ───────────────────────────────────────────────
function ThumbCard({
  video,
  isActive,
  onClick,
}: {
  video: (typeof VIDEOS)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative shrink-0 w-44 rounded-xl overflow-hidden text-left group"
      style={{
        border: isActive ? "2px solid #e8c97e" : "2px solid transparent",
        boxShadow: isActive ? "0 0 24px rgba(232,201,126,0.2)" : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          style={{ filter: isActive ? "none" : "brightness(0.5) saturate(0.4)" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: isActive ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.3)" }}
        />
        {/* Play dot */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isActive ? 1 : 0 }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "#e8c97e" }}
          >
            <svg width="8" height="10" viewBox="0 0 12 14" fill="#141414">
              <path d="M0 0l12 7L0 14V0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div
        className="px-3 py-2.5 transition-colors duration-300"
        style={{ background: isActive ? "rgba(232,201,126,0.08)" : "rgba(20,20,20,0.04)" }}
      >
        <span
          className="text-[9px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: isActive ? "#e8c97e" : "rgba(20,20,20,0.35)" }}
        >
          {video.tag}
        </span>
        <p
          className="font-bebas text-sm tracking-wider leading-snug mt-0.5 line-clamp-1 transition-colors duration-300"
          style={{ color: isActive ? "#141414" : "rgba(20,20,20,0.5)" }}
        >
          {video.title}
        </p>
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
    <section
      id="latest-podcast"
      className="bg-brand-cream text-brand-dark py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/50 uppercase mb-3">
            Highlights
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="font-bebas text-7xl sm:text-8xl leading-none tracking-wide text-brand-dark">
              LATEST<br />PODCAST
            </h2>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-inter font-semibold text-brand-dark/35 hover:text-brand-dark transition-colors duration-300 mb-2"
            >
              All episodes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Featured player */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4"
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

          {/* Episode info below player */}
          <div className="mt-4 flex items-center justify-between px-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.videoId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <span
                  className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(232,201,126,0.15)", color: "#b89a4e" }}
                >
                  {current.tag}
                </span>
                <div>
                  <span className="font-bebas text-xl tracking-wider text-brand-dark">
                    {current.title}
                  </span>
                  <span className="text-brand-dark/40 font-inter text-sm ml-3">
                    {current.guest}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <span className="text-xs font-inter text-brand-dark/30 tracking-widest shrink-0">
              {String(active + 1).padStart(2, "0")} / {String(VIDEOS.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Thin divider */}
        <div className="h-px bg-brand-dark/08 mb-6" />

        {/* Thumbnail rail */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--color-brand-cream, #f5f0e8), transparent)" }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--color-brand-cream, #f5f0e8), transparent)" }}
          />

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VIDEOS.map((video, i) => (
              <ThumbCard
                key={video.videoId}
                video={video}
                isActive={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}