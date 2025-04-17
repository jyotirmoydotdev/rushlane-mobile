import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, Pressable, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { type StateCreator } from 'zustand'
import {
  ArrowRight, ArrowUp, ChevronDown, ChevronRight, Filter, Home, IndianRupee, LocateIcon, MapPin, Navigation, Percent, Pin, Search, SplineIcon, Star, Timer, User,
  Utensils
} from 'lucide-react-native';
import { ScrollView } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset, withTiming, FadeIn, SlideInRight, withSpring, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useFetchStoresQuery } from '@/lib/query/useFetchStoresQuery';
import { useFetchCategoriesQuery } from '@/lib/query/useFetchCategoriesQuery';
import { blurhash } from '@/constants/blurHash';
import { PlaceholdersAndVanishInput } from '@/components/PlaceHolderAndVanish';
import he from 'he'
import { useLocationState } from '@/lib/state/locationState';
import { useFetchProductsQuery } from '@/lib/query/useFetchProductsQuery';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserLocation } from '@/lib/hooks/useUserLocation';
import RestaurantCard from '@/components/restaurantCard';


export default function Index() {
  // const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef);
  const router = useRouter();

  const categoriesQuery = useFetchCategoriesQuery();
  const storesQuery = useFetchStoresQuery();

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(scrollHandler.value > 300 ? 1 : 0),
      transform: [{ scale: withTiming(scrollHandler.value > 300 ? 1 : 0.8) }],
    }
  });

  const BANNER_HEIGHT = 190;
  const HEADER_STICKY_THRESHOLD = 50;

  const headerContainerStyle = useAnimatedStyle(() => {
    const isSticky = scrollHandler.value > HEADER_STICKY_THRESHOLD;
    return {
      backgroundColor: 'white',
      // shadowColor: isSticky ? '#000' : 'transparent',
      // shadowOpacity: withTiming(isSticky ? 0.1 : 0, { duration: 200 }),
      // shadowRadius: withTiming(isSticky ? 3 : 0, { duration: 200 }),
      // shadowOffset: {
      //   width: 0,
      //   height: withTiming(isSticky ? 2 : 0, { duration: 200 }),
      // },
      // elevation: withTiming(isSticky ? 4 : 0, { duration: 200 }),
      // borderBottomWidth: withTiming(isSticky ? 1 : 0, { duration: 200 }),
      // borderBottomColor: 'rgba(0,0,0,0.05)',
    };
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
      opacity: withTiming(scrollHandler.value > 50 ? 0 : 1, { duration: 300 }),
    };
  });

  const setLocationState = useLocationState((state: any) => state.setLocation);

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
  const specialOffers = [
    {
      "id": 28279,
      "code": "river15",
      "amount": "15.00",
      "status": "publish",
      "date_created": "2025-03-15T13:47:51",
      "date_created_gmt": "2025-03-15T08:17:51",
      "date_modified": "2025-04-05T13:18:40",
      "date_modified_gmt": "2025-04-05T07:48:40",
      "discount_type": "percent",
      "description": "Get 15% OFF On all items excluding Pizzas.",
      "date_expires": "2025-04-06T00:00:00",
      "date_expires_gmt": "2025-04-05T18:30:00",
      "usage_count": 0,
      "individual_use": false,
      "product_ids": [],
      "excluded_product_ids": [],
      "usage_limit": null,
      "usage_limit_per_user": null,
      "limit_usage_to_x_items": null,
      "free_shipping": false,
      "product_categories": [
        169
      ],
      "excluded_product_categories": [
        124
      ],
      "exclude_sale_items": false,
      "minimum_amount": "0.00",
      "maximum_amount": "0.00",
      "email_restrictions": [],
      "used_by": [],
      "meta_data": [
        {
          "id": 844776,
          "key": "_wcfm_coupon_author",
          "value": "1"
        },
        {
          "id": 844789,
          "key": "show_on_store",
          "value": "yes"
        },
        {
          "id": 844790,
          "key": "sc_is_visible_storewide",
          "value": "yes"
        },
        {
          "id": 849535,
          "key": "os_meta",
          "value": []
        }
      ],
      "_links": {
        "self": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons/28279",
            "targetHints": {
              "allow": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"
              ]
            }
          }
        ],
        "collection": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons"
          }
        ]
      }
    },
    {
      "id": 27542,
      "code": "blue10",
      "amount": "10.00",
      "status": "publish",
      "date_created": "2025-03-06T17:24:14",
      "date_created_gmt": "2025-03-06T11:54:14",
      "date_modified": "2025-03-06T17:55:30",
      "date_modified_gmt": "2025-03-06T12:25:30",
      "discount_type": "percent",
      "description": "Get a flat 10% off on orders above ₹1000 only on Blue Van.",
      "date_expires": "2025-12-31T00:00:00",
      "date_expires_gmt": "2025-12-30T18:30:00",
      "usage_count": 0,
      "individual_use": false,
      "product_ids": [],
      "excluded_product_ids": [],
      "usage_limit": null,
      "usage_limit_per_user": 2,
      "limit_usage_to_x_items": null,
      "free_shipping": false,
      "product_categories": [
        489
      ],
      "excluded_product_categories": [],
      "exclude_sale_items": false,
      "minimum_amount": "1000.00",
      "maximum_amount": "0.00",
      "email_restrictions": [],
      "used_by": [],
      "meta_data": [
        {
          "id": 814298,
          "key": "_wcfm_coupon_author",
          "value": "1"
        },
        {
          "id": 814310,
          "key": "show_on_store",
          "value": "yes"
        },
        {
          "id": 814311,
          "key": "sc_is_visible_storewide",
          "value": "yes"
        }
      ],
      "_links": {
        "self": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons/27542",
            "targetHints": {
              "allow": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"
              ]
            }
          }
        ],
        "collection": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons"
          }
        ]
      }
    },
    {
      "id": 27530,
      "code": "garden10",
      "amount": "10.00",
      "status": "publish",
      "date_created": "2025-03-06T16:56:53",
      "date_created_gmt": "2025-03-06T11:26:53",
      "date_modified": "2025-03-29T11:25:40",
      "date_modified_gmt": "2025-03-29T05:55:40",
      "discount_type": "fixed_cart",
      "description": "Get Flat ₹10 OFF On Every Order only on The Garden Eatery.",
      "date_expires": "2025-03-31T00:00:00",
      "date_expires_gmt": "2025-03-30T18:30:00",
      "usage_count": 2,
      "individual_use": false,
      "product_ids": [
        20516,
        20515
      ],
      "excluded_product_ids": [],
      "usage_limit": null,
      "usage_limit_per_user": null,
      "limit_usage_to_x_items": null,
      "free_shipping": false,
      "product_categories": [
        547
      ],
      "excluded_product_categories": [],
      "exclude_sale_items": false,
      "minimum_amount": "0.00",
      "maximum_amount": "0.00",
      "email_restrictions": [],
      "used_by": [
        "nisanchiarengh65@gmail.com",
        "nisanchiarengh65@gmail.com"
      ],
      "meta_data": [
        {
          "id": 814270,
          "key": "_wcfm_coupon_author",
          "value": "1"
        },
        {
          "id": 814281,
          "key": "show_on_store",
          "value": "yes"
        },
        {
          "id": 814282,
          "key": "sc_is_visible_storewide",
          "value": "yes"
        },
        {
          "id": 863497,
          "key": "os_meta",
          "value": []
        }
      ],
      "_links": {
        "self": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons/27530",
            "targetHints": {
              "allow": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"
              ]
            }
          }
        ],
        "collection": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons"
          }
        ]
      }
    },
    {
      "id": 18935,
      "code": "tabol10",
      "amount": "10.00",
      "status": "publish",
      "date_created": "2024-10-11T16:00:50",
      "date_created_gmt": "2024-10-11T10:30:50",
      "date_modified": "2025-03-29T11:27:29",
      "date_modified_gmt": "2025-03-29T05:57:29",
      "discount_type": "fixed_cart",
      "description": "Get Flat ₹10 OFF On Every Order.",
      "date_expires": "2025-03-31T00:00:00",
      "date_expires_gmt": "2025-03-30T18:30:00",
      "usage_count": 34,
      "individual_use": false,
      "product_ids": [
        7453
      ],
      "excluded_product_ids": [],
      "usage_limit": null,
      "usage_limit_per_user": null,
      "limit_usage_to_x_items": null,
      "free_shipping": false,
      "product_categories": [
        196
      ],
      "excluded_product_categories": [],
      "exclude_sale_items": false,
      "minimum_amount": "0.00",
      "maximum_amount": "0.00",
      "email_restrictions": [],
      "used_by": [
        "678",
        "allanamarak145@gmail.com",
        "arenghasherah@gmail.com",
        "678",
        "85",
        "ripamchi18@gmail.com",
        "archiramarak123@gmail.com",
        "jasinsangma8@gmail.com",
        "agaamar@gmail.com",
        "791",
        "678",
        "678",
        "514",
        "archiramarak123@gmail.com",
        "officialmlbbdiasmart@gmail.com",
        "630",
        "737",
        "678",
        "293",
        "agaamar@gmail.com",
        "archiramarak123@gmail.com",
        "678",
        "822",
        "chinnusangma42@gmail.com",
        "678",
        "834",
        "chissanomrong@gmail.com",
        "priya.pongener@gmail.com",
        "849",
        "740",
        "742",
        "849",
        "cheangchimarak293@gmail.com",
        "bennethmarpna855@gmail.com"
      ],
      "meta_data": [
        {
          "id": 608131,
          "key": "wpccl_public",
          "value": ""
        },
        {
          "id": 814268,
          "key": "show_on_store",
          "value": "yes"
        },
        {
          "id": 814269,
          "key": "sc_is_visible_storewide",
          "value": "yes"
        },
        {
          "id": 864199,
          "key": "os_meta",
          "value": []
        }
      ],
      "_links": {
        "self": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons/18935",
            "targetHints": {
              "allow": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"
              ]
            }
          }
        ],
        "collection": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/coupons"
          }
        ]
      }
    }
  ]

  const services = [
    {
      id: 1,
      title: 'RushMart',
      image: require('@/assets/images/rushmart.jpg'),
      description: 'Instant grocery delivery service',
    },
    {
      id: 2,
      title: 'Logistics',
      image: require('@/assets/images/logistics.jpg'),
      description: 'Pickup and drop service',
    },
  ];

  const { location, isLoading, locationName, error } = useUserLocation()
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <>
      <Tabs.Screen
        options={{
          header: () => (
            <View className="bg-white" style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
              <Animated.View className=" px-4 pt-2 pb-2" style={headerContainerStyle}>
                {/* Location Bar */}
                <Animated.View style={locationAnimatedStyle}>
                  <Link href="/locationmap" asChild>
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
                            {isLoading ? 'Loading...' : locationName}
                          </Text>
                        )}
                        <View className='flex-row gap-1 items-center'>
                          <Text className="text-sm font-semibold ">
                            {errorMsg
                              ? "Set delivery location"
                              : location ? "Current Location" : "Detecting location..."}
                          </Text>
                          <Icon size='sm' as={ChevronRight} className='stroke-gray-500' />
                        </View>
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
            </View>
          ),
          headerShadowVisible: false,
        }}
      />

      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[6]}
        className="bg-white"
        refreshControl={
          <RefreshControl
          
            refreshing={refreshing}
            colors={['grey']}
            progressBackgroundColor={'black'}
          />
        }
      >
        <Animated.View className='px-4 bg-white rounded-lg' >
          <Image
            source={require('@/assets/images/food.gif')}
            style={[{
              width: '100%',
              height: 200,
              borderRadius: 12,
            }]}
            contentFit="cover"
            contentPosition={'center'}
            placeholder={{ blurhash }}
            transition={200}
            renderToHardwareTextureAndroid={true}
          />
        </Animated.View>

        {/* Food Categories */}
        <View className="pt-4 bg-white mt-2">
          <Text className="text-lg font-bold  mb-3 px-4">What's on your mind?</Text>
        </View>

        {/* Food Categories List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-2 pb-2 bg-white"
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
              <TouchableOpacity onPress={() => router.push('/categories')} className='items-center mr-4'>
                <View className='w-20 h-20 flex-row justify-center items-center rounded-full bg-[#EAEAEA] mb-3'>
                  <Icon as={Utensils} />
                </View>
                <Text className='mt-2 w-20 line-clamp-1 text-xs text-[#333] text-center'>View All</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        {/* 
        <View className="pt-4 bg-white mt-2">
          <Text className="text-lg font-bold  mb-3 px-4">Trending food</Text>
        </View> */}

        {/* Trending Food List */}
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-2 pb-2 bg-white"
          decelerationRate="fast"
        >
          {fetchProducts.isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <View key={i} className="mr-5 items-center">
                <View
                  className="w-[80px] h-[80px] rounded-full bg-gray-200 animate-pulse-light"
                />
                <View className="mt-2 w-20 h-3 bg-gray-200 rounded animate-pulse-light"></View>
              </View>
            ))
          ) : fetchProducts.isError ? (
            <Text className="px-4">Something went wrong...</Text>
          ) : (
            <>
              {fetchProducts.data?.map((product: any, index: number) => (
                <Pressable
                  key={product.id}
                  className={`mr-5 items-center`}
                  onPress={() => {
                    Haptics.selectionAsync();
                    router.push(`/`);
                  }}
                >
                  <Animated.View
                    entering={FadeIn.delay(50 * index).duration(400)}
                    className="relative"
                  >
                    <Image
                      source={{ uri: product.images[0]?.src || 'https://images.unsplash.com/photo-1625398407937-2ee2bce3ff68' }}
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
                  </Animated.View>
                  <Text className="mt-2 text-sm text-center font-medium ">
                    {product.name}
                  </Text>
                </Pressable>
              ))}
            </>
          )}
        </ScrollView> */}

        {/* Special Offers Carousel */}
        <View className="py-4 bg-white mt-2">
          <Text className="text-lg font-bold mb-3 px-4">Special Offers</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
            decelerationRate="fast"
          >
            {specialOffers.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={SlideInRight.delay(100 * index).duration(300)}
                className="mr-4"
              >
                <Pressable
                  className="rounded-xl overflow-hidden shadow-sm"
                  onPress={() => Haptics.selectionAsync()}
                >
                  <View
                    className='bg-white border border-dashed border-gray-500'
                    style={{
                      height: 'auto',
                      width: 150,
                      borderRadius: 12,
                      padding: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View className='p-4 rounded-full bg-gray-100 mb-2'>
                      {
                        item.discount_type === 'percent' ? (
                          <Icon as={Percent} />
                        ) : (
                          <Icon as={IndianRupee} />
                        )
                      }
                    </View>
                    <Text className=" font-semibold text-base text-center line-clamp-2">
                      {item.description}
                    </Text>
                    <View className='p-2 rounded-lg border border-dotted border-gray-500 w-full bg-gray-100 mt-2'>
                      <Text className="text-sm font-bold text-center mt-1">
                        {item.code}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
            <TouchableOpacity className='flex-1 items-center justify-center w-[120px] border border-dashed border-gray-500 rounded-xl mr-6'>
              <Icon as={ArrowRight} />
              <Text>View all</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Services */}
        <View className="py-4 bg-white mt-2">
          <View className="flex-row justify-between items-center px-4 mb-2">
            <Text className="text-lg font-bold ">Services</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
            decelerationRate="fast"
            snapToInterval={230}
            snapToAlignment="center"
          >
            {services.map((service, index) => (
              <Animated.View
                key={service.id}
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
                    source={service.image}
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
                    <Text className="text-black  font-black text-3xl">{service.title}</Text>
                    <Text className="text-gray-800 text-base line-clamp-1">{service.description}</Text>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </View>


        {/* Top Restaurants Title */}
        <View className="bg-white mt-2 pt-4 pb-2 px-4">
          <Text className="text-lg font-bold  mb-1">
            {vegOnly ? 'Top Vegetarian Restaurants' : 'Top Restaurants'}
          </Text>
          <Text className="text-sm text-foodapp-muted">
            {storesQuery.isLoading ? 'Loading restaurants...' :
              `${stores?.length || 0} restaurants around you`}
          </Text>
        </View>

        {/* Filter Row */}
        <View className="bg-white pt-2 pb-2">
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
        <View className="px-4 pt-4 pb-6 bg-white">
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
              <Link asChild key={index} href={`/store/${store.id}`} push>
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
              </Link>
            ))
          )}
        </View>
      </Animated.ScrollView>

      {/* Scroll to top button */}
      <Animated.View
        className="absolute bottom-3 left-0 right-0 flex-row justify-center"
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