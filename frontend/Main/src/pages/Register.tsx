import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Register.css";
import duitstarterLogo from '../assets/duitstarter-log.svg';
import { Link } from "react-router-dom";

interface RegisterForm {
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    privacy: boolean;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterForm>({
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
        privacy: false,
    });
    const [error, setError] = useState("");

    const validateForm = (): boolean => {
        let error = "";

        if (!formData.terms || !formData.privacy) {
            error = "Wajib setuju kebijakan dan persyaratan yang berlaku.";
        }

        if (formData.password !== formData.confirmPassword) {
            error = "Konfirmasi passwords tidak sama.";
        }

        if (!formData.password) {
            error = "Password tidak boleh kosong.";
        }

        if (formData.password.length < 8) {
            error = "Password minimal 8 karakter.";
        }

        if (!/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(formData.password)) {
            error = "Password minimal berisi 1 huruf kapital dan 1 simbol.";
        }

        if (!formData.email) {
            error = "Email tidak boleh kosong.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            error = "IFormat email salah.";
        }

        setError(error);
        return !error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post("http://localhost:3000/auth/register", {
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                })
                .then((res) => {
                    console.log(res.data);

                    if (res.status !== 200) {
                        setError(res.data.message);
                    } else {
                        setFormData({ email: "", password: "", confirmPassword: "", terms: false, privacy: false });
                        setError("");
                    }
                })
                .catch((err) => {
                    setError(err.response?.data?.error.message || "An error occurred.");
                });
        }
    };



    return (
        <div className="register-container z-10 flex items-center">
            <div className="lg:w-4/12 sm:w-9/10 h-[660px] rounded-xl rounded-bl-xl bg-gray-600 bg-opacity-20 mx-auto glass-morphism mt-16 py-2 px-12">
                <div className="flex items-center justify-center mr-2">
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
                            Sudah punya akun?
                        </div>
                        <Link to='/login' className="text-red-600 font-extrabold font-montserrat ml-2">
                            Masuk
                        </Link>
                    </div>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="mb-2 text-sm font-bold text-white">Email</label>
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
                        <label htmlFor="password" className="mb-2 text-sm font-bold text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="p-2 border rounded-md"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="confirmPassword" className="mb-2 text-sm font-bold text-white">Konfirmasi Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="p-2 border rounded-md"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="before:content[''] peer relative h-3 w-3 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-200 before:opacity-0 before:transition-opacity checked:border-white checked:bg-white checked:before:bg-white hover:before:opacity-10"
                                id="terms"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                            />
                            <label htmlFor="terms" className="text-white font-thin text-sm ml-2">Saya menyetujui segala risiko yang berlaku</label>
                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                className="before:content[''] peer relative h-3 w-3 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-200 before:opacity-0 before:transition-opacity checked:border-white checked:bg-white checked:before:bg-white hover:before:opacity-10"
                                id="privacy"
                                name="privacy"
                                checked={formData.privacy}
                                onChange={handleChange}
                            />
                            <label htmlFor="privacy" className="text-white font-thin text-sm ml-2">Saya menyetujui semua kebijakan yang berlaku</label>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 text-white bg-pink-600 rounded-md hover:bg-pink-900 font-bold">Daftar sebuah akun</button>
                    {error && <div className="text-red-900 font-bold text-sm">{error}</div>}
                </form>
                <div className="or-divider">
                    <span className="font-semibold">atau</span>
                </div>
                <button type="button" className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-pink-900 font-bold border-white border-2">Daftar dengan Google</button>
            </div>
        </div>
    );
};

export default Register;
