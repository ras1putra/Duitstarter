import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import duitstarterLogo from '../assets/duitstarter-log.svg';
import { Link, redirect } from "react-router-dom";

interface LoginForm {
    email: string;
    password: string;
}

const Login: React.FC = () => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {

            axios.post(
                "http://localhost:3000/auth/login",
                {
                  email: formData.email,
                  password: formData.password
                },
                {
                  withCredentials: true
                })
                .then((res) => {
                        if (res.status !== 200) {
                            setError(res.data.message);
                        } else {
                            setSuccessMessage("Berhasil login");
                            setFormData({ email: "", password: "" });
                            setError("");
                            redirect("/");
                            setInterval(() => {
                                window.location.reload();
                            }, 2000);
                        }
                    })
    .catch((err) => {
        setError(err.response?.data?.error.message || "An error occurred.");
    });
        }
    };




return (
    <div className="login-container flex items-center">
        <div className="lg:w-4/12 sm:w-9/10 h-[620px] rounded-xl rounded-bl-xl bg-gray-600 bg-opacity-20 mx-auto glass-morphism mt-16 py-2 px-12">
            <div className="flex items-center justify-center mr-2 mt-6">
                <img src={duitstarterLogo} alt="Duitstarter logo" />
                <div className="font-bold font-montserrat text-2xl text-white">
                    Duitstarter
                </div>
            </div>
            <div className="flex flex-col">
                <div className="font-bold font-montserrat text-4xl text-white">
                    Selamat Datang Kembali
                </div>
                <div className="flex items-center">
                    <div className="text-slate-50 font-light text-md">
                        Belum punya akun?
                    </div>
                    <Link to='/register' className="text-red-600 font-extrabold font-montserrat ml-2">
                        Daftar
                    </Link>
                </div>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3">
                    <label htmlFor="email" className="mb-1 text-sm font-bold text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="p-2 border rounded-md"
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
                        className="p-2 border rounded-md"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                    />
                </div>
                <button type="submit" className="w-full py-2 mt-4 text-white bg-pink-600 rounded-md hover:bg-pink-900 font-bold">Masuk ke akun</button>
                {error && <div className="text-red-900 font-bold text-sm">{error}</div>}
            </form>
            <div className="or-divider">
                <span className="font-semibold">atau</span>
            </div>
            <button type="button" className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-pink-900 font-bold border-white border-2">Masuk dengan Google</button>
        </div>
        {successMessage && (
            <div className="w-full max-w-sm mx-auto my-2 overflow-hidden rounded shadow-sm fixed top-0 right-0 mt-20 mr-4 z-50 animate-slide-in">
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
                    <span className="block text-gray-600">Berhasil login</span>
                </div>
            </div>
        )}
    </div>
);
};

export default Login;
