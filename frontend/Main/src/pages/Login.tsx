import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import duitstarterLogo from '../assets/duitstarter-log.svg';
import { Link, useNavigate } from "react-router-dom";
import SuccessMessage from "../component/SuccessMessage";

interface LoginForm {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();

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
                        setInterval(() => {
                            navigate('/');
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
                <SuccessMessage message="Berhasil login" />
            )}
        </div>
    );
};

export default Login;
