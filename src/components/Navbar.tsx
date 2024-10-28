import React from 'react'
import Link from 'next/link'
import MobileNavMenu from './MobileNavMenu'
import DesktopNavMenu from './DesktopNavMenu'
import Image from 'next/image'


function Navbar() {
    return (
        <>
            <div className='h-[68px] md:h-[90px] px-4 md:px-8 lg:px-16 xl:px-40 relative'>
                {/* Mobile */}
                <div className='h-full justify-between text-center flex items-center tablet:hidden'>
                    <MobileNavMenu />
                </div>

                {/* Desktop */}

                {/* Links */}
                <div className="hidden tablet:flex flex-grow justify-center items-center h-full">
                    <DesktopNavMenu />
                </div>
            </div>


        </>
    )
}

export default Navbar