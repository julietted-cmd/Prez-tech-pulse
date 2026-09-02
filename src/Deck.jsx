import React, { useState, useEffect, useCallback, useRef } from "react";
import { LIVE, CHAPITRES } from "./data.js";
import { SLIDES } from "./slides.jsx";

/* ===================== helpers ===================== */

export const fmtNum = (v) =>
  Number(v).toLocaleString("fr-FR").replace(/\u202F|\u00A0/g, "\u2009");

export const fmtDec = (v) => String(v).replace(".", ",");

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Count-up : le seul effet non déclenché par l'utilisateur du deck.
   Il ne tourne qu'une fois, à l'entrée de la slide. */
export function useCountUp(target, { duration = 900, decimals = 0, active = true } = {}) {
  const [value, setValue] = useState(active ? 0 : target);
  const raf = useRef();

  useEffect(() => {
    if (!active) return;
    if (prefersReduced()) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const raw = target * eased;
      setValue(decimals ? Math.round(raw * 10 ** decimals) / 10 ** decimals : Math.round(raw));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, decimals, active]);

  return value;
}

/* ===================== primitives ===================== */

export const Slide = ({ children, center = false, className = "" }) => (
  <div
    className={`h-full w-full flex flex-col ${center ? "items-center justify-center text-center" : "justify-center"} ${className}`}
  >
    <div className={`w-full ${center ? "max-w-4xl" : "max-w-[1180px]"}`}>{children}</div>
  </div>
);

export const Kicker = ({ children, color = "var(--signal)" }) => (
  <div className="flex items-center gap-2.5 mb-5">
    <span
      style={{ width: 8, height: 8, borderRadius: 999, background: color, boxShadow: `0 0 12px ${color}` }}
    />
    <span className="font-medium" style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>
      {children}
    </span>
  </div>
);

export const Titre = ({ children, size = 1 }) => (
  <h2
    className="font-bold text-white"
    style={{
      fontSize: size === 1 ? "clamp(30px, 4.2vw, 56px)" : "clamp(24px, 3vw, 38px)",
      lineHeight: 1.05,
      letterSpacing: "-0.025em",
      maxWidth: "26ch",
    }}
  >
    {children}
  </h2>
);

export const Corps = ({ children, className = "" }) => (
  <p
    className={className}
    style={{
      color: "rgba(255,255,255,0.72)",
      fontSize: "clamp(15px, 1.25vw, 19px)",
      lineHeight: 1.55,
      maxWidth: "62ch",
    }}
  >
    {children}
  </p>
);

/* Le chiffre géant. Une seule chose mémorable par slide. */
export const BigNum = ({ value, suffix = "", decimals = 0, active, unite, color = "#fff" }) => {
  const n = useCountUp(value, { decimals, active });
  return (
    <div className="flex flex-col">
      <div
        className="font-extrabold tnum"
        style={{
          fontSize: suffix ? "clamp(56px, 10.5vw, 138px)" : "clamp(64px, 13vw, 168px)",
          lineHeight: 0.86,
          letterSpacing: "-0.045em",
          color,
          whiteSpace: "nowrap",
        }}
      >
        {decimals ? fmtDec(n.toFixed(decimals)) : fmtNum(n)}
        {suffix && (
          <span style={{ fontSize: "0.34em", letterSpacing: "-0.02em", marginLeft: 2 }}>{suffix}</span>
        )}
      </div>
      {unite && (
        <div className="mt-3 font-medium" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px, 1.3vw, 19px)" }}>
          {unite}
        </div>
      )}
    </div>
  );
};

export const Deux = ({ children, ratio = "1fr 1fr", gap = 56, align = "center" }) => (
  <div className="deux" style={{ "--cols": ratio, "--gap": `${gap}px`, alignItems: align }}>
    {children}
  </div>
);

export const Glass = ({ children, className = "", style = {} }) => (
  <div className={`glass rounded-2xl ${className}`} style={style}>
    {children}
  </div>
);

/* baseZero : cale l'axe sur 0. Indispensable sur une série stable, sinon
   l'échelle automatique transforme un plateau en effondrement visuel. */
export const Sparkline = ({ serie, labels, color = "#fff", height = 54, baseZero = false }) => {
  const min = baseZero ? 0 : Math.min(...serie);
  const max = Math.max(...serie);
  const span = max - min || 1;
  const w = 100;
  const pts = serie.map((v, i) => [
    (i / (serie.length - 1)) * w,
    height - ((v - min) / span) * (height - 10) - 5,
  ]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
        <path d={d} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.4" fill={color} />
      </svg>
      {labels && (
        <div className="flex justify-between mt-1.5" style={{ color: "rgba(255,255,255,0.34)", fontSize: 11 }}>
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export const Delta = ({ value, suffix = "", inverse = false }) => {
  if (value == null) return null;
  const pos = value > 0;
  const good = inverse ? !pos : pos;
  const color = value === 0 ? "rgba(255,255,255,0.4)" : good ? "var(--data)" : "var(--signal)";
  return (
    <span className="font-semibold tnum" style={{ color, fontSize: 14 }}>
      {pos ? "+" : ""}
      {fmtDec(value)}
      {suffix}
    </span>
  );
};

/* ===================== rail de chapitres ===================== */

const Rail = ({ index, total, onJump }) => {
  const current = SLIDES[index].chapitre;
  return (
    <nav aria-label="Chapitres" className="hidden lg:flex flex-col gap-0 select-none">
      {CHAPITRES.map((ch, i) => {
        const slidesDuChap = SLIDES.map((s, si) => (s.chapitre === ch.id ? si : -1)).filter((si) => si >= 0);
        const actif = current === ch.id;
        const passe = slidesDuChap.length > 0 && index > slidesDuChap[slidesDuChap.length - 1];
        return (
          <button
            key={ch.id}
            onClick={() => slidesDuChap.length && onJump(slidesDuChap[0])}
            className="text-left flex items-center gap-3 py-2.5 group"
            style={{ cursor: slidesDuChap.length ? "pointer" : "default" }}
          >
            <span
              className="tnum"
              style={{
                fontSize: 11,
                width: 14,
                color: actif ? "#fff" : passe ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.22)",
                transition: "color .3s",
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                display: "block",
                width: actif ? 26 : 14,
                height: 2,
                borderRadius: 2,
                background: actif ? "var(--indigo)" : passe ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.14)",
                transition: "all .35s",
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: actif ? 600 : 400,
                color: actif ? "#fff" : passe ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.28)",
                transition: "color .3s",
              }}
            >
              {ch.titre}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

/* ===================== vue d'ensemble ===================== */

const Overview = ({ onPick, onClose, index }) => (
  <div
    className="fixed inset-0 z-50 overflow-y-auto no-scrollbar"
    style={{ background: "rgba(4,4,6,0.96)", backdropFilter: "blur(8px)" }}
    role="dialog"
    aria-label="Vue d'ensemble des slides"
  >
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-bold text-white" style={{ fontSize: 24 }}>
          Vue d'ensemble
        </h2>
        <button onClick={onClose} style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>
          Fermer (Échap)
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SLIDES.map((s, i) => {
          const ch = CHAPITRES.find((c) => c.id === s.chapitre);
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              className="glass rounded-xl p-4 text-left"
              style={{ borderColor: i === index ? "var(--indigo)" : undefined }}
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="tnum" style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {ch && (
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{ch.titre}</span>
                )}
              </div>
              <div className="text-white font-semibold" style={{ fontSize: 15, lineHeight: 1.25 }}>
                {s.nav}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

/* ===================== deck ===================== */

export default function Deck() {
  const total = SLIDES.length;
  const [index, setIndex] = useState(() => {
    const h = parseInt(window.location.hash.replace("#", ""), 10);
    return Number.isFinite(h) && h >= 1 && h <= total ? h - 1 : 0;
  });
  const [overview, setOverview] = useState(false);
  const touch = useRef(null);

  const go = useCallback(
    (n) => setIndex((i) => Math.min(total - 1, Math.max(0, typeof n === "function" ? n(i) : n))),
    [total]
  );

  useEffect(() => {
    if (window.location.hash !== `#${index + 1}`) window.location.hash = String(index + 1);
  }, [index]);

  /* Permet de taper #7 dans la barre d'adresse et d'y sauter directement. */
  useEffect(() => {
    const onHash = () => {
      const h = parseInt(window.location.hash.replace("#", ""), 10);
      if (Number.isFinite(h) && h >= 1 && h <= total) setIndex(h - 1);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (overview) {
        if (e.key === "Escape") setOverview(false);
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          e.preventDefault();
          go((i) => i + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go((i) => i - 1);
          break;
        case "Home":
          go(0);
          break;
        case "End":
          go(total - 1);
          break;
        case "g":
        case "G":
          setOverview(true);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen?.();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, overview, total]);

  const onTouchStart = (e) => (touch.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 55) go((i) => i + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  const Current = SLIDES[index].render;
  const progress = ((index + 1) / total) * 100;

  return (
    <div
      className="tpc-grid h-full w-full relative"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* halo indigo, blur primaire officiel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 88% 92%, rgba(37,29,231,0.22) 0%, rgba(8,8,8,0) 70%)",
        }}
      />

      {/* barre de progression */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-30" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "var(--indigo)",
            transition: "width .4s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>

      {/* en-tête */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 pt-6">
        <button
          onClick={() => go(0)}
          className="text-white font-extrabold"
          style={{ fontSize: 20, letterSpacing: "-0.03em" }}
          aria-label="Retour à la première slide"
        >
          TPC.
        </button>
        <div className="flex items-center gap-4">
          <span
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.08)", fontSize: 12.5 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--signal)" }} />
            <span className="font-medium text-white">Live</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>
              {LIVE.dateCourte} · {LIVE.heure}
            </span>
          </span>
        </div>
      </header>

      {/* corps */}
      <main
        className="h-full w-full grid px-6 sm:px-10 lg:px-14"
        style={{ gridTemplateColumns: "minmax(0,1fr)", paddingTop: 88, paddingBottom: 76 }}
      >
        <div className="h-full min-h-0 grid gap-10" style={{ gridTemplateColumns: "1fr" }}>
          <div className="h-full min-h-0 flex">
            {SLIDES[index].chapitre && (
              <div className="hidden lg:flex flex-col justify-center pr-12" style={{ width: 210, flexShrink: 0 }}>
                <Rail index={index} total={total} onJump={go} />
              </div>
            )}
            <div className="flex-1 min-w-0 h-full overflow-y-auto no-scrollbar" key={index}>
              <Current active />
            </div>
          </div>
        </div>
      </main>

      {/* pied */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 pb-5">
        <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          {LIVE.runLabel}
        </span>
        <span className="sm:hidden" />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOverview(true)}
            className="rounded-lg px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", fontSize: 12 }}
          >
            Sommaire
          </button>
          <button
            onClick={() => go((i) => i - 1)}
            disabled={index === 0}
            className="rounded-lg w-9 h-9 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              opacity: index === 0 ? 0.3 : 1,
            }}
            aria-label="Slide précédente"
          >
            ‹
          </button>
          <button
            onClick={() => go((i) => i + 1)}
            disabled={index === total - 1}
            className="rounded-lg w-9 h-9 flex items-center justify-center"
            style={{
              background: index === total - 1 ? "rgba(255,255,255,0.06)" : "var(--indigo)",
              color: "#fff",
              opacity: index === total - 1 ? 0.3 : 1,
            }}
            aria-label="Slide suivante"
          >
            ›
          </button>
          <span className="tnum ml-1" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12.5 }}>
            {String(index + 1).padStart(2, "0")} / {total}
          </span>
        </div>
      </footer>

      {overview && (
        <Overview
          index={index}
          onClose={() => setOverview(false)}
          onPick={(i) => {
            go(i);
            setOverview(false);
          }}
        />
      )}
    </div>
  );
}
