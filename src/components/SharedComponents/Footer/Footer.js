"use client";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaEnvelope,
} from "react-icons/fa";
import "./footer.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Footer({
  customers = "50K+",
  providers = "2K+",
  ratings = "4.8M+",
}) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const darkMode = theme === "dark";

  return (
    <div className={`footer ${darkMode ? "dark" : ""}`}>
      {/* ================= CENTER CONTENT ================= */}
      <div className="footer-center">
        {/* ================= STATS ================= */}
        <div className="footer-stats">
          <div className="stat">
            <strong>{customers}</strong>
            <span>{t("footer.trustedCustomers")}</span>
          </div>

          <div className="stat">
            <strong>{providers}</strong>
            <span>{t("footer.verifiedProviders")}</span>
          </div>

          <div className="stat">
            <strong>{ratings}</strong>
            <span>{t("footer.ratings")}</span>
          </div>
        </div>

        {/* ================= SOCIAL ICONS ================= */}
        <div className="footer-socials">
          <a href="https://wa.me/923214703384" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">
            <FaWhatsapp />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="TikTok">
            <FaTiktok />
          </a>
          <a href="#" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        {/* ================= DOWNLOAD APP ================= */}
        <div className="footer-cta">
          <button className="download-btn">{t("footer.downloadApp")}</button>
        </div>
      </div>

      {/* ================= COPYRIGHT (BOTTOM) ================= */}
      <p className="footer-copy">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </p>
    </div>
  );
}