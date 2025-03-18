// src/pages/MoreSolutions.jsx
import React from "react";
import "../styles/MoreSolutions.css"; // Import individual CSS for More Solutions page

function MoreSolutions() {
  return (
    <div className="page solutions-page">
      <h1 className="page-title animated-header">Advanced Debugging Solutions</h1>
      <img src="/banner4.webp" alt="Solutions Banner" className="banner-image" />
      <p>
        Here you can explore additional features such as integrating more linters,
        performance analysis tools, and detailed debugging tips.
      </p>
      <p>
        Future enhancements may include interactive code visualizations, real-time performance metrics,
        and deeper integrations with IDEs.
      </p>
    </div>
  );
}

export default MoreSolutions;
