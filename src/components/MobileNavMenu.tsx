"use client";

import { useState, useEffect } from "react";
import { TbMenu } from "react-icons/tb";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import MenuDropdown from "./MenuDropdown";
import SubMenu from "./SubMenu";
import LinkDropdown from "./LinkDropdown";

function MobileNavMenu() {

    const [openMenu, setOpenMenu] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [subCollection, setSubCollection] = useState<CollectionItem[]>([])
    const [isMobile, setIsMobile] = useState(false);
    const [hideMenuButton, setHideMenuButton] = useState(false);
    const [changeLabelToNull, setChangeLabelToNull] = useState(false)

    const handleSlectedMenuItem = (label: string) => {
        console.log('Selected menu item', label, changeLabelToNull);
        !changeLabelToNull && setSelectedCategory(label)
    }

    const handleSubMenuBackButton = (bool: boolean) => {
        console.log('Back button clicked');
        setSelectedCategory('')
        setChangeLabelToNull(true)
        console.log('bool', bool, selectedCategory, openMenu, isMobile);
    }

    const handleCloseMenu = (bool: boolean) => {
        setOpenMenu(false)
        setChangeLabelToNull(true)
    }

    useEffect(() => {
        return () => {
            setChangeLabelToNull(false)
        }
    }, [handleSlectedMenuItem])

    useEffect(() => {
        if (selectedCategory) {
            const subCollectionArr = categories.find(category => category.label === selectedCategory)?.subCollection;
            setSubCollection(subCollectionArr || [])
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
                console.log('Mobile screen size');
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

        console.log('isMobile', isMobile, 'hideMenuButton', hideMenuButton, 'openMenu', openMenu);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);


    }, [isMobile]);




    const categories: CollectionItem[] = [
        {
            'label': 'Bed',
            'subCollection': [
                { 'label': 'Sheets', 'href': '/collections/sheets' },
                { 'label': 'Duvet Covers', 'href': '/collections/duvet-covers' }
            ]
        },
        {
            'label': 'Bath',
            'subCollection': [
                { 'label': 'Towels', 'href': '/collections/towels' },
                { 'label': 'Robes', 'href': '/collections/robes' },
                { 'label': 'Shower Curtains', 'href': '/collections/shower-curtains' },
                { 'label': 'Bath Mats', 'href': '/collections/bath-mats' },
                { 'label': 'Bath Bundles', 'href': '/collections/bath-bundles' }
            ]
        },
        {
            'label': 'Best Sellers',
            'subCollection': [
                { 'label': 'Luxe Core Sheet Set', 'href': '/collections/luxe-core-sheet-set' },
                { 'label': 'Super-Plush Robe', 'href': '/collections/super-plush-robe' },
                { 'label': 'Classic Core Sheet Set', 'href': '/collections/classic-core-sheet-set' },
                { 'label': 'Luxe Move-In Bundle', 'href': '/collections/luxe-move-in-bundle' },
                { 'label': 'Luxe Hardcore Sheet', 'href': '/collections/luxe-hardcore-sheet' }
            ]
        },
        {
            'label': 'Home',
            'subCollection': [
                { 'label': 'Candles', 'href': '/collections/candles' },
                { 'label': 'Laundry', 'href': '/collections/laundry' },
                { 'label': 'Pillows', 'href': '/collections/pillows' },
            ]
        },
        {
            'label': 'New Arrivals',
            'subCollection': [
                { 'label': 'Sheets', 'href': '/collections/sheets' },
                { 'label': 'Duvet Covers', 'href': '/collections/duvet-covers' },
                { 'label': 'Pillows', 'href': '/collections/pillows' },
                { 'label': 'Comforters', 'href': '/collections/comforters' },
                { 'label': 'Blankets', 'href': '/collections/blankets' },
                { 'label': 'Bedding Bundles', 'href': '/collections/bedding-bundles', 'tag': 'SAVE UP TO 30%' }
            ]
        },
        {
            'label': 'Sale',
            'subCollection': [
                { 'label': 'Sheets', 'href': '/collections/sheets' },
                { 'label': 'Duvet Covers', 'href': '/collections/duvet-covers' },
                { 'label': 'Pillows', 'href': '/collections/pillows' },
                { 'label': 'Comforters', 'href': '/collections/comforters' },
                { 'label': 'Blankets', 'href': '/collections/blankets' },
                { 'label': 'Bedding Bundles', 'href': '/collections/bedding-bundles' }
            ]
        }
    ];

    const links: MenuItem[] = [{ 'label': 'Our Stores', 'href': '/collections/' },
    { 'label': 'Reviews', 'href': '/collections/' },
    { 'label': 'About', 'href': '/collections/' },
    { 'label': 'Login', 'href': '/collections/' },
    ]

    return (
        <div className={`bg-[#FCFAF8] z-[100] ${hideMenuButton ? "hidden" : ""}`}>
            <TbMenu className="cursor-pointer w-[25px] h-[25px]" onClick={() => setOpenMenu((prev) => !prev)} />
            {/* {(isMobile && openMenu && !selectedCategory) ? ( */}


            <div className={`fixed md:pl-32 md:pr-48 pl-24 pr-16 left-0 top-0 pt-8 border border-2 border-black bg-[#FCFAF8] w-[95%] h-screen z-40 duration-500 ease-in-out
    ${isMobile && openMenu && !selectedCategory
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-full opacity-0'
                }`}>
                <div className="flex flex-row justify-between items-center w-full">
                    <div>
                        <IoCloseSharp className="cursor-pointer w-[25px] h-[25px]" onClick={() => setOpenMenu(false)} />
                    </div>
                    <div className="font-metamorphous text-lg text-bold cursor-pointer text-center" onClick={() => setOpenMenu(false)}>brooklinen</div>
                    <div>cart</div>
                </div>
                <div className="pt-8 cursor-pointer z-[999] font-lato">
                    <MenuDropdown menuItems={categories} selectedMenuItem={handleSlectedMenuItem} />
                    <LinkDropdown links={links} />

                </div>
            </div>
            {/* ) : (isMobile && openMenu && selectedCategory) && */}
            <div className={`fixed left-0 top-0 md:pl-32 md:pr-48 pl-24 pr-16 pt-8 border border-2 border-black w-[95%] h-screen bg-[#FCFAF8] z-40 duration-500 ease-in-out ${isMobile && openMenu && selectedCategory !== ''
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
                }`}>
                <SubMenu label={selectedCategory} submenuItems={subCollection} backButtonSelected={handleSubMenuBackButton} closeMenu={handleCloseMenu} />
            </div>

        </div>

    )
}



export default MobileNavMenu