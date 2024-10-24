import React, { use } from 'react'
import { useState, useEffect } from 'react'

interface MenuDropdownProps {
    menuItems: MenuItem[];
    selectedMenuItem: (label: string) => void;
}

type MenuItem = {
    label: string;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ menuItems, selectedMenuItem }) => {

    const [selectedItem, setSelectedItem] = useState(''); // State to keep track of selected item

    useEffect(() => {
        selectedMenuItem(selectedItem);
    }, [selectedItem])

    return (
        <div className="">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.label} onClick={() => setSelectedItem(item.label)} className="flex justify-between items-center text-lg text-[#273455] font-bold border-b-[1px] border-[#DDDDDD] pb-3">

                        <span className="flex-1">{item.label}</span> {/* Text part */}

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-800"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 5l7 7-7 7"
                            />
                        </svg>

                    </li>
                ))}
            </ul>


        </div>
    )
}

export default MenuDropdown