"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ArrowLeft, Clock, Video,
  Calendar, Globe, CheckCircle2, Mic, ChevronDown
} from 'lucide-react';

const WHATSAPP_NUMBER = '+917339953697';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const TIME_SLOTS = [
  '9:00 AM','10:00 AM','11:00 AM','12:00 PM',
  '1:00 PM','2:00 PM','3:00 PM','4:00 PM',
  '5:00 PM','6:00 PM','7:00 PM',
];
const PURPOSES = [
  'Promote my business',
  'Share my entrepreneurial journey',
  'Build my personal brand',
  'Discuss a startup idea',
  'Talk about industry insights',
  'Other',
];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
function slotMins(slot: string) {
  const [t, mer] = slot.split(' '); let [h, m] = t.split(':').map(Number);
  if (mer === 'PM' && h !== 12) h += 12; if (mer === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}
function isAvailable(y: number, mo: number, d: number) {
  const date = new Date(y, mo, d); const today = new Date(); today.setHours(0,0,0,0);
  return date >= today && date.getDay() !== 0;
}
function isSlotOk(y: number, mo: number, d: number, slot: string) {
  const sel = new Date(y, mo, d); const today = new Date(); today.setHours(0,0,0,0);
  if (sel > today) return true;
  return slotMins(slot) > new Date().getHours() * 60 + new Date().getMinutes() + 30;
}

type Step = 'calendar' | 'time' | 'details' | 'success';

interface State {
  year: number; month: number; day: number | null; time: string | null;
  name: string; email: string; phone: string; companyEmail: string;
  companyName: string; purpose: string;
}
interface Errors { name?: string; email?: string; phone?: string; companyEmail?: string; companyName?: string; purpose?: string; }

export const BookingFlow = () => {
  const now = new Date();
  const [step, setStep] = useState<Step>('calendar');
  const [pendingTime, setPendingTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [purposeOpen, setPurposeOpen] = useState(false);

  const [s, setS] = useState<State>({
    year: now.getFullYear(), month: now.getMonth(), day: null, time: null,
    name: '', email: '', phone: '', companyEmail: '', companyName: '', purpose: '',
  });

  const up = (k: keyof State, v: any) => setS(p => ({ ...p, [k]: v }));

  const dateStr = s.day
    ? new Date(s.year, s.month, s.day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const validate = (field: keyof Errors, val: string) => {
    if (field === 'name') return !val.trim() ? 'Name is required' : '';
    if (field === 'email') return !val.trim() ? 'Email required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Invalid email' : '';
    if (field === 'phone') { const d = val.replace(/\D/g,''); return !d ? 'Required' : d.length !== 10 ? '10 digits required' : !/^[6-9]/.test(d) ? 'Must start 6–9' : ''; }
    if (field === 'companyEmail') return !val.trim() ? 'Company email required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Invalid email' : '';
    if (field === 'companyName') return !val.trim() ? 'Company name required' : '';
    if (field === 'purpose') return !val ? 'Please select a purpose' : '';
    return '';
  };

  const validateAll = () => {
    const fields: (keyof Errors)[] = ['name','email','phone','companyEmail','companyName','purpose'];
    const newE: Errors = {}; const newT: Record<string,boolean> = {}; let ok = true;
    fields.forEach(f => { newT[f] = true; const e = validate(f, s[f as keyof State] as string); if (e) { newE[f] = e; ok = false; } });
    setErrors(newE); setTouched(newT); return ok;
  };

  const onBlur = (f: keyof Errors) => {
    setTouched(p => ({ ...p, [f]: true }));
    setErrors(p => ({ ...p, [f]: validate(f, s[f as keyof State] as string) }));
  };
  const onChange = (f: keyof Errors, v: string) => {
    up(f as keyof State, v);
    if (touched[f]) setErrors(p => ({ ...p, [f]: validate(f, v) }));
  };

  const handleSubmit = () => {
    if (!validateAll()) return;
    const msg = [
      `🎙️ *New Guest Application — The Founder Show*`, ``,
      `👤 *Name:* ${s.name}`,
      `📧 *Email:* ${s.email}`,
      `📱 *WhatsApp:* +91 ${s.phone}`,
      `🏢 *Company:* ${s.companyName}`,
      `📨 *Company Email:* ${s.companyEmail}`,
      `🎯 *Purpose:* ${s.purpose}`,
      `📅 *Date:* ${dateStr}`,
      `🕐 *Time:* ${s.time} IST`,
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setStep('success');
  };

  const daysInMonth = getDaysInMonth(s.year, s.month);
  const firstDay = getFirstDay(s.year, s.month);
  const isPrevDisabled = () => { const n = new Date(); return s.year === n.getFullYear() && s.month === n.getMonth(); };
  const prevMonth = () => {
    if (isPrevDisabled()) return;
    if (s.month === 0) { up('month', 11); up('year', s.year - 1); } else up('month', s.month - 1);
    up('day', null);
  };
  const nextMonth = () => {
    if (s.month === 11) { up('month', 0); up('year', s.year + 1); } else up('month', s.month + 1);
    up('day', null);
  };

  // ── Input style ───────────────────────────────────────────
  const inp = (f: keyof Errors) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm font-semibold text-slate-800 outline-none transition-all placeholder:text-slate-300 bg-white
    ${touched[f] && errors[f] ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`;

  // ── Left info panel ───────────────────────────────────────
  const LeftPanel = () => (
    <div className="flex flex-col h-full p-8">
      {step !== 'calendar' && (
        <button onClick={() => setStep(step === 'details' ? 'time' : 'calendar')}
          className="flex items-center gap-1.5 text-blue-500 hover:text-blue-700 text-sm font-bold mb-6 transition-colors group w-fit">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e8c97e] to-[#d4a843] flex items-center justify-center shadow-md">
          <Mic className="w-5 h-5 text-black" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Founder</p>
          <p className="font-bebas text-lg tracking-[0.12em] text-slate-800 leading-none">SHOW</p>
        </div>
      </div>

      {/* Meeting info */}
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Schedule a Meeting for</p>
        <h2 className="text-xl font-black text-slate-900 leading-tight">Podcast Discussion</h2>
      </div>

      <div className="space-y-3 mb-6">
        {[
          { icon: <Clock className="w-4 h-4" />, text: '30 min' },
          { icon: <Video className="w-4 h-4" />, text: 'Web conferencing details provided upon confirmation.' },
          ...(s.day && s.time ? [{ icon: <Calendar className="w-4 h-4" />, text: `${s.time} · ${dateStr}`, gold: true }] : []),
          { icon: <Globe className="w-4 h-4" />, text: 'India Standard Time' },
        ].map((item: any, i) => (
          <div key={i} className={`flex items-start gap-3 text-sm font-medium ${item.gold ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
            <span className={`shrink-0 mt-0.5 ${item.gold ? 'text-blue-500' : 'text-slate-400'}`}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Contact</p>
        <p className="text-sm font-semibold text-slate-600">
          📞 Call or WhatsApp:<br />
          <span className="text-blue-600 font-bold">+91 73399 53697</span>
        </p>
      </div>
    </div>
  );

  // ── Calendar ──────────────────────────────────────────────
  const CalGrid = ({ compact = false }: { compact?: boolean }) => (
    <div>
      <div className={`flex items-center justify-between ${compact ? 'mb-3' : 'mb-5'}`}>
        <button onClick={prevMonth} disabled={isPrevDisabled()}
          className={`${compact ? 'w-8 h-8' : 'w-9 h-9'} rounded-full flex items-center justify-center transition-colors
            ${isPrevDisabled() ? 'text-slate-200 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-500 cursor-pointer'}`}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className={`font-black text-slate-800 ${compact ? 'text-sm' : 'text-base'}`}>{MONTHS[s.month]} {s.year}</span>
        <button onClick={nextMonth} className={`${compact ? 'w-8 h-8' : 'w-9 h-9'} rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500`}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] font-black uppercase tracking-wider text-slate-400 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: firstDay }).map((_,i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_,i) => i+1).map(day => {
          const avail = isAvailable(s.year, s.month, day);
          const sel = s.day === day;
          const isSun = new Date(s.year, s.month, day).getDay() === 0;
          const today = new Date(); today.setHours(0,0,0,0);
          const thisDay = new Date(s.year, s.month, day);
          const isToday = thisDay.getTime() === today.getTime();
          const hasSlot = isToday ? TIME_SLOTS.some(sl => isSlotOk(s.year, s.month, day, sl)) : true;
          const ok = avail && hasSlot;
          return (
            <motion.button key={day} type="button" disabled={!ok}
              onClick={() => { up('day', day); up('time', null); setPendingTime(null); if (!compact) setTimeout(() => setStep('time'), 150); }}
              whileHover={ok ? { scale: 1.1 } : {}} whileTap={ok ? { scale: 0.93 } : {}}
              className={`mx-auto ${compact ? 'w-7 h-7 text-xs' : 'w-10 h-10 text-sm'} rounded-full flex items-center justify-center font-bold transition-all
                ${sel ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : ok ? 'text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                  : 'text-slate-300 cursor-not-allowed'}`}>
              {day}
            </motion.button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600" /><span className="text-[10px] text-slate-400 font-semibold">Available</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200" /><span className="text-[10px] text-slate-400 font-semibold">Unavailable</span></div>
      </div>
    </div>
  );

  // ── Shared card wrapper ───────────────────────────────────
  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="grid md:grid-cols-[300px_1fr] min-h-[580px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60 bg-white">
      {children}
    </div>
  );

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">

        {/* CALENDAR */}
        {step === 'calendar' && (
          <motion.div key="cal" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <Card>
              <div className="border-r border-slate-100 bg-white"><LeftPanel /></div>
              <div className="p-8 bg-white">
                <div className="mb-7">
                  <h3 className="text-xl font-black text-slate-900 mb-1">Select a Date</h3>
                  <p className="text-slate-400 text-sm font-medium">Mon – Sat · Sundays off</p>
                </div>
                <CalGrid />
              </div>
            </Card>
          </motion.div>
        )}

        {/* TIME */}
        {step === 'time' && (
          <motion.div key="time" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <Card>
              <div className="border-r border-slate-100 bg-white"><LeftPanel /></div>
              <div className="p-8 bg-white overflow-y-auto">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-slate-900 mb-1">Select a Time</h3>
                  <p className="text-slate-400 text-sm font-medium">India Standard Time (IST)</p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-5 items-start">
                  <CalGrid compact />
                  {s.day && (
                    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="w-[148px]">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                        {new Date(s.year, s.month, s.day).toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })}
                      </p>
                      <div className="space-y-2 overflow-y-auto max-h-[360px]">
                        {TIME_SLOTS.map(slot => {
                          const ok = isSlotOk(s.year, s.month, s.day!, slot);
                          const isSel = pendingTime === slot;
                          if (!ok) return <div key={slot} className="w-full py-2.5 rounded-xl text-sm font-bold border-2 border-slate-100 text-slate-300 text-center cursor-not-allowed line-through">{slot}</div>;
                          return (
                            <div key={slot} className="flex gap-2">
                              <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                                onClick={() => setPendingTime(slot)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all
                                  ${isSel ? 'border-slate-800 bg-slate-800 text-white' : 'border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 bg-white'}`}>
                                {slot}
                              </motion.button>
                              {isSel && (
                                <motion.button type="button" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                                  onClick={() => { up('time', slot); setStep('details'); }}
                                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-3 rounded-xl transition-all whitespace-nowrap">
                                  Next →
                                </motion.button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
                {!s.day && (
                  <div className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                    <p className="text-blue-600 text-sm font-bold">Select a date to see time slots</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* DETAILS */}
        {step === 'details' && (
          <motion.div key="det" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <Card>
              <div className="border-r border-slate-100 bg-white"><LeftPanel /></div>
              <div className="p-8 bg-white overflow-y-auto">
                {/* Summary bar */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 mb-7">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-900 font-black text-sm">{dateStr}</p>
                    <p className="text-blue-500 text-xs font-bold">{s.time} IST · 30 min Podcast Discussion</p>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1">Enter Details</h3>
                <p className="text-slate-400 text-sm mb-6">We'll send confirmation via WhatsApp.</p>

                <div className="space-y-4 max-w-md">

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Your full name" value={s.name}
                      onChange={e => onChange('name', e.target.value)} onBlur={() => onBlur('name')}
                      className={inp('name')} />
                    {touched.name && errors.name && <p className="text-xs text-red-500 font-semibold mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="you@email.com" value={s.email}
                      onChange={e => onChange('email', e.target.value)} onBlur={() => onBlur('email')}
                      className={inp('email')} />
                    {touched.email && errors.email && <p className="text-xs text-red-500 font-semibold mt-1">{errors.email}</p>}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp Number <span className="text-red-500">*</span></label>
                    <div className={`flex items-center rounded-xl border-2 overflow-hidden transition-all ${touched.phone && errors.phone ? 'border-red-400' : 'border-slate-200 focus-within:border-blue-500'}`}>
                      <div className="flex items-center gap-2 px-3 py-3 border-r border-slate-200 bg-slate-50 shrink-0">
                        <span className="text-base">🇮🇳</span>
                        <span className="text-sm font-bold text-slate-600">+91</span>
                      </div>
                      <input type="tel" placeholder="9876543210" value={s.phone}
                        onChange={e => { const d = e.target.value.replace(/\D/g,'').slice(0,10); onChange('phone', d); }}
                        onBlur={() => onBlur('phone')} maxLength={10}
                        className="flex-1 px-4 py-3 outline-none text-sm font-semibold text-slate-800 bg-white placeholder:text-slate-300" />
                      <div className={`px-3 text-xs font-black shrink-0 ${s.phone.length === 10 ? 'text-blue-500' : 'text-slate-300'}`}>{s.phone.length}/10</div>
                    </div>
                    {touched.phone && errors.phone && <p className="text-xs text-red-500 font-semibold mt-1">{errors.phone}</p>}
                  </div>

                  {/* Company Email */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Company Mail Id <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="you@yourcompany.com" value={s.companyEmail}
                      onChange={e => onChange('companyEmail', e.target.value)} onBlur={() => onBlur('companyEmail')}
                      className={inp('companyEmail')} />
                    {touched.companyEmail && errors.companyEmail && <p className="text-xs text-red-500 font-semibold mt-1">{errors.companyEmail}</p>}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Company Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Your company" value={s.companyName}
                      onChange={e => onChange('companyName', e.target.value)} onBlur={() => onBlur('companyName')}
                      className={inp('companyName')} />
                    {touched.companyName && errors.companyName && <p className="text-xs text-red-500 font-semibold mt-1">{errors.companyName}</p>}
                  </div>

                  {/* Purpose dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Purpose <span className="text-red-500">*</span></label>
                    <button type="button" onClick={() => setPurposeOpen(p => !p)}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-semibold text-left flex items-center justify-between transition-all bg-white
                        ${touched.purpose && errors.purpose ? 'border-red-400' : purposeOpen ? 'border-blue-500' : 'border-slate-200 hover:border-slate-300'}
                        ${s.purpose ? 'text-slate-800' : 'text-slate-300'}`}>
                      {s.purpose || 'Select...'}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${purposeOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {purposeOpen && (
                        <motion.div initial={{ opacity: 0, y: -4, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
                          className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden origin-top">
                          {PURPOSES.map(p => (
                            <button key={p} type="button"
                              onClick={() => { up('purpose', p); onChange('purpose', p); setPurposeOpen(false); }}
                              className={`w-full px-4 py-3 text-sm font-semibold text-left hover:bg-blue-50 hover:text-blue-600 transition-colors
                                ${s.purpose === p ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}>
                              {p}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {touched.purpose && errors.purpose && <p className="text-xs text-red-500 font-semibold mt-1">{errors.purpose}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button type="button" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.975 }} onClick={handleSubmit}
                    className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all mt-2 text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Schedule via WhatsApp
                  </motion.button>
                  <p className="text-[11px] text-slate-400 text-center font-medium">Opens WhatsApp with your booking details pre-filled.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* SUCCESS */}
        {step === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
            <div className="rounded-2xl border border-slate-200 shadow-xl bg-white p-16 text-center min-h-[480px] flex flex-col items-center justify-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mb-8 mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="text-3xl font-black text-slate-900 mb-2">You're Scheduled! 🎙️</h3>
                <p className="text-slate-500 font-medium mb-1">Your details have been sent via WhatsApp.</p>
                <p className="text-slate-400 text-sm mb-1">{dateStr}</p>
                <p className="text-blue-600 text-sm font-black mb-10">{s.time} IST · 30 min Podcast Discussion</p>
                <div className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-8 max-w-sm mx-auto">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                  <p className="text-sm text-slate-500 font-medium text-left">We'll confirm your slot within a few hours via WhatsApp.</p>
                </div>
                <button type="button" onClick={() => { setStep('calendar'); setS(p => ({ ...p, day: null, time: null })); setPendingTime(null); setErrors({}); setTouched({}); }}
                  className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors flex items-center gap-1.5 mx-auto">
                  <ArrowLeft className="w-4 h-4" /> Schedule another
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};