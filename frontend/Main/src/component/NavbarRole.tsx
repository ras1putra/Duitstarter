import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import duitstarterLogo from '../assets/duitstarter.svg';
import kycLogoq1 from '../assets/identification-16-solid.svg';
import kycLogoq2 from '../assets/id-card (1).svg';
import campaignLogo from '../assets/credit-card-fill.svg';
import refundLogo from '../assets/card-refund-fill.svg';
import logoutLogo from '../assets/logout.svg';
import accountLogo from '../assets/account.svg';

interface User {
    role: 'admin' | 'user' | 'fundraiser';
}

interface NavbarProps {
    user: User | null;
}

const navbarHorizontal = "w-full h-16 shadow-lg px-12 flex items-center justify-between bg-white";
const navbarVertical = "h-screen shadow-2xl flex flex-col items-center py-8 fixed transition-width duration-300 bg-white";

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {user?.role === 'admin' ? (
                <nav className={`${navbarVertical} ${isOpen ? 'w-72' : 'w-20'}`}>
                    <div className="flex items-center justify-between w-full px-4">
                        <Link to="/" className="flex items-center">
                            <img src={duitstarterLogo} alt="Duitstarter logo" className={`h-16 w-16 ${isOpen ? 'visible' : 'hidden'}`} />
                            {isOpen && <div className="text-xl font-bold text-left text-black font-montserrat ml-2">Duitstarter</div>}
                        </Link>
                        <button onClick={toggleMenu} className={`text-black focus:outline-none ${isOpen ? '' : 'mx-auto pt-2'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col h-full justify-between mt-8">
                        <div>
                            {isOpen && (
                                <div className='w-52 mt-4 h-12 rounded-lg flex items-center justify-start'>
                                    <div className='font-poppins ml-4 font-bold text-lg'>
                                        MAIN MENU
                                    </div>
                                </div>
                            )}
                            <Link to="/" className={`h-12 rounded-lg hover:bg-[#ecf8ff] flex items-center ${isOpen ? 'justify-start w-60 mt-4' : 'justify-center w-12 mt-24'}`}>
                                <img src={kycLogoq1} alt="KYC Level 1 Request" className={`w-7 h-7 ${isOpen ? 'ml-4' : ''}`} />
                                {isOpen && <span className="font-poppins ml-2 text-sm">KYC Level 1 Request</span>}
                            </Link>
                            <Link to="/" className={`mt-4 h-12 rounded-lg hover:bg-[#ecf8ff] flex items-center ${isOpen ? 'justify-start w-60' : 'justify-center w-12'}`}>
                                <img src={kycLogoq2} alt="KYC Level 2 Request" className={`w-6 h-6 ${isOpen ? 'ml-4' : ''}`} />
                                {isOpen && <span className="font-poppins ml-2 text-sm">KYC Level 2 Request</span>}
                            </Link>
                            <Link to="/" className={`mt-4 h-12 rounded-lg hover:bg-[#ecf8ff] flex items-center ${isOpen ? 'justify-start w-60' : 'justify-center w-12'}`}>
                                <img src={campaignLogo} alt="Campaign Administrator" className={`w-6 h-6 ${isOpen ? 'ml-4' : ''}`} />
                                {isOpen && <span className="font-poppins ml-2 text-sm">Campaign Administrator</span>}
                            </Link>
                            <Link to="/" className={`mt-4 h-12 rounded-lg hover:bg-[#ecf8ff] flex items-center ${isOpen ? 'justify-start w-60' : 'justify-center w-12'}`}>
                                <img src={refundLogo} alt="Refund Request" className={`w-6 h-6 ${isOpen ? 'ml-4' : ''}`} />
                                {isOpen && <span className="font-poppins ml-2 text-sm">Refund Request</span>}
                            </Link>
                        </div>
                        <Link to="/" className="w-full mt-4 h-12 rounded-md bg-slate-100 flex items-center justify-center">
                            <img src={logoutLogo} alt="Logout" className="w-6 h-6" />
                            {isOpen && <span className="ml-2 font-poppins font-bold">Logout</span>}
                        </Link>
                    </div>
                </nav>
            ) : (
                <nav className={navbarHorizontal}>
                    <Link to="/" className="flex items-center">
                        <img src={duitstarterLogo} alt="Duitstarter logo" className="h-12 w-12" />
                        <div className="text-xl font-bold text-left text-black font-montserrat ml-2">Duitstarter</div>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {user?.role === 'user' && (
                            <>
                                <Link to="/user/invest" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Discover</Link>
                                <Link to="/user/portfolio" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Portfolio</Link>
                                <Link to="/">
                                    <button className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-900">
                                        <div className="text-md">
                                            Daftarkan & Galang Idemu
                                        </div>
                                    </button>
                                </Link>
                            </>
                        )}
                        {user?.role === 'fundraiser' && (
                            <>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Discover</Link>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Portofolio</Link>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Buat Campaign</Link>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Community</Link>
                            </>
                        )}
                    </div>
                    <button onClick={toggleMenu} className="flex items-center relative">
                        <img src={accountLogo} alt="Account" className="h-8 w-8 mr-1" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.4em"
                            height="1.4em"
                            viewBox="0 0 400 448"
                            style={{ transition: 'transform 0.3s ease-in-out' }}
                            className={isOpen ? 'rotate-180' : ''}
                        >
                            <path fill="currentColor" d="m44 273l156-139l156 137q4 4 15 4q10 0 17-6q13-15-2-30L200 79L14 241q-14 16-2 30q14 13 32 2z"></path>
                        </svg>
                    </button>
                    <div className={`absolute mt-52 mr-12 w-48 bg-white rounded-sm shadow-xl overflow-y-auto right-0 ${isOpen ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
                        <Link to="/" className="mt-2 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Settings</Link>
                        <Link to="/" className="mb-2 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default Navbar;
