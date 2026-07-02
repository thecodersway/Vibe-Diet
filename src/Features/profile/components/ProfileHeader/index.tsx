/**
 * ProfileHeader Component
 * Renders the top summary banner of the user profile, containing a circular avatar
 * wrapper with a custom profile SVG and the user's name/goal tags.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { AvatarIcon } from '@/asset';
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
        <View style={[styles.avatarInner, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <AvatarIcon color={avatarColor} size={36} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.nameText, { color: theme.text }]}>{name}</Text>
        <View style={[styles.goalBadge, { backgroundColor: theme.accentBg, borderColor: theme.accentBorder }]}>
          <View style={[styles.goalDot, { backgroundColor: theme.accentSolid }]} />
          <Text style={[styles.goalText, { color: theme.accentSolid }]}>Goal: {goal}</Text>
        </View>
      </View>
    </View>
  );
}
