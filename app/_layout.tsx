import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/components/useColorScheme';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...Ionicons.font,
  });

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

  return <RootLayoutNav />;
}

import FloatingChatbot from '@/components/FloatingChatbot';
import GlobalHeader from '@/components/GlobalHeader';

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalHeader />
      <View style={{ flex: 1, paddingTop: 60 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="itinerary" options={{ headerShown: false }} />
          <Stack.Screen name="itinerary-result" options={{ headerShown: false }} />
          <Stack.Screen name="todo" options={{ headerShown: false }} />
          <Stack.Screen name="emergency" options={{ headerShown: false }} />
          <Stack.Screen name="post-generator" options={{ headerShown: false }} />
          <Stack.Screen name="currency" options={{ headerShown: false }} />
          <Stack.Screen name="souvenir-album" options={{ headerShown: false }} />
          <Stack.Screen name="booking-items" options={{ headerShown: false }} />
          <Stack.Screen name="booking-details" options={{ headerShown: false }} />
          <Stack.Screen name="eco-details" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="product-details" options={{ title: 'Product Details', headerShown: false }} />
          <Stack.Screen name="payment" options={{ title: 'Checkout', headerShown: false, presentation: 'modal' }} />
        </Stack>
      </View>
      <FloatingChatbot />
    </ThemeProvider>
  );
}
