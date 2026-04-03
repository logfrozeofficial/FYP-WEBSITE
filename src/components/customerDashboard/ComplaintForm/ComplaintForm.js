"use client";

import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import "./bookingForm.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// Dummy providers (top 3)
const topProviders = [
  { id: 1, name: "Ali Electric Works", rating: 4.8 },
  { id: 2, name: "RepairPro Solutions", rating: 4.7 },
  { id: 3, name: "HomeServe Team", rating: 4.6 },
];

export default function BookingComplaintForm({ preChosenProvider = null }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    name: "",
    phone: "",
    address: "",
    provider: preChosenProvider || null,
    otp: "",
  });

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const darkMode = theme === "dark";

  const sendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otp.toString());
    setOtpSent(true);
    alert(`OTP generated: ${otp}`);
  };

  const handleNext = () => {
    if (step === 2) sendOtp();
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProviderSelect = (provider) =>
    setFormData({ ...formData, provider });

  const submitForm = () => {
    alert("Booking submitted! Complaint card generated.");
    console.log(formData);
  };

  return (
    <section className={`booking-form ${darkMode ? "dark" : ""}`}>
      <div className="form-wrapper">
        <h1>{t("booking.title")}</h1>

        {/* STEP INDICATOR */}
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? "active" : ""}`}>{t("booking.step1")}</div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>{t("booking.step2")}</div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>{t("booking.step3")}</div>
        </div>

        {/* STEP 1: SERVICE CATEGORY & DESCRIPTION */}
        {step === 1 && (
          <div className="form-step">
            <label>
              {t("booking.category")}
              <input
                type="text"
                name="category"
                placeholder={t("booking.categoryPlaceholder")}
                value={formData.category}
                onChange={handleChange}
              />
            </label>

            <label>
              {t("booking.description")}
              <textarea
                name="description"
                rows={4}
                placeholder={t("booking.descriptionPlaceholder")}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
        )}

        {/* STEP 2: CONTACT DETAILS */}
        {step === 2 && (
          <div className="form-step">
            <label>
              {t("booking.name")}
              <input
                type="text"
                name="name"
                placeholder={t("booking.namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              {t("booking.phone")}
              <input
                type="tel"
                name="phone"
                placeholder={t("booking.phonePlaceholder")}
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              {t("booking.address")}
              <input
                type="text"
                name="address"
                placeholder={t("booking.addressPlaceholder")}
                value={formData.address}
                onChange={handleChange}
              />
              <MapPin size={18} className="icon-location" />
            </label>

            {/* OTP */}
            {otpSent && (
              <label>
                {t("booking.otp")}
                <input
                  type="text"
                  name="otp"
                  placeholder={t("booking.otpPlaceholder")}
                  value={formData.otp}
                  onChange={handleChange}
                />
              </label>
            )}
          </div>
        )}

        {/* STEP 3: PROVIDER SELECTION */}
        {step === 3 && (
          <div className="form-step">
            {formData.provider ? (
              <div className="chosen-provider">
                <h3>{t("booking.selected")}:</h3>
                <p>{formData.provider.name}</p>
              </div>
            ) : (
              <>
                <h3>{t("booking.select")}</h3>
                <div className="provider-grid">
                  {topProviders.map((p) => (
                    <div
                      key={p.id}
                      className={`provider-card ${
                        formData.provider?.id === p.id ? "selected" : ""
                      }`}
                      onClick={() => handleProviderSelect(p)}
                    >
                      <h4>{p.name}</h4>
                      <p>Rating: {p.rating} ⭐</p>
                    </div>
                  ))}
                </div>
                <button
                  className="explore-all"
                  onClick={() => alert("Navigate to Providers Explore All")}
                >
                  {t("providers.exploreAll")}
                </button>
              </>
            )}
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="form-navigation">
          {step > 1 && (
            <button className="btn-prev" onClick={handlePrev}>
              {t("booking.prev")}
            </button>
          )}

          {step < 3 && (
            <button className="btn-next" onClick={handleNext}>
              {t("booking.next")} <ArrowRight size={16} />
            </button>
          )}

          {step === 3 && formData.provider && (
            <button className="btn-submit" onClick={submitForm}>
              {t("booking.submit")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}