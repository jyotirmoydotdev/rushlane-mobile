import React, { useEffect, useState } from 'react';
import { FontAwesome, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Button, Pressable, SafeAreaView, View } from 'react-native';

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
import * as Haptics from 'expo-haptics';
import { useVegStatus } from '@/lib/state/filterState';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setVegStatus = useVegStatus((state: any) => state.setVegStatus);
  const getVegStatus:boolean = useVegStatus((state: any) => state.isVeg);

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
          backgroundColor: '#ffffff',
          borderColor: '#f77057',
          borderStyle: 'dashed',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerSearchBarOptions: {
          placeholder: 'Search',
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShadowVisible: false,
          headerTitle: () => null,
          headerTitleStyle:{
            fontSize: 5
          },
          tabBarIcon: ({ color }) => <LucideHouse size={18} style={{ marginBottom: -3 }} color={color} />,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerBackgroundContainerStyle: {
            height: 160,
          },
        }}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync();
          },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) =>  <LucideReceiptText style={{ marginBottom: -3 }} size={18} color={color} />,
        }}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync();
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <LucideUserRound style={{ marginBottom: -3 }} size={18} color={color} />,
        }}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync();
          },
        }}
      />
    </Tabs>
  );
}
