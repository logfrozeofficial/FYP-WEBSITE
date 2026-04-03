"use client";

import { useState, useEffect } from "react";
import "./bookingForm.css";

export default function BookingForm({ preSelectedProvider = null }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [providerChosen, setProviderChosen] = useState(preSelectedProvider || null);
  const [formData, setFormData] = useState({
    category: "",
    problem: "",
    name: "",
    phone: "",
    address: "",
    location: "",
    otpInput: "",
  });

  const topProviders = [
    { id: 1, name: "Provider 1", rating: 4.9 },
    { id: 2, name: "Provider 2", rating: 4.8 },
    { id: 3, name: "Provider 3", rating: 4.7 },
  ];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProviderSelect = (provider) => {
    setProviderChosen(provider);
    // generate 4-digit OTP immediately after selecting provider
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    console.log("OTP sent to user & provider:", generatedOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.otpInput === otp) {
      alert("Request submitted successfully!");
      // reset form
      setFormData({
        category: "",
        problem: "",
        name: "",
        phone: "",
        address: "",
        location: "",
        otpInput: "",
      });
      setStep(1);
      setProviderChosen(null);
      setOtp("");
    } else {
      alert("Invalid OTP. Please check.");
    }
  };

  const progress = () => {
    switch (step) {
      case 1:
        return 33;
      case 2:
        return 66;
      case 3:
        return 100;
      default:
        return 0;
    }
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData({ ...formData, location: `${pos.coords.latitude}, ${pos.coords.longitude}` });
      });
    }
  };

  return (
    <div className="booking-container">
      <h2 className="form-title">Booking / Complaint Form</h2>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress()}%` }}></div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        {/* Step 1: Category & Problem */}
        {step === 1 && (
          <div className="form-step">
            <label>
              Service Category:
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">-- Choose Category --</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrician">Electrician</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </label>
            <label>
              Describe the Problem:
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Explain your issue..."
                required
              />
            </label>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <div className="form-step">
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <button type="button" className="btn share-location" onClick={shareLocation}>
              Share Location
            </button>
            {formData.location && <p className="location-display">Location: {formData.location}</p>}
          </div>
        )}

        {/* Step 3: Provider Selection */}
        {step === 3 && (
          <div className="form-step">
            {providerChosen ? (
              <div>
                <p>Selected Provider:</p>
                <div className="provider-card selected">
                  <strong>{providerChosen.name}</strong> - Rating: {providerChosen.rating}
                </div>

                <label>
                  Enter OTP:
                  <input
                    type="text"
                    name="otpInput"
                    value={formData.otpInput}
                    onChange={handleChange}
                    maxLength={4}
                    pattern="\d{4}"
                    placeholder="0000"
                    className="otp-input"
                    required
                  />
                </label>
              </div>
            ) : (
              <div>
                <p>Select a Provider:</p>
                <div className="provider-grid">
                  {topProviders.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="provider-card"
                      onClick={() => handleProviderSelect(p)}
                    >
                      <strong>{p.name}</strong> <br />
                      Rating: {p.rating}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn explore-all"
                  onClick={() => alert("Navigate to Providers Page")}
                >
                  Explore All
                </button>
              </div>
            )}
          </div>
        )}

        <div className="form-buttons">
          {step > 1 && <button type="button" className="btn prev" onClick={handlePrev}>Previous</button>}
          {step < 3 && <button type="button" className="btn next" onClick={handleNext}>Next</button>}
          {step === 3 && providerChosen && <button type="submit" className="btn submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}