"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// ← Paste your .splinecode URL here when you have it
export const SPLINE_URL = "";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function SplineHero() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* CSS animated hero background — no WebGL required, always renders */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 70% 30%, rgba(139,147,166,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 85% 60%, rgba(40,50,79,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(26,36,64,0.35) 0%, transparent 70%)
          `,
        }}
      />

      {/* Animated shimmer lines — evoke the chrome swooshes from the OFB banner */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sweep1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#c7ccd6" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="4s" repeatCount="indefinite" />
          </linearGradient>
          <linearGradient id="sweep2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="35%" stopColor="#8b93a6" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#a0b8e8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="5.5s" begin="1.2s" repeatCount="indefinite" />
          </linearGradient>
        </defs>
        <path d="M-100 200 Q300 100 700 280 Q1000 420 1300 180" stroke="url(#sweep1)" strokeWidth="1.5" fill="none" />
        <path d="M-100 320 Q400 200 750 350 Q1050 470 1300 260" stroke="url(#sweep1)" strokeWidth="0.8" fill="none" />
        <path d="M-100 150 Q350 50 800 230 Q1100 370 1300 130" stroke="url(#sweep2)" strokeWidth="1.2" fill="none" />
        <path d="M-100 420 Q300 300 700 420 Q1000 520 1300 350" stroke="url(#sweep2)" strokeWidth="0.6" fill="none" />
      </svg>

      {/* Optional Spline scene — drop in your .splinecode URL above to activate */}
      {SPLINE_URL && (
        <Suspense fallback={null}>
          <Spline
            scene={SPLINE_URL}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.8 }}
          />
        </Suspense>
      )}

      {/* Edge gradients — blend into page */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "14rem", background: "linear-gradient(to bottom, transparent 0%, #0e1530 100%)" }} />
      <div style={{ position: "absolute", inset: "0 0 0 0", width: "40%", background: "linear-gradient(to right, #0e1530 0%, rgba(14,21,48,0.55) 60%, transparent 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6rem", background: "linear-gradient(to bottom, #0e1530 0%, transparent 100%)" }} />
    </div>
  );
}
