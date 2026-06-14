/**
 * HeaderSection Component
 * Displays the daily vibe badge, dynamic welcome headline, and a floating profile
 * shortcut containing a neon user silhouette SVG icon.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { styles } from './styles';

interface HeaderSectionProps {
  vibeName: string;
}

export function HeaderSection({ vibeName }: HeaderSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.vibeBadge}>
          <Text style={styles.vibeBadgeText}>{"✨ TODAY'S VIBE"}</Text>
        </View>
        <Text style={styles.titleText}>{vibeName} ✨</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.crownButton}>
        <View style={styles.crownInner}>
          <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <Circle
              cx="12"
              cy="8"
              r="4"
              stroke="#C2FF1A"
              strokeWidth="2.5"
            />
            <Path
              d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
              stroke="#C2FF1A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    </View>
  );
}
