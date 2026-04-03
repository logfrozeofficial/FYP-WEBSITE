"use client";

import { useState, useEffect } from "react";
import "./adminPanel.css";

export default function AdminHome({ providers = [] }) {
  const [view, setView] = useState(null); // "new" | "old" | null
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [surveyDate, setSurveyDate] = useState("");
  const [providerList, setProviderList] = useState(providers);

  // If providers are fetched asynchronously, this ensures state updates
  useEffect(() => {
    if (Array.isArray(providers)) {
      setProviderList(providers);
    }
  }, [providers]);

  const newProviders = Array.isArray(providerList)
    ? providerList.filter((p) => !p.verified)
    : [];
  const oldProviders = Array.isArray(providerList)
    ? providerList.filter((p) => p.verified)
    : [];

  // Actions
  const handleApprove = async (providerId) => {
    if (!surveyDate) {
      alert("Please select a survey date first!");
      return;
    }

    try {
      // Call your backend API to send email
      const res = await fetch("/api/sendSurveyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId, surveyDate }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Provider approved! Survey date email sent for ${surveyDate}.`);
        // Update provider as verified locally
        setProviderList((prev) =>
          prev.map((p) =>
            p.id === providerId ? { ...p, verified: true } : p
          )
        );
        setSelectedProvider(null);
      } else {
        alert("Failed to send email. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email.");
    }
  };

  const handleDeny = (providerId) => {
    alert(`Provider request denied!`);
    setProviderList((prev) => prev.filter((p) => p.id !== providerId));
    setSelectedProvider(null);
  };

  const handleAppreciate = (providerId) => alert("Provider appreciated!");
  const handleWarn = (providerId) => alert("Provider warned!");
  const handleBlock = (providerId) => {
    alert("Provider blocked! Account deleted.");
    setProviderList((prev) => prev.filter((p) => p.id !== providerId));
    setSelectedProvider(null);
  };

  return (
    <div className="admin-page">
      {/* Home: New / Old Provider Cards */}
      {!view && (
        <div className="admin-home">
          <div className="admin-card" onClick={() => setView("new")}>
            <h2>New Providers</h2>
            <p>{newProviders.length} pending requests</p>
          </div>
          <div className="admin-card" onClick={() => setView("old")}>
            <h2>Existing Providers</h2>
            <p>{oldProviders.length} approved providers</p>
          </div>
        </div>
      )}

      {/* Provider List */}
      {view && !selectedProvider && (
        <div className="provider-list">
          <button className="back-btn" onClick={() => setView(null)}>
            ← Back
          </button>
          <h2>{view === "new" ? "New Providers" : "Existing Providers"}</h2>
          {(view === "new" ? newProviders : oldProviders).map((p) => (
            <div
              key={p.id}
              className="provider-card"
              onClick={() => setSelectedProvider(p)}
            >
              <p>
                <strong>{p.name}</strong> — {p.category}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Provider Detail */}
      {selectedProvider && (
        <div className="provider-detail">
          <button
            className="back-btn"
            onClick={() => setSelectedProvider(null)}
          >
            ← Back
          </button>
          <h2>{selectedProvider.name}</h2>
          <p>
            <strong>Category:</strong> {selectedProvider.category}
          </p>
          <p>
            <strong>Email:</strong> {selectedProvider.email}
          </p>
          <p>
            <strong>Verified:</strong>{" "}
            {selectedProvider.verified ? "Yes" : "No"}
          </p>

          {!selectedProvider.verified ? (
            <div className="admin-actions">
              <label>
                Survey Date:{" "}
                <input
                  type="date"
                  value={surveyDate}
                  onChange={(e) => setSurveyDate(e.target.value)}
                />
              </label>
              <button
                className="approve-btn"
                onClick={() => handleApprove(selectedProvider.id)}
              >
                Approve Request
              </button>
              <button
                className="deny-btn"
                onClick={() => handleDeny(selectedProvider.id)}
              >
                Deny Request
              </button>
            </div>
          ) : (
            <div className="admin-actions">
              <button
                className="appreciate-btn"
                onClick={() => handleAppreciate(selectedProvider.id)}
              >
                Appreciate
              </button>
              <button
                className="warn-btn"
                onClick={() => handleWarn(selectedProvider.id)}
              >
                Warn
              </button>
              <button
                className="block-btn"
                onClick={() => handleBlock(selectedProvider.id)}
              >
                Block Provider
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}