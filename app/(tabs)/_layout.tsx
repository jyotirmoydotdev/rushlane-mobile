import React, { useEffect, useState } from 'react';
import { FontAwesome, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, SafeAreaView, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Bell, LucideHouse, LucideReceiptText, LucideUserRound, Navigation, NavigationOff, Search, ShoppingCart } from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import { PlaceholdersAndVanishInput } from '@/components/PlaceHolderAndVanish';
import { Switch } from '@/components/ui/switch';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: '#f77057',
          borderColor: '#f77057',
          borderStyle: 'dashed',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShadowVisible: false,
          headerTitle: () => null,
          tabBarIcon: ({ color }) => <LucideHouse size={28} style={{ marginBottom: -3 }} color={color} />,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          header: ({ navigation, route, options, }) => (
            <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
              {/* Top portion with existing header content */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* Left side */}
                <HStack className='gap-4 items-center pl-4 pt-4'>
                  <Avatar size='md'>
                    <AvatarFallbackText>Rushlane</AvatarFallbackText>
                    <AvatarImage
                      source={require("@/assets/images/icon.png")}
                    />
                  </Avatar>
                  <Link href={'/location'} asChild>
                    <Pressable>
                      <View className='rounded-lg flex-row items-center gap-2 py-2 px-3 bg-gray-100'>
                        <Icon as={errorMsg ? NavigationOff : Navigation} className='fill-orange-500 stroke-orange-500 h-4 w-4' />
                        <Text className='text-black text-lg font-bold text-center'>
                          {errorMsg ? "Allow Location" : location ? `${location?.coords.latitude.toFixed(2)}, ${location?.coords.longitude.toFixed(2)}` : "Loading..."}
                        </Text>
                      </View>
                    </Pressable>
                  </Link>
                </HStack>

                {/* Right side */}
                <HStack className='gap-0 pr-4 pt-4'>
                  <Link href={"/notifications"} asChild>
                    <Pressable>
                      <Box className='bg-black/0 w-12 h-12 flex items-center justify-center rounded-full aspect-square'>
                        <Icon as={Bell} className='stroke-black' />
                      </Box>
                    </Pressable>
                  </Link>
                  <Link href={"/cart"} asChild>
                    <Pressable>
                      <Box className='bg-black/0 w-12 h-12 flex items-center justify-center rounded-full aspect-square'>
                        <Icon as={ShoppingCart} className='stroke-black' />
                      </Box>
                    </Pressable>
                  </Link>
                </HStack>
              </View>

              {/* Search bar at bottom */}
              <View className='flex-row justify-center'>
                <Link href={"/search"} className='flex-1 bg-white mb-2 pt-6 pl-2' asChild>
                  <Pressable>
                    <PlaceholdersAndVanishInput
                      placeholders={["Pizza", "Burger", "Ice Cream", "Sushi", "Pasta", "Tacos", "Steak", "Salad", "Sandwich", "Fried Chicken", "Noodles", "Dumplings", "Curry", "BBQ", "Seafood", "Ramen", "Donuts", "Waffles", "Pancakes", "Smoothies"]}
                      onChange={() => console.log("Input changed:", text)}
                      onSubmit={() => console.log("Input submitted:", text)}
                    />
                  </Pressable>
                </Link>
                <View className='flex-col items-center justify-center rounded-lg gap-0.5 pt-4 pr-4 '>
                  <Text className='text-black italic text-lg font-bold'>VEG</Text>
                   <Switch
                   size='sm'
                   thumbColor={'#f77057'}
                   ios_backgroundColor={'#f7f7f7'}
                   />
                </View>
              </View>
            </SafeAreaView>
          ),
          headerBackgroundContainerStyle: {
            height: 160,
          },
        }}
      />D
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <LucideReceiptText style={{ marginBottom: -3 }} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <LucideUserRound style={{ marginBottom: -3 }} size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
