import React from 'react';
import { useState } from 'react';

interface DetailedUserProps {
    user: any;
    isOpen: boolean;
    onClose: () => void;
}

const DetailedUser: React.FC<DetailedUserProps> = ({ user, isOpen, onClose }) => {
    console.log(user)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!isOpen) return null;

    const formattedDate = new Date(user.tanggal_lahir).toISOString().split('T')[0];

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseImagePopup = () => {
        setSelectedImage(null);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center flex-col">
            <div className="bg-white py-8 rounded-t-md overflow-y-auto w-3/5 h-3/4 max-h-3/4 flex flex-col items-center">
                <div className='font-bold font-poppins text-center text-lg'>
                    Detail identitas
                </div>
                <div>
                    <div className='flex flex-grow w-full justify-start items-center mt-6 mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='full_name'>
                            Nama lengkap
                        </label>
                        <input
                            id='full_name'
                            disabled
                            value={user.full_name}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='nik'>
                            NIK
                        </label>
                        <input
                            id='nik'
                            disabled
                            value={user.nik}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='jenis_kelamin'>
                            Jenis kelamin
                        </label>
                        <input
                            id='jenis_kelamin'
                            disabled
                            value={user.jenis_kelamin}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='datebirth'>
                            Tanggal lahir
                        </label>
                        <input
                            id='datebirth'
                            type='date'
                            disabled
                            value={formattedDate}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='address'>
                            Alamat
                        </label>
                        <input
                            id='address'
                            disabled
                            value={user.address.address}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='kecamatan'>
                            Kecamatan
                        </label>
                        <input
                            id='kecamatan'
                            disabled
                            value={user.address.kecamatan}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='kota'>
                            Kota
                        </label>
                        <input
                            id='kota'
                            disabled
                            value={user.address.kota}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='provinsi'>
                            Provinsi
                        </label>
                        <input
                            id='provinsi'
                            disabled
                            value={user.address.provinsi}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <label className='text-slate-500 w-1/4 font-semibold' htmlFor='kode_pos'>
                            Kode pos
                        </label>
                        <input
                            id='kode_pos'
                            disabled
                            value={user.address.kode_pos}
                            className='font-semibold w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <div className='text-slate-500 w-1/4 font-semibold'>
                            Foto ktp depan
                        </div>
                        <img
                            src={`http://localhost:3000/usr/foto-ktp-depan/${user.user_id}`}
                            alt="foto-ktp-depan"
                            className='w-80 h-40 border-2 cursor-pointer'
                            onClick={() => handleImageClick(`http://localhost:3000/usr/foto-ktp-depan/${user.user_id}`)}
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <div className='text-slate-500 w-1/4 font-semibold'>
                            Foto ktp belakang
                        </div>
                        <img
                            src={`http://localhost:3000/usr/foto-ktp-belakang/${user.user_id}`}
                            alt="foto-ktp-belakang"
                            className='w-80 h-40 border-2 cursor-pointer'
                            onClick={() => handleImageClick(`http://localhost:3000/usr/foto-ktp-belakang/${user.user_id}`)}
                        />
                    </div>
                    <div className='flex w-full justify-start items-center mb-4'>
                        <div className='text-slate-500 w-1/4 font-semibold'>
                            Foto selfie dengan ktp
                        </div>
                        <img
                            src={`http://localhost:3000/usr/foto-selfie/${user.user_id}`}
                            alt="foto-selfie"
                            className='w-80 h-40 border-2 cursor-pointer'
                            onClick={() => handleImageClick(`http://localhost:3000/usr/foto-selfie/${user.user_id}`)}
                        />
                    </div>
                    {selectedImage && (
                        <div className="fixed top-[50%] left-[50%] w-full h-full translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-4 rounded-md cursor-pointer" onClick={handleCloseImagePopup}>
                                <img src={selectedImage} alt="Fullsize" className="max-w-lg max-h-lg" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-3 w-3/5 bg-slate-200 shadow-xl flex justify-end space-x-3 rounded-b-md">
                    <button className="bg-green-500 text-white py-2 px-4 rounded-md font-bold">Terima</button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-md font-bold">Tolak</button>
                    <button className="bg-slate-500 text-white py-2 px-4 rounded-md font-bold" onClick={onClose}>Tutup</button>
                </div>
        </div>
    );
};

export default DetailedUser;
