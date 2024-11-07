"use client";

import React, { useEffect, useState } from 'react';
import CloseButton from '../../../public/close-button.svg';
import useEscapeKey from '@/hooks/useEscapeKey';
import useAnimatedRender from '@/hooks/useAnimatedRender';
import CartPatternDesign from '../designPatterns/CartPatternDesign';
import EmptyCart from './EmptyCart';

interface SideModalProps {
    isOpen: boolean;
    onClose: () => void;
    //   children: React.ReactNode;
    title?: string;
    itemCount?: number;
}

const CartModal = ({ isOpen, onClose, itemCount = 0 }: SideModalProps) => {
    const { shouldRender, isAnimating } = useAnimatedRender(isOpen, 1000);
    const [screenWidth, setScreenWidth] = useState(0);


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);




    useEscapeKey(onClose, isOpen);

    if (!shouldRender) return null;


    return (
        <div
            className={`text-black fixed inset-0 z-[500] flex justify-end bg-black transition-opacity duration-600 no-doc-scroll
        ${isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'}`}
        >
            <div
                onClick={onClose}
                className="absolute inset-0"
            />
            <div
                className={`relative bg-white transform transition-transform duration-300 ease-in-out
          ${isAnimating ? '-translate-x-0' : 'translate-x-full'} ${screenWidth < 850
                        ? 'w-full'
                        : 'w-full max-w-md'
                    }`}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            {"Your cart"} {itemCount == 0 && " is empty"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                            <CloseButton className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <EmptyCart />
                </div>

            </div>
        </div>
    );
};

export default CartModal;