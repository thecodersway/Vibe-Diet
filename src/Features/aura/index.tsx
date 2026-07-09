import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from 'expo-router';

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

export default function AuraFeature() {
  const theme = useTheme();

  const [score, setScore] = useState(50);
  const [vibeTitle, setVibeTitle] = useState('Neutral Vibe');
  const [vibeDesc, setVibeDesc] = useState('Log your meals to discover your active nutrition aura!');
  const [badges, setBadges] = useState<Badge[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAuraData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.rpc('get_weekly_aura', {
        p_user_id: session.user.id,
      });

      if (error) throw error;

      if (data) {
        setScore(data.score || 50);
        setVibeTitle(data.vibeTitle || 'Neutral Vibe');
        setVibeDesc(data.vibeDesc || 'Log your meals to see stats.');
        setBadges(data.badges || []);
        setInsights(data.insights || []);
      }
    } catch (err) {
      console.error('Error loading weekly aura:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAuraData();
    }, [loadAuraData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAuraData();
  }, [loadAuraData]);

  if (isLoading && !refreshing) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
      }
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>MY AURA</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>AI Vibe & Diet Analytics</Text>
      </View>

      {/* Main Vibe Score */}
      <View style={[styles.scoreCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={[styles.scoreBackgroundGlow, { backgroundColor: theme.accentSolid }]} />
        <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>WEEKLY VIBE CHECK</Text>
        <View style={styles.scoreValueRow}>
          <Text style={[styles.scoreValue, { color: theme.accentSolid, textShadowColor: theme.accentSolid + '66' }]}>
            {score}
          </Text>
        </View>
        <Text style={[styles.scoreDesc, { color: theme.text, textAlign: 'center', fontWeight: '600', marginBottom: 4 }]}>
          {vibeTitle}
        </Text>
        <Text style={[styles.scoreDesc, { color: theme.textSecondary, fontSize: 13, textAlign: 'center' }]}>
          {vibeDesc}
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Earned Badges</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.badgesScroll}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {badges.map((badge) => (
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
      <View style={styles.insightsList}>
        {insights.map((insight) => (
          <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border, marginBottom: 12 }]}>
            <View style={[styles.insightIconBg, { backgroundColor: theme.backgroundSelected }]}>
              <Text style={{ fontSize: 18 }}>{insight.icon}</Text>
            </View>
            <View style={styles.insightTextWrapper}>
              <Text style={[styles.insightTitle, { color: theme.text }]}>{insight.title}</Text>
              <Text style={[styles.insightDesc, { color: theme.textSecondary }]}>{insight.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

