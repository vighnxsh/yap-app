import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const [loaded, error] = useFonts({
    'LuckiestGuy-Regular': {
      uri: 'https://fonts.gstatic.com/s/luckiestguy/v25/_gP_1RrxsjcxVyin9l9n_j2RSg.ttf',
    },
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  // Customize standard navigation themes to match brand colors
  const customNavigationTheme = {
    ...(theme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: Colors[theme].primary,
      background: Colors[theme].background,
      card: Colors[theme].card,
      text: Colors[theme].text,
      border: Colors[theme].border,
    },
  };

  return (
    <ThemeProvider value={customNavigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Feedback Summary',
            headerStyle: {
              backgroundColor: Colors[theme].card,
            },
            headerTintColor: Colors[theme].text,
            headerShadowVisible: false,
          }} 
        />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

