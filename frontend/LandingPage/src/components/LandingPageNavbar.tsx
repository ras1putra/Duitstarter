import React from 'react';
import { Link } from 'react-router-dom';
import duitstarterLogo from '../assets/duitstarter.svg';


const LandingPageNavbar: React.FC = () => {
    return (
        <nav className='w-full h-16 shadow-lg flex items-center justify-between bg-white px-12'>
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img src={duitstarterLogo} alt="Duitstarter logo" className="h-12 w-12" />
                    <div className="text-xl font-bold text-left text-black font-montserrat ml-2">Duitstarter</div>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Home</Link>
                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">For investor</Link>
                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">For fundraiser</Link>
                <Link to="/blog" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Blog</Link>
                <Link to="/contact-us" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Contact us</Link>
            </div>
            <Link to='/home' className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2.5 px-4 border border-blue-700 rounded">
                <div className="text-white">
                    LAUNCH APP
                </div>
            </Link>
        </nav>
    );
};

export default LandingPageNavbar;
