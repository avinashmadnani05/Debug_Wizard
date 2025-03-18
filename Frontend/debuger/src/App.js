import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import MoreSolutions from "./pages/MoreSolutions";
import History from "./pages/History";
import Feedback from "./pages/Feedback";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/analyze">Analyze Code</Link></li>
          <li><Link to="/solutions">More Solutions</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/solutions" element={<MoreSolutions />} />
        <Route path="/history" element={<History />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
