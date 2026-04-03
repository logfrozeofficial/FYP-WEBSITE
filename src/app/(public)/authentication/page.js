"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sun, Moon, Globe } from "lucide-react";
import "@/styles/authentication.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Authentication() {
  const { t, locale, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);

  const darkMode = theme === "dark";

  return (
    <div
      className={`auth-container 
        ${isSignup ? "right-panel-active" : ""} 
        ${darkMode ? "dark" : ""}`}
    >
      {/* ================= TOP TOOLS ================= */}
      <div className="top-tools">
        <Link href="/" className="back-home" title="Back to Home">
          <ArrowLeft size={18} />
        </Link>
        <button onClick={toggleTheme} title="Toggle Theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={() => changeLanguage(locale === "en" ? "ur" : "en")} title="Change Language">
          <Globe size={18} />
          <span style={{ marginLeft: "4px", fontWeight: "bold" }}>{locale.toUpperCase()}</span>
        </button>
      </div>

      {/* ================= SIGN IN ================= */}
      <div id="login" className="form-container sign-in-container">
        <form onSubmit={(e) => {
          e.preventDefault();
          const mockUser = {
            name: "User Login",
            email: e.target[0].value,
            role: "customer",
            avatar: "https://i.pravatar.cc/150?u=logged-in"
          };
          localStorage.setItem("svx_user", JSON.stringify(mockUser));
          window.location.href = "/";
        }}>
          <h1>{t("auth.login")}</h1>

          <input type="email" placeholder="Gmail Address" required />
          <input type="password" placeholder="Password" required />

          <a href="#" className="link-left">{t("auth.forgot")}</a>

          <button type="submit">{t("auth.login")}</button>

          <p className="switch-link">
            {t("auth.noAccount")}{" "}
            <span onClick={() => {
              setIsSignup(true);
              setStep(1);
            }}>
              {t("auth.signup")}
            </span>
          </p>
        </form>
      </div>

      {/* ================= SIGN UP ================= */}
      <div id="signup" className="form-container sign-up-container">
        <form onSubmit={(e) => {
          e.preventDefault();
          const mockUser = {
            name: "New Member",
            email: "new@example.com",
            role: role || "customer",
            avatar: "https://i.pravatar.cc/150?u=new-member"
          };
          localStorage.setItem("svx_user", JSON.stringify(mockUser));
          window.location.href = "/";
        }}>
          {step === 1 && (
            <>
              <h1>{t("auth.signup")}</h1>

              <div className="role-select">
                <button
                  type="button"
                  className="btn-role"
                  onClick={() => {
                    setRole("customer");
                    setStep(2);
                  }}
                >
                  {t("auth.customer")}
                </button>

                <button
                  type="button"
                  className="btn-role"
                  onClick={() => {
                    setRole("provider");
                    setStep(2);
                  }}
                >
                  {t("auth.provider")}
                </button>
              </div>

              <p className="switch-link">
                {t("auth.haveAccount")}{" "}
                <span onClick={() => setIsSignup(false)}>
                  {t("auth.login")}
                </span>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h2>{t("auth.basicInfo")}</h2>

              <input placeholder="Full Name" required />
              <input placeholder="CNIC (xxxxx-xxxxxxx-x)" required />
              <input placeholder="Phone (+92xxxxxxxxxx)" required />
              <input type="email" placeholder="Gmail Address" required />
              <input placeholder="City" required />
              <input placeholder="Address" required />

              <div className="step-controls">
                <button type="button" className="btn-back" onClick={() => setStep(1)}>
                  {t("auth.back")}
                </button>
                <button type="button" className="btn-next" onClick={() => setStep(3)}>
                  {t("auth.next")}
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>{t("auth.profile")}</h2>

              <input type="file" accept="image/*" required />

              {role === "provider" && (
                <>
                  <input placeholder="Service Category" required />
                  <input type="number" placeholder="Experience (Years)" required />
                  <input type="file" required />
                  <input type="file" required />
                </>
              )}

              <div className="step-controls">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>
                  {t("auth.back")}
                </button>
                <button type="submit" className="btn-submit">
                  {t("auth.create")}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* ================= OVERLAY ================= */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>{t("auth.welcomeBack")}</h1>
            <p>{t("auth.loginDesc")}</p>
            <button onClick={() => {
              setIsSignup(false);
              setStep(1);
            }}>
              {t("auth.login")}
            </button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1>{t("auth.join")}</h1>
            <p>{t("auth.signupDesc")}</p>
            <button onClick={() => {
              setIsSignup(true);
              setStep(1);
            }}>
              {t("auth.signup")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
