// src/pages/History.js
import React, { useEffect, useState } from "react";

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/history")
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
    <div>
      <h1>Analysis History</h1>
      {historyData.length === 0 ? (
        <p>No analysis history available.</p>
      ) : (
        historyData.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <pre>{item.code}</pre>
            {item.error && <p><strong>Error:</strong> {item.error}</p>}
            <p><strong>Suggestion:</strong> {item.suggestion}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
