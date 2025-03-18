import React, { useState } from "react";

function Feedback() {
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { code, feedback, rating };
    try {
      const response = await fetch("https://debug-wizard-967w.onrender.com/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setMessage(data.message);
      setCode("");
      setFeedback("");
      setRating(5);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <div>
      <h1>Submit Feedback</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="5"
            cols="50"
            placeholder="Enter the code you analyzed..."
          />
        </div>
        <div>
          <label>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="3"
            cols="50"
            placeholder="Your feedback..."
          />
        </div>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
