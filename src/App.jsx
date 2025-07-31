import { useState } from "react";
import "./App.css";
import WeatherNavbar from "./navbar/Navbar";
import Mainpage from "./mainpage/mainpage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
  </Router>
  );
}

export default App;
