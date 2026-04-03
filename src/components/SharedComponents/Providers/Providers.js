"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import "./providers.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Providers() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const darkMode = theme === "dark";

  const providers = [
    { name: "Ali Raza", image: "https://i.pravatar.cc/150?img=1", rating: 4.8, rate: 800 },
    { name: "Sara Khan", image: "https://i.pravatar.cc/150?img=2", rating: 4.6, rate: 600 },
    { name: "Bilal Ahmed", image: "https://i.pravatar.cc/150?img=3", rating: 4.9, rate: 1000 },
    { name: "Hina Iqbal", image: "https://i.pravatar.cc/150?img=4", rating: 4.5, rate: 700 },
    { name: "Zain Malik", image: "https://i.pravatar.cc/150?img=5", rating: 4.7, rate: 900 },
    { name: "Ayesha Noor", image: "https://i.pravatar.cc/150?img=6", rating: 4.6, rate: 650 },
    { name: "Fahad Ali", image: "https://i.pravatar.cc/150?img=7", rating: 4.5, rate: 750 },
    { name: "Amna Sheikh", image: "https://i.pravatar.cc/150?img=8", rating: 4.8, rate: 950 }
  ];

  const rowRef = useRef(null);

  const scrollLeft = () => {
    if (rowRef.current) rowRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (rowRef.current) rowRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className={`providers-section ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="providers-header">
        <h2>{t("providers.title")}</h2>
        <Link href="/all-providers" className="link-btn">
          {t("providers.exploreAll")}
        </Link>
      </div>

      {/* Carousel */}
      <div className="carousel-wrapper">
        <button className="carousel-btn left" onClick={scrollLeft} aria-label="Previous">
          <ChevronLeft size={28} />
        </button>

        <div className="providers-row" ref={rowRef}>
          {providers.map((p, i) => (
            <div className="provider-card" key={i}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <div className="rating">
                <Star size={16} fill="#ff7a00" stroke="#ff7a00" />
                <span>{p.rating}</span>
              </div>
              <p className="price-tag">
                {t("providers.startsFrom", { rate: p.rate })}
              </p>
            </div>
          ))}
        </div>

        <button className="carousel-btn right" onClick={scrollRight} aria-label="Next">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}