import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/components/useColorScheme';
import { useSegments } from 'expo-router';
import FloatingChatbot from '@/components/FloatingChatbot';
import GlobalHeader from '@/components/GlobalHeader';
import { Platform } from 'react-native';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const iconFont = require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf');
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(`
    @font-face {
      font-family: 'Ionicons';
      src: url(${typeof iconFont === 'string' ? iconFont : (iconFont.default || iconFont)}) format('truetype');
    }
    @font-face {
      font-family: 'ionicons';
      src: url(${typeof iconFont === 'string' ? iconFont : (iconFont.default || iconFont)}) format('truetype');
    }
  `));
  document.head.appendChild(style);
}

export {
  ErrorBoundary,
} from 'expo-router';

// Initial route logic will be handled by root index

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


function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const isAuthPage = segments && segments.length > 0 && segments[0] === 'auth';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {!isAuthPage && <GlobalHeader />}
      <View style={{ flex: 1, marginTop: isAuthPage ? 0 : 60 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="itinerary" options={{ headerShown: false }} />
          <Stack.Screen name="itinerary-result" options={{ headerShown: false }} />
          <Stack.Screen name="todo" options={{ headerShown: false }} />
          <Stack.Screen name="emergency" options={{ headerShown: false }} />
          <Stack.Screen name="post-generator" options={{ headerShown: false }} />
          <Stack.Screen name="currency" options={{ headerShown: false }} />
          <Stack.Screen name="souvenir-album" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="booking-items" options={{ headerShown: false }} />
          <Stack.Screen name="booking-details" options={{ headerShown: false }} />
          <Stack.Screen name="eco-details" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="product-details" options={{ title: 'Product Details', headerShown: false }} />
          <Stack.Screen name="payment" options={{ title: 'Checkout', headerShown: false, presentation: 'modal' }} />
        </Stack>
      </View>
      {!isAuthPage && <FloatingChatbot />}
    </ThemeProvider>
  );
}
