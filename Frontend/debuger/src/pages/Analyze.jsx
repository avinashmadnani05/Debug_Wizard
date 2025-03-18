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
          })
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Analyze Your Code</h1>
      <CodeInputForm onSubmit={handleAnalyze} />
      {loading ? <p>Loading...</p> : <AnalysisResult result={result} />}
    </div>
  );
}

export default Analyze;
