import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoverLetter from "./components/CoverLetter.jsx";
import TailoredCV from "./components/TailoredCV.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AnalyseCV from "./components/AnalyseCV.jsx";
import Header from "./components/Header.jsx";
import Features from "./pages/Features.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Works from "./pages/Works.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { useState } from 'react';
import {askAI} from "./services/cvAPI.js";

function App() {
  askAI("Give me a one-sentence tagline for a coffee shop.");

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyse-cv" element={<AnalyseCV />} />
          <Route path="/tailored-cv" element={<TailoredCV />} />
          <Route path="cover-letter" element={<CoverLetter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        
        <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
          © {new Date().getFullYear()} RacketAI.
        </footer>
      </Router>
    </>
  )
}

export default App
