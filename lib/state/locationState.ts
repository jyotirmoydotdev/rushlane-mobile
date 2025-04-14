// state/locationState.ts
import { create } from 'zustand';
import type { Region } from 'react-native-maps';

type LocationState = Region & {
    locationName?: string;
    locationAddress?: string;
    isLoading: boolean;
    error?: string;
    // actions
    setLoading: (v: boolean) => void;
    setError: (msg?: string) => void;
    setLocation: (
        longitude: number,
        latitude: number,
        name?: string,
        address?: string
    ) => void;
};

export const useLocationState = create<LocationState>((set) => ({
    latitude: 25.4670,
    longitude: 91.3662,
    latitudeDelta: 2.5,
    longitudeDelta: 2.5,
    locationName: undefined,
    locationAddress: undefined,
    isLoading: false,
    error: undefined,

    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setLocation: (longitude, latitude, locationName, locationAddress) =>
        set({
            longitude,
            latitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            locationName,
            locationAddress,
            error: undefined,
        }),
}));
