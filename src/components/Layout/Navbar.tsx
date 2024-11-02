'use client';

import React from 'react';
import MobileNavMenu from './MobileNavMenu';
import DesktopNavMenu from './DesktopNavMenu';
import { useSearchBarStore } from '@/store/searchBarStore';

function Navbar() {
    const { openSearchBar } = useSearchBarStore();

    return (
        <div className={`h-[68px] px-4 lg:px-16 xl:px-40 ${openSearchBar ? "bg-white" : ""}`}>
            {/* Mobile */}
            <div className="h-full justify-between text-center flex items-center tablet:hidden">
                <MobileNavMenu />
            </div>

            {/* Desktop */}
            <div className="hidden tablet:flex justify-center items-center h-full w-full">
                <DesktopNavMenu />
            </div>
        </div>
    );
}

export default Navbar;
