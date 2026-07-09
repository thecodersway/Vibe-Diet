import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';

interface StatsRowProps {
  waterCurrent: number;
  waterTarget: number;
  burnedKcal: number;
  onAddWaterPress?: () => void;
}

export function StatsRow({
  waterCurrent,
  waterTarget,
  burnedKcal,
  onAddWaterPress,
}: StatsRowProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onAddWaterPress}
        style={[styles.statCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border, position: 'relative' }]}
      >
        <View style={[styles.iconWrapper, styles.waterIconWrapper, { width: 52, flexDirection: 'row', paddingHorizontal: 2, justifyContent: 'space-evenly' }]}>
          <Text style={{ fontSize: 11 }}>💧</Text>
          <Text style={{ fontSize: 11 }}>☕</Text>
          <Text style={{ fontSize: 11 }}>🥤</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Drinks</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {waterCurrent} / {waterTarget} L
          </Text>
        </View>
        <View style={[styles.plusIndicator, { backgroundColor: theme.border }]}>
          <Text style={{ color: '#22D3EE', fontSize: 11, fontWeight: '900', lineHeight: 12 }}>+</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.statCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={[styles.iconWrapper, styles.burnedIconWrapper]}>
          <Text style={styles.iconEmoji}>🔥</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Burned</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {burnedKcal} kcal
          </Text>
        </View>
      </View>
    </View>
  );
}
