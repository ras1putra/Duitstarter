import React from 'react';
import { Link } from 'react-router-dom';
import duitstarterLogo from '../assets/duitstarter.svg';


const LoginRegisterNavbar: React.FC = () => {
    return (
        <nav className='w-full h-16 shadow-xl flex items-center justify-between px-12 z-40 bg-white fixed bg-opacity-80'>
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img src={duitstarterLogo} alt="Duitstarter logo" className="h-12 w-12" />
                    <div className="text-xl font-bold text-left text-black font-montserrat ml-2">Duitstarter</div>
                </Link>
            </div>
            <div className='flex space-x-5'>
                <Link to='/register' className="middle none center rounded-lg bg-blue-700 py-2.5 px-6 font-sans text-md font-bold text-white shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-blue-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    <div className="text-white">
                        Register
                    </div>
                </Link>
                <Link to='/login' className="middle none center rounded-lg bg-pink-700 py-2.5 px-6 font-sans text-md font-bold text-white shadow-md shadow-pink-900/20 transition-all hover:shadow-lg hover:shadow-pink-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    <div className="text-white">
                        Login
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default LoginRegisterNavbar;
