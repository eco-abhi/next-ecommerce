import React from 'react'
import Link from 'next/link'

function DesktopNavMenu() {
    return (
        <div>
            <Link href="/" className='text-2xl tracking-wide font-metamorphous'>brooklinen</Link>
            <Link href="/">
                Home
            </Link>
            <Link href="/about">

                About

            </Link>
            <Link href="/services">
                Services

            </Link>
            <Link href="/contact">

                Contact

            </Link>
        </div>
    )
}

export default DesktopNavMenu