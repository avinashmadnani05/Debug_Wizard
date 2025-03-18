// src/pages/Analyze.jsx
import React, { useState } from "react";
import CodeInputForm from "../components/CodeInputForm";
import AnalysisResult from "../components/AnalysisResult";

function Analyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (code) => {
    setLoading(true);
    try {
      const response = await fetch("https://debug-wizard-967w.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
    setLoading(false);
  };

  return (
    <div className="page analyze-page">
      <h1 className="page-title animated-header">Analyze Your Code</h1>
      {/* Banner image for Analyze page */}
      <img src="/images/analyze-banner.jpg" alt="Analyze Banner" className="banner-image" />
      <CodeInputForm onSubmit={handleAnalyze} />
      {loading ? (
        <div className="loading">
          <img src="/images/loading.gif" alt="Loading" className="loading-icon" />
          <p>Loading...</p>
        </div>
      ) : (
        <AnalysisResult result={result} />
      )}
    </div>
  );
}

export default Analyze;
