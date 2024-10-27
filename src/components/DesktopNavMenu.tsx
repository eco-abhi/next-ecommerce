'use client';

import React from 'react'
import Link from 'next/link'
import { useSaleCategoryStore } from '../store/saleCategoryStore'
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import CartModal from './CartModal';
import { useSearchBarStore } from "../store/searchBarStore";
import useClickOutside from '@/hooks/useClickOutside';
import BottomModal from './BottomModal';
import BottmoModalMessage from './BottmoModalMessage';

function DesktopNavMenu() {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const cartModalRef = useRef<HTMLDivElement>(null);
    const cartIconRef = useRef<HTMLImageElement>(null);

    const profileModalRef = useRef<HTMLDivElement>(null);
    const profileIconRef = useRef<HTMLImageElement>(null);

    const searchModalRef = useRef<HTMLDivElement>(null);
    const searchIconRef = useRef<HTMLImageElement>(null);

    const { openSearchBar, toggleOpenSearchBar } = useSearchBarStore()

    const { categoryItems } = useSaleCategoryStore()
    const router = useRouter()

    const handleSearchIconClick = () => {
        toggleOpenSearchBar(true)
    }

    const handleCloseSearchBar = () => {
        toggleOpenSearchBar(false)
    }

    const handleNotificationClick = () => {
        setIsNotificationOpen(true)
    }

    // Temporary function
    const isLoggedIn = false
    const handleProfileClick = () => {
        if (isLoggedIn) {
            router.push('/login')
        }
        setIsProfileOpen(() => !isProfileOpen)
    }

    useClickOutside([cartModalRef, cartIconRef], () => setIsCartOpen(false));
    useClickOutside([profileModalRef, profileIconRef], () => setIsProfileOpen(false));
    // useClickOutside([searchModalRef], () => setOpenSearchBar(false));


    return (
        !openSearchBar ? (<div className='flex flex-row items-center justify-between w-full'>
            <div>
                <Link href="/" className='text-2xl tracking-wide font-josefin_sans'>brooklinen</Link>
            </div>
            <div className='h-full flex items-center'>
                <ul className="flex items-center justify-center space-x-4 font-light">
                    {categoryItems.map((item, index) => (
                        <li
                            className="flex items-center justify-center lg:p-4 p-2 hover:font-bold hover:underline underline-offset-8 cursor-pointer"
                            key={index}
                        >
                            <span className="transition-all duration-300">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-row gap-6'>
                <Image src="/notification.svg" alt='Notifications' width={25} height={25} className='cursor-pointer' onClick={handleNotificationClick} priority />
                {isNotificationOpen && <BottomModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} children={<BottmoModalMessage />} />}
                <div className='relative' ref={searchIconRef}><Image src="/search.svg" alt="Search" width={18} height={18} className='cursor-pointer' onClick={handleSearchIconClick} priority />
                    {isProfileOpen && <div ref={profileModalRef} className='absolute bg-[#FCFAF8] shadow-lg p-4 rounded-lg top-12 left-0 z-20'>
                        <Link href='/'>Profile</Link>
                        <div className='mt-2 cursor-pointer'>Logout</div>
                    </div>
                    }</div>
                <Image ref={profileIconRef} src="/account.svg" alt="Account" width={16} height={18} className='cursor-pointer hidden lg:inline-block' onClick={handleProfileClick} priority />
                <div className='relative cursor-pointer '>
                    <Image ref={cartIconRef} src="/cart.svg" alt="Cart" width={14} height={18} className='cursor-pointer' onClick={() => setIsCartOpen((prev) => !prev)}
                        priority />
                    <div className='absolute -top-1.5 -right-4 w-3.5 h-3.5 rounded-full bg-[#273455] flex items-center text-white text-xs font-yantramanav justify-center'>2</div>
                    {isCartOpen && <div ref={cartModalRef}><CartModal /></div>}

                </div>
            </div>
        </div>) :
            <div className='items-center justify-between w-full' ref={searchModalRef}>
                <SearchBar closeSearchBar={handleCloseSearchBar} />
            </div>

    )
}

export default DesktopNavMenu