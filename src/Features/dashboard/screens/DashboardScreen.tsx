/**
 * DashboardFeature Component
 * Main container that bundles all dashboard subcomponents (HeaderSection, FuelCard, StatsRow, MealTimeline)
 * and feeds them daily tracking progress and meal logs.
 */

import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderSection } from '../components/HeaderSection';
import { FuelCard } from '../components/FuelCard';
import { StatsRow } from '../components/StatsRow';
import { MealTimeline } from '../components/MealTimeline';

import { mockDailyProgress, mockMeals } from '../mockData';
import { DailyProgress, Meal } from '../types';
import { styles } from '../styles';
import { useTheme } from '@/hooks/use-theme';

export default function DashboardScreen() {
  const theme = useTheme();
  const [dailyProgress] = useState<DailyProgress>(mockDailyProgress);
  const [meals] = useState<Meal[]>(mockMeals);

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeaderSection vibeName={dailyProgress.vibeName} />

        <FuelCard
          remainingFuel={dailyProgress.remainingFuel}
          goalFuel={dailyProgress.goalFuel}
          eatenFuel={dailyProgress.eatenFuel}
          macros={dailyProgress.macros}
        />

        <StatsRow
          waterCurrent={dailyProgress.waterCurrent}
          waterTarget={dailyProgress.waterTarget}
          burnedKcal={dailyProgress.burnedKcal}
        />

        <MealTimeline meals={meals} />
      </ScrollView>
    </SafeAreaView>
  );
}
