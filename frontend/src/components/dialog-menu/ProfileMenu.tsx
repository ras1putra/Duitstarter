import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hook';
import { useAppSelector } from "../../store/hook";
import { logout } from '@/store/authSlice';
import { IoMdExit } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";

const ProfileMenu: React.FC = () => {
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
        <div className='top-16 mt-2 right-14 fixed shadow-md bg-white p-4 font-poppins text-stone-500 text-[14px] space-y-3 font-medium'>
            <div className='text-base'>
                <span>Hallo </span>
                <span className='font-bold text-md'>user</span>
                <div className='h-[1px] bg-slate-600 mt-2'></div>
            </div>
            <button className='flex justify-start items-center w-full hover:bg-blue-50 px-4 py-1 rounded-sm'>
                <RiDashboardFill size={18} color='gray' />
                <span className='ml-2'>Dashboard</span>
            </button>
            <button className='flex justify-start items-center w-full hover:bg-blue-50 px-4 py-1 rounded-sm'>
                <IoIosSettings size={18} color='gray' />
                <span className='ml-2'>Account settings</span>
            </button>
            <button onClick={handleLogout} className='flex justify-start items-center w-full hover:bg-blue-50 px-4 py-1 rounded-sm'>
                <IoMdExit size={18} color='gray' />
                <span className='ml-2'>Logout</span>
            </button>
        </div>
        </>
    );
}
 
export default ProfileMenu;