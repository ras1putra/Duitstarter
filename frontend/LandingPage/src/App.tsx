import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/LandingPageNavbar'

const App: React.FC = () => {
  return (
    <Router>
      <Navbar  />
      <Routes>
      </Routes>
    </Router>
  );
};

export default App;
