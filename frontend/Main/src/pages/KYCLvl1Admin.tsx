import React from "react";

interface KYCLvl1AdminProps {
    isNavbarOpen: boolean;
}

const KYCLvl1Admin: React.FC<KYCLvl1AdminProps> = ({ isNavbarOpen }) => {
    return (
        <div className={`bg-blue-100 ${isNavbarOpen ? 'ml-72' : 'ml-20'}`}>
            AAAAAAA
        </div>
    );
};

export default KYCLvl1Admin;
