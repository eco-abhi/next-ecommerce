'use client'
import React, { useEffect, useState } from 'react';
import MessageCarousel from '@/components/layout/MessageCarousel';
import DesktopNavMenu from '@/components/layout/DesktopNavMenu';
import MobileNavMenu from '@/components/layout/MobileNavMenu';
import { useSearchBarStore } from '@/store/searchBarStore';
import SearchBar from './SearchBar';
import { motion, useTransform, useScroll, useSpring } from "motion/react"
import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/store/cartStore';

const Navbar = () => {
    const [showTopBar, setShowTopBar] = useState(true);
    const { openSearchBar, toggleOpenSearchBar } = useSearchBarStore();
    const { scrollY } = useScroll();
    const wixClient = useWixClient();
    const { cart, counter, getCart } = useCartStore();

    const rawY = useTransform(scrollY, [0, 200], [0, -40]);
    const y = useSpring(rawY, {
        stiffness: 40,
        damping: 15,
        mass: 0.8,
    });

    const handleCloseSearchBar = () => toggleOpenSearchBar(false);

    useEffect(() => {
        let lastScrollY = 0;

        const unsubscribe = scrollY.on('change', (currentScrollY) => {
            if (Math.abs(currentScrollY - lastScrollY) > 5) {
                setShowTopBar(currentScrollY < 120);
                lastScrollY = currentScrollY;
            }
        });

        return () => unsubscribe();
    }, [scrollY]);

    useEffect(() => {
        getCart(wixClient);
    }, [wixClient, getCart]);


    return (
        <>
            {/* Navbar Container */}
            <div className="sticky top-0 w-full z-30">
                {/* Motion content wrapper */}
                <motion.div
                    className="w-full bg-white transform-gpu"
                    style={{ y }}
                >
                    {/* Top Notification Bar */}
                    <div
                        className={`transition-all duration-500 ease-in-out bg-transparent text-black text-center py-1 transform-gpu ${showTopBar ? 'translate-y-0' : '-translate-y-full'
                            }`}
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
                    <nav className="w-full items-center justify-between shadow-md bg-transparent relative">
                        {/* Mobile Menu */}
                        <div className="tablet:hidden justify-center items-center w-full">
                            <MobileNavMenu showTopBar={showTopBar} cartItemCount={counter} />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden tablet:flex justify-center items-center w-full">
                            <DesktopNavMenu showTopBar={showTopBar} cartItemCount={counter} />
                        </div>
                    </nav>
                </motion.div>
            </div>

            {/* Dark Overlay - Highest z-index */}
            {openSearchBar && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-[998]"
                    onClick={handleCloseSearchBar}
                />
            )}

            {/* Search Bar - Between overlay and navbar */}
            <div className="z-[999] relative">
                <SearchBar onClose={handleCloseSearchBar} isOpen={openSearchBar} />
            </div>
        </>
    );
};

export default Navbar;