import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import MoreSolutions from "./pages/MoreSolutions";
import History from "./pages/History";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
            <Navbar />

  
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
