"use client"

import Image from 'next/image';
import Link from 'next/link';
import DuitstarterLightLogo from '@/Assets/Logo/duitstarter.svg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/store/authSlice';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            axios.post('http://localhost:8000/auth/logout', {}, {
                withCredentials: true,
            }).then(() => {
                dispatch(logout());
                router.push('/');
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='fixed h-18 bg-white bg-opacity-60 shadow-lg w-full z-10'>
            <div className="px-12 flex flex-row justify-between">
                <Link href="/" className="flex flex-row items-center">
                    <Image src={DuitstarterLightLogo} alt="Duitstarter light mode logo" className="w-16 h-16" />
                    <div className="text-xl font-bold text-[#E71A6D] font-poppins">
                        Duitstarter
                    </div>
                </Link>
                <button onClick={handleLogout} className="flex flex-row space-x-4 items-center font-semilight font-poppins text-[#0E132C]">
                    Logout
                </button>
            </div>
        </div>
    );
}
 
export default Navbar;