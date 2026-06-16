/**
 * HeaderSection Component
 * Displays the daily vibe badge, dynamic welcome headline, and a floating profile
 * shortcut containing a neon user silhouette SVG icon.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ProfileNeonIcon } from '@/asset';

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
          <ProfileNeonIcon color="#C2FF1A" size={22} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
