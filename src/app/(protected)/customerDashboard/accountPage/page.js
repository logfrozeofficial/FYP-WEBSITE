"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Edit3,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
} from "lucide-react";

import "./account.css";

export default function AccountPage() {
  const [user] = useState({
    name: "Muhammad Umar",
    memberSince: 2022,
    gender: "Male",
    religion: "Islam",
    maritalStatus: "Single",
    phone: "+92 300 1234567",
    email: "umar@example.com",
    city: "Okara",
    address: "123 Main Street, Okara",
    dob: "2002-08-14",
    profilePic: "/profile.jpg",
  });

  return (
    <section className="account-page">
      
      {/* LEFT SIDE */}
      <div className="left-column">
        <div className="profile-card">
          <div className="profile-pic">
            <Image src={user.profilePic} alt="Profile" fill />
          </div>

          <h2>{user.name}</h2>
          <p className="member">Member since {user.memberSince}</p>

          <div className="profile-actions">
            <button className="btn edit">
              <Edit3 size={16} /> Edit
            </button>
            <button className="btn logout">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* PERSONAL INFO BELOW */}
        <div className="card personal-info">
          <h3><User size={18}/> Personal Info</h3>

          <div className="info-list">
            <div>Gender: <span>{user.gender}</span></div>
            <div>Religion: <span>{user.religion}</span></div>
            <div>Status: <span>{user.maritalStatus}</span></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-column">
        <div className="card contact-card">
          <h3><Phone size={18}/> Contact Info</h3>

          <div className="contact-list">
            <div className="contact-item"><Phone /> {user.phone}</div>
            <div className="contact-item"><Mail /> {user.email}</div>
            <div className="contact-item"><MapPin /> {user.city}</div>
            <div className="contact-item"><MapPin /> {user.address}</div>
            <div className="contact-item"><Calendar /> {user.dob}</div>
          </div>
        </div>
      </div>

    </section>
  );
}