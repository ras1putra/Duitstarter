"use client"

import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import CampaignCard from "@/components/card/campaign-card/CampaignCard";

type Tab = 'BERLANGSUNG' | 'MENDATANG' | 'SELESAI';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('BERLANGSUNG');

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="mt-1 bg-blue-50 px-6 md:px-14 py-6 md:py-8">
        <div className="font-poppins text-lg md:text-xl font-bold text-slate-700">
          BANTU DAN EXPLORE IDE USAHA BERKUALITAS
        </div>
        <div className="text-slate-500 text-sm mt-1">
          Kami berkomitmen untuk membantu dan mengembangkan ide usaha unggulan yang dapat membawa dampak positif.
        </div>
      </div>
      <div className="mt-4 mx-3 md:mx-14 flex text-[11px] md:text-sm font-bold font-poppins justify-between rounded-t-lg bg-yellow-300">
        <div className="flex items-center">
          <div
            className={`py-3 w-24 md:w-32 text-center cursor-pointer rounded-tl-lg ${activeTab === 'BERLANGSUNG' ? 'bg-green-300 text-slate-700' : 'bg-green-600 text-white border-white'}`}
            onClick={() => handleTabClick('BERLANGSUNG')}
          >
            BERLANGSUNG
          </div>
          <div
            className={`py-3 w-24 md:w-32 text-center cursor-pointer border-l-2 ${activeTab === 'MENDATANG' ? 'bg-green-300 text-slate-700' : 'bg-green-600 text-white border-white'}`}
            onClick={() => handleTabClick('MENDATANG')}
          >
            MENDATANG
          </div>
          <div
            className={`py-3 w-24 md:w-32 text-center cursor-pointer border-x-2 md:border-l-2 ${activeTab === 'SELESAI' ? 'bg-green-300 text-slate-700' : 'bg-green-600 text-white border-white'}`}
            onClick={() => handleTabClick('SELESAI')}
          >
            SELESAI
          </div>
        </div>
        <div className="rounded-tr-lg w-24 md:w-32 py-3 bg-green-600 text-white flex items-center justify-center">
          <IoFilterSharp />
          <span className="ml-1 md:ml-2">Filter</span>
        </div>
      </div>
      <div className="mt-4 mx-3 md:mx-14">
        {activeTab === 'BERLANGSUNG' && 
          <CampaignCard />
        }
        {activeTab === 'MENDATANG' && <div>Content for MENDATANG</div>}
        {activeTab === 'SELESAI' && <div>Content for SELESAI</div>}
      </div>
    </>
  );
}
