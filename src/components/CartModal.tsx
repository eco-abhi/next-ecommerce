"use client";

import React, { useEffect, useState } from 'react';
import CloseButton from '../../public/close-button.svg';

interface SideModalProps {
    isOpen: boolean;
    onClose: () => void;
    //   children: React.ReactNode;
    title?: string;
    itemCount?: number;
}

const cartModal = ({ isOpen, onClose, itemCount = 0 }: SideModalProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
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
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!shouldRender) return null;


    return (
        <div
            className={`fixed inset-0 z-[1000] flex justify-end bg-black transition-opacity duration-600
        ${isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'}`}
        >
            <div
                onClick={onClose}
                className="absolute inset-0"
            />
            <div
                className={`relative bg-white transform transition-transform duration-300 ease-in-out overflow-auto
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
                            {"Your Bag"} {itemCount > 0 && `(${itemCount})`}
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
                    {/* {children} */}
                </div>
            </div>
        </div>
    );
};

export default cartModal;