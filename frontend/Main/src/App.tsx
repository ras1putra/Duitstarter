import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/NavbarRole'
import LoginRegisterNavbar from './component/LoginRegisterNavbar';
import Register from './pages/Register';
import Login from './pages/Login';

interface User {
  role: 'admin' | 'user' | 'fundraiser';
}

const App: React.FC = () => {
  const user: User | null = null

  return (
    <Router>
      {user ? <Navbar user={user} /> : <LoginRegisterNavbar />}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
