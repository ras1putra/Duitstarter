"use client";

import { useState } from "react";
import axios from "axios";
import DuitstarterLogo from "@/Assets/Logo/duitstarter-log.svg";
import Image from "next/image";
import Link from "next/link";
import '@/styles/index.css';
import { useAppDispatch } from '../../../store/hook';
import { login } from '../../../store/authSlice';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";

interface LoginForm {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const validateForm = (): boolean => {
        let error = "";

        if (!formData.password) {
            error = "Password tidak boleh kosong.";
        }

        if (!formData.email) {
            error = "Email tidak boleh kosong.";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            error = "Format email salah.";
        }

        setError(error);
        return !error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (validateForm()) {
            try {
                const response = await axios.post<{ user: any }>(
                    "http://localhost:8000/auth/login",
                    {
                        email: formData.email,
                        password: formData.password
                    },
                    {
                        withCredentials: true
                    }
                );

                if (response.data && response.data.user) {
                    dispatch(login(response.data.user));
                    router.push("/");
                } else {
                    throw new Error("Respons tidak valid dari server");
                }
            } catch (error) {
                console.error("Login gagal:", error);
                setError("Login gagal. Silakan coba lagi.");
            }
        }
    };

    return (
        <div className="login-container flex items-center">
            <div className="w-[95%] md:w-4/5 lg:w-2/5 py-16 rounded-xl rounded-bl-xl bg-gray-600 bg-opacity-20 mx-auto glass-morphism lg:mt-16 px-4 md:px-12">
                <div className="flex items-center justify-center mr-2">
                    <Image src={DuitstarterLogo} alt="Duitstarter logo" />
                    <div className="font-bold font-poppins text-2xl text-white">
                        Duitstarter
                    </div>
                </div>
                <div className="flex flex-col mt-6">
                    <div className="font-bold text-4xl text-white">
                        Selamat Datang Kembali
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="text-slate-50 font-light text-sm">
                            Belum punya akun?
                        </div>
                        <Link href='/register' className="text-red-600 font-extrabold font-poppins ml-2 text-sm">
                            Daftar
                        </Link>
                    </div>
                </div>
                <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="mb-1 text-sm font-bold text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="p-1.5 border rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="mb-1 text-sm font-bold text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="p-1.5 border rounded-md"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 text-white bg-pink-600 rounded-md hover:bg-pink-900 font-bold">Masuk ke akun</button>
                </form>
                <div className="or-divider">
                    <span className="font-semibold">atau</span>
                </div>
                <button type="button" className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-pink-900 font-bold border-white border-2 flex items-center justify-center">
                    <FcGoogle/>
                    <span className="ml-2">Masuk dengan Google</span>
                </button>
            </div>
        </div>
    );
};

export default Login;
