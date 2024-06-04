import React from "react";
import plusIcon from "../assets/plus-icon.svg";
import '../index.css';

const CreateCampaign: React.FC = () => {
    return (
        <div className="mx-12">
            <div className="flex mt-6 justify-between items-center">
                <div className="font-poppins font-bold text-lg">Campaign</div>
                <div className="bg-green-600 px-4 py-2.5 flex items-center font-semibold text-white">
                    <img src={plusIcon} alt="Create Campaign" className="w-6 h-6 mr-2" />
                    BUAT CAMPAIGN
                </div>
            </div>
            <div className="flex bg-slate-300 text-blue-700 font-bold text-sm py-2.5 mt-6">
                <div className="w-1/2 text-center">USAHA</div>
                <div className="w-1/4 text-center">LEGALITAS</div>
                <div className="w-1/4 text-center">KEPEMILIKAN</div>
            </div>
            <div className="w-full flex centered-shadow mt-6">
                <div className="w-1/2 flex p-4">
                    <div className="w-2/5 h-40 relative">
                        <img src="https://source.unsplash.com/user/c_v_r/1900x800" alt="Usaha Image" className="absolute top-0 left-0 w-full h-full object-cover rounded-l-md" />
                    </div>
                    <div className="w-2/5 flex flex-col justify-evenly items-start ml-4">
                        <div className="text-xl font-medium text-blue-500">Judul Usaha</div>
                        <div className="text-sm font-poppins">
                            <div>
                                <span className="font-bold">Tahun berdiri: </span> —
                            </div>
                            <div>
                                <span className="font-bold">Tipe usaha: </span> —
                            </div>
                        </div>
                    </div>
                    <div className="w-1/5 flex flex-col items-center justify-center">
                        <div className="bg-red-500 font-bold rounded-xl text-sm px-2 py-1 text-white text-center">
                            DITOLAK
                        </div>
                        <div className="bg-yellow-500 font-bold rounded-xl text-sm px-2 py-2 text-white text-center mt-2">
                            TIDAK DIPUBLISH
                        </div>
                    </div>
                </div>
                <div className="text-sm font-poppins flex flex-col justify-center items-center w-1/4">
                    <div>
                        <span className="font-bold">No. Izin: </span> —
                    </div>
                    <div>
                        <span className="font-bold">No. Identitas PIC: </span> —
                    </div>
                </div>
                <div className="text-sm font-montserrat flex flex-col justify-center items-center w-1/4">
                    <div>
                        <span className="font-bold">Nama Pemilik Usaha: </span> —
                    </div>
                    <div>
                        <span className="font-bold">Jenis usaha: </span> —
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;
