import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import UserCard from "../component/UserCard";

interface Address {
    address_id: string;
    address: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
    kode_pos: string;
    kyc_level_1_id: string;
}

interface FotoDokumen {
    foto_dokumen_id: string;
    foto_ktp_depan: Buffer;
    foto_ktp_belakang: Buffer;
    foto_selfie: Buffer;
    kyc_level_1_id: string;
}

interface KYCLevel1 {
    kyc_level_1_id: string;
    user_id: string;
    full_name: string;
    nik: string;
    tanggal_lahir: string;
    status: string;
    isaproved: boolean;
    createdAt: string;
    updatedAt: string;
    statusUpdate: string | null;
    jenis_kelamin: string;
    foto_dokumen: FotoDokumen;
    address: Address;
}

interface KYCLvl1AdminProps {
    isNavbarOpen: boolean;
}

const KYCLvl1Admin: React.FC<KYCLvl1AdminProps> = ({ isNavbarOpen }) => {
    const [activeTab, setActiveTab] = useState('permintaan');
    const [users, setUsers] = useState<KYCLevel1[]>([]);

    const getAllKYCLevel1 = async () => {
        try {
            const response = await api.get('/usr/kyc-level-1');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching KYC Level 1:', error);
        }
    };

    useEffect(() => {
        getAllKYCLevel1();
    }, []);

    const filteredUsers = users.filter(user => {
        if (activeTab === 'permintaan') {
            return user.status === 'PENDING';
        } else if (activeTab === 'diterima') {
            return user.isaproved === true;
        } else if (activeTab === 'ditolak') {
            return user.isaproved === false;
        }
        return false;
    });

    return (
        <div className={`bg-blue-100 h-screen p-10 ${isNavbarOpen ? 'ml-72' : 'ml-20'}`}>
            <div className="bg-white rounded-md p-8">
                <div className="text-xl font-bold font-poppins">
                    Permintaan KYC Level 1
                </div>
                <div className="flex mt-4">
                    <div className="flex mt-4">
                        <div
                            className={`mr-2 px-4 py-2 rounded-md border-2 cursor-pointer ${activeTab === 'permintaan'
                                ? 'bg-slate-900 border-slate-800'
                                : 'bg-slate-400 border-slate-300 hover:bg-slate-900 hover:border-slate-800'
                                }`}
                            onClick={() => setActiveTab('permintaan')}
                        >
                            <div className="font-bold text-white text-center">
                                Permintaan
                            </div>
                        </div>
                        <div
                            className={`mr-2 ml-2 px-4 py-2 rounded-md border-2 cursor-pointer ${activeTab === 'diterima'
                                ? 'bg-green-900 border-green-800'
                                : 'bg-green-500 border-green-400 hover:bg-green-900 hover:border-green-800'
                                }`}
                            onClick={() => setActiveTab('diterima')}
                        >
                            <div className="font-bold text-white text-center">
                                Diterima
                            </div>
                        </div>
                        <div
                            className={`mr-2 ml-2 px-4 py-2 rounded-md border-2 cursor-pointer ${activeTab === 'ditolak'
                                ? 'bg-red-900 border-red-800'
                                : 'bg-red-500 border-red-400 hover:bg-red-900 hover:border-red-800'
                                }`}
                            onClick={() => setActiveTab('ditolak')}
                        >
                            <div className="font-bold text-white text-center">
                                Ditolak
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    {activeTab === 'permintaan' && (
                        <div className="w-full">
                            <div className="p-4 bg-slate-200 rounded-md">
                                Daftar permintaan KYC Level 1
                            </div>
                            {filteredUsers.length > 0 ? (
                                <div className="w-full">
                                    {filteredUsers.map(user => (
                                        <UserCard key={user.kyc_level_1_id} user={user} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 bg-white rounded-md mt-3 text-center">
                                    Daftar kosong
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'diterima' && (
                        <div>
                            <div className="p-4 bg-green-200 rounded-md">
                                Daftar KYC Level 1 yang Diterima
                            </div>
                            {filteredUsers.length > 0 ? (
                                <div>
                                    {filteredUsers.map(user => (
                                        <UserCard key={user.kyc_level_1_id} user={user} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 bg-white rounded-md mt-3 text-center">
                                    Daftar kosong
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'ditolak' && (
                        <div>
                            <div className="p-4 bg-red-200 rounded-md">
                                Daftar KYC Level 1 yang Ditolak
                            </div>
                            {filteredUsers.length > 0 ? (
                                <div>
                                    {filteredUsers.map(user => (
                                        <UserCard key={user.kyc_level_1_id} user={user} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 bg-white rounded-md mt-3 text-center">
                                    Daftar kosong
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KYCLvl1Admin;
