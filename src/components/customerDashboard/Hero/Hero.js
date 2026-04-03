"use client";

import "@/styles/publicStyles/hero.css";
import SearchBar from "@/components/customerDashboard/SearchBar/SearchBar";
import { useLanguage } from "@/context/LanguageContext";

export default function AuthCustomerHero() {
  const { t } = useLanguage();

  return (
    <section className="hero dashboard-hero">
      {/* Animated Background */}
      <div className="hero-bg-animation">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Content */}
      <div className="hero-content auth-hero">
        <p className="tagline">{t("authHero.tagline")}</p>

        <h1>{t("authHero.title")}</h1>

        <p className="subtitle">
          {t("authHero.subtitle")}
        </p>

        {/* Search Bar */}
        <div className="search-wrapper">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}