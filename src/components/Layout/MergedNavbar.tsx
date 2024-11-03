'use client';

import React, { useState, useEffect } from 'react';
import MessageCarousel from './MessageCarousel';
import MobileNavMenu from './MobileNavMenu';
import DesktopNavMenu from './DesktopNavMenu';
import { useSearchBarStore } from '@/store/searchBarStore';

interface MergedNavbarProps {
    messages: string[];
}

const MergedNavbar: React.FC<MergedNavbarProps> = ({ messages }) => {
    const [isNanobarVisible, setIsNanobarVisible] = useState(true);
    const { openSearchBar } = useSearchBarStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsNanobarVisible(window.scrollY < 4);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative">
            {/* Nanobar */}
            <div

            >
                <MessageCarousel messages={messages} autoPlayInterval={5000} />
            </div>

            {/* Navbar */}
            <div
                className={`
        h-[68px] px-4 lg:px-16 xl:px-40 
        transition-all duration-1000 ease-in-out
        ${openSearchBar ? 'bg-white' : ''}
        ${!isNanobarVisible ? 'fixed top-0 w-full z-50 bg-[#ECEAE8] shadow-md' : ''}
      `}
            >
                {/* Mobile */}
                <div className="h-full justify-between text-center flex items-center tablet:hidden">
                    <MobileNavMenu />
                </div>

                {/* Desktop */}
                <div className="hidden tablet:flex justify-center items-center h-full w-full">
                    <DesktopNavMenu />
                </div>
            </div>
        </div>
    );
};

export default MergedNavbar;
