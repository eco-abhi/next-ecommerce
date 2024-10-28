import React, { CSSProperties } from 'react'

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BottomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BottomModal: React.FC<BottomModalProps> = ({ isOpen, onClose, children }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
            // Wait for animation to finish before removing from DOM
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 600); // Match this with your animation duration
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
        <div className={`fixed inset-0 z-50 flex items-end justify-center bg-[#4C4A72] transition-opacity duration-500 px-4
            ${isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'}`}>
            <div
                onClick={onClose}
                className="absolute inset-0"
            />
            <div
                className={`relative w-full max-w-screen h-1/3 p-6 bg-[#F9F3ED] rounded-t-[50px] transform
                    ${isAnimating ? 'animate-slide-up' : 'animate-slide-down'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='group relative'>
                    <Image
                        alt='Close modal'
                        src="/close-button.svg"
                        height={20}
                        width={20}
                        onClick={onClose}
                        className='absolute top--2 right-24 cursor-pointer text-gray-600 object-cover transition-transform duration-500 ease-in-out group-hover:rotate-90'
                    />
                </div>
                {children}
            </div>
        </div>
    );
};

export default BottomModal;