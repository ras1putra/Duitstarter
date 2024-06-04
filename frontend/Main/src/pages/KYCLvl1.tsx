import React, { useState, ChangeEvent, useEffect } from "react";
import defaultImage from '../assets/pictures.png';
import exampleKTP from '../assets/Introduce-Yourself.png';
import hintLogo from '../assets/info-circle-svgrepo-com.svg';
import api from "../axiosConfig";
import SuccessMessage from "../component/SuccessMessage";

interface KYCLevel1 {
    full_name: string;
    nik: string;
    gender: string;
    tanggal_lahir: Date;
}

interface FotoDokumen {
    foto_ktp_depan: File | null;
    foto_ktp_belakang: File | null;
    foto_selfie: File | null;
}

interface Address {
    address: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
    kode_pos: string;
}

interface Error {
    full_name?: string;
    nik?: string;
    gender?: string;
    tanggal_lahir?: string;
    address?: string;
    kecamatan?: string;
    kota?: string;
    provinsi?: string;
    kode_pos?: string;
    image?: string;
    foto_ktp_depan?: string;
    foto_ktp_belakang?: string;
    foto_selfie?: string;
}

const KYCLvl1: React.FC<{ user: any }> = ({ user }) => {
    const [step, setStep] = useState<number>(1);
    const [errors, setErrors] = useState<Error>({});

    const [KYCData, setKYCData] = useState<KYCLevel1>({
        full_name: '',
        nik: '',
        gender: '',
        tanggal_lahir: new Date(),
    });

    const [address, setAddress] = useState<Address>({
        address: '',
        kecamatan: '',
        kota: '',
        provinsi: '',
        kode_pos: '',
    });

    const [fotoDokumen, setFotoDokumen] = useState<FotoDokumen>({
        foto_ktp_depan: null,
        foto_ktp_belakang: null,
        foto_selfie: null,
    });

    const [frontKTP, setFrontKTP] = useState<string | null>(null);
    const [backKTP, setBackKTP] = useState<string | null>(null);
    const [selfieWithKTP, setSelfieWithKTP] = useState<string | null>(null);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
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

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>, setImage: (value: string | null) => void, setFile: (value: File | null) => void) => {
        const file = event?.target?.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result ? reader.result.toString() : null);
            };
            reader.readAsDataURL(file);

            // Set the file for backend submission
            setFile(file);
        }
    };


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            if (!["image/jpeg", "image/png"].includes(file.type)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: "File harus berformat JPG atau PNG",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: undefined,
                }));
                setFotoDokumen({
                    ...fotoDokumen,
                    [name]: file,
                });
            }
        } else {
            if (name === "tanggal_lahir") {
                setKYCData({
                    ...KYCData,
                    [name]: new Date(value),
                });
            }
            else {
                setKYCData({
                    ...KYCData,
                    [name]: value,
                });
            }
        }
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "gender") {
            setKYCData({
                ...KYCData,
                [name]: value,
            });
        } else if (name === "gender") {
            const genderValue = value || "laki-laki";
            setKYCData({
                ...KYCData,
                [name]: genderValue,
            });
        } else {
            setAddress({
                ...address,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        let newErrors: Error = {};
        if (!KYCData.full_name) newErrors.full_name = 'Nama Lengkap diperlukan';
        if (!KYCData.nik) newErrors.nik = 'NIK diperlukan';
        if (!KYCData.tanggal_lahir || isNaN(KYCData.tanggal_lahir.getTime())) newErrors.tanggal_lahir = 'Tanggal lahir diperlukan';
        if (!address.address) newErrors.address = 'Alamat diperlukan';
        if (!address.kode_pos) newErrors.kode_pos = 'Kode pos diperlukan';
        if (!address.kecamatan) newErrors.kecamatan = 'Kecamatan diperlukan';
        if (!address.kota) newErrors.kota = 'Kota/Kabupaten diperlukan';
        if (!address.provinsi) newErrors.provinsi = 'Provinsi diperlukan';
        if (!fotoDokumen.foto_ktp_depan && !frontKTP) newErrors.foto_ktp_depan = 'Foto KTP depan diperlukan';
        if (!fotoDokumen.foto_ktp_belakang && !backKTP) newErrors.foto_ktp_belakang = 'Foto KTP belakang diperlukan';
        if (!fotoDokumen.foto_selfie && !selfieWithKTP) newErrors.foto_selfie = 'Selfie dengan KTP diperlukan';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const formData = new FormData();
            formData.append('full_name', KYCData.full_name);
            formData.append('nik', KYCData.nik);
            formData.append('gender', KYCData.gender);
            formData.append('tanggal_lahir', KYCData.tanggal_lahir.toISOString());
            formData.append('address', address.address);
            formData.append('kecamatan', address.kecamatan);
            formData.append('kota', address.kota);
            formData.append('provinsi', address.provinsi);
            formData.append('kode_pos', address.kode_pos);
            if (fotoDokumen.foto_ktp_depan) formData.append('foto_ktp_depan', fotoDokumen.foto_ktp_depan);
            if (fotoDokumen.foto_ktp_belakang) formData.append('foto_ktp_belakang', fotoDokumen.foto_ktp_belakang);
            if (fotoDokumen.foto_selfie) formData.append('foto_selfie', fotoDokumen.foto_selfie);

            try {
                const response = await api.post("/usr/kyc-level-1", formData);
                if (response.status === 201) {
                    setSuccessMessage("Data KYC berhasil disubmit, silahkan tunggu disetujusi");
                }
            } catch (error) {
                console.error("Error submitting KYC data:", error);
            }
        }
    };

    return (
        user?.isverified === false ? (<div className="px-12">
            <div className="font-semibold font-montserrat text-lg mt-6">
                Unggah detail informasi
            </div>
            <div className="flex mt-6">
                <div className="w-1/2 px-4">
                    <div className={`text-center font-bold text-md ${step === 1 ? "text-green-500" : "text-gray-500"}`}>
                        Informasi pribadi
                    </div>
                    <div className={`w-full h-3 rounded-lg ${step === 1 ? "bg-green-500" : "bg-gray-500"}`}></div>
                </div>
                <div className="w-1/2 px-4">
                    <div className={`text-center font-bold text-md ${step === 2 ? "text-green-500" : "text-gray-500"}`}>
                        Dokumen pendukung
                    </div>
                    <div className={`w-full h-3 rounded-lg ${step === 2 ? "bg-green-500" : "bg-gray-500"}`}></div>
                </div>
            </div>
            <div className="mt-6">
                {step === 1 && (
                    <div>
                        <div className="w-full shadow-2xl rounded-sm mt-6 py-8 px-8 mb-12">
                            <div className="text-xl font-bold font-poppins">
                                Informasi pribadi
                            </div>
                            <div className="font-light text-slate-900">
                                Masukkan informasi pribadi Anda
                            </div>
                            <div className="flex flex-row w-full">
                                <div className="flex justify-between w-full">
                                    <div className="flex-grow mr-2">
                                        <label htmlFor="fullname" className="block mt-4 font-semibold text-md text-slate-600 mb-1">Nama Lengkap</label>
                                        <input type="text" id="fullname" value={KYCData.full_name} onChange={handleInputChange} name="full_name" className="w-full rounded-lg p-2 h-10 border-2 border-slate-300" />
                                        {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
                                    </div>
                                    <div className="flex-grow ml-2">
                                        <label htmlFor="nik" className="block mt-4 font-semibold text-md text-slate-600 mb-1">NIK</label>
                                        <input type="text" id="nik" value={KYCData.nik} onChange={handleInputChange} name="nik" className="w-full rounded-lg p-2 h-10 border-2 border-slate-300" />
                                        {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row w-full">
                                <div className="flex justify-between w-full">
                                    <div className="mr-2 w-1/2">
                                        <label htmlFor="kelamin" className="block mt-2 font-semibold text-md text-slate-600 mb-1">Jenis kelamin</label>
                                        <select id="kelamin" value={KYCData.gender} onChange={handleSelectChange} name="gender" className="w-full rounded-lg p-2 h-10 border-2 border-slate-300">
                                            <option value="laki-laki">Laki-laki</option>
                                            <option value="perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                    <div className="ml-2 w-1/2">
                                        <label htmlFor="datebirth" className="block mt-2 font-semibold text-md text-slate-600 mb-1">Tanggal lahir</label>
                                        <input type="date" id="datebirth" value={KYCData.tanggal_lahir.toISOString().split('T')[0]} onChange={handleInputChange} name="tanggal_lahir" className="w-full rounded-lg p-2 h-10 border-2 border-slate-300" />
                                        {errors.tanggal_lahir && <p className="text-red-500 text-sm">{errors.tanggal_lahir}</p>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="block mt-2 font-semibold text-md text-slate-600 mb-1">Alamat</label>
                                <textarea id="address" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} className="w-full rounded-lg p-2 h-20 border-2 border-slate-300"></textarea>
                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                            </div>
                            <div>
                                <div className="flex justify-between w-full">
                                    <div className="w-1/4 mr-2">
                                        <label htmlFor="city" className="block mt-2 font-semibold text-md text-slate-600 mb-1">Kode pos</label>
                                        <input type="text" id="city" value={address.kode_pos} onChange={(e) => setAddress({ ...address, kode_pos: e.target.value })} className="w-full rounded-lg p-2 h-10 border-2 border-slate-300" />
                                        {errors.kode_pos && <p className="text-red-500 text-sm">{errors.kode_pos}</p>}
                                    </div>
                                    <div className="w-1/4 mr-2 ml-2">
                                        <label htmlFor="district" className="block mt-2 font-semibold text-md text-slate-600 mb-1">Kecamatan</label>
                                        <input type="text" id="district" value={address.kecamatan} onChange={(e) => setAddress({ ...address, kecamatan: e.target.value })} className="w-full rounded-lg p-2 h-10 border-2 border-slate-300" />
                                        {errors.kecamatan && <p className="text-red-500 text-sm">{errors.kecamatan}</p>}
                                    </div>
                                    <div className="w-1/4 mr-2 ml-2">
                                        <label htmlFor="cityOrRegency" className="block mt-2 font-semibold text-md text-slate-600 mb-1">Kota/Kabupaten</label>
                                        <input type="text" id="cityOrRegency" value={address.kota} onChange={(e) => setAddress({ ...address, kota: e.target.value })} className="w-full rounded-lg p-2 h-10 border-2 border-slate-300" />
                                        {errors.kota && <p className="text-red-500 text-sm">{errors.kota}</p>}
                                    </div>
                                    <div className="w-1/4 ml-2">
                                        <label htmlFor="province" className="block mt-2 font-semibold text-md text-slate-600 mb-1">Provinsi</label>
                                        <input type="text" id="province" value={address.provinsi} onChange={(e) => setAddress({ ...address, provinsi: e.target.value })} className="w-full rounded-lg p-2 h-10 border-2 border-slate-300" />
                                        {errors.provinsi && <p className="text-red-500 text-sm">{errors.provinsi}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={nextStep} className="mt-8 bg-blue-800 hover:bg-blue-950 text-lg hover:shadow-sm hover:shadow-blue-950 text-white font-light py-2.5 w-2/5 rounded-lg">
                                    Berikutnya
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="w-full shadow-2xl rounded-sm mt-6 py-8 px-8 mb-12">
                            <div className="text-xl font-bold font-poppins">
                                Dokumen pendukung
                            </div>
                            <div className="font-light text-slate-900">
                                Masukkan dokumen pendukung yang diperlukan
                            </div>
                            <div className="mt-6">
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex flex-col items-center w-1/2 mr-2">
                                        <div className="text-center text-lg font-bold text-green-500">
                                            Foto KTP depan
                                        </div>
                                        <div className="mt-2 w-4/5 h-64 border-dashed border-4 border-green-600 flex justify-center items-center">
                                            <img src={frontKTP || defaultImage} alt="KTP depan" className="h-full w-auto" />
                                        </div>
                                        <input type="file" className="mt-2" onChange={(e) => handleImageChange(e, setFrontKTP, (file) => setFotoDokumen({ ...fotoDokumen, foto_ktp_depan: file }))} />
                                        {errors.foto_ktp_depan && <p className="text-red-500 text-sm">{errors.foto_ktp_depan}</p>}
                                    </div>
                                    <div className="flex flex-col items-center w-1/2 ml-2">
                                        <div className="text-center text-lg font-bold text-green-500">
                                            Foto KTP belakang
                                        </div>
                                        <div className="mt-2 w-4/5 h-64 border-dashed border-4 border-green-600 flex justify-center items-center">
                                            <img src={backKTP || defaultImage} alt="KTP belakang" className="h-full w-auto" />
                                        </div>
                                        <input type="file" className="mt-2" onChange={(e) => handleImageChange(e, setBackKTP, (file) => setFotoDokumen({ ...fotoDokumen, foto_ktp_belakang: file }))} />
                                        {errors.foto_ktp_belakang && <p className="text-red-500 text-sm">{errors.foto_ktp_belakang}</p>}
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-between mt-4">
                                    <div className="flex flex-col items-center w-1/2 mr-2">
                                        <div className="text-center text-lg font-bold text-green-500">
                                            Selfie dengan KTP
                                        </div>
                                        <div className="mt-2 w-4/5 h-64 border-dashed border-4 border-green-600 flex justify-center items-center">
                                            <img src={selfieWithKTP || defaultImage} alt="Selfie dengan KTP" className="h-full w-auto" />
                                        </div>
                                        <input type="file" className="mt-2" onChange={(e) => handleImageChange(e, setSelfieWithKTP, (file) => setFotoDokumen({ ...fotoDokumen, foto_selfie: file }))} />
                                        {errors.foto_selfie && <p className="text-red-500 text-sm">{errors.foto_selfie}</p>}
                                    </div>
                                    <div className="flex flex-col items-center w-1/2 ml-2">
                                        <div className="text-center text-lg font-bold text-green-500">
                                            Contoh selfie dengan KTP
                                        </div>
                                        <div className="mt-2 w-4/5 h-64 border-dashed border-4 border-green-600 flex justify-center items-center">
                                            <img src={exampleKTP} alt="Contoh KTP" className="h-full w-auto" />
                                        </div>
                                        <div className="mt-2 flex items-center justify-center">
                                            <img src={hintLogo} className="h-4 w-4" />
                                            <div className="font-light ml-2">Pastikan gambar terlihat jelas dan tidak terpotong</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center">
                                <button onClick={prevStep} className="mr-4 mt-8 bg-blue-800 hover:bg-blue-950 text-lg hover:shadow-sm hover:shadow-blue-950 text-white font-light py-2.5 w-1/5 rounded-lg">
                                    Sebelumnya
                                </button>
                                <button onClick={handleSubmit} className="ml-4 mt-8 bg-green-700 hover:bg-green-950 text-lg hover:shadow-sm hover:shadow-green-950 text-white font-light py-2.5 w-1/5 rounded-lg">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <SuccessMessage message="Berhasil mengirim berkas, silahkan tunggu disetjui"/>
                )}

            </div>
        </div> ) : (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="font-bold text-2xl text-blue-800">
                        Anda sudah terverifikasi
                    </div>
                    <div className="font-light text-lg text-slate-800 mt-4">
                        Terima kasih telah melakukan verifikasi, akun Anda sudah terverifikasi
                    </div>
                </div>
            </div>
        )
    );
};

export default KYCLvl1;
