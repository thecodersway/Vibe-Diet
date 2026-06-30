/**
 * ProfileHeader Component
 * Renders the top summary banner of the user profile, containing a circular avatar
 * wrapper with a custom profile SVG and the user's name/goal tags.
 */

import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';

interface ProfileHeaderProps {
  name: string;
  goal: string;
  avatarColor: string;
}

export function ProfileHeader({ name, goal, avatarColor }: ProfileHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrapper, { borderColor: avatarColor, backgroundColor: theme.backgroundElement }]}>
        <View style={styles.avatarInner}>
          <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <Circle
              cx="12"
              cy="8"
              r="4.5"
              stroke={avatarColor}
              strokeWidth="2"
            />
            <Path
              d="M4.5 20C4.5 16.134 7.63401 13 11.5 13H12.5C16.366 13 19.5 16.134 19.5 20"
              stroke={avatarColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.nameText, { color: theme.primary }]}>{name}</Text>
        <View style={styles.goalBadge}>
          <View style={styles.goalDot} />
          <Text style={styles.goalText}>Goal: {goal}</Text>
        </View>
      </View>
    </View>
  );
}
