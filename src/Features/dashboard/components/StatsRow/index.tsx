/**
 * StatsRow Component
 * Renders side-by-side metric status panels displaying water consumption levels
 * and burned energy metrics with color-coded theme tags.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface StatsRowProps {
  waterCurrent: number;
  waterTarget: number;
  burnedKcal: number;
}

export function StatsRow({
  waterCurrent,
  waterTarget,
  burnedKcal,
}: StatsRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <View style={[styles.iconWrapper, styles.waterIconWrapper]}>
          <Text style={styles.iconEmoji}>💧</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Water</Text>
          <Text style={styles.value}>
            {waterCurrent} / {waterTarget} L
          </Text>
        </View>
      </View>

      <View style={styles.statCard}>
        <View style={[styles.iconWrapper, styles.burnedIconWrapper]}>
          <Text style={styles.iconEmoji}>🔥</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Burned</Text>
          <Text style={styles.value}>
            {burnedKcal} kcal
          </Text>
        </View>
      </View>
    </View>
  );
}
