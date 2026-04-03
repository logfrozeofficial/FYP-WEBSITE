"use client";

import { useEffect, useRef } from "react";
import "./howItWorks.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function HowItWorks() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const stepsRef = useRef([]);

  const darkMode = theme === "dark";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: t("how.step1.title"),
      desc: t("how.step1.desc"),
      icon: "🔍",
    },
    {
      title: t("how.step2.title"),
      desc: t("how.step2.desc"),
      icon: "📝",
    },
    {
      title: t("how.step3.title"),
      desc: t("how.step3.desc"),
      icon: "🤝",
    },
  ];

  return (
    <div className={`howItWorks-section ${darkMode ? "dark" : ""}`}>
      <h2>{t("how.title")}</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            className="step-card"
            key={index}
            ref={(el) => (stepsRef.current[index] = el)}
            style={{ transitionDelay: `${index * 0.3}s` }}
          >
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            {index < steps.length - 1 && (
              <div className="step-arrow">➜</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}