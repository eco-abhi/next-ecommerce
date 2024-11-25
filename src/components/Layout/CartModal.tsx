"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useCartStore } from "@/store/cartStore";
import { AnimatePresence, motion } from "motion/react";
import EmptyCart from "./EmptyCart";
import CartSummary from "./CartSummary";
import useEscapeKey from "@/hooks/useEscapeKey";

interface SideModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    itemCount?: number;
}

const CartModal = ({ isOpen, onClose }: SideModalProps) => {
    const { cart, counter } = useCartStore();

    // Close the modal on Escape key press
    useEscapeKey(onClose, isOpen);

    // Prevent body scroll when modal is open
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
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[9998]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="cart-modal-content"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="fixed top-0 right-0 h-full bg-white z-[9999] w-full tablet:max-w-md shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-bold">
                                    {"Your cart"} {counter === 0 && " is empty"}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
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
                        </div>

                        {/* Content */}
                        <div className="px-6 py-4">
                            {cart.lineItems && cart.lineItems[0]?.quantity ? (
                                <CartSummary />
                            ) : (
                                <EmptyCart />
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default CartModal;