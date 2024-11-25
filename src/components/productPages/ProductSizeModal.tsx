"use client";

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from "motion/react";
import CloseButton from '../../../public/close-button.svg';
import { createPortal } from "react-dom";
import useEscapeKey from '@/hooks/useEscapeKey';

interface ProductSizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    itemCount?: number;
}

const ProductSizeModal: React.FC<ProductSizeModalProps> = ({ isOpen, onClose, children, title = "Size Guide" }) => {
    useEscapeKey(onClose, isOpen);

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

    // Return null if running on server
    if (typeof window === 'undefined') return null;



    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9998] bg-black bg-opacity-30"
                    onClick={onClose}
                >
                    <motion.div
                        key="modal-content"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="fixed top-0 right-0 h-full bg-white w-full tablet:max-w-screen-md tablet:w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-bold">
                                    {title}
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
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ProductSizeModal;
