"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Users, Award, Star, Clock, CheckCircle2, FileText, Search, Calendar, Zap } from 'lucide-react';
import { BookingFlow } from './BookingFlow';

export const ApplyGuestContent = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #e8c97e, #f0e09a)" }}
            >
              <Mic className="w-8 h-8 text-black" />
            </motion.div>

            <span className="text-[#e8c97e] font-black uppercase tracking-[0.3em] text-xs mb-6 block">
              The Founder Show · Apply as Guest
            </span>

            <h1 className="font-bebas text-6xl md:text-9xl mb-8 text-white tracking-wide leading-none">
              SHARE YOUR <span style={{ color: "#e8c97e" }}>STORY.</span>
            </h1>

            <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              We're looking for founders with raw, unfiltered stories. Apply for a 45-min pre-interview call to see if your journey is a fit for the show.
            </p>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-24"
        >
          {[
            { icon: <Users className="w-4 h-4" />, label: '150+ Founders Featured' },
            { icon: <Award className="w-4 h-4" />, label: 'Top Founder Podcast' },
            { icon: <Star className="w-4 h-4" />, label: '4.9 Rating · Global Reach' },
            { icon: <Clock className="w-4 h-4" />, label: 'Quick Response' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              <span style={{ color: "#e8c97e" }}>{item.icon}</span>
              {item.label}
            </motion.div>
          ))}
        </motion.div>

        {/* What We Do Section */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide">
                WHAT WE <span style={{ color: "#e8c97e" }}>DO</span>
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                The Founder Show is more than just a podcast. It's a platform for founders to share the raw reality of building companies. We strip away the corporate jargon and get to the heart of the journey.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 1 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {[
                "Founder stories from real entrepreneurs",
                "Deep conversations about building companies",
                "Lessons from success and failure",
                "Insights for founders and builders"
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#e8c97e]/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c97e]" />
                  </div>
                  <p className="text-white/80 font-bold text-sm leading-snug">{point}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide">
              HOW IT <span style={{ color: "#e8c97e" }}>WORKS</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Apply", desc: "Submit your founder story via the form below.", icon: <FileText className="w-6 h-6" /> },
              { title: "Review", desc: "Our team reviews your application for story depth.", icon: <Search className="w-6 h-6" /> },
              { title: "Record", desc: "Schedule and record the podcast in our studio.", icon: <Mic className="w-6 h-6" /> },
              { title: "Publish", desc: "Your story goes live to thousands of listeners.", icon: <Zap className="w-6 h-6" /> }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#e8c97e]/30 transition-colors group"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center font-bebas text-[#e8c97e] text-xl">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#e8c97e]/10 flex items-center justify-center mb-6 text-[#e8c97e] group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-[#e8c97e] font-bebas text-2xl mb-3 tracking-wide">{step.title}</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Booking Flow */}
        <div className="mb-32 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 text-center w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8c97e]/10 border border-[#e8c97e]/20 text-[#e8c97e] text-xs font-black uppercase tracking-widest"
            >
              <Calendar className="w-3 h-3" />
              Pre-interview Scheduling
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <BookingFlow />
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="mb-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide">
              FREQUENTLY ASKED <span style={{ color: "#e8c97e" }}>QUESTIONS</span>
            </h2>
          </motion.div>
          <div className="max-w-4xl mx-auto grid gap-4">
            {[
              { q: "Who can apply as a guest?", a: "Any founder or entrepreneur with a meaningful story. We look for honesty, unique insights, and raw experiences rather than just numbers." },
              { q: "Is there a fee to appear?", a: "No. The Founder Show is built on authentic founder journeys. We Don&apos;t charge for guest appearances." },
              { q: "How long are episodes?", a: "Episodes usually run between 45 and 60 minutes, followed by a casual post-show chat." },
              { q: "Where are episodes published?", a: "All episodes go live on YouTube, Spotify, Apple Podcasts, and our website. We also create short-form clips for social media." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all"
              >
                <h3 className="text-[#e8c97e] font-bebas text-2xl mb-4 tracking-wide flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e8c97e]" />
                  {faq.q}
                </h3>
                <p className="text-white/60 text-base font-medium leading-relaxed pl-4.5 border-l border-white/10">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};