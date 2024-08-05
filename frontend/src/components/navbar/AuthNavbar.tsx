import Image from 'next/image';
import Link from 'next/link';
import DuitstarterLightLogo from '@/Assets/Logo/duitstarter.svg';
import { usePathname } from 'next/navigation';

const AuthNavbar = () => {
    const pathname = usePathname();
    const isRegister = pathname === '/register';
    const isLogin = pathname === '/login';

    return (
        <div className='fixed h-14 md:h-16 bg-white bg-opacity-80 md:bg-opacity-60 shadow-lg w-full z-10'>
            <div className="px-4 md:px-12 flex flex-row justify-between items-center">
                <Link href="/" className="flex flex-row items-center">
                    <Image src={DuitstarterLightLogo} alt="Duitstarter light mode logo" className="w-14 h-14 md:w-16 md:h-16" />
                    <div className="text-lg md:text-xl font-bold text-[#E71A6D] font-poppins">
                        Duitstarter
                    </div>
                </Link>
                <div className="hidden md:flex flex-row space-x-4 items-center font-semilight font-poppins text-[#0E132C]">
                    <Link href="/login" className='py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md shadow-green-600 hover:bg-green-800 hover:shadow-green-800'>
                        Masuk
                    </Link>
                    <Link href="/register" className='py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md shadow-blue-600 hover:bg-blue-800 hover:shadow-blue-800'>
                        Daftar
                    </Link>
                </div>
                <div className="md:hidden flex items-center">
                    <Link 
                    href={isRegister ? '/login' : isLogin ? '/register' : '/login'}
                    className="py-2 px-4 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-no-spread shadow-sm shadow-blue-600 hover:bg-gradient-to-l hover:shadow-blue-800"
                    >
                    {isRegister ? 'Masuk' : isLogin ? 'Daftar' : 'Masuk'}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthNavbar;
