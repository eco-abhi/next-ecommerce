'use client'
import React, { useEffect, useState } from 'react';
import MessageCarousel from '@/components/layout/MessageCarousel';
import DesktopNavMenu from '@/components/layout/DesktopNavMenu';
import MobileNavMenu from '@/components/layout/MobileNavMenu';
import { useSearchBarStore } from '@/store/searchBarStore';
import SearchBar from './SearchBar';
import { motion, useTransform, useScroll, useMotionValueEvent } from "motion/react"

const Navbar = () => {
    const [showTopBar, setShowTopBar] = useState(true);
    const { openSearchBar, toggleOpenSearchBar } = useSearchBarStore();
    const { scrollY } = useScroll();

    // Only animate when the user is at the top
    const y = useTransform(scrollY, [0, 200], [0, -40]); // The animation range, if needed

    const handleCloseSearchBar = () => toggleOpenSearchBar(false);

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (currentScrollY) => {
            setShowTopBar(currentScrollY < 120);
        });

        return () => unsubscribe();
    }, [scrollY]);

    return (<>
        {/* Dark Overlay */}
        {openSearchBar && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={handleCloseSearchBar}
            />
        )}

        {/* Sticky wrapper without motion */}
        <div className="sticky top-0 w-full z-50">
            {/* Motion content wrapper */}
            <motion.div className="w-full bg-white" style={{ y: y }}>
                {/* Top Notification Bar */}
                <div
                    className={`transition-transform duration-700  bg-primary-topBar text-black text-center py-1`}
                >
                    <MessageCarousel
                        messages={[
                            'Free shipping on all orders',
                            '30 days return policy',
                            'asdsadx',
                            'Free shipping on all orders and 30 days return policy',
                        ]}
                    />
                </div>

                {/* Main Navbar */}
                <nav className="w-full items-center justify-between shadow-md z-50">
                    {/* Mobile Menu */}
                    <div className="tablet:hidden justify-center items-center w-full">
                        <MobileNavMenu showTopBar={showTopBar} />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden tablet:flex justify-center items-center w-full">
                        <DesktopNavMenu showTopBar={showTopBar} />
                    </div>

                    {/* Search Bar */}
                    <div className="w-auto z-40">
                        <SearchBar onClose={handleCloseSearchBar} isOpen={openSearchBar} />
                    </div>
                </nav>
            </motion.div>
        </div>
    </>);
};

export default Navbar;