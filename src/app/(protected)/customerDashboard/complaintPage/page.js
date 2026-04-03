"use client";

import ComplaintsSection from "@/components/customerDashboard/ComplaintSection/ComplaintSection";
import "./complaintPage.css";

export default function ComplaintsPage() {
  return (
    /* ID allows navbar + future hash navigation */
    <section id="complaints" className="dashboard">
      <ComplaintsSection />
    </section>
  );
}
