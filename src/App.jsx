import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/dashboard/Header.jsx"
import Features from "./pages/Features.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Works from "./pages/Works.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { useState } from 'react'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
