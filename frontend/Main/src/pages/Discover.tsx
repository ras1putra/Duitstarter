import React, { useState } from "react";
import CampaignCard from "../component/CampaignCard";

const Discover: React.FC = () => {
    const [activeTab, setActiveTab] = useState('BERLANGSUNG');

    return (
        <div>
            <div className="w-full bg-blue-50 px-20 py-6">
                <div className="font-poppins font-black text-xl text-slate-700">
                    EXPLORE IDE USAHA BERKUALITAS
                </div>
                <div className="font-poppins font-light text-md text-slate-600 mt-1">
                    Temukan berbagai ide usaha yang berkualitas dan inovatif. Dengan beragam pilihan yang tersedia, Anda dapat mengeksplorasi peluang usaha yang sesuai dengan kriteria Anda dan kebutuhan pasar. Bersama kami, wujudkan portofolio bisnis Anda dengan ide-ide yang berdaya saing tinggi dan penuh potensi.
                </div>
            </div>
            <div className="mx-12">
                <div>
                    <div className="w-full h-12 rounded-t-md bg-yellow-300 mt-6 flex justify-between">
                        <div className="flex">
                            <div
                                className={`h-12 flex justify-center items-center font-bold text-white w-40 text-center border-r-2 border-white cursor-pointer ${activeTab === 'BERLANGSUNG' ? 'bg-green-500 rounded-tl-md' : 'bg-green-700'}`}
                                onClick={() => setActiveTab('BERLANGSUNG')}
                            >
                                BERLANGSUNG
                            </div>
                            <div
                                className={`h-12 flex justify-center items-center font-bold text-white w-40 text-center border-x-2 border-white cursor-pointer ${activeTab === 'MENDATANG' ? 'bg-green-500' : 'bg-green-700'}`}
                                onClick={() => setActiveTab('MENDATANG')}
                            >
                                MENDATANG
                            </div>
                            <div
                                className={`h-12 flex justify-center items-center font-bold text-white w-40 text-center border-l-2 border-white cursor-pointer ${activeTab === 'SELESAI' ? 'bg-green-500' : 'bg-green-700'}`}
                                onClick={() => setActiveTab('SELESAI')}
                            >
                                SELESAI
                            </div>
                        </div>
                        <div>
                            <div className="h-12 flex justify-center items-center bg-green-700 font-bold text-white w-40 text-center rounded-tr-md">
                                Filter
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-b-md mb-12">
                        {activeTab === 'BERLANGSUNG' && 
                            <div className="w-full">
                                <CampaignCard />
                                <CampaignCard />
                            </div>
                        }
                        {activeTab === 'MENDATANG' && <div>Konten Mendatang</div>}
                        {activeTab === 'SELESAI' && <div>Konten Selesai</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discover;
