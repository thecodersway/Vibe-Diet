/**
 * ProfileHeader Component
 * Renders the top summary banner of the user profile, containing a circular avatar
 * wrapper with a custom profile SVG and the user's name/goal tags.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { AvatarIcon } from '@/asset';

interface ProfileHeaderProps {
  name: string;
  goal: string;
  avatarColor: string;
}

export function ProfileHeader({ name, goal, avatarColor }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrapper, { borderColor: avatarColor }]}>
        <View style={styles.avatarInner}>
          <AvatarIcon color={avatarColor} size={36} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.goalBadge}>
          <View style={styles.goalDot} />
          <Text style={styles.goalText}>Goal: {goal}</Text>
        </View>
      </View>
    </View>
  );
}
