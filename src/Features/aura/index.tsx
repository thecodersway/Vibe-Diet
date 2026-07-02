/**
 * AuraFeature Component
 * Displays weekly vibe scoring indices, visual progress gauges, earned badges,
 * and AI-driven dietary trend insights.
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';

interface Badge {
  id: string;
  emoji: string;
  name: string;
  level: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const MOCK_BADGES: Badge[] = [
  { id: '1', emoji: '🧘', name: 'Chill Zen', level: 'Level 3' },
  { id: '2', emoji: '💪', name: 'Protein Beast', level: 'Level 2' },
  { id: '3', emoji: '⚡', name: 'Sync Master', level: 'Level 4' },
  { id: '4', emoji: '💧', name: 'Aqua God', level: 'Level 1' },
];

const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    title: 'Optimized Energy Stability',
    description: 'Carbohydrate splits from lunch aligned perfectly with your active window, preventing afternoon blood sugar dips.',
    icon: '📈',
  },
  {
    id: '2',
    title: 'Matcha Brain Boosting',
    description: 'Ceremonial matcha logs matched high cognitive focus states. Keep matching caffeine with L-theanine.',
    icon: '🍵',
  },
  {
    id: '3',
    title: 'Macronutrient Sync Perfected',
    description: 'Protein goals met 4 days in a row! Muscle repair cycles are functioning at peak efficiency.',
    icon: '🔋',
  },
];

export default function AuraFeature() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>MY AURA</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>AI Vibe & Diet Analytics</Text>
      </View>

      {/* Main Vibe Score */}
      <View style={[styles.scoreCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={[styles.scoreBackgroundGlow, { backgroundColor: theme.accentSolid }]} />
        <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>WEEKLY VIBE CHECK</Text>
        <View style={styles.scoreValueRow}>
          <Text style={[styles.scoreValue, { color: theme.accentSolid, textShadowColor: theme.accentSolid + '66' }]}>98</Text>
        </View>
        <Text style={[styles.scoreDesc, { color: theme.text }]}>
          {"Your diet and mood sync is exceptionally high. You're in prime energy balance!"}
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Earned Badges</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.badgesScroll}
      >
        {MOCK_BADGES.map((badge) => (
          <View key={badge.id} style={[styles.badgeCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <View style={[styles.badgeIconWrapper, { backgroundColor: theme.accentBg }]}>
              <Text style={styles.badgeIcon}>{badge.emoji}</Text>
            </View>
            <Text style={[styles.badgeName, { color: theme.text }]}>{badge.name}</Text>
            <Text style={[styles.badgeLevel, { color: theme.accentSolid }]}>{badge.level}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Weekly Insights</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.insightsList}
        contentContainerStyle={styles.scrollContent}
      >
        {MOCK_INSIGHTS.map((insight) => (
          <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <View style={[styles.insightIconBg, { backgroundColor: theme.backgroundSelected }]}>
              <Text style={{ fontSize: 18 }}>{insight.icon}</Text>
            </View>
            <View style={styles.insightTextWrapper}>
              <Text style={[styles.insightTitle, { color: theme.text }]}>{insight.title}</Text>
              <Text style={[styles.insightDesc, { color: theme.textSecondary }]}>{insight.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
