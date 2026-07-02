/**
 * ProfileFeature Component
 * Main container for the user profile tab. Displays user metadata (avatar, goal),
 * tracked fitness metrics (weight, activity), and global configuration buttons.
 */

import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ActionItem } from '../components/ActionItem';
import { MetricCard } from '../components/MetricCard';
import { ProfileHeader } from '../components/ProfileHeader';

import { useTheme, useThemeContext } from '@/hooks/use-theme';
import { mockUserProfile } from '../mockData';
import { styles } from '../styles';
import { UserProfile } from '../types';

export default function ProfileScreen() {
  const theme = useTheme();
  const { theme: activeTheme, setTheme } = useThemeContext();
  const [profile] = useState<UserProfile>(mockUserProfile);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

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

        <View style={[styles.dropdownContainer, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dropdownHeader}
            onPress={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
          >
            <Text style={[styles.themeLabel, { color: theme.text }]}>Theme</Text>
            <View style={styles.dropdownHeaderRight}>
              <Text style={[styles.dropdownSelectedText, { color: theme.textSecondary }]}>
                {activeTheme === 'light' ? 'Light' : activeTheme === 'dark' ? 'Dark' : 'System'}
              </Text>
              <Animated.Text
                style={[
                  styles.dropdownChevron,
                  {
                    color: theme.textSecondary,
                    transform: [{ rotate: isThemeDropdownOpen ? '180deg' : '0deg' }]
                  }
                ]}
              >
                ▼
              </Animated.Text>
            </View>
          </TouchableOpacity>

          {isThemeDropdownOpen && (
            <Animated.View
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(150)}
              style={[styles.dropdownList, { borderTopColor: theme.border }]}
            >
              {(['light', 'dark', 'system'] as const).map((t) => {
                const label = t === 'light' ? '☀️ Light' : t === 'dark' ? '🌙 Dark' : '⚙️ System';
                const isSelected = activeTheme === t;
                return (
                  <TouchableOpacity
                    key={t}
                    activeOpacity={0.7}
                    style={[
                      styles.dropdownItem,
                      isSelected && { backgroundColor: theme.backgroundSelected }
                    ]}
                    onPress={() => {
                      setTheme(t);
                      setIsThemeDropdownOpen(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      { color: isSelected ? theme.text : theme.textSecondary }
                    ]}>
                      {label}
                    </Text>
                    <View style={[
                      styles.radioOuter,
                      { borderColor: isSelected ? theme.primary : theme.border }
                    ]}>
                      {isSelected && <View style={[styles.radioInner, { backgroundColor: theme.primary }]} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          )}
        </View>

        <ActionItem label="Settings" iconEmoji="⚙️" showChevron />
        <ActionItem label="Log Out" isDestructive />
      </ScrollView>
    </SafeAreaView>
  );
}
