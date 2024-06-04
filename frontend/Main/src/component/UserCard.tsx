import React, { useState } from 'react';
import defaultLogo from "../assets/user.png";
import DetailedUser from './DetailedUser';

interface UserCardProps {
    user: any;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleReviewClick = () => {
        setIsPopupOpen(true);
    };

    return (
        <div>
            <div className="py-4 px-8 bg-slate-100 rounded-md mt-3 w-full">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                        <img
                            src={`http://localhost:3000/usr/avatars/${user.user_id}` || defaultLogo}
                            alt="User Selfie"
                            className="w-20 h-20 rounded-full"
                        />
                        <div className="ml-4">
                            <div className="flex flex-col justify-start">
                                <div className="font-bold">
                                    {user.full_name}
                                </div>
                                <div className="font-light text-slate-800">
                                    Melakukan KYC pada {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                                <div className="font-light text-slate-800">
                                    Direview terakhir pada {new Date(user.updatedAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6 py-3 bg-slate-800 text-white font-bold rounded-md hover:shadow-sm hover:shadow-slate-700 border-2 border-slate-700 cursor-pointer hover:bg-slate-700 hover:border-slate-500'
                        onClick={handleReviewClick}
                    >
                        Review
                    </div>
                </div>
                <DetailedUser user={user} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            </div>
        </div>
    );
};

export default UserCard;
