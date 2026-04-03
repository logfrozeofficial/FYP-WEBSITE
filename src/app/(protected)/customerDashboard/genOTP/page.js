"use client";

import "./genOTP.css";

export default function OtpPage({ complaintOtp }) {
  // complaintOtp will be passed from the parent (e.g., ViewComplaintCard)
  return (
    <div className="otp-page">
      <div className="otp-card">
        <h2>Job OTP</h2>
        <p className="otp-number">{complaintOtp}</p>
        <p className="otp-note">
          This OTP is valid until the job is completed or rejected by the provider.
        </p>
      </div>
    </div>
  );
}