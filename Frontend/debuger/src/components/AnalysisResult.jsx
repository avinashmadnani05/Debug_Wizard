import React from "react";

function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div>
      <h2>Analysis Result</h2>
      {result.error ? (
        <>
          <p><strong>Error:</strong> {result.error}</p>
          <p><strong>Suggestion:</strong> {result.suggestion}</p>
        </>
      ) : (
        <p>{result.suggestion}</p>
      )}
    </div>
  );
}

export default AnalysisResult;
