import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hook';
import { useAppSelector } from "../../store/hook";
import { logout } from '@/store/authSlice';
import { IoMdExit } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";

const MobileSidebarNavbar = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);

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
        <>
        <div className="fixed top-14 right-0 w-full mt-1 p-4 h-screen bg-white z-50">
            <div className='text-base'>
                <span>Hallo </span>
                <span className='font-bold text-md'>user</span>
                <div className='h-[1px] bg-slate-600 mt-2'></div>
            </div>
            <button className='mt-2 flex justify-start items-center w-full hover:bg-blue-50 px-2 py-1 rounded-sm'>
                <RiDashboardFill size={18} color='gray' />
                <span className='ml-2'>Dashboard</span>
            </button>
            <button className='flex justify-start items-center w-full hover:bg-blue-50 px-2 py-1 rounded-sm'>
                <IoIosSettings size={18} color='gray' />
                <span className='ml-2'>Account settings</span>
            </button>
            <button onClick={handleLogout} className='flex justify-start items-center w-full hover:bg-blue-50 px-2 py-1 rounded-sm'>
                <IoMdExit size={18} color='gray' />
                <span className='ml-2'>Logout</span>
            </button>
        </div>
        </>
    );
}
 
export default MobileSidebarNavbar;