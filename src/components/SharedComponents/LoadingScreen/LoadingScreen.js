"use client";

import { Wrench } from "lucide-react";
import "@/styles/loadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="svx-loading-overlay">
      <div className="svx-loading-content">
        <div className="svx-logo-wrap pulse">
          <Wrench size={60} strokeWidth={1.5} color="#ff7a00" />
        </div>
        <div className="svx-loading-bar-wrap">
          <div className="svx-loading-bar"></div>
        </div>
        <h2 className="svx-loading-text">Servax</h2>
      </div>
    </div>
  );
}
