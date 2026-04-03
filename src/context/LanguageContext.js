"use client";

import { createContext, useState, useContext, useEffect } from "react";
import en from "@/locales/en.json";
import ur from "@/locales/ur.json";

export const LanguageContext = createContext({});

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("servax-lang");
    if (savedLang) {
      setLocale(savedLang);
    } else {
      // Default to English
      setLocale("en");
    }
  }, []);

  // Update direction and localStorage when locale changes
  useEffect(() => {
    localStorage.setItem("servax-lang", locale);
    document.documentElement.dir = locale === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLanguage = (lang) => setLocale(lang);

  const t = (key, params = {}) => {
    const translations = locale === "en" ? en : ur;
    
    // First try direct access (for flat keys like "navbar.brand")
    let value = translations[key];
    
    // If not found, try nested access ("hero.title" -> translations["hero"]["title"])
    if (value === undefined) {
      const keys = key.split('.');
      let current = translations;
      for (const k of keys) {
        current = current?.[k];
      }
      value = current;
    }
    
    let str = value ?? key;
    if (typeof str !== 'string') return key;

    Object.entries(params).forEach(([k, v]) => {
      str = str.split(`{${k}}`).join(v);
    });
    return str;
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);