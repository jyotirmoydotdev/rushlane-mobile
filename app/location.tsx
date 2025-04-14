import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { Icon } from '@/components/ui/icon'
import { ChevronDown, ChevronRight, Navigation, Plus } from 'lucide-react-native'
import { PlaceholdersAndVanishInput } from '@/components/PlaceHolderAndVanish'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function Location() {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latidutedeelta: 0,
        longitudedelta: 0
    })
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Select a location',
                    headerShadowVisible: false
                }}
            />
            <View className='bg-white h-full flex-col gap-2 px-4 pt-2'>
                <PlaceholdersAndVanishInput
                    placeholders={["Search for a location"]}
                    onChange={() => { }}
                    onSubmit={() => { }}
                />
                <View className='flex-col gap-2 mb-4'>
                    <TouchableOpacity
                        className='bg-white flex-row items-center justify-between mt-4 border-b pb-4 border-b-gray-300'
                        onPress={() => router.push('/locationmap')}
                    >
                        <View className='flex-row items-center'>
                            <Icon as={Navigation} color={'#000'} />
                            <Text className='text-lg font-bold  text-gray-700 ml-2'>Use my current location</Text>
                        </View>
                        <Icon as={ChevronRight} color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='bg-white flex-row items-center justify-between mt-4 border-b pb-4 border-b-gray-300'
                        onPress={() => router.push('/locationmap')}
                    >
                        <View className='flex-row items-center'>
                            <Icon as={Plus} color={'#000'} className=' stroke-2' />
                            <Text className='text-lg font-bold text-gray-700 ml-2'>Add new address</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className='font-bold text-gray-400'>RECENT LOCATION</Text>
                </View>

                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                        language: 'en',
                    }}
                />
            </View>
        </>
    )
}