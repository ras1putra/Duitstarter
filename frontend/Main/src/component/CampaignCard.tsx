import React from "react";

const CampaignCard = () => {
    return (
        <div className="w-full rounded-md mt-6 flex shadow-2xl h-96">
            <div className="w-2/5 h-full relative">
                <img 
                    src="https://source.unsplash.com/user/c_v_r/1900x800" 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-l-md" 
                />
            </div>
            <div className="w-3/5 flex justify-between bg-[#5A5A5A] text-white p-6 flex-col">
                <div className="flex justify-between w-full">
                    <div className="flex-1 mr-4">
                        <div className="font-bold text-xl mb-2">
                            Judul Campaign
                        </div>
                        <div className="font-light mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur adipiscing elit consectetur adipiscing elit consectetur adipiscing elit.
                        </div>
                        <div className="font-semibold text-lg mb-2">
                            Kategori:
                        </div>
                        <div className="flex space-x-2 mb-2">
                            <div className="font-semibold flex bg-[#E71A6D] w-28 py-1 rounded-lg items-center justify-center">
                                FOOD
                            </div>
                            <div className="font-semibold flex bg-blue-700 w-28 py-1 rounded-lg items-center justify-center">
                                MIKRO
                            </div>
                        </div>
                    </div>
                    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-black">
                        LOGO
                    </div>
                </div>
                <div className="flex flex-col w-full mt-2">
                    <div className="font-light text-lg">
                        Total terkumpul
                    </div>
                    <div className="mb-3 font-bold">
                        50% terkumpul ~ 30 hari lagi
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-3 mb-4">
                        <div className="bg-green-600 h-3 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="flex-1 text-center">
                            <div className="font-bold">Target</div>
                            <div className="font-light">Rp 100.000.000</div>
                        </div>
                        <div className="flex-1 text-center border-l-2 border-r-2 px-4">
                            <div className="font-bold">Terkumpul</div>
                            <div className="font-light">Rp 50.000.000</div>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="font-bold">Sisa Hari</div>
                            <div className="font-light">30 hari</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
