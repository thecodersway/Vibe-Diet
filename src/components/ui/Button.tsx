import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export function Button({ label, variant = 'primary', isLoading, style, disabled, ...props }: ButtonProps) {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (disabled && variant === 'primary') return theme.backgroundElement;
    if (variant === 'primary') return theme.primary;
    if (variant === 'secondary') return theme.backgroundElement;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled && variant === 'primary') return theme.textSecondary;
    if (variant === 'outline') return theme.text;
    if (variant === 'secondary') return theme.text;
    return theme.textInverse || '#FFFFFF';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && { borderWidth: 1, borderColor: theme.border },
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
});
