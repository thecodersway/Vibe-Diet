import { DarkTheme, DefaultTheme, ThemeProvider, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { BottomTabBar } from '@/navigation/BottomTabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Tabs
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="log" options={{ title: 'Log' }} />
        <Tabs.Screen name="camera" options={{ title: 'Camera' }} />
        <Tabs.Screen name="aura" options={{ title: 'Aura' }} />
        <Tabs.Screen name="me" options={{ title: 'Me' }} />
      </Tabs>
    </ThemeProvider>
  );
}
