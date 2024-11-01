import React from 'react'
import Link from 'next/link'

interface LinkDropdownProps {
    links: SubMenuItem[] | CollectionItem[],
    isSubMenu?: boolean,
    handleCloseMenu?: () => void
}

const LinkDropdown: React.FC<LinkDropdownProps> = ({ links, isSubMenu = false, handleCloseMenu }) => {
    return (
        <div className={`${isSubMenu ? "pt-2" : "pt-8"}`}>
            {links.map((item, index) => (
                <ul
                    key={index}
                    className={`${isSubMenu ? "text-left" : "mt-[10px]"} font-light text-base text-[#273455] text-left`}
                >
                    <li>
                        <Link href={item.href} className={`${isSubMenu ? "mb-3" : "mb-1"} font-display leading-tight inline-block text-left`} onClick={handleCloseMenu}>
                            <span className="link link-underline link-underline-black text-black">{item.label}</span>
                        </Link>
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default LinkDropdown