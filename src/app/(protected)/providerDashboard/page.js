"use client";

import { useRouter } from "next/navigation";
import "./providerDashboard.css";
export default function ProviderDashboard() {
  const router = useRouter();

  return (
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>

      <div className="dashboard-cards">
        <div
          className="card clickable"
          onClick={() => router.push("/providerDashboard/viewComplaint?type=new")}
        >
          <h3>New Complaints</h3>
          <p>0</p>
        </div>

        <div
          className="card clickable"
          onClick={() => router.push("/providerDashboard/viewComplaint?type=pending")}
        >
          <h3>Pending</h3>
          <p>0</p>
        </div>

        <div
          className="card clickable"
          onClick={() => router.push("/providerDashboard/viewComplaint?type=done")}
        >
          <h3>Completed</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}