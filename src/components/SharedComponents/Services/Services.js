"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import "./services.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const SERVICES = [
  { key: "services.electrician",  descKey: "services.electricianDesc",  icon: "⚡" },
  { key: "services.plumber",      descKey: "services.plumberDesc",      icon: "🔧" },
  { key: "services.cleaner",      descKey: "services.cleanerDesc",      icon: "🧹" },
  { key: "services.carpenter",    descKey: "services.carpenterDesc",    icon: "🪚" },
  { key: "services.gardener",     descKey: "services.gardenerDesc",     icon: "🌿" },
  { key: "services.painter",      descKey: "services.painterDesc",      icon: "🎨" },
];

export default function Services() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const darkMode = theme === "dark";
  const total = SERVICES.length;
  const [current, setCurrent]       = useState(0);
  const [isMobile, setIsMobile]     = useState(false);
  const [translateZ, setTranslateZ] = useState(300);

  const touchStart = useRef(0);
  const touchEnd   = useRef(0);

  const computeLayout = useCallback(() => {
    const w = window.innerWidth;
    setIsMobile(w <= 768);
    if (w >= 1025)      setTranslateZ(300);
    else if (w >= 769)  setTranslateZ(210);
  }, []);

  useEffect(() => {
    computeLayout();
    window.addEventListener("resize", computeLayout);
    return () => window.removeEventListener("resize", computeLayout);
  }, [computeLayout]);

  const next = useCallback(() => setCurrent(p => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + total) % total), [total]);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchMove  = (e) => { touchEnd.current   = e.touches[0].clientX; };
  const onTouchEnd   = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchStart.current = 0; touchEnd.current = 0;
  };

  useEffect(() => {
    const timer = setInterval(next, 3400);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className={`svc-section ${darkMode ? "dark" : ""}`}>
      <div className="svc-inner">

        <div className="svc-header">
          <div className="svc-header-top">
            <span className="svc-eyebrow">{t("services.whatWeOffer")}</span>
            <Link href="/all-providers" className="svc-see-all">
              {t("navbar.seeAll")}
            </Link>
          </div>
          <h2 className="svc-title">{t("services.ourServices")}</h2>
          <p className="svc-subtitle">{t("services.trustedProfessionals")}</p>
        </div>

        {/* ── Desktop 3D carousel ── */}
        {!isMobile && (
          <div className="svc-carousel-wrap">
            <div className="svc-scene">
              <div className="svc-carousel-3d">
                {SERVICES.map((s, i) => {
                  const angle    = (360 / total) * i;
                  const rotation = angle - (360 / total) * current;
                  return (
                    <div
                      key={i}
                      className="svc-card"
                      style={{ transform: `rotateY(${rotation}deg) translateZ(${translateZ}px)` }}
                    >
                      <div className="svc-card-inner">
                        <div className="svc-number">{i + 1}</div>
                        <div className="svc-icon-wrap">
                          <span className="svc-emoji">{s.icon}</span>
                        </div>
                        <h3 className="svc-card-name">{t(s.key)}</h3>
                        <p className="svc-card-desc">{t(s.descKey)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="svc-btn svc-prev" onClick={prev} aria-label={t("services.prev")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="svc-btn svc-next" onClick={next} aria-label={t("services.next")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── Mobile flat stack ── */}
        {isMobile && (
          <div
            className="svc-mobile-wrap"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="svc-mobile-track">
              {SERVICES.map((s, i) => {
                const offset   = i - current;
                const isActive = offset === 0;
                const isNext   = offset === 1;
                const isPrev   = offset === -1;
                const isHidden = Math.abs(offset) > 1;
                return (
                  <div key={i} className={`svc-mobile-card${isActive ? " active" : ""}${isNext ? " peek-right" : ""}${isPrev ? " peek-left" : ""}${isHidden ? " hidden" : ""}`}>
                    <div className="svc-number">{i + 1}</div>
                    <div className="svc-icon-wrap">
                      <span className="svc-emoji">{s.icon}</span>
                    </div>
                    <h3 className="svc-card-name">{t(s.key)}</h3>
                    <p className="svc-card-desc">{t(s.descKey)}</p>
                  </div>
                );
              })}
            </div>

            <div className="svc-mobile-controls">
              <button className="svc-btn" onClick={prev} aria-label={t("services.prev")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <div className="svc-dots">
                {SERVICES.map((_, i) => (
                  <button key={i} className={`svc-dot${i === current ? " active" : ""}`}
                    onClick={() => setCurrent(i)} aria-label={t("services.slide", { number: i + 1 })} />
                ))}
              </div>
              <button className="svc-btn" onClick={next} aria-label={t("services.next")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Dots — desktop only */}
        {!isMobile && (
          <div className="svc-dots">
            {SERVICES.map((_, i) => (
              <button key={i} className={`svc-dot${i === current ? " active" : ""}`}
                onClick={() => setCurrent(i)} aria-label={t("services.slide", { number: i + 1 })} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}