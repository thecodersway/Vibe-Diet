import React from 'react';
import { TextInput as RNTextInput, TextInputProps, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface Props extends TextInputProps {
  label?: string;
}

export function TextInput({ label, style, ...props }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>}
      <RNTextInput
        style={[
          styles.input,
          { 
            backgroundColor: theme.backgroundElement,
            color: theme.text,
            borderColor: theme.border,
          },
          style
        ]}
        placeholderTextColor={theme.textSecondary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
  },
});
