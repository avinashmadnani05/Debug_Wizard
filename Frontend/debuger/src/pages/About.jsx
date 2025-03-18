// src/pages/About.jsx
import React from "react";
import "../styles/About.css"; // Import individual CSS for About page

function About() {
  return (
    <div className="page about-page">
      <h1 className="page-title animated-header">About Smart Debugging Assistant</h1>
      <img src="/images/about.jpg" alt="About" className="page-image" />
      <p>
        The Smart Debugging Assistant is an AI-powered tool designed to detect bugs in code
        and suggest fixes in real time. By leveraging static analysis and AI models from Hugging Face,
        it helps developers save time and improve code quality.
      </p>
      <p>
        Future work includes expanding error detection, integrating additional debugging tools,
        and developing a robust user interface with animations and interactive features.
      </p>
    </div>
  );
}

export default About;
