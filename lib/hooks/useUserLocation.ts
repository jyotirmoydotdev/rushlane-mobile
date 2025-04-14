// hooks/useUserLocation.ts
import { useEffect, useRef, useCallback } from 'react';
import * as Location from 'expo-location';
import type { Region } from 'react-native-maps';
import { useLocationState } from '../state/locationState';

export type UseUserLocationOptions = {
  mapRef?: React.RefObject<{ animateToRegion: (r: Region, t: number) => void }>;
  skipGeocode?: boolean;
};

export function useUserLocation({ mapRef, skipGeocode }: UseUserLocationOptions = {}) {
  const {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    locationName,
    locationAddress,
    isLoading,
    error,
    setLoading,
    setError,
    setLocation,
  } = useLocationState();

  const isMounted = useRef(true);

  // Initial load / permission / geocode
  useEffect(() => {
    isMounted.current = true;

    if (!skipGeocode && locationName && locationAddress) {
        return;
    }

    const load = async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!isMounted.current) return;

        const { latitude: lat, longitude: lng } = loc.coords;

        let name: string | undefined;
        let address: string | undefined;

        if (!skipGeocode) {
          try {
            const geocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
            if (geocode.length > 0) {
              const p = geocode[0];
              name = p.name || p.district || 'Selected Location';
              address = [p.street, p.district, p.city, p.region, p.country]
                .filter(Boolean)
                .join(', ');
            }
          } catch (e) {
            console.warn('Geocoding error', e);
          }
        }

        setLocation(lng, lat, name, address);

        // animate if mapRef provided
        if (mapRef?.current) {
          const region: Region = { latitude: lat, longitude: lng, latitudeDelta: 0.005, longitudeDelta: 0.005 };
          setTimeout(() => {
            if (isMounted.current) mapRef.current!.animateToRegion(region, 500);
          }, 500);
        }
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted.current = false;
    };
  }, [mapRef, skipGeocode, setLoading, setError, setLocation]);

  // Handler for manual selection (e.g. Places)
  const handleLocationSelect = useCallback(
    (data: any, details: any) => {
      const loc = details?.geometry?.location;
      if (!loc) {
        console.warn('No location details available');
        return;
      }
      const { lat, lng } = loc;
      const name = details.name;
      const address =
        details.formatted_address ||
        [details.name, details.vicinity, details.address_components?.map((c: any) => c.long_name).join(', ')]
          .filter(Boolean)
          .join(', ');

      setLocation(lng, lat, name, address);

      if (mapRef?.current) {
        const region: Region = { latitude: lat, longitude: lng, latitudeDelta: 0.005, longitudeDelta: 0.005 };
        mapRef.current.animateToRegion(region, 500);
      }
    },
    [mapRef, setLocation]
  );

  return {
    // state
    location: { latitude, longitude, latitudeDelta, longitudeDelta },
    locationName,
    locationAddress,
    isLoading,
    error,
    // action
    handleLocationSelect,
  };
}
