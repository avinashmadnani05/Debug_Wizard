// src/pages/Home.jsx
import React from "react";
import "../styles/Home.css"; // Import individual CSS for Home page

function Home() {
  return (
    <div className="page home-page">
      <h1 className="page-title animated-header">Smart Debugging Assistant</h1>
      <img src="/banner.webp" alt="Home Banner" className="banner-image" />
      <p>Welcome to the AI-Powered Code Auto-Fixer.</p>
    </div>
  );
}

export default Home;
