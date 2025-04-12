import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { router, Stack } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function LocationMap() {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [hasSetInitialRegion, setHasSetInitialRegion] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Location permission denied');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // Balance between accuracy and battery
        });
        
        if (isMounted) {
          setLocation(currentLocation);
          
          // Only animate if we have a location and haven't set initial region yet
          if (!hasSetInitialRegion && mapRef.current) {
            setHasSetInitialRegion(true);
            
            // Slight delay to ensure map is ready
            setTimeout(() => {
              if (mapRef.current && isMounted) {
                mapRef.current.animateToRegion({
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }, 500);
              }
            }, 500);
          }
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocationAsync();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [hasSetInitialRegion]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: 'Select delivery location',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Icon as={ArrowLeft} />
            </TouchableOpacity>
          )
        }}
      />
      
      <View style={styles.container}>
        {/* The map fills most of the screen but leaves exact space for footer */}
        <View style={styles.mapContainer}>
            <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 25.4670, // Approximate center latitude of Meghalaya
              longitude: 91.3662, // Approximate center longitude of Meghalaya
              latitudeDelta: 2.5, // Adjusted to cover the whole state
              longitudeDelta: 2.5 // Adjusted to cover the whole state
            }}
            zoomEnabled={true}
            rotateEnabled={false}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            toolbarEnabled={false}
            region={location ? {
              latitude: location.coords.latitude, // Approximate center latitude of Meghalaya
              longitude: location.coords.longitude, // Approximate center longitude of Meghalaya
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }: undefined}
            >
            {location && (
              <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
              title="Your Location"
              />
            )}
            </MapView>
        </View>
        
        {/* Footer with fixed height */}
        <View style={styles.footer}>
          <View className='flex-col gap-2 px-2'>
            <View className='flex-row gap-2 items-center justify-start'>
              <Icon as={Navigation} className='fill-orange-500 stroke-orange-500'/>
              <Text className='text-2xl font-black'>Dobasipara</Text>
            </View>
            <Text>
              Dobasipara, Tura, Meghalaya, India
            </Text>
          </View>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');
const FOOTER_HEIGHT = 160;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: height - FOOTER_HEIGHT - 80,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  footer: {
    height: FOOTER_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});