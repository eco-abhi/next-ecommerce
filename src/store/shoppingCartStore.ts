import { create } from 'zustand'

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    deliveryDate: string;
}

interface ShoppingCartState {
    cart: CartItem[];
    cartModalOpen: boolean;
    setCartModalOpen: (open: boolean) => void;
    addToCart: (item: CartItem) => void;
    updateCartItem: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const useShoppingCartStore = create<ShoppingCartState>((set) => ({
    cart: [],
    cartModalOpen: false,
    setCartModalOpen: (open) => set({ cartModalOpen: open }),
    addToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
    })),
    updateCartItem: (id, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
        )
    })),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
    })),
    clearCart: () => set({ cart: [] })
}))