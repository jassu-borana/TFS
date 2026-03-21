"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, Users, Award, Star, Clock, CheckCircle2,
  FileText, Search, Zap, ArrowRight, ArrowLeft, Calendar,
  Building2, Globe, Instagram, Linkedin,
  Mail, Phone, User, Sparkles, Play, Headphones,
  ChevronDown
} from 'lucide-react';

type FormData = {
  // Personal
  firstName: string; 
  lastName: string; 
  email: string; 
  phone: string;
  instagram: string; 
  linkedin: string;
  
  // What they do
  whatYouDo: string;
  
  // Timing
  availability: string; 
  timezone: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const STEPS = ["Personal", "What You Do", "Timing"];

const TIMEZONES = [
  "IST (India)",
  "GST (UAE)",
  "EST (USA - East Coast)",
  "PST (USA - West Coast)",
  "GMT (UK/Europe)",
  "SGT (Singapore)",
  "AEST (Australia)",
  "Other"
];

const WHATSAPP_NUMBER = "918233882481";

// ── Input Styles ─────────────────────────────────────────────
const labelCls = "block text-base font-medium text-white/80 mb-2";
const inputCls = (err?: string) =>
  `w-full px-5 py-4 rounded-2xl text-white placeholder-white/40 outline-none transition-all duration-200 text-lg
   bg-white/[0.06] border-2 focus:bg-white/[0.1] 
   ${err
     ? "border-red-500/50 focus:border-red-500/50"
     : "border-white/20 focus:border-[#e8c97e] hover:border-white/40"
   }`;

const selectCls = (err?: string) =>
  `w-full px-5 py-4 rounded-2xl text-white outline-none appearance-none cursor-pointer transition-all duration-200 text-lg
   bg-white/[0.06] border-2 focus:bg-white/[0.1]
   ${err
     ? "border-red-500/50 focus:border-red-500/50"
     : "border-white/20 focus:border-[#e8c97e] hover:border-white/40"
   }`;

function Field({
  label, required, error, children, icon
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode; icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className={labelCls}>
        {icon && <span className="inline-block mr-2 text-[#e8c97e]">{icon}</span>}
        {label}{required && <span className="text-[#e8c97e] ml-1 text-xl">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export const ApplyGuestContent = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "",
    instagram: "", 
    linkedin: "",
    whatYouDo: "",
    availability: "", 
    timezone: "",
  });

  const set = (k: keyof FormData, v: string) =>
    setForm(p => ({ ...p, [k]: v }));

  const validate = (s: number): boolean => {
    const e: Errors = {};
    
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = "What's your name?";
      if (!form.email.trim()) e.email = "Email is needed";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email please";
      if (!form.phone.trim()) e.phone = "Phone number helps";
      else if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone please";
    }
    
    if (s === 2) {
      if (!form.whatYouDo.trim()) e.whatYouDo = "Tell us what you do";
    }
    
    if (s === 3) {
      if (!form.availability.trim()) e.availability = "When are you free?";
      if (!form.timezone) e.timezone = "Select your timezone";
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep(s => s + 1);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prev = () => {
    setStep(s => s - 1);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = () => {
    if (!validate(3)) return;
    setIsSubmitting(true);

    const message = `🎙️ *NEW PODCAST GUEST — The Founder Show*

👤 *CONTACT*
──────────────────
• Name: ${form.firstName} ${form.lastName}
• Email: ${form.email}
• Phone: ${form.phone}
• Instagram: ${form.instagram || "Not provided"}
• LinkedIn: ${form.linkedin || "Not provided"}

💼 *WHAT THEY DO*
──────────────────
${form.whatYouDo}

📅 *TIMING*
──────────────────
• Available: ${form.availability}
• Timezone: ${form.timezone}

⏰ *Submitted:* ${new Date().toLocaleString('en-IN')}`.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
   if (typeof window !== "undefined") {
  window.open(url, "_blank");
}

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-black">
        {/* Black Grid Background - Exactly like other sections */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid pattern - white lines with low opacity */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:48px_48px]" />
          
          {/* Radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
          
          {/* Animated orbs */}
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="w-28 h-28 mx-auto rounded-full bg-[#e8c97e]/10 flex items-center justify-center border-2 border-[#e8c97e]/30">
              <CheckCircle2 className="w-14 h-14 text-[#e8c97e]" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[#e8c97e]/20 blur-xl"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            You're on the list! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-xl mb-2"
          >
            Hey <span className="text-[#e8c97e] font-semibold">{form.firstName}</span>, thanks!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-lg mb-10"
          >
            We'll reach out at <span className="text-white/60">{form.email}</span> within 48 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/"
              className="px-8 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 transition-all text-lg font-medium"
            >
              Back to Home
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#e8c97e] text-black font-semibold hover:bg-[#f0d89a] transition-all text-lg"
            >
              Watch Episodes
            </a>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Black Grid Background - Exactly like other sections */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern - white lines with low opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Animated orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#e8c97e]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles - kam kar diye taaki clean lage */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-0.5 h-0.5 rounded-full bg-[#e8c97e]/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 z-10">

        {/* Header Section - Improved */}
        <div className="text-center mb-16 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e8c97e]/5 rounded-full blur-3xl" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center relative group"
              style={{ background: "linear-gradient(135deg, #e8c97e, #f0e09a)" }}
            >
              <Mic className="w-10 h-10 text-black" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl bg-[#e8c97e]/30 blur-xl -z-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#e8c97e] animate-pulse" />
              <span className="text-[#e8c97e] font-medium uppercase tracking-[0.2em] text-xs">
                The Founder Show
              </span>
            </motion.div>

            <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl mb-6 text-white tracking-wide leading-none">
              SHARE YOUR{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] bg-clip-text text-transparent">
                  STORY.
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#e8c97e]/30 to-transparent blur" />
              </span>
            </h1>

            <p className="text-white/50 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              We're looking for founders with raw, unfiltered stories. Apply for a{' '}
              <span className="text-white font-medium">45-min pre-interview call</span>{' '}
              to see if your journey is a fit for the show.
            </p>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 border border-[#e8c97e]/20 rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border border-[#e8c97e]/10 rounded-full -z-10" />
          </motion.div>
        </div>

        

        {/* Form Section */}
        <div ref={formRef} className="max-w-3xl mx-auto mb-32">
          {/* Form Card */}
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden">
            <div
              className="h-2"
              style={{
                width: `${(step / 3) * 100}%`,
                background: "linear-gradient(90deg, #e8c97e, #f0d89a)",
                transition: "width 0.3s ease"
              }}
            />

            <div className="p-8 md:p-10">
              {/* Step Indicator */}
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                        num === step
                          ? "bg-[#e8c97e] text-black border-2 border-white"
                          : num < step
                          ? "bg-[#e8c97e]/20 text-[#e8c97e] border-2 border-[#e8c97e]/30"
                          : "bg-white/10 text-white/50 border-2 border-white/20"
                      }`}
                    >
                      {num < step ? <CheckCircle2 className="w-5 h-5" /> : num}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  {/* STEP 1 — Personal */}
                  {step === 1 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="First Name" required error={errors.firstName} icon={<User className="w-5 h-5" />}>
                          <input
                            className={inputCls(errors.firstName)}
                            placeholder="Rahul"
                            value={form.firstName}
                            onChange={e => set("firstName", e.target.value)}
                          />
                        </Field>
                        <Field label="Last Name" required error={errors.lastName} icon={<User className="w-5 h-5" />}>
                          <input
                            className={inputCls(errors.lastName)}
                            placeholder="Mehta"
                            value={form.lastName}
                            onChange={e => set("lastName", e.target.value)}
                          />
                        </Field>
                      </div>

                      <Field label="Email" required error={errors.email} icon={<Mail className="w-5 h-5" />}>
                        <input
                          type="email"
                          className={inputCls(errors.email)}
                          placeholder="rahul@startup.com"
                          value={form.email}
                          onChange={e => set("email", e.target.value)}
                        />
                      </Field>

                      <Field label="Phone (WhatsApp)" required error={errors.phone} icon={<Phone className="w-5 h-5" />}>
                        <input
                          type="tel"
                          className={inputCls(errors.phone)}
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={e => set("phone", e.target.value)}
                        />
                      </Field>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Instagram (optional)" icon={<Instagram className="w-5 h-5" />}>
                          <input
                            className={inputCls()}
                            placeholder="@rahulmehta"
                            value={form.instagram}
                            onChange={e => set("instagram", e.target.value)}
                          />
                        </Field>
                        <Field label="LinkedIn (optional)" icon={<Linkedin className="w-5 h-5" />}>
                          <input
                            className={inputCls()}
                            placeholder="linkedin.com/in/rahulmehta"
                            value={form.linkedin}
                            onChange={e => set("linkedin", e.target.value)}
                          />
                        </Field>
                      </div>
                    </>
                  )}

                  {/* STEP 2 — What They Do */}
                  {step === 2 && (
                    <>
                      <Field label="What do you do?" required error={errors.whatYouDo}>
                        <textarea
                          rows={6}
                          className={`${inputCls(errors.whatYouDo)} resize-none`}
                          placeholder="Tell us about yourself and what you do in a few lines..."
                          value={form.whatYouDo}
                          onChange={e => set("whatYouDo", e.target.value)}
                        />
                      </Field>

                      <div className="p-6 rounded-2xl bg-[#e8c97e]/10 border-2 border-[#e8c97e]/20">
                        <div className="flex gap-4">
                          <Sparkles className="w-6 h-6 text-[#e8c97e] shrink-0" />
                          <p className="text-white/70 text-lg">
                            Keep it simple — tell us your story in your own words
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* STEP 3 — Timing */}
                  {step === 3 && (
                    <>
                      <Field label="When are you free to record?" required error={errors.availability}>
                        <input
                          className={inputCls(errors.availability)}
                          placeholder="e.g., Evenings after 7pm, Weekends, Any time"
                          value={form.availability}
                          onChange={e => set("availability", e.target.value)}
                        />
                      </Field>

                      <Field label="Your Timezone" required error={errors.timezone}>
                        <div className="relative">
                          <select
                            className={selectCls(errors.timezone)}
                            value={form.timezone}
                            onChange={e => set("timezone", e.target.value)}
                          >
                            <option value="" className="bg-gray-900 text-white text-lg">Select your timezone</option>
                            {TIMEZONES.map(tz => (
                              <option key={tz} value={tz} className="bg-gray-900 text-white py-3 text-lg">{tz}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                        </div>
                      </Field>
                    </>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-4 pt-6">
                    {step > 1 && (
                      <button
                        onClick={prev}
                        className="px-8 py-4 rounded-2xl border-2 border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all text-lg font-medium"
                      >
                        <ArrowLeft className="w-6 h-6" />
                      </button>
                    )}

                    <button
                      onClick={step < 3 ? next : handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] text-black font-semibold text-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-3 border-black/30 border-t-black animate-spin rounded-full" />
                          Sending...
                        </>
                      ) : step < 3 ? (
                        <>
                          Continue
                          <ArrowRight className="w-6 h-6" />
                        </>
                      ) : (
                        <>
                          Submit
                          <CheckCircle2 className="w-6 h-6" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-center text-white/40 text-lg mt-6">
            Just 3 steps — takes 2 minutes
          </p>
        </div>

        {/* FAQ Section - Improved */}
        <section className="mb-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide mb-4">
              FREQUENTLY ASKED{' '}
              <span className="relative">
                <span className="relative z-10 text-[#e8c97e]">QUESTIONS</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#e8c97e]/30 rounded-full" />
              </span>
            </h2>
            <p className="text-white/40 text-lg">Everything you need to know about being a guest</p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid gap-4">
            {[
              { 
                q: "Who can apply as a guest?", 
                a: "Any founder or entrepreneur with a meaningful story. We look for honesty, unique insights, and raw experiences rather than just numbers.",
                icon: "🎯"
              },
              { 
                q: "Is there a fee to appear?", 
                a: "No. The Founder Show is built on authentic founder journeys. We don't charge for guest appearances — ever.",
                icon: "💰"
              },
              { 
                q: "How long are episodes?", 
                a: "Episodes usually run between 45 and 60 minutes, followed by a casual post-show chat. Deep conversations, not rushed interviews.",
                icon: "⏱️"
              },
              { 
                q: "Where are episodes published?", 
                a: "All episodes go live on YouTube, Spotify, Apple Podcasts, and our website. We also create short-form clips for social media to maximize reach.",
                icon: "📱"
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e8c97e]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#e8c97e]/30 transition-all backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#e8c97e]/10 flex items-center justify-center text-2xl shrink-0 border border-[#e8c97e]/20">
                      {faq.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-[#e8c97e] font-bold text-xl mb-3 flex items-center gap-2">
                        <span>{faq.q}</span>
                        <motion.div
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-[#e8c97e]"
                        />
                      </h3>
                      <p className="text-white/50 text-base leading-relaxed pl-0">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-white/40 text-sm">Still have questions?</span>
              <a 
                href="mailto:hello@thefoundershow.com"
                className="text-[#e8c97e] font-medium hover:underline"
              >
                hello@thefoundershow.com
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};