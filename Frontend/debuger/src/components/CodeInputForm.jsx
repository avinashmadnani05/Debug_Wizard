import React, { useState } from "react";

function CodeInputForm({ onSubmit }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Your Code</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Paste your code here..."
      />
      <br />
      <button type="submit">Analyze Code</button>
    </form>
  );
}

export default CodeInputForm;
