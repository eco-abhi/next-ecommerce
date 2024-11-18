import React from 'react';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 z-[502]">
            <nav className="space-y-6 w-full max-w-xs" aria-label="Navigation links">
                {[
                    { href: "/collections/mens", label: "Shop Bestsellers" },
                    { href: "/collections/womens", label: "Go to Homepage" },
                ].map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        aria-label={item.label}
                        className="block w-full text-center text-sm font-bold uppercase tracking-widest py-3 px-4 transition-all duration-100 ease-in-out border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </div>

    );
};

export default EmptyCart;
