import { FlatList, Pressable, View } from 'react-native';

import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Bell, Carrot, Navigation, Search, ShoppingCart, SlidersHorizontal, Truck } from 'lucide-react-native';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Redirect, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Image, type ImageSource } from 'expo-image';
import StoreCard from '@/components/storeCard';
import { useFetchCategoriesQuery, useFetchStoresQuery } from '@/api/product';
import { PlaceholdersAndVanishInput } from '@/components/PlaceHolderAndVanish';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function TabOneScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  const categories = useFetchCategoriesQuery()

  const stores = useFetchStoresQuery()
  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <VStack className='bg-gray-50 pt-2 h-auto relative'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack className='bg-white h-full rounded-t-3xl overflow-hidden p-2'>

          {/* Services */}
          <HStack className='w-full px-2 py-2 gap-3 mb-2'>
            <Box className='flex-1 h-24 bg-blue-500 rounded-2xl px-4 py-2 relative overflow-hidden shadow-lg justify-center'>
              <Box className='size-28 bg-white/60 absolute -bottom-10 -right-10 rounded-full items-center justify-center' />
              <Icon className='h-8 w-8 absolute bottom-4 right-4 stroke-blue-500' as={Truck} />
              <Text className='text-white font-bold text-xl pb-1'>Logistics</Text>
              <Text className='text-white font-medium'>PickUp and </Text>
              <Text className='text-white font-medium'>Drop</Text>
            </Box>
            <Box className='flex-1 h-24 bg-green-500 rounded-2xl px-4 py-2  relative overflow-hidden shadow-lg justify-center'>
              <Box className='size-28 bg-white/60 absolute -bottom-10 -right-10 rounded-full items-center justify-center' />
              <Icon className='h-8 w-8 absolute bottom-4 right-4 stroke-green-500' as={Carrot} />
              <Text className='text-white font-semibold text-xl pb-1'>Rushmart</Text>
              <Text className='text-white font-medium'>Instant Grocery</Text>
              <Text className='text-white font-medium'>service</Text>
            </Box>
          </HStack>

          {/* Offer Zone */}
          <HStack className=' justify-between items-center px-4 mb-2'>
            <Text className='text-2xl font-bold  text-gray-500'>Offer zone</Text>
            <Text className='text-base font-semibold text-[#f77057]'>View all </Text>
          </HStack>
          <Box className='h-auto mb-4'>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex-row px-2 "
            >
              <Image
                alt='banner1'
                source={require('../../assets/images/banner1.jpg')}
                className=' mr-4 bg-red-100 rounded-2xl'
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{
                  width: 340,
                  height: 144,
                  borderRadius: 16,
                  marginRight: 16,
                }}
              />
              <Image
                alt='banner1'
                source={require('../../assets/images/banner2.jpg')}
                className=' mr-4 bg-red-100 rounded-2xl'
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{
                  width: 340,
                  height: 144,
                  borderRadius: 16,
                  marginRight: 16,
                }}
              />
            </ScrollView>
          </Box>
          <View className='flex-row justify-center items-center gap-2 w-full py-2'>
            <Box className='size-2 rounded-full bg-gray-300'></Box>
            <Box className='size-2 rounded-full bg-gray-300'></Box>
          </View>

          {/* Trending Categories */}
          <HStack className=' justify-between items-center px-4 mb-2'>
            <Text className='text-2xl font-bold  text-gray-500'>Trending right now</Text>
            <Text className='text-base font-semibold text-[#f77057]'>View all </Text>
          </HStack>
          <Box className='h-auto mb-4'>
            {
              categories.isError ? (
                <View>
                  <Text>No Product to show</Text>
                </View>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="flex-row px-2  ">
                  {
                    categories.isLoading ? (
                      <>
                        <View className='flex flex-col items-center gap-4 mr-4 w-28'>
                          <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full border-2 border-orange-400 p-4 overflow-hidden flex items-center justify-center' />
                          <Text className=' line-clamp-1'>Loading...</Text>
                        </View>
                        <View className='flex flex-col items-center gap-4 mr-4 w-28'>
                          <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full border-2 border-orange-400 p-4 overflow-hidden flex items-center justify-center' />
                          <Text className=' line-clamp-1'>Loading...</Text>
                        </View>
                        <View className='flex flex-col items-center gap-4 mr-4 w-28'>
                          <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full border-2 border-orange-400 p-4 overflow-hidden flex items-center justify-center' />
                          <Text className=' line-clamp-1'>Loading...</Text>
                        </View>
                        <View className='flex flex-col items-center gap-4 mr-4 w-28'>
                          <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full border-2 border-orange-400 p-4 overflow-hidden flex items-center justify-center' />
                          <Text className=' line-clamp-1'>Loading...</Text>
                        </View>
                      </>
                    ) : (
                      categories.data?.map((category: any) => {
                        if (!category.image) {
                          return null;
                        }
                        return (
                          <View key={category.id} className='flex flex-col items-center gap-4 mr-4 w-28 '>
                            <Box key={category.id} className='w-28 h-28 mr-4 bg-gray-100 rounded-full border-2 border-orange-400 p-4 overflow-hidden flex items-center justify-center'>
                              <Image
                                alt='banner1'
                                source={{ uri: category.image.src }}
                                className='bg-red-100 rounded-full '
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: 'cover',
                                }}
                              />
                            </Box>
                            <Text className=' line-clamp-1'>{category.name}</Text>
                          </View>
                        );
                      })
                    )
                  }
                </ScrollView>
              )
            }

          </Box>

          {/* Top Restaurants */}
          <HStack className=' justify-between items-center px-4 mb-2'>
            <Text className='text-2xl font-bold  text-gray-500'>Top restaurants in town</Text>
            {/* <Text className='text-base font-semibold text-[#f77057]'>View all </Text> */}
          </HStack>
          <Box className='h-auto flex-col px-2 py-2 mb-2 '>
            {(() => {
              if (stores.isLoading) {
                return <Text>Loading...</Text>;
              }

              if (stores.isError) {
                return <Text>Error loading stores. Please try again later.</Text>;
              }

              if (stores.data && stores.data.length > 0) {
                const handlePress = (vendorId: number) => {
                  router.push(`/store/${vendorId}`);
                  console.log(`Pressed store with ID: ${vendorId}`);
                };

                return (
                  stores.data.map((store: any) => (
                    <Pressable key={store.vendor_id} onPress={() => handlePress(Number(store.vendor_id))}>
                      <StoreCard
                        id={store.vendor_id}
                        storeAddress={store.vendor_address}
                        storeRating={store.store_rating}
                        storeBanner={store.vendor_banner}
                        storeName={store.vendor_shop_name}
                        storeLogo={store.vendor_shop_logo}
                      />
                    </Pressable>
                  ))
                );
              }

              return <Text>No stores available.</Text>;
            })()}
          </Box>

        </VStack>
      </ScrollView>
    </VStack>
  );
}