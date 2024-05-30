import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/NavbarRole';
import LoginRegisterNavbar from './component/LoginRegisterNavbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Discover from './pages/Discover';
import api from './axiosConfig';
import KYCLvl1Admin from './pages/KYCLvl1Admin';
import Profile from './pages/Profile';
import KYCLvl1 from './pages/KYCLvl1';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await api.get('/usr/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };
    checkLoginStatus();
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const updateUser =async () => {
    const response = await api.get('/usr/user');
    console.log(response.data);
    setUser(response.data);
  }

  return (
    <Router>
      { user ? <Navbar user={user} toggleNavbar={toggleNavbar} /> : <LoginRegisterNavbar />}
      <Routes>
        <Route path='/' element={!user ? <Login /> : user.roles === 'ADMIN' ? <KYCLvl1Admin isNavbarOpen={isNavbarOpen} /> : <Discover />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile user={user} updateUser={updateUser} />} />
        <Route path='/kyc-level-1-admin' element={<KYCLvl1Admin isNavbarOpen={isNavbarOpen} />} />
        <Route path='/kyc-level-1' element={<KYCLvl1 />} />
      </Routes>
    </Router>
  );
};

export default App;
