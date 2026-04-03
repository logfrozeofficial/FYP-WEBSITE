"use client";

import { useState, useEffect, useRef } from "react";
import "./searchBar.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// ── Inline SVGs ──
const IconSearch = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconPin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconDollar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconFilter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

const IconClose = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    style={{ display: "block", flexShrink: 0 }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconChevron = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const BUDGET_OPTIONS = ["Any", "Under 200", "200–350", "350–500", "500–1000", "1000+"];

export default function SearchBar() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [showFilter, setShowFilter] = useState(false);
  const [location, setLocation]     = useState("");
  const [budget, setBudget]         = useState("");
  const [query, setQuery]           = useState("");
  const [sheetVisible, setSheetVisible] = useState(false);

  const darkMode = theme === "dark";
  const inputRef = useRef(null);
  const filterActive = location || budget;

  useEffect(() => {
    if (showFilter) {
      requestAnimationFrame(() => setSheetVisible(true));
    } else {
      setSheetVisible(false);
    }
  }, [showFilter]);

  const openFilter = () => setShowFilter(true);
  const closeFilter = () => {
    setSheetVisible(false);
    setTimeout(() => setShowFilter(false), 320);
  };

  const openMap = () => {
    setLocation("Karachi, PK");
  };

  const handleSearch = () => {
    console.log("Search:", { query, location, budget });
  };

  return (
    <>
      <div className={`sb-wrap ${darkMode ? "dark" : ""}`}>
        <div className="sb-field sb-main">
          <span className="sb-field-icon">
            <IconSearch size={17} />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder={t("search.placeholder")}
            className="sb-input"
          />
          {query && (
            <button className="sb-clear" onClick={() => setQuery("")} aria-label="Clear">
              <IconClose size={14} />
            </button>
          )}
        </div>

        <div className="sb-desktop-filters">
          <div className="sb-divider" />
          <button className="sb-field sb-location" onClick={openMap}>
            <span className="sb-field-icon"><IconPin size={15} /></span>
            <span className="sb-field-text">{location || t("search.location")}</span>
          </button>

          <div className="sb-divider" />

          <div className="sb-field sb-budget">
            <span className="sb-field-icon"><IconDollar size={15} /></span>
            <select
              value={budget}
              onChange={e => setBudget(e.target.value)}
              className="sb-select"
            >
              <option value="">{t("search.budget")}</option>
              {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="sb-chevron"><IconChevron size={13} /></span>
          </div>
        </div>

        <button
          className={`sb-filter-btn ${filterActive ? "active" : ""}`}
          onClick={openFilter}
          aria-label="Filters"
        >
          <IconFilter size={18} />
          {filterActive && <span className="sb-filter-dot" />}
        </button>

        <button className="sb-search-btn" onClick={handleSearch} aria-label="Search">
          <IconSearch size={18} />
        </button>
      </div>

      {showFilter && (
        <div
          className={`sb-overlay ${sheetVisible ? "visible" : ""}`}
          onClick={closeFilter}
        >
          <div
            className={`sb-sheet ${sheetVisible ? "open" : ""} ${darkMode ? "dark" : ""}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="sb-handle" />
            <div className="sb-sheet-header">
              <span className="sb-sheet-title">{t("search.filters")}</span>
              <button className="sb-sheet-close" onClick={closeFilter}>
                <IconClose size={18} />
              </button>
            </div>

            <div className="sb-sheet-section">
              <label className="sb-sheet-label">
                <IconPin size={14} /> {t("search.location")}
              </label>
              <button
                className={`sb-sheet-field ${location ? "filled" : ""}`}
                onClick={openMap}
              >
                <span>{location || t("search.tapLocation")}</span>
                <IconChevron size={14} />
              </button>
            </div>

            <div className="sb-sheet-section">
              <label className="sb-sheet-label">
                <IconDollar size={14} /> {t("search.range")}
              </label>
              <div className="sb-budget-grid">
                {BUDGET_OPTIONS.filter(o => o !== "Any").map(o => (
                  <button
                    key={o}
                    className={`sb-budget-chip ${budget === o ? "selected" : ""}`}
                    onClick={() => setBudget(budget === o ? "" : o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="sb-sheet-actions">
              <button
                className="sb-sheet-reset"
                onClick={() => { setLocation(""); setBudget(""); }}
              >
                {t("search.reset")}
              </button>
              <button className="sb-sheet-apply" onClick={closeFilter}>
                {t("search.apply")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}