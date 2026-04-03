"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import "@/styles/landingPage.css";

// COMPONENTS
import NavBar from "@/components/SharedComponents/NavBar/NavBar";
import CustomerHero from "@/components/publicComponents/Hero";
import Services from "@/components/SharedComponents/Services/Services";
import HowItWorks from "@/components/SharedComponents/HowItWorks/HowItWorks";
import Providers from "@/components/SharedComponents/Providers/Providers";
import Footer from "@/components/SharedComponents/Footer/Footer";
import LoadingScreen from "@/components/SharedComponents/LoadingScreen/LoadingScreen";

export default function LandingPage() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const darkMode = theme === "dark";

  // Handle smooth scroll to hash
  useEffect(() => {
    // Show loading for 2.5s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`lp-page ${darkMode ? "dark" : ""}`}>
      {loading && <LoadingScreen />}
      <NavBar type="public" />

      <main className="lp-main">

        <section id="home" className="lp-section lp-hero">
          <CustomerHero />
        </section>

        <section id="services" className="lp-section lp-services">
          <Services />
        </section>

        <section id="how-it-works" className="lp-section lp-hiw">
          <HowItWorks />
        </section>

        <section id="providers" className="lp-section lp-providers">
          <Providers />
        </section>

        <footer id="footer" className="lp-footer">
          <Footer />
        </footer>

      </main>
    </div>
  );
}