"use client";

import React, { useEffect, useState } from 'react';
import CloseButton from '../../../public/close-button.svg';
import useEscapeKey from '@/hooks/useEscapeKey';
import EmptyCart from './EmptyCart';
import CartSummary from './CartSummary';

interface SideModalProps {
    isOpen: boolean;
    onClose: () => void;
    //   children: React.ReactNode;
    title?: string;
    itemCount?: number;
}

const CartModal = ({ isOpen, onClose, itemCount = 0 }: SideModalProps) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
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

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsAnimating(true), 50);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setShouldRender(false), 600);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEscapeKey(onClose, isOpen);

    if (!shouldRender) return null;


    return (
        <div
            className={`text-black fixed inset-0  flex justify-end bg-black transition-opacity duration-600 no-doc-scroll
        ${isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'}`}
        >
            <div
                onClick={onClose}
                className="absolute inset-0"
            />
            <div
                className={`relative bg-white transform z-[999] border-white transition-transform duration-300 ease-in-out ${isAnimating ? '-translate-x-0' : 'translate-x-full'
                    } ${screenWidth < 850 ? 'w-full' : 'max-w-md w-full'}`}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="sticky top-0 bg-white z-[502] border-b border-gray-200">
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
                    {/* <EmptyCart />
                     */}
                    <CartSummary />
                </div>

            </div>
        </div>
    );
};

export default CartModal;