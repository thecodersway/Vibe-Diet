/**
 * MetricCard Component
 * Displays a single key-value fitness or body statistic, such as current weight,
 * target weight, and activity level.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';

interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      <Text style={[styles.labelText, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.valueText, { color: theme.text }]}>{value}</Text>
    </View>
  );
}
