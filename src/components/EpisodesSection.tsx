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
  },
  {
    number: "02",
    title: "Burning the Boats",
    guest: "Priya Kapoor",
    role: "Co-Founder, HealthStack",
    duration: "58m",
    tag: "HealthTech",
    videoId: "Lu8vXrFQ6Ac",
  },
  {
    number: "03",
    title: "Edunova",
    guest: "Special Episode",
    role: "EdTech Founder",
    duration: "1h 02m",
    tag: "EdTech",
    videoId: "-GuO0d2Gkdc",
  },
  {
    number: "04",
    title: "Medical Marvel",
    guest: "Dr. Aryan Bose",
    role: "Healthcare Innovator",
    duration: "1h 10m",
    tag: "Health",
    videoId: "D2TrM7Rx80Q",
  },
  {
    number: "05",
    title: "Stars & Startups",
    guest: "Astrology Episode",
    role: "Lifestyle Creator",
    duration: "52m",
    tag: "Lifestyle",
    videoId: "qXDTJ977yfg",
  },
  {
    number: "06",
    title: "Medical Marvel II",
    guest: "Dr. Meera Kapoor",
    role: "Healthcare Innovator",
    duration: "1h 18m",
    tag: "Health",
    videoId: "MA8dw1_f-yg",
  },
  {
    number: "07",
    title: "Medical Marvel III",
    guest: "Dr. Rajan Verma",
    role: "Healthcare Innovator",
    duration: "1h 05m",
    tag: "Health",
    videoId: "pZU4vnleXIU",
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
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mute / unmute indicator */}
      <div
        className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300"
        style={{
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.12)",
          opacity: ready ? 1 : 0,
        }}
      >
        {hovered ? (
          /* Sound on icon */
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          /* Muted icon */
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
        <span className="text-[10px] font-inter font-semibold tracking-widest uppercase" style={{ color: hovered ? "#e8c97e" : "rgba(255,255,255,0.4)" }}>
          {hovered ? "Live" : "Muted"}
        </span>
      </div>
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
        {/* Fade-in overlay */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-700"
          style={{ opacity: ready ? 0 : 1 }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Gold top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-20"
        style={{ background: "linear-gradient(90deg, #e8c97e, #f0e09a, transparent)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">
        {/* Tag */}
        <span className="inline-flex mb-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-brand-accent/20 text-brand-accent border border-brand-accent/30 w-fit backdrop-blur-sm">
          {ep.tag}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={ep.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-bebas text-4xl md:text-5xl tracking-wide text-white leading-none mb-1">
              {ep.title}
            </h3>
            <p className="text-white/50 text-sm font-inter">
              {ep.guest} &middot; {ep.role}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center gap-4">
          <a
            href={`https://youtu.be/${ep.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full font-inter text-sm font-semibold text-black transition-all"
              style={{ background: "linear-gradient(135deg, #e8c97e, #f0e09a)" }}
            >
              <svg width="10" height="12" viewBox="0 0 12 14" fill="currentColor">
                <path d="M0 0l12 7L0 14V0z" />
              </svg>
              Watch Episode
            </motion.div>
          </a>
          <span className="text-white/35 text-xs tracking-widest uppercase font-inter">
            {ep.duration}
          </span>
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
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group w-full text-left relative"
    >
      {/* Row */}
      <div
        className="relative flex items-center gap-5 px-5 py-4 rounded-xl transition-all duration-300 overflow-hidden"
        style={{
          background: isActive
            ? "rgba(232,201,126,0.09)"
            : "transparent",
          border: isActive
            ? "1px solid rgba(232,201,126,0.22)"
            : "1px solid transparent",
        }}
      >
        {/* Active left bar */}
        <div
          className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full transition-all duration-300"
          style={{ background: isActive ? "#e8c97e" : "transparent" }}
        />

        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)" }}
        />

        {/* Thumbnail */}
        <div className="relative shrink-0 w-16 h-10 rounded-lg overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${ep.videoId}/mqdefault.jpg`}
            alt={ep.title}
            className="w-full h-full object-cover"
            style={{ filter: isActive ? "none" : "brightness(0.55) saturate(0.5)" }}
          />
          {/* Play icon overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0, background: "rgba(0,0,0,0.35)" }}
          >
            <svg width="8" height="9" viewBox="0 0 12 14" fill="#e8c97e">
              <path d="M0 0l12 7L0 14V0z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="font-bebas text-base tracking-widest leading-none truncate transition-colors duration-300"
            style={{ color: isActive ? "#e8c97e" : "rgba(20,20,20,0.75)" }}
          >
            {ep.title}
          </p>
          <p
            className="text-xs font-inter mt-1 truncate transition-colors duration-300"
            style={{ color: isActive ? "rgba(20,20,20,0.55)" : "rgba(20,20,20,0.35)" }}
          >
            {ep.guest}
          </p>
        </div>

        {/* Right: tag + duration */}
        <div className="shrink-0 flex flex-col items-end gap-1">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{
              background: isActive ? "rgba(232,201,126,0.18)" : "rgba(0,0,0,0.06)",
              color: isActive ? "#e8c97e" : "rgba(20,20,20,0.35)",
            }}
          >
            {ep.tag}
          </span>
          <span className="text-[11px] font-inter" style={{ color: "rgba(20,20,20,0.3)" }}>
            {ep.duration}
          </span>
        </div>
      </div>

      {/* Divider */}
      {!isActive && (
        <div className="mx-5 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
      )}
    </motion.button>
  );
}

// ─── Section ──────────────────────────────────────────────────────
export default function EpisodesSection() {
  const [active, setActive] = useState(0);
  const ep = EPISODES[active];

  return (
    <section id="episodes" className="bg-brand-cream py-28 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/50 uppercase mb-3">
            Listen
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-bebas text-7xl sm:text-8xl leading-none tracking-wide text-brand-dark">
              FEATURED<br />EPISODES
            </h2>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-inter font-semibold text-brand-dark/40 hover:text-brand-dark transition-colors duration-300 mb-2"
            >
              View all episodes
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Main: player + tracklist */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">

          {/* Left: Featured player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <FeaturedPlayer ep={ep} />

            {/* Episode counter */}
            <div className="mt-5 flex items-center gap-3">
              <span className="font-bebas text-5xl leading-none text-brand-dark/08 select-none">
                {ep.number}
              </span>
              <div className="flex-1 h-px bg-brand-dark/10" />
              <span className="text-xs font-inter text-brand-dark/30 tracking-widest uppercase">
                {String(active + 1).padStart(2, "0")} of {String(EPISODES.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* Right: Tracklist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-0.5"
          >
            {/* List header */}
            <div className="flex items-center justify-between px-5 pb-3 mb-1 border-b border-brand-dark/08">
              <p className="text-[11px] font-inter font-semibold tracking-[0.2em] uppercase text-brand-dark/30">
                All Episodes
              </p>
              <p className="text-[11px] font-inter text-brand-dark/25">
                {EPISODES.length} episodes
              </p>
            </div>

            {EPISODES.map((item, i) => (
              <EpisodeRow
                key={item.number}
                ep={item}
                isActive={i === active}
                onClick={() => setActive(i)}
                index={i}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}