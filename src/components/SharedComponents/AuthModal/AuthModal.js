// src/components/SharedComponents/AuthModal/AuthModal.js
"use client";

import { useState, useEffect } from "react";
import "./AuthModal.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { X, ArrowLeft, Camera, ShieldCheck } from "lucide-react";

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setMode(initialMode);
      setStep(1);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "auto";
    }
  }, [isOpen, initialMode]);

  if (!isOpen && !isVisible) return null;

  const handleSwitchToSignup = () => {
    setMode("signup");
    setStep(1);
  };

  const handleSwitchToLogin = () => {
    setMode("login");
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for point 1
    const mockUser = {
      name: "User Login",
      email: e.target[0].value,
      role: "customer",
      avatar: "https://i.pravatar.cc/150?u=logged-in"
    };
    localStorage.setItem("svx_user", JSON.stringify(mockUser));
    window.dispatchEvent(new Event("storage")); // Notify NavBar
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup for point 1
    const mockUser = {
      name: "New Member",
      email: "new@example.com",
      role: role || "customer",
      avatar: "https://i.pravatar.cc/150?u=new-member"
    };
    localStorage.setItem("svx_user", JSON.stringify(mockUser));
    window.dispatchEvent(new Event("storage")); // Notify NavBar
    onClose();
  };

  return (
    <div className={`auth-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div 
        className={`auth-modal-container ${theme === "dark" ? "dark" : ""} ${isOpen ? "animate-in" : "animate-out"}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="am-close" onClick={onClose}>
          <X size={20} />
        </button>

        {/* HEADER */}
        <div className="am-header">
          {mode === "login" ? (
            <>
              <h2>{t("auth.welcomeBack")}</h2>
              <p className="am-alert">You must be logged in or signup to book a service.</p>
            </>
          ) : (
            <>
              <h2>{t("auth.join")}</h2>
              <div className="am-steps">
                <div className={`am-step-dot ${step >= 1 ? "active" : ""}`}>1</div>
                <div className={`am-step-line ${step >= 2 ? "active" : ""}`} />
                <div className={`am-step-dot ${step >= 2 ? "active" : ""}`}>2</div>
                <div className={`am-step-line ${step >= 3 ? "active" : ""}`} />
                <div className={`am-step-dot ${step >= 3 ? "active" : ""}`}>3</div>
              </div>
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="am-content">
          {mode === "login" ? (
            /* LOGIN VIEW */
            <form className="am-form" onSubmit={handleLogin}>
              <div className="am-input-group">
                <input type="email" placeholder="Gmail Address" required />
              </div>
              <div className="am-input-group">
                <input type="password" placeholder="Password" required />
              </div>
              <a href="#" className="am-forgot">{t("auth.forgot")}</a>
              <button type="submit" className="am-submit">{t("auth.login")}</button>
              
              <p className="am-switch">
                {t("auth.noAccount")}{" "}
                <span onClick={handleSwitchToSignup}>{t("auth.signup")}</span>
              </p>
            </form>
          ) : (
            /* SIGNUP VIEW */
            <div className="am-signup-wrapper">
              {step === 1 && (
                <div className="am-signup-step animate-fade">
                  <h3>{t("auth.chooseRole")}</h3>
                  <div className="am-role-grid">
                    <button className={`am-role-card ${role === "customer" ? "active" : ""}`} 
                            onClick={() => { setRole("customer"); nextStep(); }}>
                      <div className="am-role-icon">👤</div>
                      <span>{t("auth.customer")}</span>
                    </button>
                    <button className={`am-role-card ${role === "provider" ? "active" : ""}`} 
                            onClick={() => { setRole("provider"); nextStep(); }}>
                      <div className="am-role-icon">🛠️</div>
                      <span>{t("auth.provider")}</span>
                    </button>
                  </div>
                  <p className="am-switch">
                    {t("auth.haveAccount")}{" "}
                    <span onClick={handleSwitchToLogin}>{t("auth.login")}</span>
                  </p>
                </div>
              )}

              {step === 2 && (
                <form className="am-form animate-fade" onSubmit={(e) => e.preventDefault()}>
                  <h3>{t("auth.basicInfo")}</h3>
                  <div className="am-grid-inputs">
                    <input placeholder="Full Name" required />
                    <input placeholder="CNIC (xxxxx-xxxxxxx-x)" required />
                    <input placeholder="Phone (+92xxxxxxxxxx)" required />
                    <input type="email" placeholder="Gmail Address" required />
                    <input placeholder="City" required />
                    <input placeholder="Address" required />
                  </div>
                  <div className="am-controls">
                    <button type="button" className="am-btn-secondary" onClick={prevStep}>
                      <ArrowLeft size={16} /> {t("auth.back")}
                    </button>
                    <button type="button" className="am-btn-primary" onClick={nextStep}>
                      {t("auth.next")}
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form className="am-form animate-fade" onSubmit={handleSignup}>
                  <h3>{t("auth.profile")}</h3>
                  
                  <div className="am-avatar-upload">
                    <div className="am-avatar-preview">
                      <Camera size={24} />
                    </div>
                    <label className="am-file-label">
                      Upload Profile Photo
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>

                  {role === "provider" && (
                    <div className="am-grid-inputs p-top">
                      <input placeholder="Service Category" required />
                      <input type="number" placeholder="Experience (Years)" required />
                      <div className="am-file-row">
                        <label>Identity Doc <input type="file" /></label>
                        <label>Business License <input type="file" /></label>
                      </div>
                    </div>
                  )}

                  <div className="am-controls">
                    <button type="button" className="am-btn-secondary" onClick={prevStep}>
                      <ArrowLeft size={16} /> {t("auth.back")}
                    </button>
                    <button type="submit" className="am-btn-primary am-final">
                      <ShieldCheck size={18} /> {t("auth.create")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
