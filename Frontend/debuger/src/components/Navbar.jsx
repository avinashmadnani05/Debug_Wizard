// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [show, setShow] = useState(true);
  const prevScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < prevScrollY.current) {
      // Scrolling upward—show navbar
      setShow(true);
    } else if (currentScrollY > prevScrollY.current) {
      // Scrolling downward—hide navbar
      setShow(false);
    }
    prevScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      <div className="navbar-content">
        <a href="/">Home</a>
        <a href="/analyze">Analyze</a>
        <a href="/history">History</a>
        <a href="/feedback">Feedback</a>
        <a href="/about">About</a>
        <a href="/solutions">Solutions</a>
      </div>
    </nav>
  );
}

export default Navbar;
