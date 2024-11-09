'use client'
import React, { useEffect, useState } from 'react';
import MessageCarousel from '@/components/layout/MessageCarousel';
import DesktopNavMenu from '@/components/layout/DesktopNavMenu';
import MobileNavMenu from '@/components/layout/MobileNavMenu';
import { useSearchBarStore } from '@/store/searchBarStore';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [showTopBar, setShowTopBar] = useState(true);
    const { openSearchBar, toggleOpenSearchBar } = useSearchBarStore();

    const handleCloseSearchBar = () => toggleOpenSearchBar(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBar(window.scrollY < 30);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full relative z-30">
            {/* Dark Overlay */}
            {openSearchBar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 -z-50" onClick={handleCloseSearchBar} />
            )}

            {/* Top Notification Bar */}
            <div
                className={`${showTopBar ? 'transition-transform duration-700 translate-y-0' : '-translate-y-full'
                    } bg-primary-topBar text-black text-center py-1`}
            >
                <MessageCarousel messages={['Free shipping on all orders', '30 days return policy', 'asdsadx']} />
            </div>

            {/* Main Navbar */}
            <nav className={`flex top-0 w-full items-center justify-between shadow-md  ${showTopBar ? '' : 'transition-colors duration-1000 fixed z-50'}`}>
                {/* Mobile Menu */}
                <div className="tablet:hidden justify-center items-center w-full z-40">
                    <MobileNavMenu showTopBar={showTopBar} />
                </div>

                {/* Desktop Menu */}
                <div className="hidden tablet:flex justify-center items-center w-full z-40">
                    <DesktopNavMenu showTopBar={showTopBar} />
                </div>
                {/* 
                {/* Search Bar */}
                <div className="w-auto">
                    <SearchBar onClose={handleCloseSearchBar} isOpen={openSearchBar} />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
