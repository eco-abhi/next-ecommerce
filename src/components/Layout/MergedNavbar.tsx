'use client';

import React, { useState, useEffect } from 'react';
import MessageCarousel from './MessageCarousel';
import MobileNavMenu from './MobileNavMenu';
import DesktopNavMenu from './DesktopNavMenu';
import useScrollDownVisibility from '@/hooks/useScrollDownVisibility';

interface MergedNavbarProps {
    messages: string[];
}

const MergedNavbar: React.FC<MergedNavbarProps> = ({ messages }) => {
    const isScrolled = useScrollDownVisibility(15);



    return (
        <div className="relative">
            {/* Nanobar */}
            <div>
                <MessageCarousel messages={messages} autoPlayInterval={5000} />
            </div>

            {/* Navbar */}
            <div
                className={`
        h-[68px] px-4 lg:px-16 xl:px-40 
     duration-[900ms] transition-all
        ${!isScrolled ? 'fixed top-0 w-full z-50 bg-white shadow-lg' : 'bg-transparent'}
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
