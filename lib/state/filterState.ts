import { create } from "zustand";

export const useVegStatus = create((set) => ({
    isVeg: Boolean,

    setVegStatus: () =>
        set((state: any) => ({
            isVeg: !state.isVeg,
        })),

    getVegStatus: () => set((state: any) => state.isVeg),
}));