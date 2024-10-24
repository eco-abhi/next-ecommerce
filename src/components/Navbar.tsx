import React from 'react'
import Link from 'next/link'
import Menu from './Menu'

function Navbar() {
    return (
        <div className='h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative'>
            {/* Mobile */}
            <div className='h-full flex items-center justify-between'>
                <Menu />
                <Link href="/" className='text-2xl tracking-wide font-metamorphous'>brooklinen</Link>
                <div></div>
            </div>

        </div>
    )
}

export default Navbar