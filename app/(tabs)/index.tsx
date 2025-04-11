import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  ArrowUp,
  ChevronDown,
  Filter,
  Home,
  LocateIcon,
  MapPin,
  Navigation,
  Pin,
  Search,
  Star,
  Timer,
  User
} from 'lucide-react-native';
import { ScrollView } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
  FadeIn,
  SlideInRight,
  withSpring,
  useSharedValue
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useFetchStoresQuery } from '@/lib/query/useFetchStoresQuery';
import { useFetchCategoriesQuery } from '@/lib/query/useFetchCategoriesQuery';
import { blurhash } from '@/constants/blurHash';
import { PlaceholdersAndVanishInput } from '@/components/PlaceHolderAndVanish';

import he from 'he'

interface RestaurantCardProps {
  id: number;
  name: string;
  address: string;
  rating: number;
  imageUrl: string;
  logoUrl: string;
  cuisine?: string;
  deliveryTime?: string;
  priceRange?: string;
  discount?: string;
}

const RestaurantCard = ({
  id,
  name,
  address,
  rating,
  imageUrl,
  logoUrl,
  cuisine,
  deliveryTime,
  priceRange,
  discount,
}: RestaurantCardProps) => {
  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Restaurant Image */}
      <View className="relative">
        <Image
          source={{ uri: imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4' }}
          style={{
            height: 180,
            width: '100%',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12
          }}
          className="rounded-t-xl"
          contentFit="cover"
          placeholder={{ blurhash }}
          transition={200}
        />

        {/* Discount Badge */}
        {/* <View className="absolute top-3 left-3 bg-foodapp-discount px-2 py-1 rounded-md">
          <Text className="text-white font-bold text-xs">{discount}</Text>
        </View> */}

        {/* Restaurant Logo */}
        <Image
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            width: 80,
            height: 80,
            borderRadius: 999,
            backgroundColor: '#e5e7eb'
          }}
          source={{
            uri: logoUrl
          }}
        />
      </View>

      {/* Restaurant Info */}
      <View className="p-3">
        {/* Restaurant Name and Logo */}
        <View className="flex-row items-center justify-between mb-1">
          <Text className=" font-black text-3xl" numberOfLines={1}>
            {he.decode(name)}
          </Text>

          <View className="flex-row items-center bg-foodapp-rating px-2 py-0.5 rounded">
            <Icon as={Star} size='sm' className="stroke-white fill-white mr-1" />
            <Text className="text-white font-bold text-xs">{rating}</Text>
          </View>
        </View>

        {/* Rating */}
        <View className='flex-row gap-1 items-center'>
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={index}
              as={Star}
              className={`w-3 h-3 ${index < Math.round(Number(rating))
                ? 'fill-yellow-400 stroke-yellow-500'
                : 'fill-gray-300 stroke-gray-400'
                }`}
            />
          ))}
          <Text className='text-sm px-1 text-gray-500'>({rating})</Text>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 my-2"></View>

        {/* Delivery Info */}
        <View className="flex-row items-center w-3/4">
          <Icon as={MapPin} size='sm' className="mr-1" />
          <Text className="text-base line-clamp-1">
            {he.decode(address)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('delivery');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef);
  const router = useRouter();

  const categoriesQuery = useFetchCategoriesQuery();
  const storesQuery = useFetchStoresQuery();

  // Animation for floating scroll to top button
  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(scrollHandler.value > 300 ? 1 : 0),
      transform: [{ scale: withTiming(scrollHandler.value > 300 ? 1 : 0.8) }],
    }
  });
  const locationAnimatedStyle = useAnimatedStyle(() => {
    const collapseHeight = Math.min(scrollHandler.value, 50);
    return {
      transform: [
        {
          translateY: scrollHandler.value > 50
            ? withTiming(-collapseHeight, { duration: 300 })
            : withSpring(-collapseHeight),
        },
      ],
      height: scrollHandler.value > 50 ? withTiming(50 - collapseHeight, { duration: 300 }) : withSpring(50 - collapseHeight),
      opacity: scrollHandler.value > 50
        ? withTiming(1 - collapseHeight / 50, { duration: 300 })
        : withSpring(1 - collapseHeight / 50),
    };
  });

  const headerContainer = useAnimatedStyle(() => {
    return {
      shadowColor: scrollHandler.value > 50 ? '#000' : 'transparent',
      shadowOpacity: scrollHandler.value > 50 ? 0.2 : 0,
      shadowRadius: scrollHandler.value > 50 ? 4 : 0,
      shadowOffset: {
        width: 0,
        height: scrollHandler.value > 50 ? 5 : 0, // Only bottom shadow
      },
      elevation: scrollHandler.value > 50 ? 5 : 0, // For Android shadow
      borderTopWidth: 0, // Ensure no top shadow
    };
  });

  // XNOTE: Calculate the Scroll Value height instead of using '>'
  // const locationAnimatedStyle = useAnimatedStyle(() => {
  //   const collapseHeight = Math.min(scrollHandler.value, 50);
  //   const opacity = scrollHandler.value > 50
  //     ? withTiming(1 - collapseHeight / 50, { duration: 300 })
  //     : withSpring(1 - collapseHeight / 50);
  //   const height = scrollHandler.value > 50
  //     ? withTiming(50 - collapseHeight, { duration: 300 })
  //     : withSpring(50 - collapseHeight);
  //   const scale = scrollHandler.value > 50
  //     ? withTiming(1 - collapseHeight / 50, { duration: 300 })
  //     : withSpring(1 - collapseHeight / 50);

  //   return {
  //     opacity,
  //     height,
  //     transform: [{ scale }],
  //   };
  // });

  // Get user location
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

  // Handle scroll to top
  const scrollTop = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }

  // Filter restaurants by veg only option
  const stores = storesQuery.data

  // Mock data for special offers
  const specialOffers: {
    id: number;
    title: string;
    description: string;
    image: any;
    color: [string, string];
  }[] = [
      {
        id: 1,
        title: '50% OFF up to ₹100',
        description: 'Use code WELCOME50',
        image: require('@/assets/images/banner1.jpg'),
        color: ['rgba(252,128,25,0.8)', 'rgba(252,128,25,0.95)']
      },
      {
        id: 2,
        title: 'Free Delivery',
        description: 'On orders above ₹199',
        image: require('@/assets/images/banner2.jpg'),
        color: ['rgba(226,55,68,0.8)', 'rgba(226,55,68,0.95)']
      },
    ];

  const collections = [
    {
      id: 1,
      title: 'RushMart',
      image: require('@/assets/images/rushmart.webp'),
      description: 'Instant grocery delivery service',
    },
    {
      id: 2,
      title: 'Logistic',
      image: require('@/assets/images/rushmart.webp'),
      description: 'Pickup and drop service',
    },
  ];

  return (
    <>
      <Tabs.Screen
        options={{
          header: () => (
            <SafeAreaView className="bg-white ">
              <Animated.View className="bg-white px-4 pt-2 pb-2" style={headerContainer} >

                {/* Location Bar */}
                <Animated.View style={locationAnimatedStyle} needsOffscreenAlphaCompositing={true} renderToHardwareTextureAndroid={true}>
                  <Link href="/location" asChild>
                    <Pressable
                      className="flex-row items-center pt-1 pb-6  overflow-hidden"
                      onPress={() => Haptics.selectionAsync()}
                    >
                      <View className="bg-foodapp-primary bg-opacity-10 rounded-full p-1.5">
                        <Icon as={Navigation} size='xl' className=" fill-orange-500 stroke-orange-500" />
                      </View>
                      <View className="ml-1 flex-1">
                        {location && (
                          <Text className="text-lg font-bold text-foodapp-muted">
                            Tura, Meghalaya
                          </Text>
                        )}
                        <Text className="text-sm font-semibold ">
                          {errorMsg
                            ? "Set delivery location"
                            : location ? "Current Location" : "Detecting location..."}
                        </Text>
                      </View>
                        <Animated.View entering={FadeIn.delay(150).duration(300)}>
                        <Pressable
                          onPress={() => {
                          Haptics.selectionAsync();
                          router.push('/account');
                          }}
                          className="flex-row items-center px-4 py-1.5 rounded-xl border-2 border-gray-700 bg-gray-800"
                        >
                          <Icon as={User} size="lg" className="stroke-gray-50" />
                        </Pressable>
                        </Animated.View>
                    </Pressable>
                  </Link>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View className={'flex-row gap-2'}>

                  <Link href="/search" asChild>
                    <Pressable className=' flex-grow' onPress={() => Haptics.selectionAsync()}>
                      <PlaceholdersAndVanishInput
                        placeholders={['Biryani', 'Pizza', 'Fries', 'Chicken']}
                        onChange={() => void {}}
                        onSubmit={() => void {}}
                      />
                    </Pressable>
                  </Link>
                  <Animated.View entering={FadeIn.delay(150).duration(300)}>
                    <Pressable
                      onPress={() => {
                        Haptics.selectionAsync();
                        setVegOnly(!vegOnly);
                      }}
                      className={`flex-row items-center px-4 py-1.5 h-16 rounded-2xl border-2 ${vegOnly ? 'bg-green-50 border-green-500' : 'border-gray-300'}`}
                    >
                      <View className={`w-3 h-3 mr-2 rounded-full border-2 ${vegOnly ? 'bg-green-500 border-green-500' : 'border-gray-400'}`} />
                      <Text className={`font-bold italic ${vegOnly ? 'text-green-700' : ''}`}>
                        VEG
                      </Text>
                    </Pressable>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </SafeAreaView>
          ),
        }}
      />

      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="bg-gray-50"
        needsOffscreenAlphaCompositing={true}
        renderToHardwareTextureAndroid={true}
      >

        {/* Food Categories */}
        <View className="py-4 bg-white mt-2">
          <Text className="text-lg font-bold  mb-3 px-4">What's on your mind?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
            decelerationRate="fast"
          >
            {categoriesQuery.isLoading ? (
              Array(8).fill(0).map((_, i) => (
                <View key={i} className="mr-5 items-center">
                  <View
                    className="w-[80px] h-[80px] rounded-full bg-gray-200 animate-pulse-light"
                  />
                  <View className="mt-2 w-20 h-3 bg-gray-200 rounded animate-pulse-light"></View>
                </View>
              ))
            ) : categoriesQuery.isError ? (
              <Text className="px-4">Something went wrong...</Text>
            ) : (
              <>
                {categoriesQuery.data?.map((category: any, index: number) => (
                  <Pressable
                    key={category.id}
                    className={`mr-5 items-center ${activeCategory === category.id ? 'opacity-100' : 'opacity-90'
                      }`}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setActiveCategory(category.id);
                    }}
                  >
                    <Animated.View
                      entering={FadeIn.delay(50 * index).duration(400)}
                      className="relative"
                    >
                      <Image
                        source={{ uri: category.image?.src || 'https://images.unsplash.com/photo-1625398407937-2ee2bce3ff68' }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 40,
                        }}
                        contentFit="cover"
                        placeholder={{ blurhash }}
                        transition={300}
                        className="shadow-sm border border-gray-100"
                      />
                      {activeCategory === category.id && (
                        <View className="absolute -bottom-1 left-0 right-0 flex items-center">
                          <View className="w-2 h-2 rounded-full bg-foodapp-primary"></View>
                        </View>
                      )}
                    </Animated.View>
                    <Text className="mt-2 text-sm text-center font-medium ">
                      {category.name}
                    </Text>
                  </Pressable>
                ))}
              </>
            )}
          </ScrollView>
        </View>

        {/* Special Offers Carousel */}
        <View className="py-4 bg-white mt-2">
          <Text className="text-lg font-bold  mb-3 px-4">Special Offers</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
            contentContainerStyle={{ paddingHorizontal: 2 }}
            decelerationRate="fast"
            snapToInterval={290}
            snapToAlignment="center"
          >
            {specialOffers.map((offer, index) => (
              <Animated.View
                key={offer.id}
                entering={SlideInRight.delay(100 * index).duration(300)}
                className="mr-4 overflow-hidden"
              >
                <Pressable
                  className="rounded-xl overflow-hidden shadow-sm"
                  onPress={() => Haptics.selectionAsync()}
                >
                  <Image
                    source={offer.image}
                    style={{
                      width: 280,
                      height: 140,
                    }}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={200}
                  />
                  <LinearGradient
                    colors={offer.color}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 70,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      padding: 12,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Text className="text-white font-bold text-lg">{offer.title}</Text>
                    <Text className="text-white text-sm">{offer.description}</Text>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Services */}
        <View className="py-4 bg-white mt-2">
          <View className="flex-row justify-between items-center px-4 mb-2">
            <Text className="text-lg font-bold ">Services</Text>
            <Link href="/" asChild>
              <Pressable onPress={() => Haptics.selectionAsync()}>
                <Text className="text-sm font-medium text-foodapp-primary">View all</Text>
              </Pressable>
            </Link>
          </View>
          <Text className="text-sm text-foodapp-muted px-4 mb-3">
            Discover a variety of services tailored for your needs
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
            decelerationRate="fast"
            snapToInterval={230}
            snapToAlignment="center"
          >
            {collections.map((collection, index) => (
              <Animated.View
                key={collection.id}
                entering={FadeIn.delay(100 * index).duration(400)}
                className="mr-4"
              >
                <Pressable
                  className="rounded-xl overflow-hidden shadow-sm border-2 border-gray-300"
                  onPress={() => {
                    Haptics.selectionAsync();
                    router.push(`/search`);
                  }}
                >
                  <Image
                    source={collection.image}
                    style={{
                      width: 220,
                      height: 150,
                    }}
                    contentFit="cover"
                    placeholder={{ blurhash }}
                    transition={300}
                  />
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.7)', 'white']}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 70,
                      padding: 12,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Text className="text-black  font-black text-3xl">{collection.title}</Text>
                    <Text className="text-gray-800 text-base">{collection.description}</Text>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </View>


        {/* Top Restaurants Title */}
        <View className="bg-white mt-2 pt-4 px-4">
          <Text className="text-lg font-bold  mb-1">
            {vegOnly ? 'Top Vegetarian Restaurants' : 'Top Restaurants'}
          </Text>
          <Text className="text-sm text-foodapp-muted">
            {storesQuery.isLoading ? 'Loading restaurants...' :
              `${stores?.length || 0} restaurants around you`}
          </Text>
        </View>

        {/* Filter Row */}
        <View className="bg-white py-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
            contentContainerStyle={{ paddingHorizontal: 2 }}
          >
            <Animated.View entering={FadeIn.delay(100).duration(300)}>
              <Pressable className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-3 py-2 mr-3">
                <Icon as={Filter} size={'sm'} className="stroke-foodapp-dark mr-2" />
                <Text className="font-medium">Filters</Text>
              </Pressable>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(200).duration(300)}>
              <Pressable className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-3 py-2 mr-3">
                <Text className="font-medium">Rating 4.0+</Text>
              </Pressable>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(250).duration(300)}>
              <Pressable className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-3 py-2 mr-3">
                <Text className="font-medium ">Fast Delivery</Text>
              </Pressable>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(300).duration(300)}>
              <Pressable className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-3 py-2 mr-3">
                <Text className="font-medium ">Offers</Text>
              </Pressable>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(350).duration(300)}>
              <Pressable className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-3 py-2 mr-3">
                <Text className="font-medium ">Price</Text>
                <Icon as={ChevronDown} size={'sm'} className="stroke-foodapp-dark ml-1" />
              </Pressable>
            </Animated.View>
          </ScrollView>
        </View>

        {/* Restaurants List */}
        <View className="px-4 pt-2 pb-6 bg-white">
          {storesQuery.isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <Animated.View
                key={i}
                className="mb-6 bg-gray-100 rounded-xl p-4 animate-pulse-light"
                style={{ height: 220 }}
              />
            ))
          ) : storesQuery.isError ? (
            <Text className="py-8 text-center text-foodapp-muted">
              Could not load restaurants. Please try again.
            </Text>
          ) : stores?.length === 0 ? (
            <Text className="py-8 text-center text-foodapp-muted">
              No restaurants match your filters
            </Text>
          ) : (
            stores?.map((store, index) => (
              <Animated.View
                key={store.id}
                entering={FadeIn.delay(100 * index).duration(400)}
              >
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    router.push(`/store/${store.id}`);
                  }}
                  className="mb-6"
                >
                  <RestaurantCard
                    id={Number(store.id) ?? 0}
                    name={store.name}
                    address={store.address ?? ''}
                    rating={store.rating ?? 0}
                    imageUrl={store.banner?.url ?? ''}
                    logoUrl={store.logoUrl ?? ''}
                  // cuisine={store.cuisine ?? 'Various cuisines'}
                  // deliveryTime={store.deliveryTime ?? '30-40 min'}
                  // priceRange={store.priceRange ?? '₹200 for one'}
                  // discount={store.discount ?? '50% OFF up to ₹100'}
                  />
                </Pressable>
              </Animated.View>
            ))
          )}
        </View>
      </Animated.ScrollView>

      {/* Scroll to top button */}
      <Animated.View
        className="absolute bottom-7 left-0 right-0 flex-row justify-center"
        style={buttonStyle}
      >
        <TouchableOpacity
          onPress={scrollTop}
          className="bg-gray-900 rounded-xl p-3 shadow-lg border border-gray-800 flex-row items-center gap-1"
          activeOpacity={0.8}
        >
          <Text className='text-white font-bold'>Back to top</Text>
          <Icon as={ArrowUp} size='sm' className="stroke-white" />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}