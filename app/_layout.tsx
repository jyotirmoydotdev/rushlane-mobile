import FontAwesome from '@expo/vector-icons/FontAwesome';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/components/useColorScheme';
import { Icon } from '@/components/ui/icon';
import { Pressable, Text } from 'react-native';
import { Box } from '@/components/ui/box';
import { ShoppingCart } from 'lucide-react-native';
import { useCart } from '@/lib/state/cartState';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const cartLength = useCart((state:any) => state.items.length);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{
              headerShown: false,
            }} />
            <Stack.Screen name="categories" options={{ 
              presentation: 'modal',
              headerTitle: "Categories",
              sheetElevation: 0,
            }} />
            <Stack.Screen name="search" options={{
              headerShown: true,
            }} />
            <Stack.Screen name="locationmap" options={{
              headerTitle: "Select Location",
              headerBackTitle: "Back"
            }} />
            <Stack.Screen name="notifications" options={{
              headerTitle: "Notifications",
              headerBackTitle: "Back"
            }} />
            <Stack.Screen name="cart" options={{
              headerTitle: "Cart",
              headerBackTitle: "Back",
            }} />
            <Stack.Screen name="store" options={{
              headerTitle: '',
              headerBackTitle: "Back",
              headerRight: () => (
                <Link href={"/cart"} asChild>
                    <Pressable>
                      <Box className='bg-black/0 w-12 h-12 flex-row items-center justify-center rounded-full aspect-square'>
                        <Icon as={ShoppingCart} className='stroke-black' />
                        <Text>{cartLength}</Text>
                      </Box>
                    </Pressable>
                  </Link>
              ),
            }} />
          </Stack>
        </ThemeProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <GluestackUIProvider mode="light"><RootLayoutNav /></GluestackUIProvider>;
}