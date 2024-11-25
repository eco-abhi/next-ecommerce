"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useEscapeKey from '@/hooks/useEscapeKey';
import useAnimatedRender from '@/hooks/useAnimatedRender';
import { AnimatePresence, motion } from 'motion/react';

interface BottomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BottomModal: React.FC<BottomModalProps> = ({ isOpen, onClose, children }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEscapeKey(onClose, isOpen);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Track scrolling inside the modal content
    useEffect(() => {
        const modalContent = document.getElementById('modal-content');
        const handleScroll = () => {
            if (modalContent) {
                setIsScrolled(modalContent.scrollTop > 20);
            }
        };

        if (modalContent) {
            modalContent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (modalContent) {
                modalContent.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isOpen]);

    // Return null if running on server
    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - fixed and covers entire viewport */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black z-[9998]"
                        onClick={onClose}
                    />

                    {/* Modal Container - fixed at bottom */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[9999] flex flex-col "
                    >
                        <div
                            id="modal-content"
                            className={`relative w-screen max-w-screen-lg mx-auto bg-[#F9F3ED] overflow-y-auto
                                max-h-[80vh] px-4 pb-6
                                ${isScrolled ? 'rounded-t-[30px] shadow-lg' : 'rounded-t-[50px]'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Handle/Pill */}
                            {/* <div className="sticky top-0 w-full pt-4 pb-2 bg-[#F9F3ED] z-10">
                                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />
                            </div> */}

                            {/* Close Button */}
                            <div className="absolute right-4 top-4">
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 text-gray-900"
                                    aria-label="Close modal"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="pt-8 px-2">
                                {children}
                            </div>
                        </div>

                        {/* Safe Area Spacing for iOS */}
                        <div className="h-safe-area bg-[#F9F3ED] w-full" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default BottomModal;

