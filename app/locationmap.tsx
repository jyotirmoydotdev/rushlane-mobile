import 'react-native-get-random-values';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { router, Stack } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Locate, LocateFixed, Navigation } from 'lucide-react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useLocationState } from '@/lib/state/locationState';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserLocation } from '@/lib/hooks/useUserLocation';
import { useHeaderHeight } from '@react-navigation/elements';

export default function LocationMap() {
  const mapRef = useRef<MapView>(null);
  const userMovedMap = useRef(false);

  const storeLocation = useLocationState(state => state.setLocation);

  const { error, isLoading, location, locationName, locationAddress, handleLocationSelect, currentlocation } = useUserLocation({ mapRef });

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
  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Select delivery location',
          headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'white'
          }
        }}
      />
      <View className="bg-white" style={{ paddingTop: insets.top, backgroundColor: 'white' }}>

        {/* map search bar */}
        <View className=' absolute z-10 px-2  w-full' style={{ top: headerHeight + 8}}>
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
            listLoaderComponent={<ActivityIndicator size="large" color="#f97316" />}
            styles={{
              textInput: {
                borderColor: '#d1d5db',
                borderWidth: 2,
                borderRadius: 18,
                height: 58,
                fontSize: 16,
                paddingHorizontal: 16,
                margin: 6,
              },
              listView: {
                marginHorizontal: 6,
                backgroundColor: 'white',
                borderRadius: 18,
                paddingTop: 8
              },
              row: {
                width: '100%',
                backgroundColor: 'white',
              },
              loader: {
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 50,
              }
            }}
          />
        </View>

        {isLoading ? (
          <View className='justify-center items-center'  style={{
            width: '100%',
            height: '100%'
          }}>
            <ActivityIndicator size="large" color="#f97316" />
            <Text className='pt-5'>Getting your location...</Text>
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

        <View className=' absolute bottom-0  w-full '>
          <View className='mb-2 flex-1 items-end mr-3'>
            <TouchableOpacity onPress={currentlocation} className='flex-1 justify-center items-center rounded-xl bg-white w-10 h-10 p-2 border-2 border-gray-100'>
              <Icon className='stroke-orange-500' size='xl' as={LocateFixed} />
            </TouchableOpacity>
          </View>
          <View className='bg-white rounded-t-[2rem] px-5 py-8'>
            <View className='mb-6'>
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
      </View>
    </>
  );
}