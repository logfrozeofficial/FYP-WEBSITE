// src/app/(public)/all-providers/page.js
"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/SharedComponents/NavBar/NavBar";
import Footer from "@/components/SharedComponents/Footer/Footer";
import { Star, Search, Filter, Phone, MessageSquare, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import "@/styles/allProviders.css";

const PROVIDERS_DATA = [
  { id: 1, name: "Ali Raza", category: "Electrician", rating: 4.8, rate: 800, image: "https://i.pravatar.cc/150?img=1", city: "Lahore", exp: "5 years" },
  { id: 2, name: "Sara Khan", category: "Plumber", rating: 4.6, rate: 600, image: "https://i.pravatar.cc/150?img=2", city: "Karachi", exp: "3 years" },
  { id: 3, name: "Bilal Ahmed", category: "Cleaner", rating: 4.9, rate: 1000, image: "https://i.pravatar.cc/150?img=3", city: "Islamabad", exp: "8 years" },
  { id: 4, name: "Hina Iqbal", category: "Carpenter", rating: 4.5, rate: 700, image: "https://i.pravatar.cc/150?img=4", city: "Lahore", exp: "4 years" },
  { id: 5, name: "Zain Malik", category: "Gardener", rating: 4.7, rate: 900, image: "https://i.pravatar.cc/150?img=5", city: "Faisalabad", exp: "6 years" },
  { id: 6, name: "Ayesha Noor", category: "Painter", rating: 4.6, rate: 650, image: "https://i.pravatar.cc/150?img=6", city: "Rawalpindi", exp: "2 years" },
  { id: 7, name: "Fahad Ali", category: "Electrician", rating: 4.5, rate: 750, image: "https://i.pravatar.cc/150?img=7", city: "Multan", exp: "4 years" },
  { id: 8, name: "Amna Sheikh", category: "Plumber", rating: 4.8, rate: 950, image: "https://i.pravatar.cc/150?img=8", city: "Lahore", exp: "7 years" },
];

export default function AllProvidersPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Electrician", "Plumber", "Cleaner", "Carpenter", "Gardener", "Painter"];

  const filteredProviders = useMemo(() => {
    return PROVIDERS_DATA.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  const darkMode = theme === "dark";

  return (
    <div className={`all-providers-page ${darkMode ? "dark" : ""}`}>
      <Navbar type="public" />
      
      <main className="ap-main">
        <header className="ap-header">
          <h1>{t("navbar.allProviders")}</h1>
          <p>Find and book top-rated professionals for all your needs.</p>
        </header>

        <section className="ap-filters-bar">
          <div className="ap-search-wrap">
            <Search size={20} className="ap-search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="ap-cats">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`ap-cat-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="ap-grid">
          {filteredProviders.length > 0 ? (
            filteredProviders.map(p => (
              <div key={p.id} className="ap-card">
                <div className="ap-card-top">
                  <img src={p.image} alt={p.name} />
                  <div className="ap-badge">{p.category}</div>
                </div>
                <div className="ap-card-body">
                  <div className="ap-name-row">
                    <h3>{p.name}</h3>
                    <div className="ap-rating">
                      <Star size={14} fill="#ff7a00" stroke="#ff7a00" />
                      <span>{p.rating}</span>
                    </div>
                  </div>
                  <div className="ap-info-row">
                    <MapPin size={14} /> <span>{p.city}</span>
                    <span className="ap-dot">•</span>
                    <span>{p.exp} Experience</span>
                  </div>
                  <div className="ap-price">
                    Starts from <strong>Rs. {p.rate}</strong>
                  </div>
                  <div className="ap-card-actions">
                    <button className="ap-btn-call"><Phone size={16} /> Call</button>
                    <button className="ap-btn-book">Book Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="ap-empty">
              <Search size={48} />
              <p>No providers found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
