"use client"

import Image from 'next/image';
import Link from 'next/link';
import DuitstarterLightLogo from '@/Assets/Logo/duitstarter.svg';
import MobileSidebarNavbar from '../sidebar/MobileSidebarNavbar';
import { MdAccountCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import ProfileMenu from '../dialog-menu/ProfileMenu';
import { HiMenuAlt1 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
    const [navbarMobile, setNavbarMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleProfileMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleMobileNavbar = () => {
        setNavbarMobile(!navbarMobile);
    }

    return (
        <>
        <div className='sticky h-14 md:h-16 bg-white bg-opacity-60 shadow-lg w-full z-10'>
            <div className="px-4 md:px-12 flex flex-row justify-between">
                <Link href="/" className="flex flex-row items-center">
                    <Image src={DuitstarterLightLogo} alt="Duitstarter light mode logo" className="w-14 h-14 md:w-16 md:h-16" />
                    <div className="text-lg md:text-xl font-bold text-[#E71A6D] font-poppins">
                        Duitstarter
                    </div>
                </Link>
                <div onClick={handleMobileNavbar} className='flex items-center cursor-pointer md:hidden'>
                    {navbarMobile? <IoCloseSharp size={30} color='darkred' /> : <HiMenuAlt1 size={30} color='darkred' />}
                    {navbarMobile && <MobileSidebarNavbar />}
                </div>
                <div className='hidden md:flex font-poppins text-sm font-bold text-stone-700 items-center space-x-2'>
                    <Link href="/" className='hover:text-purple-900 hover:border-b-2 border-stone-700'>
                        Explore
                    </Link>
                    <Link href="/dashboard" className='hover:text-purple-900 hover:border-b-2 border-stone-700'>
                        Dashboard
                    </Link>
                    <Link href="/upgrade" className='px-4 py-2.5 bg-green-500 hover:bg-green-900 rounded-md text-white'>
                        Daftarkan & Galang Idemu
                    </Link>
                </div>
                <div onClick={handleProfileMenu} className='hidden md:flex items-center'>
                    <MdAccountCircle size={42} color='darkgreen' />
                    {isOpen? <IoIosArrowUp size={26} color='darkgreen' /> : <IoIosArrowDown size={26} color='darkgreen' />}
                    {isOpen && <ProfileMenu />}
                </div>
            </div>
        </div>
        </>
    );
}
 
export default Navbar;