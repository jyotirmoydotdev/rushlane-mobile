import React, { useEffect, useState } from 'react';
import { FontAwesome, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Bell, LucideHouse, LucideReceiptText, LucideUserRound, Navigation, Search, ShoppingCart } from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import * as Location from 'expo-location';

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
      }
      }}>
      <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        headerShadowVisible: false, // Hides the shadow/bottom line
        headerTitle: () => null,
        tabBarIcon: ({ color }) => <LucideHouse className='psx-4 psb-8 border-no' size={28} style={{ marginBottom: -3 }} color={color} />,
        headerStyle: {
          backgroundColor: '#f77057',
        },
        headerLeft: () => (
            <HStack className='gap-4 items-center pl-4 pt-4'>
              <Avatar size='md'>
                <AvatarFallbackText>Rushlane</AvatarFallbackText>
                <AvatarImage
                  source={require("@/assets/images/icon.png")}
                />
                {/* <AvatarBadge /> */}
              </Avatar>
              <VStack className='gap-2 justify-start'>
                {/* <Text className=' font-bold pl-4 text-white'>Delivery To</Text> */}
                <Link href={'/location'} asChild>
                  <Pressable>
                    <View className='rounded-full flex-2 flex-row items-center justify-center gap-2 px-4 py-2 bg-white/20'>
                      <Icon as={Navigation} className='fill-white stroke-white' />
                      <Text className='text-white text-base'>
                        {location ? `${location?.coords.latitude.toFixed(2)}, ${location?.coords.longitude.toFixed(2)}` : "Loading..."}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              </VStack>
            </HStack>
          ),
          headerRight: () => (
            <HStack className='gap-4 pr-4 pt-4'>
            <Link href={"/notifications"} asChild>
              <Pressable>
                <Box className='bg-white/20 w-12 h-12 flex items-center justify-center rounded-full aspect-square'>
                  <Icon as={Bell} className='stroke-white' />
                </Box>
              </Pressable>
            </Link>
            <Link href={"/cart"} asChild>
              <Pressable>
                <Box className='bg-white/20 w-12 h-12 flex items-center justify-center rounded-full aspect-square'>
                  <Icon as={ShoppingCart} className='stroke-white' />
                </Box>
              </Pressable>
            </Link>
          </HStack>
          )
        }}
      />
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
