/**
 * DashboardFeature Component
 * Main container that bundles all dashboard subcomponents (HeaderSection, FuelCard, StatsRow, MealTimeline)
 * and feeds them daily tracking progress and meal logs.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, ActivityIndicator, RefreshControl, View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { HeaderSection } from '../components/HeaderSection';
import { FuelCard } from '../components/FuelCard';
import { StatsRow } from '../components/StatsRow';
import { MealTimeline } from '../components/MealTimeline';

import { DailyProgress, Meal } from '../types';
import { styles } from '../styles';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';

export default function DashboardScreen() {
  const theme = useTheme();
  
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [customWaterText, setCustomWaterText] = useState('250');

  const loadData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // Get local date formatted as YYYY-MM-DD
      const localDate = new Date();
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const day = String(localDate.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;

      // 1. Fetch backend calculated daily progress from RPC
      const { data: progressData, error: progressError } = await supabase.rpc('get_daily_progress', {
        p_user_id: userId,
        p_date: todayStr,
      });

      if (progressError) throw progressError;

      // 2. Fetch logged meals for today
      const { data: mealsData, error: mealsError } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .eq('log_date', todayStr)
        .order('created_at', { ascending: false });

      if (mealsError) throw mealsError;

      if (progressData) {
        setDailyProgress(progressData);
      }

      // 3. Map logged meals directly
      const mapped: Meal[] = [];

      if (mealsData) {
        mealsData.forEach((m: any) => {
          const formattedTime = m.created_at
            ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'Logged';

          mapped.push({
            id: m.id,
            time: formattedTime,
            type: m.meal_type === 'Snack' ? 'Snacks' : m.meal_type,
            name: m.food_name,
            description: m.ai_roast || `${m.food_name} logged`,
            kcal: m.calories,
            isCompleted: true,
          });
        });
      }

      setMeals(mapped);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  const progress = dailyProgress || {
    remainingFuel: 2000,
    goalFuel: 2000,
    eatenFuel: 0,
    waterCurrent: 0,
    waterTarget: 2.5,
    burnedKcal: 0,
    vibeName: 'Main Character Energy',
    macros: [
      { name: 'Protein', current: 0, target: 150, unit: 'g', color: '#C2FF1A' },
      { name: 'Carbs', current: 0, target: 200, unit: 'g', color: '#A855F7' },
      { name: 'Fats', current: 0, target: 65, unit: 'g', color: '#F43F5E' },
    ] as any[],
  };

  const getHeaderEmoji = () => {
    if (!dailyProgress) return '👑';
    if (dailyProgress.burnedKcal && dailyProgress.burnedKcal >= 300) return '⚡';
    if (dailyProgress.waterCurrent && dailyProgress.waterCurrent >= 2.0) return '💧';
    if (dailyProgress.eatenFuel && dailyProgress.goalFuel && dailyProgress.eatenFuel >= dailyProgress.goalFuel * 0.8) return '🔋';
    return '👑';
  };

  const handleAddWater = async (ml: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;
      
      const localDate = new Date();
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const day = String(localDate.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;

      const { data: existingLog, error: fetchError } = await supabase
        .from('daily_logs')
        .select('water_ml')
        .eq('user_id', userId)
        .eq('log_date', todayStr)
        .maybeSingle();

      if (fetchError) throw fetchError;

      const currentWater = existingLog ? existingLog.water_ml : 0;
      const newWater = currentWater + ml;

      const { error: upsertError } = await supabase
        .from('daily_logs')
        .upsert({
          user_id: userId,
          log_date: todayStr,
          water_ml: newWater,
        }, { onConflict: 'user_id,log_date' });

      if (upsertError) throw upsertError;

      loadData();
    } catch (err) {
      console.error('Error logging water:', err);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
        }
      >
        <HeaderSection vibeName={progress.vibeName} vibeEmoji={getHeaderEmoji()} />

        <FuelCard
          remainingFuel={progress.remainingFuel}
          goalFuel={progress.goalFuel}
          eatenFuel={progress.eatenFuel}
          macros={progress.macros}
        />

        <StatsRow
          waterCurrent={progress.waterCurrent}
          waterTarget={progress.waterTarget}
          burnedKcal={progress.burnedKcal}
          onAddWaterPress={() => setIsWaterModalOpen(true)}
        />

        <MealTimeline meals={meals} onRefresh={loadData} />
      </ScrollView>

      {/* Water Logging Bottom Sheet Modal */}
      <Modal
        visible={isWaterModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsWaterModalOpen(false)}
      >
        <View style={modalStyles.backdrop}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setIsWaterModalOpen(false)}
          />
          <View style={modalStyles.content}>
            <View style={modalStyles.dragHandle} />
            
            {/* Close Cross Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={modalStyles.closeCrossBtn}
              onPress={() => setIsWaterModalOpen(false)}
            >
              <Text style={{ color: '#8E939E', fontSize: 16, fontWeight: '700' }}>✕</Text>
            </TouchableOpacity>

            {/* Header Section */}
            <View style={modalStyles.header}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Text style={modalStyles.title}>Log Water Intake</Text>
                <Text style={{ fontSize: 24 }}>💧</Text>
              </View>
              <Text style={modalStyles.subtitle}>How much water did you drink?</Text>
            </View>

            {/* Content Area */}
            <View style={modalStyles.mainArea}>
              
              {/* Left Side: Cascading bubbles */}
              <View style={modalStyles.leftColumn}>
                
                {/* 750ml Bubble Option */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[modalStyles.bubbleOptionRow, { marginLeft: 0 }]}
                  onPress={() => setCustomWaterText('750')}
                >
                  <View style={modalStyles.bubbleLarge}>
                    <View style={modalStyles.bubbleHighlight} />
                  </View>
                  <View>
                    <Text style={modalStyles.bubbleValText}>+750 ML</Text>
                    <Text style={modalStyles.bubbleSubText}>LARGE</Text>
                  </View>
                </TouchableOpacity>

                {/* 500ml Bubble Option */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[modalStyles.bubbleOptionRow, { marginLeft: 24 }]}
                  onPress={() => setCustomWaterText('500')}
                >
                  <View style={modalStyles.bubbleMedium}>
                    <View style={modalStyles.bubbleHighlight} />
                  </View>
                  <View>
                    <Text style={modalStyles.bubbleValText}>+500 ML</Text>
                    <Text style={modalStyles.bubbleSubText}>BOTTLE</Text>
                  </View>
                </TouchableOpacity>

                {/* 250ml Bubble Option with dashed ring */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[modalStyles.bubbleOptionRow, { marginLeft: 48 }]}
                  onPress={() => setCustomWaterText('250')}
                >
                  <View style={modalStyles.dashedContainer}>
                    <View style={modalStyles.bubbleSmall}>
                      <View style={modalStyles.bubbleHighlight} />
                    </View>
                  </View>
                  <View>
                    <Text style={modalStyles.bubbleValText}>+250 ML</Text>
                    <Text style={modalStyles.bubbleSubText}>CUP</Text>
                  </View>
                </TouchableOpacity>

              </View>

              {/* Right Side: Manual entry & Quick log suggestions */}
              <View style={modalStyles.rightColumn}>
                
                {/* Custom Amount input */}
                <View>
                  <Text style={modalStyles.inputLabel}>Custom Amount</Text>
                  <View style={modalStyles.inputWrapper}>
                    <Text style={{ marginRight: 8, fontSize: 16 }}>✍️</Text>
                    <TextInput
                      style={modalStyles.textInput}
                      keyboardType="numeric"
                      value={customWaterText}
                      onChangeText={setCustomWaterText}
                      placeholder="e.g. 330"
                      placeholderTextColor="#555E6F"
                    />
                    <Text style={{ color: '#8E939E', fontWeight: '600' }}>ml</Text>
                  </View>
                </View>

                {/* Quick Log suggestions */}
                <View style={{ marginTop: 4 }}>
                  <Text style={modalStyles.inputLabel}>Quick Log</Text>
                  <View style={modalStyles.quickGrid}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={modalStyles.quickBtn}
                      onPress={() => setCustomWaterText('150')}
                    >
                      <Text style={modalStyles.quickBtnText}>☕ Coffee (150ml)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={modalStyles.quickBtn}
                      onPress={() => setCustomWaterText('330')}
                    >
                      <Text style={modalStyles.quickBtnText}>🥤 Soda (330ml)</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Submit button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={modalStyles.submitBtn}
                  onPress={() => {
                    const amt = parseInt(customWaterText, 10);
                    if (!isNaN(amt) && amt > 0) {
                      handleAddWater(amt);
                      setIsWaterModalOpen(false);
                    }
                  }}
                >
                  <Text style={modalStyles.submitBtnText}>Log Intake ✓</Text>
                </TouchableOpacity>

              </View>

            </View>

            {/* Bottom highlight bar */}
            <View style={modalStyles.bottomHighlight} />

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    position: 'relative',
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  closeCrossBtn: {
    position: 'absolute',
    top: 16,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#94A3B8',
  },
  mainArea: {
    flexDirection: 'column',
    gap: 20,
  },
  leftColumn: {
    width: '100%',
    gap: 12,
    paddingVertical: 4,
  },
  bubbleOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bubbleLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#22d3ee',
    position: 'relative',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  bubbleMedium: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#06b6d4',
    position: 'relative',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  dashedContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(34, 211, 238, 0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0891b2',
    position: 'relative',
  },
  bubbleHighlight: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '30%',
    height: '30%',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  bubbleValText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#22D3EE',
  },
  bubbleSubText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  rightColumn: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 16,
    gap: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#0B1120',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 0,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickBtnText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
  },
  submitBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#06b6d4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  bottomHighlight: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(6, 182, 212, 0.3)',
    marginTop: 20,
    borderRadius: 1,
  },
});

