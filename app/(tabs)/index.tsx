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
import { Link } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Image, type ImageSource } from 'expo-image';
import StoreCard from '@/components/storeCard';
import { useFetchCategoriesQuery, useFetchStoresQuery } from '@/api/product';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function TabOneScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    <VStack className='bg-[#f77057] pt-12'>
      {/* <LinearGradient colors={['#F19280', 'f77057']} className=''>
      </LinearGradient> */}
      <LinearGradient colors={['#F19280', '#f77057']} className=''>
        <VStack className='bg-white h-full rounded-t-3xl overflow-hidden p-2 gap-1'>
          <Link href={"/search"} asChild>
            <Pressable>
              <Box className='mx-2 mt-4 mb-2 rounded-2xl h-12 bg-gray-100 flex-row items-center justify-between px-3 shadow-sm shadow-gray-300'>
                <Box className='flex-row items-center'>
                  <Icon as={Search} className='h-5 w-5 text-gray-500' />
                  <Text className='ml-3 text-gray-500 text-base'>Search Food</Text>
                </Box>
                <Box className='flex-row items-center'>
                  <Box className='h-5 w-0 mr-4 border-gray-300 border' />
                  <Icon as={SlidersHorizontal} className='h-5 w-5 text-gray-500' />
                </Box>
              </Box>
            </Pressable>
          </Link>
          <Box className='h-auto'>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <Box className='h-auto'>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="flex-row px-2 py-2"
                >
                  <Box className='w-48 h-28 mr-4 bg-[#7FBCFF] rounded-2xl p-4 relative overflow-hidden'>
                    <Box className=' size-28 bg-white/50 absolute -bottom-10 -right-10 rounded-full items-center justify-center' />
                    <Icon className='h-8 w-8 absolute bottom-4 right-4 stroke-[#4999F0]' as={Truck} />
                    <Text className='text-black font-semibold text-lg pb-1.5'>Pickup and Drop</Text>
                    <Text className='font-medium'>At your</Text>
                    <Text className='font-medium'>convenience</Text>
                  </Box>
                  <Box className='w-48 h-28 mr-4 bg-[#99E3AC] rounded-2xl p-4 relative overflow-hidden'>
                    <Icon className='h-8 w-8 absolute bottom-4 right-4 stroke-[#115822]' as={Carrot} />
                    <Box className=' size-28 bg-white/50 absolute -bottom-10 -right-10 rounded-full' />
                    <Text className='text-black font-semibold text-lg'>Rushmart</Text>
                    <Text className='font-medium'>Instant Grocery </Text>
                    <Text className='font-medium'>service</Text>
                  </Box>
                  <Box className='w-28 h-28 mr-4 bg-[#f77057] rounded-2xl p-4 justify-center items-center relative'>
                    <Box className=' size-24 bg-white/50 absolute  rounded-full' />
                    <Text className='text-xl text-black font-semibold'>More</Text>
                  </Box>
                </ScrollView>
              </Box>
              <HStack className=' justify-between items-center px-4 mt-4'>
                <Text className='text-2xl font-bold  text-gray-500'>Offers just for you</Text>
                <Text className='text-base font-semibold text-[#f77057]'>View all </Text>
              </HStack>
              <Box className='h-auto'>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="flex-row px-2 py-2"
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
              <HStack className=' justify-between items-center px-4 mt-4'>
                <Text className='text-2xl font-bold  text-gray-500'>Trending right now</Text>
                <Text className='text-base font-semibold text-[#f77057]'>View all </Text>
              </HStack>
              <Box className='h-auto'>
                {
                  categories.isError ? (
                    <View>
                      <Text>No Product to show</Text>
                    </View>
                  ) : (
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      className="flex-row px-2 py-4 ">
                      {
                        categories.isLoading ? (
                          <>
                            <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full p-4 overflow-hidden' />
                            <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full p-4 overflow-hidden' />
                            <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full p-4 overflow-hidden' />
                            <Box className='w-28 h-28 mr-4 bg-gray-100 rounded-full p-4 overflow-hidden' />
                          </>
                        ) : (
                          categories.data?.map((category: any) => {
                            if (!category.image) {
                              return null;
                            }
                            return (
                              <View key={category.id} className='flex flex-col items-center gap-4 mr-4 w-28'>
                                <Box key={category.id} className='w-28 h-28 mr-4 bg-gray-100 rounded-full p-4 overflow-hidden flex items-center justify-center'>
                                  <Image
                                    alt='banner1'
                                    source={{ uri: category.image.src }}
                                    className='bg-red-100 rounded-full'
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
              <HStack className=' justify-between items-center px-4 mt-4 mb-2'>
                <Text className='text-2xl font-bold  text-gray-500'>Top restaurants in town</Text>
                {/* <Text className='text-base font-semibold text-[#f77057]'>View all </Text> */}
              </HStack>
              <Box className='h-auto flex-col px-2 py-2 '>
                {
                  stores.isLoading ? (
                    <Text>Loading...</Text>
                  ) : (
                    stores.data?.map((item: any, index: number) => (
                      <View key={index + 1}>
                        <StoreCard
                          id={item.id}
                          storeAddress={item.vendor_address}
                          storeRating={item.store_rating}
                          storeBanner={item.vendor_banner}
                          storeName={item.vendor_shop_name}
                          storeLogo={item.vendor_shop_logo}
                        />
                      </View>
                    ))
                  )
                }
              </Box>
              <Box className='h-[20rem] w-full'></Box>
            </ScrollView>
            {/* <FlatList
              data={stores.data}
              // @ts-ignore
              numColumns={1}
              contentContainerClassName='gap-2 max-w-[960px] mx-auto w-full'
              className=' pt-2'
              renderItem={({ item }) => (<StoreCard key={item.id} storeBanner={item.vendor_banner} storeName={item.vendor_shop_name} storeLogo={item.vendor_shop_logo} />)}
            /> */}
            {/* <Text>{stores.isLoading ? "Loading..." : JSON.stringify(stores.data)}</Text> */}
          </Box>
        </VStack>
      </LinearGradient>
    </VStack>
  );
}