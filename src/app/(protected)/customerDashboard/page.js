"use client";

import { useState } from "react";
import "@/styles/landingPage.css";

// COMPONENTS
import NavBar from "@/components/SharedComponents/NavBar/NavBar";
import Hero from "@/components/customerDashboard/Hero/Hero";
import Services from "@/components/SharedComponents/Services/Services";
import HowItWorks from "@/components/SharedComponents/HowItWorks/HowItWorks";
import Providers from "@/components/SharedComponents/Providers/Providers";
import Footer from "@/components/SharedComponents/Footer/Footer";

export default function CustomerDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`lp-page ${darkMode ? "dark" : ""}`}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} type="dashboard" />

      <main className="lp-main">

        <section id="home" className="lp-section lp-hero">
          <Hero darkMode={darkMode} />
        </section>

        <section id="services" className="lp-section lp-services">
          <Services darkMode={darkMode} />
        </section>

        <section id="how-it-works" className="lp-section lp-hiw">
          <HowItWorks darkMode={darkMode} />
        </section>

        <section id="providers" className="lp-section lp-providers">
          <Providers darkMode={darkMode} />
        </section>

        <footer id="footer" className="lp-footer">
          <Footer darkMode={darkMode} />
        </footer>

      </main>
    </div>
  );
}