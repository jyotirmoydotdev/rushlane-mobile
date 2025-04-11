import { create } from "zustand";

export const useCart = create((set) => ({
    items: [],
    vendorId: null,

    addProduct: (product: any) =>
        set((state: any) => {
            if (state.vendorId && state.vendorId !== product.store.vendor_id) {
                alert("You can only add products from the same store.");
                return state;
            }

            const existingItemIndex = state.items.findIndex(
                (item: any) => item.product.id === product.id
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1;
                return { ...state, items: updatedItems };
            }

            return {
                ...state,
                items: [...state.items, { product, quantity: 1 }],
                vendorId: product.store.vendor_id,
            };
        }),

    getCart: () => set((state: any) => state.items),

    resetCart: () => set({ items: [], vendorId: null }),
}));