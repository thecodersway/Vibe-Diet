/**
 * ProfileFeature Component
 * Main container for the user profile tab. Displays user metadata (avatar, goal),
 * tracked fitness metrics (weight, activity), and global configuration buttons.
 */

import { useState, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useFocusEffect, useRouter } from 'expo-router';

import { ActionItem } from '../components/ActionItem';
import { MetricCard } from '../components/MetricCard';
import { ProfileHeader } from '../components/ProfileHeader';

import { useTheme, useThemeContext } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';
import { styles } from '../styles';
import { UserProfile } from '../types';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { theme: activeTheme, setTheme } = useThemeContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activePlan, setActivePlan] = useState<{
    plan_title: string;
    goal_type: string;
    start_weight_kg: number;
    target_weight_kg: number;
    duration_days: number;
    start_date: string;
    end_date: string;
    target_calories: number;
    plan_desc: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const fetchProfileAndPlan = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) return;

          // 1. Fetch user profile
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userError) throw userError;

          // 2. Fetch active weight plan
          const { data: planData, error: planError } = await supabase
            .from('weight_plans')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('is_active', true)
            .maybeSingle();

          if (mounted) {
            if (userData) {
              const mappedGoal = 
                userData.goal === 'cut' ? 'Get Shredded' :
                userData.goal === 'bulk' ? 'Build Muscle' : 'Maintain Weight';

              const mappedActivity = 
                userData.activity_level === 'high' ? 'Gym Rat (High)' :
                userData.activity_level === 'medium' ? 'Active (Medium)' : 'Sedentary (Low)';

              setProfile({
                name: userData.name || session.user.email?.split('@')[0] || 'User',
                goal: mappedGoal,
                currentWeight: userData.current_weight_kg ? `${userData.current_weight_kg} kg` : '-- kg',
                targetWeight: planData ? `${planData.target_weight_kg} kg` : (userData.target_calories ? `${Math.round(userData.target_calories * 0.035)} kg` : '-- kg'),
                activityLevel: mappedActivity,
                avatarColor: '#A855F7',
              });
            }

            if (planData) {
              setActivePlan({
                plan_title: planData.plan_title,
                goal_type: planData.goal_type,
                start_weight_kg: Number(planData.start_weight_kg),
                target_weight_kg: Number(planData.target_weight_kg),
                duration_days: Number(planData.duration_days),
                start_date: planData.start_date,
                end_date: planData.end_date,
                target_calories: Number(planData.target_calories),
                plan_desc: planData.plan_desc || '',
              });
            } else {
              setActivePlan(null);
            }
          }
        } catch (error) {
          console.error('Error fetching profile or weight plan:', error);
        } finally {
          if (mounted) {
            setIsLoading(false);
          }
        }
      };

      fetchProfileAndPlan();

      return () => {
        mounted = false;
      };
    }, [])
  );

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  const displayProfile = profile || {
    name: 'Vibe Diet User',
    goal: 'Maintain Weight',
    currentWeight: '-- kg',
    targetWeight: '-- kg',
    activityLevel: 'Active (Medium)',
    avatarColor: '#A855F7',
  };

  const getProgressDetails = () => {
    if (!activePlan || !profile) return null;

    const start = activePlan.start_weight_kg;
    const target = activePlan.target_weight_kg;
    const current = Number(profile.currentWeight.replace(' kg', '')) || start;

    let pct = 0;
    if (start !== target) {
      pct = ((current - start) / (target - start)) * 100;
    }
    const progressPct = Math.min(100, Math.max(0, pct));

    const startD = new Date(activePlan.start_date);
    const endD = new Date(activePlan.end_date);
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    startD.setHours(0, 0, 0, 0);
    endD.setHours(0, 0, 0, 0);

    const diffTimeTotal = endD.getTime() - startD.getTime();
    const diffDaysTotal = Math.round(diffTimeTotal / (1000 * 60 * 60 * 24)) || activePlan.duration_days;

    const diffTimePassed = today.getTime() - startD.getTime();
    const currentDay = Math.max(1, Math.min(diffDaysTotal, Math.round(diffTimePassed / (1000 * 60 * 60 * 24)) + 1));

    const remainingDays = Math.max(0, diffDaysTotal - (currentDay - 1));

    return {
      progressPct,
      currentDay,
      totalDays: diffDaysTotal,
      remainingDays,
      current,
      start,
      target,
    };
  };

  const planProgress = getProgressDetails();

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name={displayProfile.name}
          goal={displayProfile.goal}
          avatarColor={displayProfile.avatarColor}
        />

        <MetricCard label="Current Weight" value={displayProfile.currentWeight} />
        <MetricCard label="Target Weight" value={displayProfile.targetWeight} />
        <MetricCard label="Activity Level" value={displayProfile.activityLevel} />

        {/* Goal Weight Plan Card */}
        {activePlan && planProgress && (
          <View style={[styles.planCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border, marginTop: 12 }]}>
            <View style={styles.planHeader}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={[styles.planTitle, { color: theme.text }]} numberOfLines={1}>{activePlan.plan_title}</Text>
                <Text style={[styles.planSubtitle, { color: theme.textSecondary }]}>
                  {activePlan.goal_type === 'cut' ? 'Lose weight 📉' : activePlan.goal_type === 'bulk' ? 'Build muscle 📈' : 'Maintain ⚡'}
                </Text>
              </View>
              <View style={[styles.daysBadge, { backgroundColor: theme.accentBg }]}>
                <Text style={[styles.daysBadgeText, { color: theme.accentSolid }]}>
                  Day {planProgress.currentDay} of {planProgress.totalDays}
                </Text>
              </View>
            </View>

            <View style={styles.progressTrackWrapper}>
              <View style={[styles.progressBarOuter, { backgroundColor: theme.border }]}>
                <View style={[styles.progressBarInner, { backgroundColor: theme.accentSolid, width: `${planProgress.progressPct}%` }]} />
              </View>
              <View style={styles.weightLabelRow}>
                <Text style={[styles.weightLabelText, { color: theme.textSecondary }]}>Start: {planProgress.start} kg</Text>
                <Text style={[styles.weightLabelText, { color: theme.text, fontWeight: '700' }]}>Current: {planProgress.current} kg</Text>
                <Text style={[styles.weightLabelText, { color: theme.textSecondary }]}>Target: {planProgress.target} kg</Text>
              </View>
            </View>

            <View style={styles.planFooter}>
              <Text style={[styles.planDescText, { color: theme.textSecondary }]}>
                {activePlan.plan_desc || `${activePlan.duration_days} day customized diet guidelines.`}
              </Text>
              <View style={styles.footerRow}>
                <Text style={[styles.planKcalText, { color: theme.accentSolid }]}>
                  🔥 {activePlan.target_calories} kcal/day target
                </Text>
                <Text style={[styles.planDaysLeft, { color: theme.textSecondary }]}>
                  {planProgress.remainingDays} days remaining
                </Text>
              </View>
            </View>
          </View>
        )}

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
        <ActionItem label="Log Out" isDestructive onPress={handleLogOut} />
      </ScrollView>
    </SafeAreaView>
  );
}
