"use client";

import { useState, useEffect } from "react";
import { TbMenu } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import MenuDropdown from "./MenuDropdown";
import MobileSubMenu from "./MobileSubMenu";
import LinkDropdown from "./LinkDropdown";
import { useNavLinkStore } from "../store/navLinksStore";
import { useSaleCategoryStore } from "@/store/saleCategoryStore";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";
import { useSearchBarStore } from "../store/searchBarStore";
import Link from "next/link";
import Image from "next/image";
import SearchBar from './SearchBar';
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import CartModal from './CartModal';

function MobileNavMenu() {

    const [openMenu, setOpenMenu] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [subCollection, setSubCollection] = useState<CollectionItem[]>([])
    const [otherCollection, setOtherCollection] = useState<CollectionItem>()

    const [isMobile, setIsMobile] = useState(false);
    const [hideMenuButton, setHideMenuButton] = useState(false);


    const { navItems } = useNavLinkStore();
    const { categoryItems } = useSaleCategoryStore();
    const { openSearchBar, toggleOpenSearchBar } = useSearchBarStore();
    const { cartModalOpen, setCartModalOpen } = useShoppingCartStore();

    const mobileNavMenuRef = useRef(null);
    const searchModalRef = useRef(null);

    const handleSlectedMenuItem = (label: string) => {
        setSelectedCategory(label)
    }

    const handleSubMenuBackButton = (bool: boolean) => {
        setSelectedCategory('')

    }

    const handleCartClick = () => {
        setCartModalOpen(!cartModalOpen)
    }

    const handleCloseMenu = () => {
        setOpenMenu(false)

    }

    const handleCloseSearchBar = () => {
        toggleOpenSearchBar(false)
    }

    const handleSearchIconClick = () => {
        toggleOpenSearchBar(true)
    }

    useEffect(() => {
        if (selectedCategory) {
            // Sub collection
            const subCollectionArr = categoryItems.find(category => category.label === selectedCategory)?.subCollection;
            setSubCollection(subCollectionArr || [])

            // Other collection
            const otherCollectionArr = categoryItems.find(category => category.label === selectedCategory)?.otherCollection;
            setOtherCollection(otherCollectionArr)
        }

    }, [selectedCategory])

    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openMenu]);

    useEffect(() => {
        // Function to check screen size and trigger button click
        const handleResize = () => {
            if (window.innerWidth <= 900) {
                // Mobile screen size (<= 768px)
                if (!isMobile) {
                    setIsMobile(true);
                    setHideMenuButton(false);
                }
            } else {
                // Desktop screen size (> 768px)
                if (isMobile) {
                    setIsMobile(false);
                    setHideMenuButton(true);
                    setOpenMenu(false);
                }
            }
        };

        // Add event listener to window resize
        window.addEventListener('resize', handleResize);

        // Call the handler right away so state gets updated with the initial window size
        handleResize();

        // console.log('isMobile', isMobile, 'hideMenuButton', hideMenuButton, 'openMenu', openMenu);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);


    }, [isMobile]);


    useClickOutside([mobileNavMenuRef], () => setOpenMenu(false));
    // useClickOutside([searchModalRef], () => {
    //     if (openSearchBar && isMobile) {  // Only close if search bar is open
    //         console.log('Click outside search modal');
    //         toggleOpenSearchBar(false);
    //     }
    // });


    return (!openSearchBar ? (
        <>

            <div ref={mobileNavMenuRef} className={`bg-[#FCFAF8] z-[99] ${hideMenuButton ? "hidden" : ""}`}>
                <TbMenu className="cursor-pointer w-[25px] h-[25px]" onClick={() => setOpenMenu((prev) => !prev)} />

                <div className={`fixed md:pl-32 md:pr-48 pl-24 pr-16 left-0 top-0 pt-8 border-2 border-r-[#273455] bg-[#FCFAF8] w-[95%] h-screen z-40 duration-500 ease-in-out
    ${isMobile && openMenu && !selectedCategory
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-full opacity-0'
                    }`}>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>
                            <IoCloseSharp className="cursor-pointer w-[25px] h-[25px]" onClick={() => setOpenMenu(false)} />
                        </div>
                        <div className="font-josefin_sans text-lg text-bold cursor-pointer text-center" onClick={() => setOpenMenu(false)}>brooklinen</div>
                        <div>cart</div>
                    </div>
                    <div className="pt-8 cursor-pointer z-[999] font-mantramanav">
                        <MenuDropdown menuItems={categoryItems} selectedMenuItem={handleSlectedMenuItem} />
                        <LinkDropdown links={navItems} handleCloseMenu={() => handleCloseMenu} />

                    </div>
                </div>
                {/* ) : (isMobile && openMenu && selectedCategory) && */}
                <div className={`fixed left-0 top-0 md:pl-32 md:pr-48 pl-24 pr-16 pt-8 border-2 border-r-[#273455] w-[95%] h-screen bg-[#FCFAF8] z-40 duration-500 ease-in-out ${isMobile && openMenu && selectedCategory !== ''
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-full opacity-0'
                    }`}>
                    <MobileSubMenu label={selectedCategory} submenuItems={subCollection} otherCollection={otherCollection} backButtonSelected={handleSubMenuBackButton} closeMenu={handleCloseMenu} />
                </div>

            </div>
            <Link href="/" className='text-2xl tracking-wide font-josefin_sans'>brooklinen</Link>
            <div className={`${openMenu ? "fixed inset-0 z-50 bg-[#4C4A72] bg-opacity-30" : ""}`}>
                <div className={`flex flex-row gap-6`}>
                    <Image src="/notification.svg" alt='Notifications' width={25} height={25} className='cursor-pointer' priority />
                    <Image src="/search.svg" alt="Search" width={18} height={18} className='cursor-pointer' onClick={handleSearchIconClick} priority />
                    <Image src="/cart.svg" alt="Cart" width={14} height={18} className='cursor-pointer' onClick={handleCartClick} priority />
                </div>
            </div>

            <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />

        </>) : <div className='items-center justify-between w-full z-50' ref={searchModalRef}>
        <SearchBar closeSearchBar={handleCloseSearchBar} />

    </div>


    )
}



export default MobileNavMenu