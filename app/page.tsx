"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SplineHero from "@/components/SplineHero";

const GlobeScene = dynamic(() => import("@/components/GlobeScene"), { ssr: false });

declare global {
  interface Window {
    fireConversion: (type: string) => void;
    fireContactClick: (type: string) => void;
    fireFormConversion: (userData?: { email?: string; phone?: string; name?: string }) => void;
  }
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHONE = "(816) 304-6755";
const PHONE_HREF = "tel:+18163046755";
const EMAIL = "jmoore@ofbswfl.com";
const EMAIL_HREF = "mailto:jmoore@ofbswfl.com";
const CONTACT_API_URL = "/api/contact";

// ─── ICONS ───────────────────────────────────────────────────────────────────
function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.58 4.5 2 2 0 0 1 3.55 2.3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function MapPinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function ShieldIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function CheckCircleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function TruckIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="m16 8 4 2 2 3v4h-6V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function BuildingIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="18" height="18" rx="1" />
      <path d="M9 22V12h6v10M2 9h20M2 15h20" />
    </svg>
  );
}
function TagIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function ServerIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}
function FileTextIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function GlobeIconSvg({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function ClipboardIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
    </svg>
  );
}
function ClockIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function UsersIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function StarIcon({ size = 16, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-white/5">
      <div
        className="h-full transition-[width] duration-75"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #8b93a6, #c7ccd6)",
        }}
      />
    </div>
  );
}

// ─── PULSE DOT ────────────────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span className="relative flex h-2 w-2 mr-1">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-[#8b93a6] opacity-75"
        animate={{ scale: [1, 1.9, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b93a6]" />
    </span>
  );
}

// ─── COUNT UP ─────────────────────────────────────────────────────────────────
function CountUp({ to, suffix = "", prefix = "", duration = 1.2 }: {
  to: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(value, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, to, duration, value]);

  return <span ref={ref}><motion.span>{display}</motion.span></span>;
}

// ─── CTA BUTTON ───────────────────────────────────────────────────────────────
function CtaButton({ href, onClick, children, variant = "primary", className = "" }: {
  href: string; onClick?: () => void; children: React.ReactNode;
  variant?: "primary" | "ghost"; className?: string;
}) {
  const styles = {
    primary: "btn-chrome inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-lg text-base no-underline cursor-pointer",
    ghost: "inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.11] border border-white/12 text-white font-semibold px-7 py-3.5 rounded-lg text-base no-underline backdrop-blur-sm cursor-pointer",
  };
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`${styles[variant]} ${className}`}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}

// ─── HERO FORM ────────────────────────────────────────────────────────────────
function HeroForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", project: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _captcha: "false", _subject: "New OFB Hero Form Inquiry" }),
      });
      const data = await res.json();
      if (res.ok && data.success) { setStatus("sent"); window.fireFormConversion?.({ email: form.email, phone: form.phone, name: form.name }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const lc = "block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1.5";
  const ic = "w-full bg-white/[0.05] border border-white/[0.09] text-white text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#8b93a6]/50 focus:bg-white/[0.07] transition-all duration-200 placeholder:text-white/20";

  if (status === "sent") return (
    <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-10 backdrop-blur-xl flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#8b93a6]/12 border border-[#8b93a6]/25 flex items-center justify-center mb-5 text-[#8b93a6]">
        <CheckCircleIcon size={28} />
      </div>
      <h4 className="text-white text-lg mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>Message Received</h4>
      <p className="text-white/45 text-sm" style={{ lineHeight: 1.8 }}>Jeff will reach out within 1 business day. For urgent projects, call <a href={PHONE_HREF} className="text-white font-semibold no-underline">{PHONE}</a>.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-6 backdrop-blur-xl">
      <p className="text-white font-semibold mb-5 text-base" style={{ fontFamily: "var(--font-space-grotesk)" }}>Get a Free Project Assessment</p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lc}>Name</label><input className={ic} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
          <div><label className={lc}>Company</label><input className={ic} placeholder="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
        </div>
        <div><label className={lc}>Phone</label><input className={ic} type="tel" inputMode="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required /></div>
        <div><label className={lc}>Email</label><input className={ic} type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required /></div>
        <div><label className={lc}>Project Details</label><textarea className={`${ic} resize-none h-20`} placeholder="Office size, timeline, location..." value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} /></div>
        <motion.button type="submit" disabled={status === "sending"}
          className="btn-chrome w-full font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {status === "sending" ? "Sending..." : "Request Free Assessment →"}
        </motion.button>
        {status === "error" && <p className="text-red-400 text-xs text-center">Something went wrong. Call us directly.</p>}
      </div>
    </form>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0e1530]/90 backdrop-blur-xl border-b border-white/5 py-3" : "py-5"}`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Image src="/ofb-logo.png" alt="OFB of SWFL" width={52} height={52} className="rounded-sm" />

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {[["Services", "#services"], ["Process", "#process"], ["Coverage", "#coverage"], ["Contact", "#contact"]].map(([label, href]) => (
            <a key={label} href={href} className="text-white/55 hover:text-white text-sm transition-colors duration-200 no-underline cursor-pointer">{label}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a href={PHONE_HREF} onClick={() => window?.fireConversion?.("phone_click_nav")}
            className="hidden sm:flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold no-underline transition-colors cursor-pointer">
            <PhoneIcon size={14} /> {PHONE}
          </a>
          <motion.a href="#contact"
            className="btn-chrome inline-flex items-center gap-1.5 font-semibold text-sm px-5 h-9 rounded-lg no-underline cursor-pointer"
            whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
            Get a Quote
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Spline background */}
      <div className="absolute inset-0 z-0">
        <SplineHero />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1530] via-[#0e1530]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1530] via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0e1530] to-transparent" />
      </div>

      {/* Orbs */}
      <div className="glow-orb absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-[#8b93a6]/10" style={{ filter: "blur(130px)" }} />
      <div className="glow-orb absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-[#1a2440]/18" style={{ filter: "blur(100px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          {/* Copy */}
          <div className="gsap-hero">
            <div className="flex items-center gap-2 mb-7">
              <PulseDot />
              <Badge className="bg-[#8b93a6]/12 border border-[#8b93a6]/25 text-[#c7ccd6] text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-[#8b93a6]/12 backdrop-blur-sm px-3 py-1">
                Serving Fortune 1000 &amp; Business Owners Nationwide
              </Badge>
            </div>

            <h1
              className="font-bold text-white mb-7"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.04em", lineHeight: 1.04, fontSize: "clamp(2.8rem, 6vw, 80px)" }}
            >
              Office Furniture<br />
              Decommissioning<br />
              &amp; <em className="not-italic text-chrome">Liquidation.</em>
            </h1>

            <p className="text-white/55 text-lg mb-9 max-w-lg" style={{ fontWeight: 300, lineHeight: 1.8 }}>
              Moving out, downsizing, or clearing a space? OFB of SW Florida handles removal, logistics, documentation, and asset resale. Any size project, anywhere in the U.S.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <CtaButton href={PHONE_HREF} onClick={() => window?.fireConversion?.("phone_click_hero")} variant="primary">
                <PhoneIcon size={16} /> Call {PHONE}
              </CtaButton>
              <CtaButton href="#contact" variant="ghost">
                Request Free Assessment
              </CtaButton>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/[0.07]">
              {[
                { icon: <ShieldIcon size={13} />, text: "Project Completion Guarantee" },
                { icon: <ClockIcon size={13} />, text: "2-Hour Response" },
                { icon: <StarIcon size={13} filled />, text: "5-Star Rated" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-white/40 text-sm">
                  <span className="text-[#c7ccd6]">{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>
          </div>

          {/* Hero form */}
          <div className="gsap-hero-form">
            <HeroForm />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex">
        <motion.div
          className="flex flex-col items-center gap-2 text-white/25"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/25" />
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
const STATS = [
  { to: 500, suffix: "+", label: "Projects Completed" },
  { to: 50, prefix: "$", suffix: "M+", label: "Assets Managed" },
  { to: 48, suffix: " States", label: "Nationwide Coverage" },
  { to: 100, suffix: "%", label: "On-Time Delivery" },
];

function StatsBar() {
  return (
    <div className="gsap-stats relative py-14 border-y border-white/[0.06] overflow-hidden">
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[80px] bg-[#c7ccd6]/8" style={{ filter: "blur(70px)" }} />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <div className="text-4xl lg:text-5xl font-bold mb-2 text-[#c7ccd6]" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}>
              <CountUp to={s.to} suffix={s.suffix} prefix={s.prefix ?? ""} />
            </div>
            <div className="text-white/35 text-sm tracking-wide">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
type Service = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  tagline: string;
  body: string;
  includes: string[];
  idealFor: string[];
};

const SERVICES: Service[] = [
  {
    icon: <BuildingIcon size={26} />,
    title: "Full Decommissioning",
    desc: "End-to-end removal of everything in your space: furniture, fixtures, IT equipment. We leave it broom-clean and landlord-ready.",
    accent: "#8b93a6",
    tagline: "One call. Empty space. Zero stress.",
    body: "When you're vacating an office, the last thing you need is a dozen vendors, missed pickups, and a landlord threatening your security deposit. OFB of SW Florida handles the entire decommissioning process from first walkthrough to final broom-clean, furniture, cubicle systems, fixtures, signage, and IT hardware all handled under one contract.\n\nWe scope the project, build a removal plan, coordinate crew and logistics, and hand you a completed space with full disposal documentation. No surprises, no hidden costs, no leftover junk.",
    includes: [
      "On-site scoping and written project plan",
      "Furniture, cubicles, and fixture removal",
      "IT hardware and server rack teardown",
      "Freight coordination and staging",
      "Disposal certificates for all removed items",
      "Final broom-clean and landlord sign-off packet",
    ],
    idealFor: ["Corporate office relocations", "Lease expirations and surrenders", "Bankruptcy and receivership clearances", "Downsizing and space consolidations"],
  },
  {
    icon: <TagIcon size={26} />,
    title: "Asset Liquidation",
    desc: "Maximize recovery value on outgoing assets. We source buyers, handle transactions, and cut you a check, or apply it to your project cost.",
    accent: "#c7ccd6",
    tagline: "Turn your furniture into a check.",
    body: "Most companies leave money on the table when they vacate a space, dumping or donating assets that have real resale value. OFB of SW Florida runs a full asset liquidation process that sources qualified buyers, handles all negotiations, and processes the transaction on your behalf.\n\nRecovery value gets applied directly to your project cost, reducing what you pay out of pocket. In many cases, liquidation revenue fully offsets the decommissioning fee. We handle everything, you just approve the final numbers.",
    includes: [
      "Full asset inventory and valuation",
      "Buyer sourcing through our national dealer network",
      "Negotiation and transaction handling",
      "Pickup coordination with buyers",
      "Itemized recovery report",
      "Net credit applied to project invoice",
    ],
    idealFor: ["Companies with high-quality furniture or large quantities", "Projects where budget is a constraint", "Bankruptcy trustees managing estate assets", "Multi-site clearances with excess inventory"],
  },
  {
    icon: <TruckIcon size={26} />,
    title: "Furniture Logistics",
    desc: "Coordinated pickup, transport, staging, and delivery. Any quantity. Any location. On your timeline.",
    accent: "#8b93a6",
    tagline: "We move it. You don't touch it.",
    body: "Whether you're relocating 50 workstations or clearing 500,000 square feet across multiple floors, OFB of SW Florida manages the full logistics chain. We handle freight booking, crew scheduling, permits, elevator reservations, and delivery coordination, so you have one point of contact and one timeline to track.\n\nAll transport is insured and documented. We work with building management to meet move-out requirements and handle any special handling for sensitive or oversized items.",
    includes: [
      "Freight carrier booking and coordination",
      "Crew scheduling and supervision",
      "Building management liaison",
      "Elevator and loading dock reservations",
      "Special handling for oversized or fragile items",
      "Delivery confirmation and chain-of-custody documentation",
    ],
    idealFor: ["Office relocations requiring furniture reuse", "Storage and staging projects", "Furniture donations requiring pickup and delivery", "Multi-floor or multi-building moves"],
  },
  {
    icon: <ServerIcon size={26} />,
    title: "Data Center Clearance",
    desc: "Secure decommissioning of server rooms and IT infrastructure with full chain-of-custody documentation.",
    accent: "#c7ccd6",
    tagline: "Secure teardown. Documented proof.",
    body: "IT decommissioning carries risk that standard moving companies aren't equipped to handle, data security, compliance documentation, and proper disposal of hardware that can't just be dropped at a loading dock. OFB of SW Florida provides structured data center clearance with chain-of-custody tracking from teardown to certified final disposition.\n\nWe coordinate with your IT team on data wiping requirements, pull racks and cabling cleanly, and provide disposal certificates that satisfy your compliance and audit requirements.",
    includes: [
      "Pre-teardown walkthrough with your IT team",
      "Rack and server removal",
      "Cable management and structured cabling teardown",
      "Chain-of-custody documentation for all hardware",
      "Certified data destruction coordination",
      "Disposal certificates for compliance and audit",
    ],
    idealFor: ["Corporate data center closures", "Server room consolidations", "Compliance-sensitive IT disposals (HIPAA, SOC 2, etc.)", "Co-location facility exits"],
  },
  {
    icon: <FileTextIcon size={26} />,
    title: "Lease Surrender Planning",
    desc: "We coordinate with your landlord, building management, and legal team to ensure a clean, cost-free lease surrender.",
    accent: "#8b93a6",
    tagline: "Leave clean. Keep your deposit.",
    body: "A botched lease surrender can cost you tens of thousands in holdover fees, restoration charges, and security deposit forfeitures. OFB of SW Florida works directly with your landlord and building management team to understand the surrender requirements and execute a plan that meets every condition in your lease.\n\nWe document everything, photos, disposal certificates, restoration confirmations, and provide a complete close-out package you can hand directly to your legal team or property manager.",
    includes: [
      "Lease document review for surrender obligations",
      "Landlord and building management coordination",
      "Restoration and patching as required",
      "Full photo documentation of cleared space",
      "Disposal and recycling certificates",
      "Close-out package for legal and property records",
    ],
    idealFor: ["Tenants exiting before or at lease end", "Companies with complex restoration clauses", "Legal teams managing corporate real estate exits", "Any project where security deposit recovery matters"],
  },
  {
    icon: <GlobeIconSvg size={26} />,
    title: "Nationwide Coordination",
    desc: "Multi-site projects across 48 states. One point of contact. One invoice. One team you can trust to deliver.",
    accent: "#c7ccd6",
    tagline: "Coast to coast. One call.",
    body: "Managing an office decommissioning across multiple locations is a logistical nightmare when every site has a different vendor, timeline, and point of contact. OFB of SW Florida centralizes the entire operation, we manage all sites, all timelines, and all vendors under a single project plan with one invoice at the end.\n\nWe've run coordinated projects across dozens of simultaneous locations for Fortune 1000 companies. Our national vendor network covers all 48 contiguous states, and our project management process keeps every site on schedule and every stakeholder informed.",
    includes: [
      "Centralized project management across all sites",
      "National vendor network in all 48 contiguous states",
      "Unified timeline and milestone tracking",
      "Single point of contact for all locations",
      "Consolidated invoicing for accounting simplicity",
      "Executive-level reporting and status updates",
    ],
    idealFor: ["Fortune 1000 portfolio-wide consolidations", "Private equity firms managing multi-site exits", "REITs and property managers clearing multiple locations", "Any project spanning more than one city or state"],
  },
];

// ─── SERVICE MODAL ─────────────────────────────────────────────────────────────
function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full sm:max-w-2xl max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-white/[0.1] shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(26,36,64,0.97) 0%, rgba(14,21,48,0.99) 100%)",
          backdropFilter: "blur(24px)",
        }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      >
        {/* Accent glow top */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${service.accent}80, transparent)` }}
        />
        <div
          className="absolute top-0 right-0 w-64 h-48 pointer-events-none rounded-tr-2xl"
          style={{ background: `radial-gradient(ellipse at top right, ${service.accent}18, transparent 65%)` }}
        />

        <div className="p-7 sm:p-9">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-7">
            <div className="flex items-center gap-4">
              <div
                className="w-13 h-13 rounded-xl border flex items-center justify-center shrink-0"
                style={{ color: service.accent, borderColor: `${service.accent}35`, background: `${service.accent}12` }}
              >
                {service.icon}
              </div>
              <div>
                <h3 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}>
                  {service.title}
                </h3>
                <p className="text-sm mt-0.5" style={{ color: service.accent }}>{service.tagline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.09] flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 shrink-0 mt-0.5"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
              </svg>
            </button>
          </div>

          {/* Body copy */}
          <div className="space-y-3 mb-7">
            {service.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-white/60 text-sm leading-relaxed">{para}</p>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.07] mb-7" />

          {/* What's Included + Ideal For */}
          <div className="grid sm:grid-cols-2 gap-7 mb-8">
            <div>
              <p className="label-upper text-white/30 mb-4">What&apos;s Included</p>
              <ul className="space-y-2.5">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                    <span className="mt-[3px] w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${service.accent}22`, color: service.accent }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 3.5 6.5 7 1.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-upper text-white/30 mb-4">Ideal For</p>
              <ul className="space-y-2.5">
                {service.idealFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                    <span className="mt-[3px] w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${service.accent}22`, color: service.accent }}>
                      <ArrowRightIcon size={8} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div
            className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ background: `${service.accent}10`, border: `1px solid ${service.accent}25` }}
          >
            <div>
              <p className="text-white font-semibold text-sm">Ready to get started?</p>
              <p className="text-white/45 text-xs mt-0.5">Jeff responds to every inquiry within 2 hours.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                <PhoneIcon size={14} /> {PHONE}
              </a>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-all duration-200 hover:brightness-110"
                style={{ background: service.accent, boxShadow: `0 4px 20px ${service.accent}40` }}
              >
                Get a Quote <ArrowRightIcon size={13} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null);

  // hero = Full Decommissioning, small 4 = Asset Liquidation, Furniture Logistics, Data Center Clearance, Lease Surrender Planning
  // marquee = Nationwide Coordination
  const heroService = SERVICES[0];
  const smallServices = SERVICES.slice(1, 5);
  const marqueeService = SERVICES[5];

  // Unique glow colors per small card
  const cardGlows = [
    { border: "rgba(199,204,214,0.35)", glow: "rgba(199,204,214,0.12)" },   // silver-blue
    { border: "rgba(139,147,166,0.35)",   glow: "rgba(139,147,166,0.12)" },      // blue
    { border: "rgba(99,102,241,0.35)",  glow: "rgba(99,102,241,0.12)" },     // purple-leaning
    { border: "rgba(34,211,238,0.22)",  glow: "rgba(34,211,238,0.08)" },     // teal-leaning
  ];

  return (
    <section
      id="services"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(26,36,64,0.55) 0%, #0e1530 70%)",
      }}
    >
      {/* Ambient orbs */}
      <div className="glow-orb absolute bottom-0 left-0 w-[500px] h-[300px] bg-[#c7ccd6]/7" style={{ filter: "blur(110px)" }} />
      <div className="glow-orb absolute top-0 right-0 w-[400px] h-[300px] bg-[#8b93a6]/7" style={{ filter: "blur(110px)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 gsap-services-header">
          <p className="label-upper text-[#8b93a6] mb-4">What We Do</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2 className="text-3xl lg:text-4xl text-white max-w-lg">End-to-End Office<br />Asset Management</h2>
            <p className="text-white/45 text-base max-w-sm lg:text-right" style={{ lineHeight: 1.8 }}>
              We handle every phase so you don't manage multiple vendors, timelines, or invoices.
            </p>
          </div>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* Hero card, spans 2 cols on desktop */}
          <motion.button
            onClick={() => setActive(heroService)}
            className="group relative lg:col-span-2 rounded-2xl p-8 overflow-hidden text-left w-full"
            style={{
              background: "linear-gradient(135deg, rgba(139,147,166,0.18) 0%, rgba(26,36,64,0.85) 55%, rgba(14,21,48,0.95) 100%)",
              border: "1px solid rgba(139,147,166,0.28)",
              boxShadow: "0 0 60px rgba(139,147,166,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.22, ease: "easeOut" },
            }}
          >
            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top right, rgba(139,147,166,0.18), transparent 65%)" }}
            />
            {/* Hover bright border overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ border: "1px solid rgba(139,147,166,0.55)", boxShadow: "0 0 40px rgba(139,147,166,0.12)" }}
            />

            {/* Icon, large, top-right float */}
            <div className="flex items-start justify-between mb-8">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#8b93a6]/70 bg-[#8b93a6]/10 border border-[#8b93a6]/20 rounded-full px-3 py-1">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true"><polyline points="1 4.5 3.5 7 8 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Full-Service
              </span>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(139,147,166,0.25), rgba(139,147,166,0.08))",
                  border: "1px solid rgba(139,147,166,0.30)",
                  color: "#c7ccd6",
                }}
              >
                <BuildingIcon size={32} />
              </div>
            </div>

            <h3
              className="text-white text-2xl lg:text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
            >
              {heroService.title}
            </h3>
            <p className="text-[#c7ccd6] text-sm font-medium mb-4">{heroService.tagline}</p>
            <p className="text-white/50 text-base max-w-lg" style={{ lineHeight: 1.75 }}>{heroService.desc}</p>

            <div className="flex items-center gap-2 mt-8 text-sm font-semibold text-[#8b93a6] group-hover:gap-3 transition-all duration-300">
              Explore service <ArrowRightIcon size={14} />
            </div>
          </motion.button>

          {/* Small cards, 1 col, stacked as 1x2 + 1x2 alongside hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {smallServices.slice(0, 2).map((s, i) => {
              const glow = cardGlows[i];
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(s)}
                  className="group relative rounded-2xl p-5 overflow-hidden text-left w-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.07)`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (i + 1) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                    style={{ border: `1px solid ${glow.border}`, boxShadow: `0 0 30px ${glow.glow}` }}
                  />
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `radial-gradient(ellipse at top right, ${glow.glow}, transparent 70%)` }}
                  />
                  <span className="text-[#c7ccd6] mb-4 opacity-70 block">{s.icon}</span>
                  <h4 className="text-white text-sm font-semibold mb-1.5" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}>{s.title}</h4>
                  <p className="text-white/38 text-xs" style={{ lineHeight: 1.7 }}>{s.tagline}</p>
                  <div className="flex items-center gap-1 mt-4 text-[11px] font-semibold opacity-50 group-hover:opacity-100 -translate-x-0.5 group-hover:translate-x-0 transition-all duration-300" style={{ color: s.accent }}>
                    Learn more <ArrowRightIcon size={11} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Second row of small cards, full width 2-col */}
          {smallServices.slice(2, 4).map((s, i) => {
            const glow = cardGlows[i + 2];
            return (
              <motion.button
                key={i}
                onClick={() => setActive(s)}
                className="group relative rounded-2xl p-5 overflow-hidden text-left w-full"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i + 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  style={{ border: `1px solid ${glow.border}`, boxShadow: `0 0 30px ${glow.glow}` }}
                />
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(ellipse at top right, ${glow.glow}, transparent 70%)` }}
                />
                <span className="text-[#c7ccd6] mb-4 opacity-70 block">{s.icon}</span>
                <h4 className="text-white text-sm font-semibold mb-1.5" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}>{s.title}</h4>
                <p className="text-white/38 text-xs" style={{ lineHeight: 1.7 }}>{s.tagline}</p>
                <div className="flex items-center gap-1 mt-4 text-[11px] font-semibold opacity-50 group-hover:opacity-100 -translate-x-0.5 group-hover:translate-x-0 transition-all duration-300" style={{ color: s.accent }}>
                  Learn more <ArrowRightIcon size={11} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── MARQUEE STRIP, Nationwide Coordination ── */}
        <motion.button
          onClick={() => setActive(marqueeService)}
          className="group relative w-full mt-4 rounded-2xl overflow-hidden text-left"
          style={{
            background: "linear-gradient(90deg, rgba(199,204,214,0.08) 0%, rgba(139,147,166,0.06) 50%, rgba(199,204,214,0.08) 100%)",
            border: "1px solid rgba(199,204,214,0.18)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ border: "1px solid rgba(199,204,214,0.38)", boxShadow: "0 0 40px rgba(199,204,214,0.07)" }}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-7 py-5">
            <div className="flex items-center gap-5">
              <span className="text-[#c7ccd6] opacity-70 shrink-0"><GlobeIconSvg size={22} /></span>
              <div>
                <h4 className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}>
                  {marqueeService.title}
                </h4>
                <p className="text-white/40 text-xs mt-0.5">{marqueeService.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              {["48 States Covered", "Single Point of Contact", "One Invoice"].map((tag) => (
                <span key={tag} className="hidden md:flex items-center gap-1.5 text-xs text-white/40">
                  <span className="w-1 h-1 rounded-full bg-[#c7ccd6]/50" />
                  {tag}
                </span>
              ))}
              <div className="flex items-center gap-1 text-xs font-semibold text-[#c7ccd6] opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                Learn more <ArrowRightIcon size={11} />
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && <ServiceModal service={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

// ─── PROCESS TIMELINE ─────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Free Assessment", desc: "Tell us your scope, location, and timeline. We respond within 2 hours with questions or a call.", icon: <ClipboardIcon size={22} /> },
  { n: "02", title: "Custom Quote", desc: "Flat-rate pricing delivered in writing within 24 hours. No hidden fees. No surprise charges.", icon: <FileTextIcon size={22} /> },
  { n: "03", title: "Logistics Plan", desc: "We coordinate trucks, crew, scheduling, and permits. You approve the plan before anything moves.", icon: <TruckIcon size={22} /> },
  { n: "04", title: "Full Execution", desc: "Our crew handles everything on-site. Real-time progress updates so you're never left guessing.", icon: <BuildingIcon size={22} /> },
  { n: "05", title: "Close-Out Report", desc: "Full asset manifest, disposal certificates, and landlord-ready sign-off. Project complete.", icon: <CheckCircleIcon size={22} /> },
];

function ProcessTimeline() {
  return (
    <section
      id="process"
      className="py-24 relative overflow-hidden"
      style={{ background: "#141c33" }}
    >
      <div className="glow-orb absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-[#8b93a6]/6" style={{ filter: "blur(70px)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 gsap-timeline-header">
          <p className="label-upper text-[#8b93a6] mb-4">How It Works</p>
          <h2 className="text-3xl lg:text-4xl text-white mb-4">From First Call to Final Sign-Off</h2>
          <p className="text-white/45 max-w-md mx-auto text-base" style={{ lineHeight: 1.8 }}>
            Five clear steps. No jargon. No runaround. Just a clean, documented project start to finish.
          </p>
        </div>

        {/* ── DESKTOP: connected horizontal timeline ── */}
        <div className="hidden lg:block">
          {/* The connecting dashed line, sits behind nodes, centered vertically at ~40px (half of node height) */}
          <div className="relative mb-0">
            {/* Track */}
            <div className="absolute top-[40px] left-[9%] right-[9%] h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            {/* Animated fill */}
            <motion.div
              className="absolute top-[40px] left-[9%] h-px"
              style={{ background: "linear-gradient(90deg, #8b93a6cc, #c7ccd6cc)" }}
              initial={{ width: "0%" }}
              whileInView={{ width: "82%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
            />
            {/* Dashed overlay for style */}
            <div
              className="absolute top-[40px] left-[9%] right-[9%] h-px pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, rgba(139,147,166,0.35) 0px, rgba(139,147,166,0.35) 6px, transparent 6px, transparent 14px)",
              }}
            />

            {/* Steps */}
            <div className="grid grid-cols-5 gap-4">
              {STEPS.map((step, i) => {
                const isFinal = i === 4;
                return (
                  <motion.div
                    key={step.n}
                    className="flex flex-col items-center text-center group cursor-default"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.32, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Node */}
                    <motion.div
                      className="relative z-10 w-[80px] h-[80px] rounded-full flex flex-col items-center justify-center mb-6 transition-all duration-300"
                      style={
                        isFinal
                          ? {
                              background: "linear-gradient(135deg, #8b93a6, #28324f)",
                              border: "2px solid rgba(139,147,166,0.50)",
                              boxShadow: "0 0 32px rgba(139,147,166,0.35), 0 0 64px rgba(139,147,166,0.12)",
                            }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              backdropFilter: "blur(8px)",
                            }
                      }
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    >
                      {/* Final step glow ring */}
                      {isFinal && (
                        <motion.div
                          className="absolute inset-[-6px] rounded-full pointer-events-none"
                          style={{ border: "1px solid rgba(139,147,166,0.25)" }}
                          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <span className="text-white">{step.icon}</span>
                    </motion.div>

                    {/* Pill badge */}
                    <span
                      className="inline-block text-[10px] font-bold tracking-[0.12em] rounded-full px-2.5 py-0.5 mb-2.5"
                      style={
                        isFinal
                          ? { background: "rgba(139,147,166,0.20)", color: "#c7ccd6", border: "1px solid rgba(139,147,166,0.30)" }
                          : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.09)" }
                      }
                    >
                      {step.n}
                    </span>

                    <h5
                      className="text-white text-sm font-semibold mb-2"
                      style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}
                    >
                      {step.title}
                    </h5>
                    <p className="text-white/35 text-xs leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MOBILE: vertical stacked with left connector line ── */}
        <div className="lg:hidden relative">
          {/* Vertical connector */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <motion.div
            className="absolute left-[39px] top-0 w-px"
            style={{ background: "linear-gradient(180deg, #8b93a6cc, #c7ccd6cc)" }}
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeInOut", delay: 0.2 }}
          />

          <div className="space-y-8 pl-[72px] relative">
            {STEPS.map((step, i) => {
              const isFinal = i === 4;
              return (
                <motion.div
                  key={step.n}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Node, positioned to overlap the vertical line */}
                  <div
                    className="absolute -left-[52px] top-0 w-[40px] h-[40px] rounded-full flex items-center justify-center z-10"
                    style={
                      isFinal
                        ? {
                            background: "linear-gradient(135deg, #8b93a6, #28324f)",
                            border: "2px solid rgba(139,147,166,0.45)",
                            boxShadow: "0 0 20px rgba(139,147,166,0.30)",
                          }
                        : {
                            background: "#141c33",
                            border: "1px solid rgba(255,255,255,0.14)",
                          }
                    }
                  >
                    <span className="text-white scale-75">{step.icon}</span>
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-2xl p-5"
                    style={
                      isFinal
                        ? {
                            background: "linear-gradient(135deg, rgba(139,147,166,0.12), rgba(14,21,48,0.95))",
                            border: "1px solid rgba(139,147,166,0.25)",
                            boxShadow: "0 0 30px rgba(139,147,166,0.08)",
                          }
                        : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }
                    }
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-block text-[10px] font-bold tracking-[0.12em] rounded-full px-2.5 py-0.5"
                        style={
                          isFinal
                            ? { background: "rgba(139,147,166,0.20)", color: "#c7ccd6", border: "1px solid rgba(139,147,166,0.30)" }
                            : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.09)" }
                        }
                      >
                        {step.n}
                      </span>
                      <h5 className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}>
                        {step.title}
                      </h5>
                    </div>
                    <p className="text-white/40 text-sm" style={{ lineHeight: 1.75 }}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────
function TestimonialSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Faint office photo bg */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=30)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1530] via-[#0e1530]/85 to-[#0e1530]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1530] via-transparent to-[#0e1530]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center gsap-jeff-card">
        <div className="flex justify-center gap-1 mb-10 text-[#c7ccd6]">
          {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} filled />)}
        </div>

        {/* Large quote mark */}
        <div className="text-[120px] leading-none text-[#8b93a6]/20 font-bold mb-[-30px] select-none" style={{ fontFamily: "Georgia, serif" }}>&ldquo;</div>

        <blockquote
          className="text-white/85 text-xl lg:text-2xl font-light mb-10"
          style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em", lineHeight: 1.45 }}
        >
          We've handled projects from 5,000 to 500,000 square feet. The complexity doesn't scare us, it's what we were built for. Our clients don't manage vendors. They call us, and we handle the rest.
        </blockquote>

        <div className="flex items-center justify-center gap-4">
          <Image src="/jeff-moore.jpg" alt="Jeff Moore" width={48} height={48} className="rounded-full object-cover object-top" style={{ aspectRatio: '1/1' }} />
          <div className="text-left">
            <div className="text-white font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>Jeff Moore</div>
            <div className="text-white/35 text-sm">Founder, Office Furniture Brokers of SW Florida</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY OFB ──────────────────────────────────────────────────────────────────
const WHY_POINTS = [
  { icon: <ShieldIcon size={18} />, title: "Project Completion Guarantee", desc: "We don't leave until the job is done. Every project comes with our written guarantee." },
  { icon: <ClockIcon size={18} />, title: "2-Hour Response, Always", desc: "Jeff personally responds to every inquiry within 2 hours during business hours. No gatekeepers." },
  { icon: <FileTextIcon size={18} />, title: "Full Documentation Package", desc: "Asset manifests, disposal certificates, and landlord sign-off paperwork, all included, no extra charge." },
  { icon: <UsersIcon size={18} />, title: "One Team, One Invoice", desc: "We don't broker your work to strangers. Our crew handles your project start to finish." },
];

function WhyOFBSection() {
  return (
    <section id="why-ofb" className="py-24 px-6 relative overflow-hidden">
      <div className="glow-orb absolute top-0 right-0 w-[500px] h-[300px] bg-[#c7ccd6]/7" style={{ filter: "blur(110px)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="gsap-jeff-card">
            <h2 className="text-3xl lg:text-4xl text-white mb-6">The Difference Is in the <span style={{ color: "#8b93a6" }}>Details</span></h2>
            <p className="text-white/45 text-base mb-10" style={{ lineHeight: 1.8 }}>
              Most brokers pass your project to a third party. We don't. Jeff Moore personally oversees every job, and our guarantee means you're never left holding the bag.
            </p>

            {/* Guarantee card */}
            <div className="bg-gradient-to-br from-[#c7ccd6]/8 to-[#c7ccd6]/4 border border-[#c7ccd6]/18 rounded-2xl p-6">
              <p className="text-[#c7ccd6] font-semibold text-sm mb-3" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.7rem" }}>Our Written Guarantee</p>
              <p className="text-white/45 text-sm" style={{ lineHeight: 1.75 }}>
                If we scope it, we deliver it, on time and within budget. We've never left a project unfinished in over 10 years of operation.
              </p>
            </div>
          </div>

          {/* Right: numbered value props */}
          <div className="space-y-6">
            {WHY_POINTS.map((p, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={i}
                  className="gsap-why-point group relative pl-6 border-l-2 border-white/10 hover:border-[#8b93a6] transition-colors duration-300 cursor-default"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Large background number */}
                  <span
                    className="absolute -top-2 right-0 select-none pointer-events-none font-bold leading-none group-hover:text-white/[0.15] transition-colors duration-300"
                    style={{ fontSize: "3rem", color: "rgba(255,255,255,0.07)", fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.04em" }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <h5 className="text-white text-sm font-semibold mb-1.5" style={{ fontFamily: "var(--font-space-grotesk)" }}>{p.title}</h5>
                  <p className="text-white/50 text-sm" style={{ lineHeight: 1.75 }}>{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COVERAGE + GLOBE ─────────────────────────────────────────────────────────
function GlobeSection() {
  return (
    <section id="coverage" className="py-24 px-6 relative overflow-hidden">
      <div className="glow-orb absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#8b93a6]/7" style={{ filter: "blur(110px)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="gsap-contact-left">
            <p className="label-upper text-[#8b93a6] mb-4">Nationwide Coverage</p>
            <h2 className="text-3xl lg:text-4xl text-white mb-5">One Call Covers the Country</h2>
            <p className="text-white/45 text-base mb-10" style={{ lineHeight: 1.8 }}>
              From Naples, FL to Los Angeles. From Chicago to Austin. We've completed projects in 48 states. Multi-site rollouts, single-office moves, all under one contract.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { to: 48, suffix: " States", label: "Served" },
                { to: 500, suffix: "+", label: "Projects" },
                { to: 10, suffix: "+ Yrs", label: "Experience" },
                { to: 100, suffix: "%", label: "Completion" },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1 text-[#c7ccd6]" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}>
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-white/35 text-xs tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            <CtaButton href="#contact" variant="primary">
              Start a Project <ArrowRightIcon size={14} />
            </CtaButton>
          </div>

          <div className="relative h-[420px] gsap-contact-form">
            <GlobeScene />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function ContactFormFull() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", timeline: "", size: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _captcha: "false", _subject: "New OFB Project Inquiry (Contact)" }),
      });
      const data = await res.json();
      if (res.ok && data.success) { setStatus("sent"); window.fireFormConversion?.({ email: form.email, phone: form.phone, name: form.name }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const lc = "block text-[10px] font-semibold text-white/35 uppercase tracking-widest mb-1.5";
  const ic = "w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#8b93a6]/45 focus:bg-white/[0.06] transition-all duration-200 placeholder:text-white/18";

  if (status === "sent") return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="w-20 h-20 rounded-full bg-[#8b93a6]/10 border border-[#8b93a6]/22 flex items-center justify-center mb-6 text-[#8b93a6]">
        <CheckCircleIcon size={32} />
      </div>
      <h4 className="text-white text-xl mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>Message Received</h4>
      <p className="text-white/40 text-sm max-w-xs" style={{ lineHeight: 1.8 }}>
        Jeff will review your details and reach out within 1 business day. Urgent? Call <a href={PHONE_HREF} className="text-white font-semibold no-underline">{PHONE}</a>.
      </p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div><label className={lc}>Your Name</label><input className={ic} placeholder="First Last" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
        <div><label className={lc}>Company</label><input className={ic} placeholder="Acme Corp" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={lc}>Phone</label><input className={ic} type="tel" inputMode="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required /></div>
        <div><label className={lc}>Email</label><input className={ic} type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lc}>Timeline</label>
          <select className={`${ic} cursor-pointer`} value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}>
            <option value="" className="bg-[#1a2440]">Select...</option>
            <option value="asap" className="bg-[#1a2440]">ASAP</option>
            <option value="2weeks" className="bg-[#1a2440]">Within 2 weeks</option>
            <option value="1month" className="bg-[#1a2440]">Within 1 month</option>
            <option value="planning" className="bg-[#1a2440]">Planning phase</option>
          </select>
        </div>
        <div>
          <label className={lc}>Office Size</label>
          <select className={`${ic} cursor-pointer`} value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))}>
            <option value="" className="bg-[#1a2440]">Select...</option>
            <option value="small" className="bg-[#1a2440]">Under 5,000 sq ft</option>
            <option value="medium" className="bg-[#1a2440]">5,000 – 25,000 sq ft</option>
            <option value="large" className="bg-[#1a2440]">25,000 – 100,000 sq ft</option>
            <option value="enterprise" className="bg-[#1a2440]">100,000+ sq ft</option>
          </select>
        </div>
      </div>
      <div>
        <label className={lc}>Project Details</label>
        <textarea className={`${ic} resize-none h-28`} placeholder="Location, what needs to be removed, special requirements..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <motion.button type="submit" disabled={status === "sending"}
        className="w-full btn-chrome font-semibold py-3.5 rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
        {status === "sending" ? "Sending..." : "Send Project Details →"}
      </motion.button>
      {status === "error" && <p className="text-red-400 text-xs text-center">Something went wrong. Please call us directly.</p>}
    </form>
  );
}

function ContactSection() {
  const items = [
    { icon: <PhoneIcon size={18} />, label: "Phone, Call Jeff Directly", value: <a href={PHONE_HREF} onClick={() => window?.fireConversion?.("phone_click_contact")} className="text-white font-semibold no-underline hover:text-white/80 transition-colors cursor-pointer">{PHONE}</a> },
    { icon: <MailIcon size={18} />, label: "Email", value: <a href={EMAIL_HREF} onClick={() => window?.fireConversion?.("email_click_contact")} className="text-white font-semibold no-underline hover:text-white/80 transition-colors cursor-pointer">{EMAIL}</a> },
    { icon: <MapPinIcon size={18} />, label: "HQ & Service Area", value: <span className="text-white font-semibold">Naples, FL, Projects Nationwide</span> },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="glow-orb absolute top-0 right-0 w-[500px] h-[400px] bg-[#8b93a6]/9" style={{ filter: "blur(110px)" }} />
      <div className="glow-orb absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#1a2440]/12" style={{ filter: "blur(90px)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="gsap-contact-left">
            <p className="label-upper text-[#8b93a6]/70 mb-4">Get In Touch</p>
            <h2 className="text-3xl lg:text-4xl text-white mb-4">Let's Talk About Your Project</h2>
            <p className="text-white/45 text-base mb-10" style={{ lineHeight: 1.8 }}>
              Whether you have a project starting next week or planning six months out, reach out. Jeff personally responds to every inquiry.
            </p>

            <div className="space-y-5 mb-10">
              {items.map((item, i) => (
                <motion.div key={i} className="flex items-start gap-4" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <span className="text-[#8b93a6] flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-0.5">{item.label}</p>
                    <div className="text-base">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-br from-[#c7ccd6]/8 to-transparent border border-[#c7ccd6]/16 rounded-2xl p-6">
              <p className="text-[#c7ccd6] font-semibold text-sm mb-3" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.7rem" }}>Our Guarantee</p>
              <p className="text-white/40 text-sm" style={{ lineHeight: 1.75 }}>
                Every project comes with our written completion guarantee. If we scope it, we finish it, on time and on budget.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 backdrop-blur-sm gsap-contact-form">
            <h3 className="text-white text-xl mb-7" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}>Request a Free Project Assessment</h3>
            <ContactFormFull />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            {/* Footer logo */}
            <div className="mb-5">
              <Image src="/ofb-logo.png" alt="OFB of SWFL" width={52} height={52} className="rounded-sm" />
            </div>
            <p className="text-white/28 text-sm max-w-xs" style={{ lineHeight: 1.75 }}>
              Full-service office decommissioning and asset liquidation for corporate tenants and Fortune 1000 companies nationwide.
            </p>
          </div>

          <div>
            <p className="label-upper text-white/25 mb-5">Services</p>
            <ul className="space-y-2.5">
              {["Full Decommissioning", "Asset Liquidation", "Furniture Logistics", "Data Center Clearance", "Lease Surrender Planning"].map(s => (
                <li key={s}>
                  <motion.a href="#services" className="text-white/35 hover:text-white/65 text-sm no-underline transition-colors cursor-pointer" whileHover={{ y: -1 }}>
                    {s}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-upper text-white/25 mb-5">Contact</p>
            <ul className="space-y-2.5">
              <li><a href={PHONE_HREF} className="text-white/35 hover:text-white/65 text-sm no-underline transition-colors">{PHONE}</a></li>
              <li><a href={EMAIL_HREF} className="text-white/35 hover:text-white/65 text-sm no-underline transition-colors">{EMAIL}</a></li>
              <li><span className="text-white/25 text-sm">Naples, FL, Serving Nationwide</span></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/[0.05] mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/18 text-xs">© {new Date().getFullYear()} Office Furniture Brokers of SW Florida. All rights reserved.</p>
          <p className="text-white/12 text-xs">Naples, FL · Serving 48 States</p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero
    const heroCtx = gsap.context(() => {
      gsap.fromTo(".gsap-hero > *",
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power3.out", delay: 0.05 }
      );
      gsap.fromTo(".gsap-hero-form",
        { opacity: 0, y: 28, scale: 0.975 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", delay: 0.05 }
      );
    });

    // Stats
    ScrollTrigger.create({
      trigger: ".gsap-stats",
      start: "top 95%",
      onEnter: () => gsap.fromTo(".gsap-stats",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      ),
    });

    // Services header
    ScrollTrigger.create({
      trigger: ".gsap-services-header",
      start: "top 94%",
      onEnter: () => gsap.fromTo(".gsap-services-header > *",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.32, stagger: 0.06, ease: "power2.out" }
      ),
    });

    // Timeline header
    ScrollTrigger.create({
      trigger: ".gsap-timeline-header",
      start: "top 94%",
      onEnter: () => gsap.fromTo(".gsap-timeline-header > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      ),
    });

    // Jeff / testimonial
    ScrollTrigger.create({
      trigger: ".gsap-jeff-card",
      start: "top 94%",
      onEnter: () => gsap.fromTo(".gsap-jeff-card > *",
        { opacity: 0, x: -38 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" }
      ),
    });

    // Contact
    ScrollTrigger.create({
      trigger: ".gsap-contact-left",
      start: "top 94%",
      onEnter: () => {
        gsap.fromTo(".gsap-contact-left > *",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }
        );
        gsap.fromTo(".gsap-contact-form",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", delay: 0.05 }
        );
      },
    });

    return () => {
      heroCtx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="bg-[#0e1530] min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <ScrollProgress />
      <Nav />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <ProcessTimeline />
      <TestimonialSection />
      <WhyOFBSection />
      <GlobeSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
