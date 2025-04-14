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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserLocation } from '@/lib/hooks/useUserLocation';

export default function LocationMap() {
  const mapRef = useRef<MapView>(null);
  const userMovedMap = useRef(false);

  const storeLocation = useLocationState(state => state.setLocation);

  const { error, isLoading, location, locationName, locationAddress, handleLocationSelect } = useUserLocation({ mapRef });

  const regionChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleRegionChangeComplete = (region: Region) => {
    // Clear any existing timeout
    if (regionChangeTimeoutRef.current) {
      clearTimeout(regionChangeTimeoutRef.current);
    }

    if (userMovedMap.current) {
      regionChangeTimeoutRef.current = setTimeout(() => {

        storeLocation(region.longitude, region.latitude, locationName, locationAddress);
      }, 300);
    } else {
      userMovedMap.current = true;
    }
  };

  const insets = useSafeAreaInsets();
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Select delivery location',
          headerShown: true,
          headerTransparent: true,
          headerStyle:{
            backgroundColor: 'white'
          }
        }}
      />
      <View className="bg-white" style={{ paddingTop: insets.top, backgroundColor: 'white' }}>

        <View className=' absolute z-10 top-0 px-2 bg-white w-full' style={{paddingTop: insets.top*2}}>
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

          {isLoading ? (
            <View>
              <ActivityIndicator size="large" color="#f97316" />
              <Text>Getting your location...</Text>
            </View>
          ) : (
            <MapView
              ref={mapRef}
              style={{
                width: '100%',
                height: '100%'
              }}
              initialRegion={location}
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
                  latitude: location.latitude,
                  longitude: location.longitude
                }}
                title={locationName}
                description={locationAddress}
              />
            </MapView>
          )}

        <View className=' absolute bottom-0 bg-white w-full rounded-t-2xl p-5'>
          <View className='mb-4'>
            <View className='flex-row items-center mb-1'>
              <Icon as={Navigation} className='fill-orange-500 stroke-orange-500' />
              <Text className=' text-xl font-bold ml-2'>{locationName}</Text>
            </View>
            <Text className='text-base text-[#666] pl-8'>{locationAddress}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              storeLocation(location.longitude, location.latitude, locationName, locationAddress);
              router.push('/');
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