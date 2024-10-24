import React from 'react'
import Link from 'next/link'

interface LinkDropdownProps {
    links: SubMenuItem[]
}

const LinkDropdown: React.FC<LinkDropdownProps> = ({ links }) => {
    return (
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
    )
}

export default LinkDropdown