'use client';

import React, { use } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CartModal from './CartModal';
import { useSearchBarStore } from "../../store/searchBarStore";
import useClickOutside from '@/hooks/useClickOutside';
import BottomModal from './BottomModal';
import BottmoModalMessage from './BottomModalMessage';
import { useCartStore } from '@/store/cartStore';
import DesktopSubMenu from './DesktopSubMenu';
import { useSaleCategoryStore } from "@/store/saleCategoryStore";
import useResetOnResize from '@/hooks/useResetOnSize';
import { useWixClient } from '@/hooks/useWixClient';

interface DesktopNavMenuProps {
    showTopBar?: boolean;
}

const DesktopNavMenu = ({ showTopBar }: DesktopNavMenuProps) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const { cartModalOpen, setCartModalOpen, counter } = useCartStore();

    const [subCollection, setSubCollection] = useState<CollectionItem[]>([])
    const [otherCollection, setOtherCollection] = useState<CollectionItem>()

    const cartModalRef = useRef<HTMLDivElement>(null);
    const cartButtonRef = useRef<HTMLDivElement>(null);
    const searchButtonRef = useRef<HTMLDivElement>(null);
    const profileButtonRef = useRef<HTMLDivElement>(null);

    const { openSearchBar, toggleOpenSearchBar } = useSearchBarStore()
    const { categoryItems } = useSaleCategoryStore()
    const router = useRouter()

    const handleSearchIconClick = () => toggleOpenSearchBar(true);
    const handleNotificationClick = () => setIsNotificationOpen(true);
    const handleCartClick = () => setCartModalOpen(true);

    const isLoggedIn = false
    const handleProfileClick = () => {
        if (isLoggedIn) {
            router.push('/login')
        }
    }


    const handleMouseEnter = (category: string) => setActiveCategory(category);
    const handleMouseLeave = () => setActiveCategory(null);

    useEffect(() => {
        if (activeCategory) {
            const subCollectionArr = categoryItems.find(category => category.label === activeCategory)?.subCollection;
            setSubCollection(subCollectionArr || [])
            const otherCollectionArr = categoryItems.find(category => category.label === activeCategory)?.otherCollection;
            setOtherCollection(otherCollectionArr)
        }
    }, [activeCategory])

    useResetOnResize([
        {
            callback: () => setActiveCategory(null),
            dependencies: [activeCategory]
        }
    ], 850)

    return (
        <>
            <div className={`px-4 lg:px-16 xl:px-40 flex flex-row items-center transition-colors duration-300 justify-between w-full font-geograph py-2 ${showTopBar ? 'bg-primary-nav text-white' : 'bg-white text-black z-50'}`}>
                {/* Logo */}
                <div>
                    <Link href="/" className='text-2xl tracking-wide font-geograph'>
                        My Home Theory
                    </Link>
                </div>

                {/* Navigation Categories */}
                <div className="h-full flex items-center">
                    <ul className="flex items-center justify-center space-x-4 font-light">
                        {categoryItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-center whitespace-nowrap tablet:p-4 p-2 hover:font-bold hover:underline underline-offset-8 cursor-pointer"
                                onMouseEnter={() => handleMouseEnter(item.label)}
                            >
                                <span className="transition-all duration-300">
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action Icons */}
                <div className='flex flex-row gap-6'>
                    {/* Notifications */}
                    <div className="relative">
                        <div
                            className={`cursor-pointer ${showTopBar ? 'text-white' : 'text-black'}`}
                            onClick={handleNotificationClick}
                        >
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" strokeWidth="1.5" className={`${showTopBar ? 'stroke-white' : 'stroke-black'}`}>
                                <path d="M12.5 3C8.5 3 5.25 6.25 5.25 10.25V14.5L3 16.75V18H22V16.75L19.75 14.5V10.25C19.75 6.25 16.5 3 12.5 3ZM12.5 21C14.25 21 15.75 19.5 15.75 17.75H9.25C9.25 19.5 10.75 21 12.5 21Z" />
                            </svg>
                        </div>
                        <BottomModal
                            isOpen={isNotificationOpen}
                            onClose={() => setIsNotificationOpen(false)}
                        >
                            <BottmoModalMessage />
                        </BottomModal>
                    </div>

                    {/* Search */}
                    <div className='relative' ref={searchButtonRef}>
                        <div
                            className={`cursor-pointer ${showTopBar ? 'text-white' : 'text-black'}`}
                            onClick={handleSearchIconClick}
                        >
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" strokeWidth="1.5" className={`${showTopBar ? 'stroke-white' : 'stroke-black'}`}>
                                <path d="M10.5 3C15 3 18.5 6.5 18.5 11C18.5 15.5 15 19 10.5 19C6 19 2.5 15.5 2.5 11C2.5 6.5 6 3 10.5 3ZM19.5 19L17.5 17" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Profile */}
                    <div
                        ref={profileButtonRef}
                        className={`cursor-pointer hidden lg:block ${showTopBar ? 'text-white' : 'text-black'}`}
                        onClick={handleProfileClick}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth="1.5" className={`${showTopBar ? 'stroke-white' : 'stroke-black'}`}>
                            <path d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3155 14.1014 15.6904 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66665C5.78259 12.5 4.93474 12.8512 4.30962 13.4763C3.68449 14.1014 3.33331 14.9493 3.33331 15.8333V17.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 9.16667C11.841 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.841 2.5 10 2.5C8.15905 2.5 6.66666 3.99238 6.66666 5.83333C6.66666 7.67428 8.15905 9.16667 10 9.16667Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Cart */}
                    <div className='relative' ref={cartButtonRef}>
                        <div
                            className={`cursor-pointer ${showTopBar ? 'text-white' : 'text-black'}`}
                            onClick={handleCartClick}
                        >
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" strokeWidth="1.5" className={`${showTopBar ? 'stroke-white' : 'stroke-black'}`}>
                                <path d="M13 17H1V5H13V17ZM10 1H4L2 5M12 5L10 1M7 1V5M4 1L3.5 2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className='absolute -top-1.5 -right-4 w-3.5 h-3.5 rounded-full bg-[#273455] flex items-center text-white text-xs font-geograph justify-center'>
                            {counter}
                        </div>
                        <div ref={cartModalRef}>
                            <CartModal
                                isOpen={cartModalOpen}
                                onClose={() => setCartModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>

                {/* Submenu */}
                {activeCategory && subCollection.length > 0 && (
                    <div className='absolute top-24 left-0 w-full bg-white shadow-lg z-30' onMouseLeave={handleMouseLeave}>
                        <DesktopSubMenu
                            subMenuItems={subCollection}
                            otherCollection={otherCollection}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default DesktopNavMenu






