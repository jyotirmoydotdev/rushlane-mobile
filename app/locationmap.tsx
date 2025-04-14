import 'react-native-get-random-values';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { router, Stack } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Navigation } from 'lucide-react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useLocationState } from '@/lib/state/locationState';

export default function LocationMap() {
  const mapRef = useRef<MapView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationName, setLocationName] = useState("Unknown Location");
  const [locationAddress, setLocationAddress] = useState("");
  const userMovedMap = useRef(false);

  // Local state to manage the map view
  const [mapRegion, setMapRegion] = useState({
    latitude: 25.4670, // Default latitude for Meghalaya
    longitude: 91.3662, // Default longitude for Meghalaya
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  });

  // Reference to Zustand state for persistence
  const storeLocation = useLocationState(state => state.setLocation);

  useEffect(() => {
    let isMounted = true;

    const getLocationAsync = async () => {
      try {
        setIsLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('Location permission denied');
          setIsLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (isMounted && location?.coords) {
          const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          };

          setMapRegion(newRegion);
          storeLocation(location.coords.longitude, location.coords.latitude);

          // Try to get location name from reverse geocoding
          
          try {
            const geocode = await Location.reverseGeocodeAsync({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            });

            if (geocode && geocode.length > 0) {
              const place = geocode[0];
              setLocationName(place.name || place.district || "Selected Location");
              setLocationAddress(
                [
                  place.street,
                  place.district,
                  place.city,
                  place.region,
                  place.country
                ].filter(Boolean).join(", ")
              );
            }
          } catch (error) {
            console.log("Geocoding error:", error);
          }

          // Animate to the location after a delay to ensure map is ready
          setTimeout(() => {
            if (mapRef.current && isMounted) {
              mapRef.current.animateToRegion(newRegion, 500);
            }
          }, 500);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getLocationAsync();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLocationSelect = async (data: any, details: any) => {
    if (!details || !details.geometry || !details.geometry.location) {
      console.log("No location details available");
      return;
    }

    const { lat, lng } = details.geometry.location;

    // Update local state
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    };

    // Important: Don't set the mapRegion state directly here
    // Just animate the map and let onRegionChangeComplete handle the state update
    userMovedMap.current = false;

    // Update location name and address
    if (details.name) {
      setLocationName(details.name);
    }

    if (details.formatted_address) {
      setLocationAddress(details.formatted_address);
    } else {
      // Fallback to component parts if formatted address isn't available
      setLocationAddress(
        [
          details.name,
          details.vicinity || details.address_components?.map((c: any) => c.long_name).join(", ")
        ].filter(Boolean).join(", ")
      );
    }

    // Animate to the new location
    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 500);
    }

    // Only update the store after animation completes
    storeLocation(lng, lat);
  };

  // Use a timeout ref to debounce region changes
  const regionChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleRegionChangeComplete = (region: Region) => {
    // Clear any existing timeout
    if (regionChangeTimeoutRef.current) {
      clearTimeout(regionChangeTimeoutRef.current);
    }

    // If this change was triggered by user interaction, we want to update the location
    if (userMovedMap.current) {
      // Set a new timeout to update state after a delay
      regionChangeTimeoutRef.current = setTimeout(() => {
        setMapRegion(region);

        // Update the stored location
        storeLocation(region.longitude, region.latitude);

        // Remove reverse geocoding on every map move
        // const updateLocationInfo = async () => {
        //   try {
        //     const geocode = await Location.reverseGeocodeAsync({
        //       latitude: region.latitude,
        //       longitude: region.longitude
        //     });
        //
        //     if (geocode && geocode.length > 0) {
        //       const place = geocode[0];
        //       setLocationName(place.name || place.district || "Selected Location");
        //       setLocationAddress(
        //         [
        //           place.street,
        //           place.district,
        //           place.city,
        //           place.region,
        //           place.country
        //         ].filter(Boolean).join(", ")
        //       );
        //     }
        //   } catch (error) {
        //     console.log("Reverse geocoding error:", error);
        //   }
        // };
        //
        // updateLocationInfo();
      }, 300); // 300ms debounce
    } else {
      // Reset the flag so future moves are considered user-triggered
      userMovedMap.current = true;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Select delivery location',
          headerShown: true,
        }}
      />
      <View className='flex-1'>

        <View className=' absolute top-0 z-10 w-full'>
          <GooglePlacesAutocomplete
            placeholder='Search for building, street name or area'
            fetchDetails={true}
            onPress={handleLocationSelect}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            // autoFillOnNotFound={false}
            // Add these props:
            keyboardShouldPersistTaps="handled"
            listViewDisplayed={false} // Only show it when needed
            enablePoweredByContainer={true}
            debounce={300}
            minLength={3}
          />
        </View>

          {false ? (
            <View>
              <ActivityIndicator size="large" color="#f97316" />
              <Text>Getting your location...</Text>
            </View>
          ) : (
            <MapView
              ref={mapRef}
              style={{
                width: '100%',
                height: '100%',
              }}
              initialRegion={mapRegion}
              // Remove the region prop to prevent continuous updates
              zoomEnabled={true}
              rotateEnabled={false}
              showsUserLocation={true}
              showsMyLocationButton={true}
              showsCompass={true}
              onPanDrag={() => {
                // Set flag to indicate user is manually moving the map
                userMovedMap.current = true;
              }}
              toolbarEnabled={false}
              onRegionChangeComplete={handleRegionChangeComplete}
            >
              <Marker
                coordinate={{
                  latitude: mapRegion.latitude,
                  longitude: mapRegion.longitude
                }}
                title={locationName}
                description={locationAddress}
              />
            </MapView>
          )}

        <View className=' absolute  z-5 w-full rounded-t-2xl p-5'>
          <View className='mb-4'>
            <View className='flex-row items-center mb-1'>
              <Icon as={Navigation} className='fill-orange-500 stroke-orange-500' />
              <Text className=' text-xl font-bold ml-2'>{locationName}</Text>
            </View>
            <Text className='text-base text-[#666] pl-8'>{locationAddress}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              storeLocation(mapRegion.longitude, mapRegion.latitude);
              router.back();
            }}
            className='bg-[#f97316] py-3 px-8 rounded-xl w-full items-center'
          >
            <Text className='text-white text-base font-semibold'>Confirm Location</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
}