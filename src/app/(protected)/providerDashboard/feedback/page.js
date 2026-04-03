"use client";
import "./feedback.css";
export default function FeedbackPage() {
  const feedbacks = [];

  return (
    <div className="dashboard-feedback">
      <h2>User Feedback</h2>

      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((f, idx) => (
            <div key={idx} className="feedback-card">
              <p><strong>{f.user}</strong> ({f.rating}/5)</p>
              <p>{f.comment}</p>

              {f.media?.length > 0 && (
                <div className="feedback-media">
                  {f.media.map((m, i) => (
                    <img key={i} src={m} alt="feedback" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}