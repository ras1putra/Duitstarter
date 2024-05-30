import React from "react";

const Discover: React.FC = () => {
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
                

<div className="sm:hidden">
    <label htmlFor="tabs" className="sr-only">Select your country</label>
    <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option>Profile</option>
        <option>Dashboard</option>
        <option>setting</option>
        <option>Invoioce</option>
    </select>
</div>
<ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
    <li className="w-full focus-within:z-10">
        <a href="#" className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Profile</a>
    </li>
    <li className="w-full focus-within:z-10">
        <a href="#" className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Dashboard</a>
    </li>
    <li className="w-full focus-within:z-10">
        <a href="#" className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Settings</a>
    </li>
    <li className="w-full focus-within:z-10">
        <a href="#" className="inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Invoice</a>
    </li>
</ul>

            </div>
        </div>
    );
};

export default Discover;