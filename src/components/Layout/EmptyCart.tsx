import React from 'react';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 bg-inherit">
            <div className="space-y-3 w-full max-w-xs">
                {[
                    { href: "/collections/mens", label: "Shop Men's" },
                    { href: "/collections/womens", label: "Shop Women's" },
                ].map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="block w-full text-center text-sm font-bold uppercase tracking-widest py-3 px-4 transition-all duration-100 ease-in-out border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default EmptyCart;
