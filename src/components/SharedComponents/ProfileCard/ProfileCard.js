"use client";

import Image from "next/image";
import { Edit3, LogOut } from "lucide-react";
import "./profileCard.css";

export default function ProfileCard({ user }) {
  return (
    <section className="profile-section">
      <div className="profile-pic">
        <Image
          src={user.profilePic}
          alt="Profile Picture"
          fill
          className="profile-img"
        />
      </div>
      <div className="profile-actions">
        <button className="edit-btn">
          <Edit3 size={18} /> Edit Profile
        </button>
        <button className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </section>
  );
}
