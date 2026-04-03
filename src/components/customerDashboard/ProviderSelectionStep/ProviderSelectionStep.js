import "./providerSelectionStep.css"; 

const providers = [
  { id: 1, name: "Ali Electric", rating: 4.8, price: 1500 },
  { id: 2, name: "Umar Services", rating: 4.3, price: 1200 },
  { id: 3, name: "FastFix", rating: 4.9, price: 1800 },
];

export default function ProviderSelectionStep({
  data,
  setFormData,
  onBack,
  onSubmit,
}) {
  return (
    <div className="step step-provider">
      <h2>Select a Provider</h2>
      <div className="provider-list">
        {providers.map((p) => (
          <div
            key={p.id}
            className={`provider-card ${data.provider?.id === p.id ? "active" : ""}`}
            onClick={() => setFormData((prev) => ({ ...prev, provider: p }))}
          >
            <h3>{p.name}</h3>
            <p>⭐ {p.rating}</p>
            <p>Rs. {p.price}</p>
          </div>
        ))}
      </div>
      <div className="nav-buttons">
        <button onClick={onBack}>Back</button>
        <button disabled={!data.provider} onClick={onSubmit}>
          Request Service
        </button>
      </div>
    </div>
  );
}
