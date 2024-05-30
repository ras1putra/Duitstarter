import React, { useState } from "react";

const KYCLvl1: React.FC = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="px-12">
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
                        <div className="w-full shadow-2xl rounded-sm mt-6 ml-6 py-8 px-8 mb-12">
                            <div className="text-xl font-bold font-poppins">
                                Informasi pribadi
                            </div>
                            <div className="font-light">
                                Masukkan informasi pribadi Anda
                            </div>
                            <div className="flex flex-row">
                                <div>
                                <label htmlFor="fullname" className="block mt-4 font-semibold">Nama Lengkap</label>
                                <input type="text" id="fullname" className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                <label htmlFor="nik" className="block mt-4 font-semibold">NIK</label>
                                <input type="text" id="nik" className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <button onClick={nextStep} className="mt-4 bg-blue-600 text-white font-bold py-2.5 w-2/5 rounded-lg">
                                Berikutnya
                            </button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-center text-lg font-semibold">Dokumen Pendukung</h2>
                        {/* Tambahkan form untuk dokumen pendukung di sini */}
                        <button onClick={prevStep} className="mt-4 bg-gray-600 text-white font-bold py-2.5 px-6 rounded-lg">
                            Sebelumnya
                        </button>
                        <button className="mt-4 bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg">
                            Selesai
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KYCLvl1;
