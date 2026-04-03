"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SunMoon, Languages } from "lucide-react";

export default function ProviderNavbar() {
  const pathname = usePathname();

  return (
    <nav className="provider-navbar">
      <div className="nav-left">
        <h2 className="logo">Servax</h2>
      </div>

      <ul className="nav-links">
        <li className={pathname === "/providerDashboard" ? "active" : ""}>
          <Link href="/providerDashboard">Home</Link>
        </li>

        <li className={pathname === "/providerDashboard/shop" ? "active" : ""}>
          <Link href="/providerDashboard/shop">Shop</Link>
        </li>

        <li className={pathname === "/providerDashboard/feedback" ? "active" : ""}>
          <Link href="/providerDashboard/feedback">Feedback</Link>
        </li>
      </ul>

      <div className="nav-right">
        <span className="revenue">₹ 0</span>
        <SunMoon className="icon" />
        <Languages className="icon" />
      </div>
    </nav>
  );
}