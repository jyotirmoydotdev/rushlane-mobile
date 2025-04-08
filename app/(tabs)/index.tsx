import { Button, Pressable, TouchableOpacity, View } from 'react-native';

import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { ArrowUp, Carrot, Truck } from 'lucide-react-native';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import StoreCard from '@/components/storeCard';
import { useFetchStoresQuery } from '@/lib/query/useFetchStoresQuery';
import { useFetchCategoriesQuery } from '@/lib/query/useFetchCategoriesQuery';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated'
import { useVegStatus } from '@/lib/state/filterState';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function TabOneScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandeler = useScrollViewOffset(scrollRef);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollHandeler.value > 600 ? withTiming(1) : withTiming(0),
    }
  })

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

  async function fetchHello() {
    const response = await fetch('/api/get-store');
    const data = await response.json();
    console.log(data)
    alert('Hello ' + data.hello);
  }

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }

  return (
    <VStack className='bg-gray-50 pt-2 h-auto relative'>
      <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack className='bg-white h-full rounded-t-3xl overflow-hidden p-2'>
          <Button onPress={() => fetchHello()} title="Fetch hello" />
          {/* Services */}
          <HStack className='w-full px-2 py-2 gap-3 mb-2'>
            <Box className='flex-1 h-24 bg-blue-400 border border-[#ffffff80] rounded-3xl px-4 py-2 relative overflow-hidden shadow-lg justify-center'>
              <Box className='size-28 bg-white/60 absolute -bottom-10 -right-10 rounded-full items-center justify-center' />
              <Icon className='h-8 w-8 absolute bottom-4 right-4 stroke-blue-500' as={Truck} />
              <Text className='text-white font-bold text-xl pb-1'>Logistics</Text>
              <Text className='text-white font-medium'>PickUp and </Text>
              <Text className='text-white font-medium'>Drop</Text>
            </Box>
            <Box className='flex-1 h-24 bg-green-400 border border-[#ffffff80] rounded-3xl px-4 py-2  relative overflow-hidden shadow-lg justify-center'>
              <Box className='size-28 bg-white/60 absolute -bottom-10 -right-10 rounded-full items-center justify-center' />
              <Icon className='h-8 w-8 absolute bottom-4 right-4 stroke-green-500' as={Carrot} />
              <Text className='text-white font-semibold text-xl pb-1'>Rushmart</Text>
              <Text className='text-white font-medium'>Instant Grocery</Text>
              <Text className='text-white font-medium'>service</Text>
            </Box>
          </HStack>

          {/* Offer Zone */}
          <HStack className=' justify-between items-center px-4 mb-4'>
            <Text className='text-xl font-bold text-[#333]'>Offer zone</Text>
            <Text className='text-base font-semibold text-[#f77057]'>View all </Text>
          </HStack>
          <Box className='h-auto mb-2'>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex-row px-2 "
            >
              <Image
                alt='banner1'
                source={require('../../assets/images/banner1.jpg')}
                className=' mr-4 bg-red-100 rounded-3xl'
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{
                  width: 340,
                  height: 144,
                  borderRadius: 24,
                  marginRight: 16,
                }}
              />
              <Image
                alt='banner1'
                source={require('../../assets/images/banner2.jpg')}
                className=' mr-4 bg-red-100 rounded-3xl'
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{
                  width: 340,
                  height: 144,
                  borderRadius: 24,
                  marginRight: 16,
                }}
              />
            </ScrollView>
          </Box>
          <View className='flex-row justify-center items-center gap-2 w-full py-2'>
            <Box className='size-2 rounded-full bg-gray-300'></Box>
            <Box className='size-2 rounded-full bg-gray-300'></Box>
          </View>

          <View className='mt-4 px-4'>
            <Text className='text-xl font-bold text-[#333] mb-4'>What's on your mind?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mx-[-16px] px-4'>
              {(categories.isLoading || categories.isPending) ? (
                Array(4).fill(0).map((_, i) => (
                  <View key={i} className='w-20 h-20 mr-4 rounded-full bg-[#EAEAEA]'>
                    <View className='w-20 h-20 rounded-full bg-[#EAEAEA]' />
                    <View className='mt-2 w-[60px] h-3 bg-[#EAEAEA] rounded-md' />
                  </View>
                ))
              ) : (
                categories.data?.map((category: any) => (
                  <Pressable key={category.id} className=' items-center mr-4'>
                    <Image
                      source={{ uri: category.image?.src }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                      }}
                      contentFit="cover"
                      placeholder={blurhash}
                    />
                    <Text className='mt-2 w-20 line-clamp-1 text-xs text-[#333] text-center'>{category.name}</Text>
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>

          {/* Top Restaurants */}
          <HStack className=' justify-between items-center px-4 mt-6 '>
            <Text className='text-2xl font-bold text-[#333] mb-4'>Top restaurants</Text>
            {/* <Text className='text-base font-semibold text-[#f77057]'>View all </Text> */}
          </HStack>
          <Box className='h-auto flex-col px-2 py-2 mb-2 gap-2 '>
            {(() => {
              if (stores.isLoading) {
                return <Text>Loading...</Text>;
              }

              if (stores.isError) {
                return <Text>Error loading stores. Please try again later. {JSON.stringify(stores.error.message)}</Text>;
              }

              if (stores.data && stores.data.length > 0) {
                const handlePress = (vendorId: number) => {
                  router.push(`/store/${vendorId}`);
                  console.log(`Pressed store with ID: ${vendorId}`);
                };

                return (
                  stores.data.map((store: any) => (
                    <Pressable className='shadow-md shadow-gray-300' key={store.vendor_id} onPress={() => handlePress(Number(store.vendor_id))}>
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

      <Animated.View className='absolute bottom-9 right-5' style={buttonStyle}>
        <TouchableOpacity
          onPress={scrollTop}
          className='bg-orange-500 rounded-full p-3 border-2 border-white/50'
        >
          <Icon as={ArrowUp} className=' stroke-white' />
        </TouchableOpacity>
      </Animated.View>
    </VStack>
  );
}