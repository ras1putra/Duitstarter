import React, { useState, ChangeEvent, useEffect } from "react";
import defaultLogo from "../assets/user.png";
import verifiedLogo from "../assets/verified-check-svgrepo-com.svg";
import unverifiedLogo from "../assets/cross-circle-svgrepo-com.svg";
import usernameLogo from "../assets/username-svgrepo-com.svg";
import emailLogo from "../assets/email-svgrepo-com.svg";
import phoneLogo from "../assets/phone-svgrepo-com.svg";
import infoLogo from "../assets/info-circle-svgrepo-com.svg";
import avatarLogo from "../assets/avatar-default-svgrepo-com.svg";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
import SuccessMessage from "../component/SuccessMessage";

interface User {
    user_id: string;
    username: string;
    email: string;
    phone: string;
    avatar: string;
    roles: string;
    isVerified: boolean;
    token: string;
}

interface ProfileProps {
    user: User;
    updateUser: () => void;
}

interface FormData {
    username: string;
    phone: string;
    avatar: File | null;
}

interface Errors {
    username?: string;
    phone?: string;
    avatar?: string;
}

const Profile: React.FC<ProfileProps> = ({ user, updateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        username: user?.username || "",
        phone: user?.phone || "",
        avatar: null,
    });
    const [errors, setErrors] = useState<Errors>({});

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

    useEffect(() => {
        setFormData({
            username: user?.username || "",
            phone: user?.phone || "",
            avatar: null,
        });
    }, [user]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            if (file && !["image/jpeg", "image/png"].includes(file.type)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    avatar: "File harus berformat JPG atau PNG",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    avatar: undefined,
                }));
                setFormData({
                    ...formData,
                    avatar: file,
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        if (!formData.username && !user?.username) newErrors.username = "Username tidak boleh kosong";
        if (!formData.username && user?.username) formData.username = user.username;

        if (formData.phone && !/^[0-9]+$/.test(formData.phone)) newErrors.phone = "Format telepon tidak valid";
        if (!formData.phone && !user?.phone) newErrors.phone = "Nomor telepon tidak boleh kosong";
        if (!formData.phone && user?.phone) formData.phone = user.phone;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditClick = async () => {
        if (isEditing) {
            if (validateForm()) {
                const form = new FormData();
                form.append('username', formData.username);
                form.append('phone', formData.phone);
                if (formData.avatar) {
                    form.append('avatar', formData.avatar);
                }

                const response = await api.put("/usr/user", form);

                if (response.status === 200) {
                    setSuccessMessage("Berhasil memperbaharui user");
                    updateUser();
                    setIsEditing(false);
                } else {
                    alert("Error updating user");
                }
            }
        } else {
            setIsEditing(true);
        }
    };
    return (
        <div className="px-12">
            <div className="font-poppins font-bold text-lg ml-6 mt-6">Informasi akun</div>
            <div className="w-2/5 shadow-2xl rounded-sm mt-2 ml-6 py-10 px-8 mb-12">
                <div className="flex items-center">
                    <div>
                    <img src={user?.avatar ? `http://localhost:3000/usr/avatars/${user.user_id}?${new Date().getTime()}` : defaultLogo} alt="Avatar" className="w-24 h-24 rounded-full" />
                    </div>
                    <div className="flex flex-col ml-4">
                        <div className="font-poppins text-md font-semibold text-slate-500">Selamat datang</div>
                        <div className="font-poppins text-md font-normal text-slate-500">{user?.username || "Anonim"}</div>
                        <div className="mt-1">
                            {user?.isVerified ? (
                                <div className="flex items-center">
                                    <img src={verifiedLogo} alt="Verified" className="text-green-600 w-5 h-5" />
                                    <span className="text-green-600 font-semibold font-poppins text-sm ml-1">Akun terverifikasi</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <img src={unverifiedLogo} alt="Unverified" className="text-red-600 w-5 h-5" />
                                    <span className="text-red-600 font-semibold font-poppins text-sm ml-1">Akun tidak terverifikasi</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="username" className="font-semibold text-slate-500">Username</label>
                            <div onClick={handleEditClick} className="cursor-pointer font-bold font-poppins text-blue-600 text-sm">
                                {isEditing ? "Simpan" : "Edit"}
                            </div>
                        </div>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <img src={usernameLogo} alt="Username" className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                placeholder="Username"
                                disabled={!isEditing}
                                value={user?.username || formData.username}
                                onChange={handleInputChange}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="email" className="font-semibold text-slate-500">Email</label>
                            <div className="cursor-pointer font-bold font-poppins text-green-600 text-sm">
                                Terverifikasi
                            </div>
                        </div>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <img src={emailLogo} alt="Email" className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                placeholder="Email"
                                disabled
                                value={user?.email || ""}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="phone" className="font-semibold text-slate-500">Phone</label>
                            <div onClick={handleEditClick} className="cursor-pointer font-bold font-poppins text-blue-600 text-sm">
                                {isEditing ? "Simpan" : "Edit"}
                            </div>
                        </div>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <img src={phoneLogo} alt="Phone" className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                placeholder="Phone"
                                disabled={!isEditing}
                                value={user?.phone || formData.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="avatar" className="font-semibold text-slate-500">Avatar</label>
                            <div onClick={handleEditClick} className="cursor-pointer font-bold font-poppins text-blue-600 text-sm">
                                {isEditing ? "Simpan" : "Edit"}
                            </div>
                        </div>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <img src={avatarLogo} alt="Avatar" className="w-4 h-4" />
                            </div>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                placeholder="Avatar"
                                disabled={!isEditing}
                                onChange={handleInputChange}
                            />
                            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
                        </div>
                    </div>
                </div>
                {user?.isVerified ? (
                    <div>
                        <button className="bg-green-800 text-white font-light text-lg hover:bg-green-950 hover:shadow-sm hover:shadow-green-700 py-2.5 px-6 rounded-lg w-full mt-8">
                            Verifikasi KYC level 2
                        </button>
                        <div>
                            <div className="flex items-center mt-1">
                                <img src={infoLogo} alt="Hint" className="w-4 h-4" />
                                <span className="text-gray-500 text-sm font-poppins ml-2 mt-1">
                                    Verifikasi level 2 diperlukan untuk membuat pendanaan usaha
                                </span>
                            </div>
                        </div>
                    </div>
                ) : user?.roles === 'FUNDRAISER' ? (
                    <button disabled className="bg-red-700 text-white font-bold font-poppins text-md py-2.5 px-6 rounded-lg w-full mt-8">
                        Verifikasi telah dilakukan
                    </button>
                ) : (
                    <div>
                        <Link to={'/kyc-level-1'} >
                            <div className="bg-blue-800 text-white font-light text-lg hover:bg-blue-950 hover:shadow-sm hover:shadow-blue-700 py-2.5 px-6 rounded-lg w-full mt-8 text-center">
                                Verifikasi akun
                            </div>
                        </Link>
                        <div>
                            <div className="flex items-center mt-1">
                                <img src={infoLogo} alt="Hint" className="w-4 h-4" />
                                <span className="text-gray-500 text-sm font-poppins ml-2 mt-1">
                                    Untuk terverifikasi, Anda harus menyelesaikan verifikasi pengguna
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <SuccessMessage message="Berhasil memperbaharui profile"/>
                )}
            </div>
        </div>
    );
};

export default Profile;
