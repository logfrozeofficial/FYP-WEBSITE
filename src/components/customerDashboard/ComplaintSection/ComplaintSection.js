"use client";

import { useState, useRef, useEffect } from "react";
import { ClipboardList } from "lucide-react";
import ComplaintCard from "@/components/customerDashboard/ComplaintCard/ComplaintCard";
import "./complaintSection.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function ComplaintsSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [complaints] = useState([
    { id: 1, title: "Air Conditioner Not Cooling", status: "Pending", provider: "Ali Electric Works", time: null },
    { id: 2, title: "Washing Machine Leakage", status: "Accepted", provider: "RepairPro Solutions", time: "Tomorrow, 3:00 PM" },
    { id: 3, title: "Internet Connection Issue", status: "Rejected", provider: "NetFix Pvt. Ltd.", time: null },
    { id: 4, title: "Ceiling Fan Noise", status: "Done", provider: "HomeServe Team", time: "Yesterday, 1:30 PM" },
    { id: 5, title: "Heater Not Working", status: "Accepted", provider: "TechMate Services", time: "Monday, 10:00 AM" },
    { id: 6, title: "Water Pump Issue", status: "Pending", provider: "FixIt Team", time: null },
  ]);

  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const darkMode = theme === "dark";
  const sectionRef = useRef(null);

  /* Detect screen size */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* Show all on mobile */
  const visibleComplaints = isMobile
    ? complaints
    : expanded
    ? complaints
    : complaints.slice(0, 4);

  const handleToggle = () => {
    if (expanded) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setExpanded(!expanded);
  };

  return (
    <section className={`complaints-section ${darkMode ? "dark" : ""}`} ref={sectionRef}>
      <div className="complaints-container">

        {/* HEADER */}
        <div className="complaints-header">
          <h1>
            <ClipboardList size={22} />
            {t("complaints.title")}
          </h1>

          {/* Button ONLY on desktop */}
          {!isMobile && complaints.length > 4 && (
            <button onClick={handleToggle}>
              {expanded ? t("complaints.seeLess") : t("complaints.seeAll")}
            </button>
          )}
        </div>

        {/* GRID */}
        <div className={`complaints-grid ${expanded && !isMobile ? "expanded" : ""}`}>
          {visibleComplaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>

      </div>
    </section>
  );
}