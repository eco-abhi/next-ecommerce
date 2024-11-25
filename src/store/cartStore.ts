import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/app/context/wixContext";

type CartState = {
    cart: currentCart.Cart;
    isLoading: boolean;
    counter: number;
    maxQty: Record<string, number>;
    cartModalOpen: boolean;
};

type CartActions = {
    getCart: (wixClient: WixClient) => Promise<void>;
    addItem: (
        wixClient: WixClient,
        productId: string,
        variantId: string,
        quantity: number,
        maxQuantity: number
    ) => Promise<void>;
    removeItem: (wixClient: WixClient, itemId: string) => Promise<void>;
    updateItemQuantity: (
        wixClient: WixClient,
        productId: string,
        variantId: string,
        newQuantity: number
    ) => Promise<void>;
    setCartModalOpen: (open: boolean) => void;
};

export const useCartStore = create<CartState & CartActions>((set) => ({
    cart: [],
    cartModalOpen: false,
    isLoading: true,
    counter: 0,
    maxQty: {},
    setCartModalOpen: (open) => set({ cartModalOpen: open }),
    getCart: async (wixClient) => {
        try {
            const cart = await wixClient.currentCart.getCurrentCart(
            );
            set({
                cart: cart || [],
                isLoading: false,
                counter: cart?.lineItems.length ?? 0,
            });
        } catch (err) {
            set({ isLoading: false });
        }
    },

    addItem: async (wixClient, productId, variantId, quantity, maxQuantity) => {
        set((state) => ({
            maxQty: { ...state.maxQty, [productId]: maxQuantity },
        }));

        try {
            const response = await wixClient.currentCart.addToCurrentCart({
                lineItems: [
                    {
                        catalogReference: {
                            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
                            catalogItemId: productId,
                            ...(variantId && { options: { variantId } }),
                        },
                        quantity,
                    },
                ],
            });

            if (response.cart) {
                set({
                    cart: response.cart,
                    counter: response.cart.lineItems.length,
                    isLoading: false,
                });
            }
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    updateItemQuantity: async (wixClient, productId, variantId, newQuantity) => {
        try {
            console.log('productId', productId, newQuantity, variantId);
            const response = await wixClient.currentCart.updateCurrentCartLineItemQuantity(
                [{ _id: variantId, quantity: newQuantity }]
            );

            if (response.cart) {
                set({
                    cart: response.cart,
                    counter: response.cart.lineItems.length,
                    isLoading: false,
                });
            }
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    removeItem: async (wixClient, itemId) => {
        set({ isLoading: true });

        try {
            const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);

            if (response.cart) {
                set({
                    cart: response.cart,
                    counter: response.cart.lineItems.length,
                    isLoading: false,
                });
            }
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },
}));