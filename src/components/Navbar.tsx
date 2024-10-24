import React from 'react'
import Link from 'next/link'
import MobileNavMenu from './MobileNavMenu'
import DesktopNavMenu from './DesktopNavMenu'


function Navbar() {
    return (
        <>
            <div className='h-[68px] md:h-[90px] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative border border-2'>
                {/* Mobile */}
                <div className='h-full justify-between text-center flex items-center md:hidden'>
                    <MobileNavMenu />
                    <Link href="/" className='text-2xl tracking-wide font-metamorphous'>brooklinen</Link>
                    <div></div>
                </div>

                {/* Desktop */}

                {/* Links */}
                <div className="hidden md:flex">
                    <DesktopNavMenu />
                </div>
            </div>


        </>
    )
}

export default Navbar