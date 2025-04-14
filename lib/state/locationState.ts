import { create } from "zustand";

type LocationState = {
    longitude: number;
    latitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
    setLocation: (longitude: number, latitude: number) => void;
};

// Default coordinates for Meghalaya
const DEFAULT_LONGITUDE = 91.3662;
const DEFAULT_LATITUDE = 25.4670;

export const useLocationState = create<LocationState>((set) => ({
    // Initialize with default values
    longitude: DEFAULT_LONGITUDE,
    latitude: DEFAULT_LATITUDE,
    latitudeDelta: 2.5,
    longitudeDelta: 2.5,

    // Simple setter that doesn't depend on previous state
    setLocation: (longitude: number, latitude: number) => 
        set({
            longitude,
            latitude,
            // Keep deltas constant
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }),
}));