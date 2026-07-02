/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#16181C',
    background: '#F8F9FA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F1F3F5',
    textSecondary: '#60646C',
    primary: '#16181C',
    primaryMuted: 'rgba(22, 24, 28, 0.05)',
    border: '#E9ECEF',
    accent: '#74B816',
    accentBg: '#F4FCE3',
    accentBorder: '#D8F5A2',
    accentSolid: '#74B816',
    cardBg: '#FFFFFF',
    tabBarBg: '#FFFFFF',
    tabBarBorder: '#E9ECEF',
    activeTab: '#16181C',
    inactiveTab: '#8E939E',
    cameraBorder: '#F8F9FA',
    textInverse: '#FFFFFF',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0D0F12',
    backgroundElement: '#16181C',
    backgroundSelected: '#24272D',
    textSecondary: '#8E939E',
    primary: '#C2FF1A',
    primaryMuted: 'rgba(194, 255, 26, 0.08)',
    border: '#24272D',
    accent: '#C2FF1A',
    accentBg: 'rgba(194, 255, 26, 0.08)',
    accentBorder: 'rgba(194, 255, 26, 0.25)',
    accentSolid: '#C2FF1A',
    cardBg: '#16181C',
    tabBarBg: '#16181C',
    tabBarBorder: '#24272D',
    activeTab: '#C2FF1A',
    inactiveTab: '#8E939E',
    cameraBorder: '#0D0F12',
    textInverse: '#16181C',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
