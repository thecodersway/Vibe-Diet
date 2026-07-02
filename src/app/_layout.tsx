import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

import { AppThemeProvider } from '@/hooks/use-theme';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <LayoutContent />
    </AppThemeProvider>
  );
}

function LayoutContent() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="onboarding">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
      <AnimatedSplashOverlay />
    </ThemeProvider>
  );
}

