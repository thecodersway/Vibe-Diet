/**
 * MetricCard Component
 * Displays a single key-value fitness or body statistic, such as current weight,
 * target weight, and activity level.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
}
