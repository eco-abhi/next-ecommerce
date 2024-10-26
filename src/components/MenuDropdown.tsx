import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';

interface MenuDropdownProps {
    menuItems: MenuItem[];
    selectedMenuItem: (label: string) => void;
}

type MenuItem = {
    label: string;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ menuItems, selectedMenuItem }) => {

    const [selectedItem, setSelectedItem] = useState(""); // State to keep track of selected item

    useEffect(() => {
        if (selectedItem) {
            selectedMenuItem(selectedItem);
        }
    }, [selectedItem])

    useEffect(() => {
        setSelectedItem('')
    }, [selectedMenuItem])

    return (
        <div className="">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.label} onClick={() => setSelectedItem(item.label)} className="flex justify-between items-center text-lg text-[#273455] font-bold border-b-[1px] border-[#DDDDDD] pb-3">

                        <span className="flex-1">{item.label}</span> {/* Text part */}

                        <Image src='/right-caret.svg' alt='Select' className='text-gray-800' width={15} height={15} priority />

                    </li>
                ))}
            </ul>


        </div>
    )
}

export default MenuDropdown