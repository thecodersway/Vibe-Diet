/**
 * ProfileFeature Component
 * Main container for the user profile tab. Displays user metadata (avatar, goal),
 * tracked fitness metrics (weight, activity), and global configuration buttons.
 */

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileHeader } from '../components/ProfileHeader';
import { MetricCard } from '../components/MetricCard';
import { ActionItem } from '../components/ActionItem';

import { mockUserProfile } from '../mockData';
import { UserProfile } from '../types';
import { styles } from '../styles';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const theme = useTheme();
  const [profile] = useState<UserProfile>(mockUserProfile);

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name={profile.name}
          goal={profile.goal}
          avatarColor={profile.avatarColor}
        />

        <MetricCard label="Current Weight" value={profile.currentWeight} />
        <MetricCard label="Target Weight" value={profile.targetWeight} />
        <MetricCard label="Activity Level" value={profile.activityLevel} />

        <View style={styles.divider} />

        <ActionItem label="Settings" iconEmoji="⚙️" showChevron />
        <ActionItem label="Log Out" isDestructive />
      </ScrollView>
    </SafeAreaView>
  );
}
