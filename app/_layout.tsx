import FontAwesome from '@expo/vector-icons/FontAwesome';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/components/useColorScheme';

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

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{
              headerShown: false,
            }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="search" options={{
              headerBackTitle: "Back"
            }} />
            <Stack.Screen name="location" options={{
              headerTitle: "Location",
              headerBackTitle: "Back"
            }} />
            <Stack.Screen name="notifications" options={{
              headerTitle: "Notifications",
              headerBackTitle: "Back"
            }} />
            <Stack.Screen name="cart" options={{
              headerTitle: "Cart",
              headerBackTitle: "Back"
            }} />
            <Stack.Screen name="store" options={{
              headerTitle: "Store",
              headerBackTitle: "Back"
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