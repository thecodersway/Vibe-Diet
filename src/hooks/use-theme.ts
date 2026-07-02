import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: typeof Colors.light;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to system theme so it follows phone theme by default
  const [theme, setTheme] = useState<ThemeType>('system');

  const systemScheme = useColorScheme();
  
  // Resolve theme to either 'light' or 'dark'
  const resolvedTheme = theme === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : theme;

  const colors = Colors[resolvedTheme];

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, setTheme, colors } },
    children
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if provider is not used yet (e.g. splash screen or setup phase)
    return Colors.light;
  }
  return context.colors;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within an AppThemeProvider');
  }
  return context;
}
