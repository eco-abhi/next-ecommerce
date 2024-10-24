"use client";

import { useState, useEffect } from "react";
import { TbMenu } from "react-icons/tb";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import MenuDropdown from "./MenuDropdown";
import SubMenu from "./SubMenu";

function Menu() {

    const [openMenu, setOpenMenu] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [subCollection, setSubCollection] = useState<CollectionItem[]>([])

    const handleSlectedMenuItem = (label: string) => {
        setSelectedCategory(label)
    }

    useEffect(() => {
        const subCollectionArr = categories.find(category => category.label === selectedCategory)?.subCollection;
        setSubCollection(subCollectionArr || [])
    }, [selectedCategory])

    const handleSubMenuBackButton = (bool: boolean) => {

        if (bool) {
            setSelectedCategory('')
        }

    }

    const handleCloseMenu = (bool: boolean) => {
        setOpenMenu(!bool)
    }



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
                { 'label': 'Candles', 'href': '/collections/candles' }
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
        <div className="bg-[#FCFAF8] z-[100]">
            <TbMenu height={28} width={28} className="cursor-pointer" onClick={() => setOpenMenu((prev) => !prev)} />
            {(openMenu && !selectedCategory) ? (
                <div className="absolute left-0 top-0 pl-32 pr-64 pt-8 border border-2 border-black bg-[#FCFAF8] w-[95%] h-screen">
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>
                            <IoCloseSharp className="cursor-pointer w-[25px] h-[25px]" onClick={() => setOpenMenu(false)} />
                        </div>
                        <div className="font-metamorphous text-lg text-bold cursor-pointer text-center" onClick={() => setOpenMenu(false)}>brooklinen</div>
                        <div>cart</div>
                    </div>
                    <div className="pt-8 cursor-pointer z-[999] font-lato">
                        <MenuDropdown menuItems={categories} selectedMenuItem={handleSlectedMenuItem} />
                        <div className="pt-8">
                            {links.map((item, index) => (
                                <ul key={index} className="mt-[10px] text-bold font-light text-base text-[#273455]">
                                    <li>
                                        <Link href={item.href} className="font-display max-w-sm leading-tight">
                                            <span className="link link-underline link-underline-black text-black">{item.label}</span>
                                        </Link>
                                    </li>
                                </ul>
                            ))}
                        </div>

                    </div>
                </div>) : (openMenu && selectedCategory) && <SubMenu label={selectedCategory} submenuItems={subCollection} backButtonSelected={handleSubMenuBackButton} closeMenu={handleCloseMenu} />}
        </div>

    )
}



export default Menu