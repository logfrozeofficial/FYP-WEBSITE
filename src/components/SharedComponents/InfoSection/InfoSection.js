"use client";

import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import "./infoSection.css";
export default function InfoSection({ user }) {
  return (
    <div className="info-container">
      {/* USER INFO */}
      <section className="info-section">
        <h2 className="user-name">{user.name}</h2>
        <p className="member-since">Member since {user.memberSince}</p>

        <div className="info-cards">
          <div className="info-card"><strong>Gender:</strong> {user.gender}</div>
          <div className="info-card"><strong>Religion:</strong> {user.religion}</div>
          <div className="info-card"><strong>Marital Status:</strong> {user.maritalStatus}</div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="contact-section">
        <h3>Contact Information</h3>
        <div className="contact-info">
          <p><Phone className="icon" /> {user.phone}</p>
          <p><Mail className="icon" /> {user.email}</p>
          <p><MapPin className="icon" /> {user.city}</p>
          <p><MapPin className="icon" /> {user.address}</p>
          <p><Calendar className="icon" /> {user.dob}</p>
        </div>
      </section>
    </div>
  );
}
