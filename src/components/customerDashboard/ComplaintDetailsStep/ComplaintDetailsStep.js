import "./complaintDetailsStep.css"
export default function ComplaintDetailsStep({ data, onChange, onNext }) {
  return (
    <div className="step step-details">
      <h2>Register Your Complaint</h2>
      {["name", "phone", "city", "address"].map((field) => (
        <div className="form-group" key={field}>
          <input id={field} value={data[field]} onChange={onChange} required />
          <label>{field.replace(/^\w/, (c) => c.toUpperCase())}</label>
        </div>
      ))}
      <div className="form-group">
        <select id="category" value={data.category} onChange={onChange}>
          <option value="">Select Category</option>
          <option value="electrician">Electrician</option>
          <option value="plumbing">Plumbing</option>
          <option value="ac">AC Repair</option>
        </select>
      </div>
      <div className="form-group">
        <textarea
          id="details"
          value={data.details}
          onChange={onChange}
          placeholder="Describe your issue..."
        />
      </div>
      <button onClick={onNext} className="next-btn">
        Find Providers →
      </button>
    </div>
  );
}
