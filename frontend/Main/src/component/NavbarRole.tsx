import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import duitstarterLogo from '../assets/duitstarter.svg';
import kycLogoq1 from '../assets/identification-16-solid.svg';
import kycLogoq2 from '../assets/id-card (1).svg';
import campaignLogo from '../assets/credit-card-fill.svg';
import refundLogo from '../assets/card-refund-fill.svg';
import logoutLogo from '../assets/logout.svg';
import accountLogo from '../assets/account.svg';
import api from '../axiosConfig';

const navbarHorizontal = "w-full h-16 shadow-lg px-12 flex items-center justify-between bg-white";
const navbarVertical = "h-screen shadow-2xl flex flex-col items-center py-8 transition-width duration-300 bg-white fixed";

const Navbar: React.FC<{ user: any, toggleNavbar: () => void }> = ({ user, toggleNavbar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [successMessage]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        toggleNavbar();
    };


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = () => {
        if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const logoutHandler = async () => {
        try {
            const response = await api.delete('/auth/logout');

            if (response.status === 200) {
                sessionStorage.removeItem('user');
                setSuccessMessage("Berhasil logout");
                setInterval(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            {user?.roles === 'ADMIN' ? (
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
                        <button onClick={logoutHandler} className="w-full mt-4 h-12 rounded-md bg-slate-100 flex items-center justify-center">
                            <img src={logoutLogo} alt="Logout" className="w-6 h-6" />
                            {isOpen && <span className="ml-2 font-poppins font-bold">Logout</span>}
                        </button>
                    </div>
                    {successMessage && (
                        <div className="w-full max-w-sm mx-auto my-2 overflow-hidden rounded shadow-sm fixed top-0 right-0 mt-20 mr-10 z-50 animate-slide-in">
                            <div className="relative flex items-center justify-between px-2 py-2 font-bold text-white bg-pink-500 rounded-t">
                                <div className="relative flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        className="inline w-6 h-6 mr-2 opacity-75">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Success</span>
                                </div>
                                <span className="relative">
                                    <svg className="w-5 h-5 text-white fill-current hover:text-pink-900" role="button"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <title>Close</title>
                                        <path
                                            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="p-3 bg-white border border-gray-300 rounded-b shadow-lg">
                                <span className="block text-gray-600">Berhasil logout</span>
                            </div>
                        </div>
                    )}
                </nav>
            ) : (
                <nav className={navbarHorizontal}>
                    <Link to="/" className="flex items-center">
                        <img src={duitstarterLogo} alt="Duitstarter logo" className="h-12 w-12" />
                        <div className="text-xl font-bold text-left text-black font-montserrat ml-2">Duitstarter</div>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {user?.roles === 'USER' && (
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
                        {user?.roles === 'FUNDRAISER' && (
                            <>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Discover</Link>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Portofolio</Link>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Buat Campaign</Link>
                                <Link to="/" className="text-slate-500 hover:text-gray-700 font-semibold text-md hover:border-b-2 border-gray-700 ">Community</Link>
                            </>
                        )}
                    </div>
                    <button onClick={toggleDropdown} className="flex items-center relative">
                        <img src={accountLogo} alt="Account" className="h-8 w-8 mr-1" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.4em"
                            height="1.4em"
                            viewBox="0 0 400 448"
                            style={{ transition: 'transform 0.3s ease-in-out' }}
                            className={dropdownOpen ? 'rotate-180' : ''}
                        >
                            <path fill="currentColor" d="m44 273l156-139l156 137q4 4 15 4q10 0 17-6q13-15-2-30L200 79L14 241q-14 16-2 30q14 13 32 2z"></path>
                        </svg>
                    </button>
                    <div ref={dropdownRef} className={`absolute mt-52 mr-12 w-48 bg-white rounded-sm shadow-xl overflow-y-auto right-0 ${dropdownOpen ? 'opacity-100' : 'opacity-0 invisible hidden'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
                        <Link to="/profile" className="mt-2 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Settings</Link>
                        <button onClick={logoutHandler} className="mb-2 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                    </div>
                    {successMessage && (
                        <div className="w-full max-w-sm mx-auto my-2 overflow-hidden rounded shadow-sm fixed top-0 right-0 mt-20 mr-10 z-50 animate-slide-in">
                            <div className="relative flex items-center justify-between px-2 py-2 font-bold text-white bg-pink-500 rounded-t">
                                <div className="relative flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        className="inline w-6 h-6 mr-2 opacity-75">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Success</span>
                                </div>
                                <span className="relative">
                                    <svg className="w-5 h-5 text-white fill-current hover:text-pink-900" role="button"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <title>Close</title>
                                        <path
                                            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="p-3 bg-white border border-gray-300 rounded-b shadow-lg">
                                <span className="block text-gray-600">Berhasil logout</span>
                            </div>
                        </div>
                    )}
                </nav>
            )}
        </div>
    );
};

export default Navbar;
