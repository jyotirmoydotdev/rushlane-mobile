import { create } from "zustand";

export const useLocationState = create((set) => ({
    longatiude: Number,
    latitude: Number,

    setLocation: (longatiude: number, latitude: number) =>
        set(() => ({
            longatiude,
            latitude,
        })),
    getLocation: () => set((state: any) => ({
        longatiude: state.longatiude,
        latitude: state.latitude,
    })),      
}))