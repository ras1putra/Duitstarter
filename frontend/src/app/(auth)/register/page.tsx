"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLogoLight from "@/Assets/Logo/duitstarter-log.svg";
import Toast from "@/components/toast/Toast";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

interface RegisterForm {
    email: string;
    verif_code: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    privacy: boolean;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterForm>({
        email: "", verif_code: "", password: "", confirmPassword: "", terms: false, privacy: false,
    });
    const [error, setError] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false); 
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);

    const validateForm = () => {
        const errors = {
            terms: "Wajib setuju kebijakan dan persyaratan yang berlaku.",
            passwordMismatch: "Konfirmasi password tidak sama.",
            emptyVerifCode: "Verifikasi code tidak boleh kosong.",
            emptyPassword: "Password tidak boleh kosong.",
            passwordLength: "Password minimal 8 karakter.",
            passwordComplexity: "Password minimal berisi 1 huruf kapital dan 1 simbol.",
            emptyEmail: "Email tidak boleh kosong.",
            invalidEmail: "Format email salah."
        };

        if (!formData.email) return setError(errors.emptyEmail);
        if (!/\S+@\S+\.\S+/.test(formData.email)) return setError(errors.invalidEmail);
        if (!formData.verif_code) return setError(errors.emptyVerifCode);
        if (!formData.password) return setError(errors.emptyPassword);
        if (formData.password.length < 8) return setError(errors.passwordLength);
        if (!/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(formData.password)) return setError(errors.passwordComplexity);
        if (formData.password !== formData.confirmPassword) return setError(errors.passwordMismatch);
        if (!formData.terms || !formData.privacy) return setError(errors.terms);

        setError(null);
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleRequestVerifCode = async () => {
        if (!formData.email) return setError("Email tidak boleh kosong.");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return setError("Format email salah.");

        setIsRequestLoading(true); 
        try {
            await axios.post("http://localhost:8000/auth/request-verification", { email: formData.email });
            setSuccessMessage("Kode verifikasi berhasil dikirim ke email Anda.");
            setIsButtonDisabled(true);

            const endTime = Date.now() + 600000; 
            localStorage.setItem('countdownEndTime', endTime.toString());

            setCountdown(Math.floor((endTime - Date.now()) / 1000));

            const intervalId = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        localStorage.removeItem('countdownEndTime');
                        setIsButtonDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);

        } catch (error) {
            setServerError("Terjadi kesalahan saat mengirim kode verifikasi.");
        } finally {
            setIsRequestLoading(false);
        }
    };

    const formatCountdown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitLoading(true);
            try {
                const response = await axios.post("http://localhost:8000/auth/register", {
                    email: formData.email,
                    verif_code: formData.verif_code,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                });
                setSuccessMessage("Registrasi berhasil. Silahkan login.");
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setServerError(error.response.data.message);
                } else {
                    setServerError("Terjadi kesalahan saat melakukan registrasi.");
                }
            } finally {
                setIsSubmitLoading(false);
            }
        }
    };

    useEffect(() => {
        const savedEndTime = localStorage.getItem('countdownEndTime');
        if (savedEndTime) {
            const endTime = parseInt(savedEndTime, 10);
            const remainingTime = Math.max(Math.floor((endTime - Date.now()) / 1000), 0);
            setCountdown(remainingTime);
            setIsButtonDisabled(remainingTime > 0);
    
            const intervalId = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        localStorage.removeItem('countdownEndTime');
                        setIsButtonDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
    
            return () => clearInterval(intervalId);
        }
    }, []);    

    return (
        <div className="register-container flex items-center py-14 pt-6 min-h-screen">
            <div className="w-[95%] md:4/5 lg:w-2/5 rounded-xl rounded-bl-xl bg-gray-600 bg-opacity-20 mx-auto glass-morphism mt-16 py-10 px-4 md:px-12">
                <div className="flex items-center justify-center mr-2">
                    <Image src={MainLogoLight} alt="Duitstarter logo" />
                    <div className="font-semibold font-poppins text-2xl text-white">Duitstarter</div>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="font-bold text-4xl text-white">Selamat Datang</div>
                    <div className="flex items-center mt-2">
                        <div className="text-slate-50 font-light text-sm">Sudah punya akun?</div>
                        <Link href='/login' className="text-red-600 font-extrabold font-poppins ml-2 text-sm">Masuk</Link>
                    </div>
                </div>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="mb-1 text-md font-bold text-white">Email</label>
                        <div className="flex flex-row justify-between">
                            <input type="email" id="email" className="p-1.5 border rounded-md w-8/12" value={formData.email} onChange={handleChange} name="email" />
                            <button
                                type="button"
                                onClick={handleRequestVerifCode}
                                className={`py-1.5 w-4/12 ml-2 ${isButtonDisabled ? 'bg-gray-400 text-gray-200' : 'bg-blue-600 text-white'} font-semibold border-2 ${isButtonDisabled ? 'border-gray-400' : 'border-blue-600'} rounded-md hover:${isButtonDisabled ? '' : 'bg-blue-900 hover:bg-blue-900 hover:border-blue-900'} ${isRequestLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isButtonDisabled || isRequestLoading}
                            >
                                {isRequestLoading ? 
                                    (<div role="status">
                                        <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin fill-blue-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>)
                                : isButtonDisabled ? `${formatCountdown(countdown)}` : 'Kirim kode'}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="verif_code" className="mb-1 text-md font-bold text-white">Kode Konfirmasi</label>
                        <input type="text" id="verif_code" className="p-1.5 border rounded-md" value={formData.verif_code} onChange={handleChange} name="verif_code" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="mb-1 text-md font-bold text-white">Password</label>
                        <input type="password" id="password" className="p-1.5 border rounded-md" value={formData.password} onChange={handleChange} name="password" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="confirmPassword" className="mb-1 text-md font-bold text-white">Konfirmasi Password</label>
                        <input type="password" id="confirmPassword" className="p-1.5 border rounded-md" value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" />
                    </div>
                    <div className="flex flex-col">
                        {["terms", "privacy"].map((item) => (
                            <div key={item} className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    className="before:content[''] peer relative h-3 w-3 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-1.5/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-200 before:opacity-0 before:transition-opacity checked:border-white checked:bg-white checked:before:bg-white hover:before:opacity-10"
                                    id={item}
                                    name={item}
                                    checked={formData[item as keyof RegisterForm] as boolean}
                                    onChange={handleChange}
                                />
                                <label htmlFor={item} className="text-white font-thin text-sm ml-2">
                                    {item === "terms" ? "Saya menyetujui segala risiko yang berlaku" : "Saya menyetujui semua kebijakan yang berlaku"}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className={`w-full py-2 mt-4 text-white rounded-md ${isSubmitLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-900'} font-bold ${isSubmitLoading ? '' : 'hover:bg-pink-900'}`} disabled={isSubmitLoading}>
                        {isSubmitLoading ? 
                            (<div role="status">
                                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>)
                        : 'Daftar sebuah akun'}
                    </button>
                    {error && (
                        <Toast type="warning" message={error} />
                    )}
                    {serverError && (
                        <Toast type="danger" message={serverError} />
                    )}
                    {successMessage && (
                        <Toast type="success" message={successMessage} />
                    )}
                </form>
                <div className="or-divider">
                    <span className="font-semibold">atau</span>
                </div>
                <button type="button" className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-pink-900 font-bold border-white border-2 flex items-center justify-center">
                    <FcGoogle/>
                    <span className="ml-2">Daftar dengan Google</span>
                </button>
            </div>
        </div>
    );
};

export default Register;
