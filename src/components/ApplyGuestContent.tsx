"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, CheckCircle2, ArrowRight, ArrowLeft,
  Instagram, Linkedin, Mail, Phone, User, Sparkles, ChevronDown
} from 'lucide-react';

type FormData = {
  firstName: string; lastName: string; email: string; phone: string;
  instagram: string; linkedin: string; whatYouDo: string;
  availability: string; timezone: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const TIMEZONES = [
  "IST (India)", "GST (UAE)", "EST (USA - East Coast)",
  "PST (USA - West Coast)", "GMT (UK/Europe)", "SGT (Singapore)",
  "AEST (Australia)", "Other"
];

const WHATSAPP_NUMBER = "918233882481";

const labelCls = "block text-sm font-medium text-white/70 mb-1.5";
const inputCls = (err?: string) =>
  `w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none transition-all duration-200 text-base
   bg-white/[0.06] border focus:bg-white/[0.09]
   ${err
     ? "border-red-500/50 focus:border-red-500/50"
     : "border-white/15 focus:border-[#e8c97e]/70 hover:border-white/30"
   }`;

const selectCls = (err?: string) =>
  `w-full px-4 py-3 rounded-xl text-white outline-none appearance-none cursor-pointer transition-all duration-200 text-base
   bg-white/[0.06] border focus:bg-white/[0.09]
   ${err
     ? "border-red-500/50"
     : "border-white/15 focus:border-[#e8c97e]/70 hover:border-white/30"
   }`;

function Field({ label, required, error, children, icon }: {
  label: string; required?: boolean; error?: string;
  children: React.ReactNode; icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className={labelCls}>
        {icon && <span className="inline-block mr-1.5 text-[#e8c97e] align-middle">{icon}</span>}
        {label}{required && <span className="text-[#e8c97e] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs mt-1 ml-1">{error}</motion.p>
      )}
    </div>
  );
}

/* ── Shared BG ── */
function SharedBg() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8c97e]/5 rounded-full blur-[80px]" />
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
    firstName: "", lastName: "", email: "", phone: "",
    instagram: "", linkedin: "", whatYouDo: "",
    availability: "", timezone: "",
  });

  const set = (k: keyof FormData, v: string) => setForm(p => ({ ...p, [k]: v }));

  const validate = (s: number): boolean => {
    const e: Errors = {};
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = "What's your name?";
      if (!form.email.trim()) e.email = "Email is needed";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email please";
      if (!form.phone.trim()) e.phone = "Phone number helps";
      else if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone please";
    }
    if (s === 2) { if (!form.whatYouDo.trim()) e.whatYouDo = "Tell us what you do"; }
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
    const message = `🎙️ *NEW PODCAST GUEST — The Founder Show*\n\n👤 *CONTACT*\n──────────────────\n• Name: ${form.firstName} ${form.lastName}\n• Email: ${form.email}\n• Phone: ${form.phone}\n• Instagram: ${form.instagram || "Not provided"}\n• LinkedIn: ${form.linkedin || "Not provided"}\n\n💼 *WHAT THEY DO*\n──────────────────\n${form.whatYouDo}\n\n📅 *TIMING*\n──────────────────\n• Available: ${form.availability}\n• Timezone: ${form.timezone}\n\n⏰ *Submitted:* ${new Date().toLocaleString('en-IN')}`.trim();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1500);
  };

  // ── Success ──
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-black">
        <SharedBg />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-full bg-[#e8c97e]/10 flex items-center justify-center border-2 border-[#e8c97e]/30 mb-8">
            <CheckCircle2 className="w-12 h-12 text-[#e8c97e]" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-4">You're on the list! 🎉</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-white/60 text-lg mb-2">
            Hey <span className="text-[#e8c97e] font-semibold">{form.firstName}</span>, thanks!
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-white/40 mb-10">
            We'll reach out at <span className="text-white/60">{form.email}</span> within 48 hours.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all font-medium">
              Back to Home
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#e8c97e] text-black font-semibold hover:bg-[#f0d89a] transition-all">
              Watch Episodes
            </a>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="fixed inset-0 pointer-events-none z-0">
        <SharedBg />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 z-10">

        {/* Header */}
        <div className="text-center mb-12 pt-8 sm:pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #e8c97e, #f0e09a)" }}>
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8c97e] animate-pulse" />
              <span className="text-[#e8c97e] font-medium uppercase tracking-[0.2em] text-xs">The Founder Show</span>
            </motion.div>

            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-9xl mb-4 text-white tracking-wide leading-none">
              SHARE YOUR{' '}
              <span className="bg-gradient-to-r from-[#e8c97e] to-[#f0d89a] bg-clip-text text-transparent">STORY.</span>
            </h1>

            <p className="text-white/50 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
              Apply for a{' '}
              <span className="text-white font-medium">45-min pre-interview call</span>{' '}
              to see if your journey is a fit for the show.
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <div ref={formRef} className="max-w-2xl mx-auto mb-24">
          <div className="rounded-2xl sm:rounded-3xl bg-white/[0.07] backdrop-blur-sm border border-white/15 overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-white/10">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${(step / 3) * 100}%`,
                  background: "linear-gradient(90deg, #e8c97e, #f0d89a)",
                }}
              />
            </div>

            <div className="p-5 sm:p-8">
              {/* Step dots */}
              <div className="flex justify-center gap-3 mb-7">
                {[1, 2, 3].map(num => (
                  <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                    ${num === step ? "bg-[#e8c97e] text-black" : num < step ? "bg-[#e8c97e]/20 text-[#e8c97e]" : "bg-white/10 text-white/40"}`}>
                    {num < step ? <CheckCircle2 className="w-4 h-4" /> : num}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={step}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }} className="space-y-4">

                  {/* STEP 1 */}
                  {step === 1 && (
                    <>
                      {/* 2-col on all screens */}
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="First Name" required error={errors.firstName} icon={<User className="w-4 h-4" />}>
                          <input className={inputCls(errors.firstName)} placeholder="Rahul"
                            value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                        </Field>
                        <Field label="Last Name" icon={<User className="w-4 h-4" />}>
                          <input className={inputCls()} placeholder="Mehta"
                            value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                        </Field>
                      </div>

                      <Field label="Email" required error={errors.email} icon={<Mail className="w-4 h-4" />}>
                        <input type="email" className={inputCls(errors.email)} placeholder="rahul@startup.com"
                          value={form.email} onChange={e => set("email", e.target.value)} />
                      </Field>

                      <Field label="Phone (WhatsApp)" required error={errors.phone} icon={<Phone className="w-4 h-4" />}>
                        <input type="tel" className={inputCls(errors.phone)} placeholder="+91 98765 43210"
                          value={form.phone} onChange={e => set("phone", e.target.value)} />
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Instagram" icon={<Instagram className="w-4 h-4" />}>
                          <input className={inputCls()} placeholder="@rahulmehta"
                            value={form.instagram} onChange={e => set("instagram", e.target.value)} />
                        </Field>
                        <Field label="LinkedIn" icon={<Linkedin className="w-4 h-4" />}>
                          <input className={inputCls()} placeholder="linkedin.com/in/..."
                            value={form.linkedin} onChange={e => set("linkedin", e.target.value)} />
                        </Field>
                      </div>
                    </>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <>
                      <Field label="What do you do?" required error={errors.whatYouDo}>
                        <textarea rows={5} className={`${inputCls(errors.whatYouDo)} resize-none`}
                          placeholder="Tell us about yourself and what you do in a few lines..."
                          value={form.whatYouDo} onChange={e => set("whatYouDo", e.target.value)} />
                      </Field>
                      <div className="p-4 rounded-xl bg-[#e8c97e]/8 border border-[#e8c97e]/15 flex gap-3">
                        <Sparkles className="w-5 h-5 text-[#e8c97e] shrink-0 mt-0.5" />
                        <p className="text-white/60 text-sm leading-relaxed">
                          Keep it simple — tell us your story in your own words
                        </p>
                      </div>
                    </>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <>
                      <Field label="When are you free to record?" required error={errors.availability}>
                        <input className={inputCls(errors.availability)}
                          placeholder="e.g., Evenings after 7pm, Weekends"
                          value={form.availability} onChange={e => set("availability", e.target.value)} />
                      </Field>
                      <Field label="Your Timezone" required error={errors.timezone}>
                        <div className="relative">
                          <select className={selectCls(errors.timezone)}
                            value={form.timezone} onChange={e => set("timezone", e.target.value)}>
                            <option value="" className="bg-gray-900">Select your timezone</option>
                            {TIMEZONES.map(tz => (
                              <option key={tz} value={tz} className="bg-gray-900">{tz}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                      </Field>
                    </>
                  )}

                  {/* Nav buttons */}
                  <div className="flex gap-3 pt-3">
                    {step > 1 && (
                      <button onClick={prev}
                        className="px-5 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    )}
                    <button onClick={step < 3 ? next : handleSubmit} disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-black transition-all disabled:opacity-50 hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #e8c97e 0%, #f0d89a 100%)" }}>
                      {isSubmitting ? (
                        <><div className="w-5 h-5 border-2 border-black/30 border-t-black animate-spin rounded-full" />Sending...</>
                      ) : step < 3 ? (
                        <>Continue <ArrowRight className="w-5 h-5" /></>
                      ) : (
                        <>Submit <CheckCircle2 className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-center text-white/30 text-sm mt-4">Just 3 steps · takes 2 minutes</p>
        </div>

        {/* FAQ */}
        <section className="mb-24 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wide mb-2">
              FREQUENTLY ASKED{' '}
              <span className="text-[#e8c97e]">QUESTIONS</span>
            </h2>
            <p className="text-white/40 text-sm">Everything you need to know about being a guest</p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-3">
            {[
              { q: "Who can apply as a guest?", a: "Any founder or entrepreneur with a meaningful story. We look for honesty, unique insights, and raw experiences rather than just numbers.", icon: "🎯" },
              { q: "Is there a fee to appear?", a: "No. The Founder Show is built on authentic founder journeys. We don't charge for guest appearances — ever.", icon: "💰" },
              { q: "How long are episodes?", a: "Episodes usually run between 45 and 60 minutes, followed by a casual post-show chat.", icon: "⏱️" },
              { q: "Where are episodes published?", a: "All episodes go live on YouTube, Spotify, Apple Podcasts, and our website. We also create short-form clips for social media.", icon: "📱" },
            ].map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#e8c97e]/25 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e8c97e]/10 flex items-center justify-center text-xl shrink-0">
                    {faq.icon}
                  </div>
                  <div>
                    <h3 className="text-[#e8c97e] font-semibold text-base mb-1.5">{faq.q}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.4 }} className="text-center mt-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/40 text-sm">Still have questions?</span>
              <a href="mailto:hello@thefoundershow.com"
                className="text-[#e8c97e] text-sm font-medium hover:underline">
                hello@thefoundershow.com
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};
