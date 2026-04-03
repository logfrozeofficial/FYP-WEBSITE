"use client";

import React, { useState, useEffect } from "react";
import "./allProviders.css";

export default function AllProviders() {
  // Example provider data
  const [providers, setProviders] = useState([
    { id: 1, name: "John Doe", job: "Electrician", rating: 4.9 },
    { id: 2, name: "Alice Smith", job: "Plumber", rating: 4.8 },
    { id: 3, name: "Bob Johnson", job: "Cleaning", rating: 4.7 },
    { id: 4, name: "Clara White", job: "Electrician", rating: 4.6 },
    { id: 5, name: "David Brown", job: "Plumber", rating: 4.5 },
    { id: 6, name: "Emma Green", job: "Cleaning", rating: 4.8 },
    // Add more providers as needed
  ]);

  const [sortedProviders, setSortedProviders] = useState({});

  useEffect(() => {
    const grouped = providers.reduce((acc, provider) => {
      if (!acc[provider.job]) acc[provider.job] = [];
      acc[provider.job].push(provider);
      return acc;
    }, {});
    setSortedProviders(grouped);
  }, [providers]);

  return (
    <div className="all-providers-container">
      <h2 className="screen-title">All Providers</h2>
      {Object.keys(sortedProviders).map((job) => (
        <div key={job} className="job-section">
          <h3 className="job-title">{job}</h3>
          <div className="providers-grid">
            {sortedProviders[job].map((p) => (
              <div key={p.id} className="provider-card">
                <strong>{p.name}</strong>
                <p>Rating: {p.rating}</p>
                <p>Job: {p.job}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}