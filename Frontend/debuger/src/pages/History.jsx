// src/pages/History.jsx
import React, { useEffect, useState } from "react";
import "../styles/History.css"; // Import individual CSS for History page

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetch("https://debug-wizard-967w.onrender.com/history")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHistoryData(data);
        } else if (data.history && Array.isArray(data.history)) {
          setHistoryData(data.history);
        } else {
          console.error("Unexpected data format:", data);
          setHistoryData([]);
        }
      })
      .catch(err => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="page history-page">
      <h1 className="page-title animated-header">Analysis History</h1>
      {historyData.length === 0 ? (
        <p>No analysis history available.</p>
      ) : (
        historyData.map((item, index) => (
          <div key={index} className="history-item">
            <pre className="code-block">{item.code}</pre>
            {item.error && <p><strong>Error:</strong> {item.error}</p>}
            <p><strong>Suggestion:</strong> {item.suggestion}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
