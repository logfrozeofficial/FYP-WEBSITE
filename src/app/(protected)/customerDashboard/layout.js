"use client";

import { useState } from "react";
import NavBar from "@/components/SharedComponents/NavBar/NavBar";
import "@/styles/landingPage.css";

export default function CustomerDashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`page ${darkMode ? "dark" : ""}`}>
      {/* NAVBAR SHARED ACROSS CUSTOMER DASHBOARD */}
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} type="dashboard"/>

      {/* PAGE CONTENT */}
      <main className="sections-container">
        {children}
      </main>
    </div>
  );
}
