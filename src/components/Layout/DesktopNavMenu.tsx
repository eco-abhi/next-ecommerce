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
import { useShoppingCartStore } from '@/store/shoppingCartStore';
import DesktopSubMenu from './DesktopSubMenu';
import { useSaleCategoryStore } from "@/store/saleCategoryStore";
import useResetOnResize from '@/hooks/useResetOnSize';

interface DesktopNavMenuProps {
    showTopBar?: boolean;
}

const DesktopNavMenu = ({ showTopBar }: DesktopNavMenuProps) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string | null>(null);


    const { cartModalOpen, setCartModalOpen } = useShoppingCartStore();

    const [subCollection, setSubCollection] = useState<CollectionItem[]>([])
    const [otherCollection, setOtherCollection] = useState<CollectionItem>()

    const cartModalRef = useRef<HTMLDivElement>(null);
    const cartIconRef = useRef<HTMLImageElement>(null);
    const searchModalRef = useRef<HTMLDivElement>(null);

    const profileModalRef = useRef<HTMLDivElement>(null);
    const profileIconRef = useRef<HTMLImageElement>(null);
    const searchIconRef = useRef<HTMLImageElement>(null);

    const { openSearchBar, toggleOpenSearchBar } = useSearchBarStore()

    const { categoryItems } = useSaleCategoryStore()
    const router = useRouter()


    // Usage with typed setters wrapped in arrow functions
    const handleSearchIconClick = () => toggleOpenSearchBar(true);
    const handleNotificationClick = () => setIsNotificationOpen(true);
    const handleCartClick = () => setCartModalOpen(true);


    // Temporary function
    const isLoggedIn = false
    const handleProfileClick = () => {
        if (isLoggedIn) {
            router.push('/login')
        }
        setIsProfileOpen(() => !isProfileOpen)
    }

    useClickOutside([profileModalRef, profileIconRef], () => {
        setIsProfileOpen(false)
    });


    const handleMouseEnter = (category: string) => setActiveCategory(category);

    const handleMouseLeave = () => setActiveCategory(null);


    useEffect(() => {
        if (activeCategory) {
            // Sub collection
            const subCollectionArr = categoryItems.find(category => category.label === activeCategory)?.subCollection;
            setSubCollection(subCollectionArr || [])

            // Other collection
            const otherCollectionArr = categoryItems.find(category => category.label === activeCategory)?.otherCollection;
            setOtherCollection(otherCollectionArr)
        }

    }, [activeCategory])


    // SetActiveCategory to null when the screen size is less than 850px
    useResetOnResize([
        {
            callback: () => setActiveCategory(null),
            dependencies: [activeCategory]
        }
    ], 850)


    return (
        <>

            <div
                className={`px-4 lg:px-16 xl:px-40 flex flex-row items-center transition-colors duration-300 justify-between w-full font-geograph py-2 ${showTopBar ? 'bg-gray-900 text-white' : 'bg-white text-black z-50'}`}
            >
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
                        <Image
                            src="/notification.svg"
                            alt='Notifications'
                            width={25}
                            height={25}
                            className='cursor-pointer'
                            onClick={handleNotificationClick}
                            priority
                        />
                        <BottomModal
                            isOpen={isNotificationOpen}
                            onClose={() => setIsNotificationOpen(false)}
                        >
                            <BottmoModalMessage />
                        </BottomModal>
                    </div>

                    {/* Search */}
                    <div className='relative' ref={searchIconRef}>
                        <Image
                            src="/search.svg"
                            alt="Search"
                            width={18}
                            height={18}
                            className='cursor-pointer'
                            onClick={handleSearchIconClick}
                            priority
                        />
                        {isProfileOpen && (
                            <div
                                ref={profileModalRef}
                                className='absolute bg-white shadow-lg p-4 rounded-lg top-12 left-0 z-20'
                            >
                                <Link href='/'>Profile</Link>
                                <div className='mt-2 cursor-pointer'>Logout</div>
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <Image
                        ref={profileIconRef}
                        src="/account.svg"
                        alt="Account"
                        width={20}
                        height={20}
                        className='cursor-pointer hidden lg:inline-block'
                        onClick={handleProfileClick}
                        priority
                    />

                    {/* Cart */}
                    <div className='relative'>
                        <Image
                            ref={cartIconRef}
                            src="/cart.svg"
                            alt="Cart"
                            width={14}
                            height={18}
                            className='cursor-pointer'
                            onClick={handleCartClick}
                            priority
                        />
                        <div className='absolute -top-1.5 -right-4 w-3.5 h-3.5 rounded-full bg-[#273455] flex items-center text-white text-xs font-geograph justify-center'>
                            2
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