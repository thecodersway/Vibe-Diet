/**
 * LogFeature Component
 * Manages display of daily logged food items, macro nutrients recap,
 * and date picker selection list with glassmorphic cards.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from 'expo-router';

interface LogItem {
  id: string;
  time: string;
  name: string;
  amount: string;
  calories: number;
}

// Generate the last 5 days ending today
const getWeekDays = () => {
  const days = [];
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  for (let i = 4; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const dateNum = String(d.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${dateNum}`;
    days.push({
      day: dayLabels[d.getDay()],
      num: String(d.getDate()),
      dateString,
    });
  }
  return days;
};

export default function LogFeature() {
  const theme = useTheme();
  const weekDays = getWeekDays();

  const [selectedDate, setSelectedDate] = useState(weekDays[4].dateString); // default to today
  const [logItems, setLogItems] = useState<LogItem[]>([]);
  const [recap, setRecap] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadLogData = useCallback(async (dateStr: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // 1. Fetch today's database summary from RPC
      const { data: progressData, error: progressError } = await supabase.rpc('get_daily_progress', {
        p_user_id: userId,
        p_date: dateStr,
      });

      if (progressError) throw progressError;

      // 2. Fetch logged food items for target date
      const { data: mealsData, error: mealsError } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .eq('log_date', dateStr)
        .order('created_at', { ascending: false });

      if (mealsError) throw mealsError;

      // Update recap macros
      if (progressData) {
        const proteinObj = progressData.macros?.find((m: any) => m.name === 'Protein');
        const carbsObj = progressData.macros?.find((m: any) => m.name === 'Carbs');
        const fatObj = progressData.macros?.find((m: any) => m.name === 'Fats');

        setRecap({
          calories: progressData.eatenFuel || 0,
          protein: proteinObj ? proteinObj.current : 0,
          carbs: carbsObj ? carbsObj.current : 0,
          fat: fatObj ? fatObj.current : 0,
        });
      } else {
        setRecap({ calories: 0, protein: 0, carbs: 0, fat: 0 });
      }

      // Map raw database meals to frontend LogItem format
      if (mealsData) {
        const mapped: LogItem[] = mealsData.map((m: any) => {
          const formattedTime = m.created_at
            ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'Logged';

          let details = '1 portion';
          if (m.ingredients && Array.isArray(m.ingredients)) {
            details = `${m.ingredients.length} ingredients`;
          }

          return {
            id: m.id,
            time: formattedTime,
            name: m.food_name,
            amount: details,
            calories: m.calories,
          };
        });
        setLogItems(mapped);
      } else {
        setLogItems([]);
      }
    } catch (error) {
      console.error('Error loading log data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLogData(selectedDate);
    }, [selectedDate, loadLogData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadLogData(selectedDate);
  }, [selectedDate, loadLogData]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>DIET LOG</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Track your daily vibe fuel</Text>
        </View>
      </View>

      {/* Date Carousel */}
      <View style={styles.dateContainer}>
        {weekDays.map((item) => {
          const isActive = selectedDate === item.dateString;
          return (
            <TouchableOpacity
              key={item.dateString}
              activeOpacity={0.8}
              onPress={() => setSelectedDate(item.dateString)}
              style={[
                styles.dateCard,
                { backgroundColor: theme.backgroundElement, borderColor: theme.border },
                isActive && { backgroundColor: theme.primary, borderColor: theme.primary }
              ]}
            >
              <Text style={[styles.dateDay, { color: theme.textSecondary }, isActive && { color: theme.textInverse }]}>
                {item.day}
              </Text>
              <Text style={[styles.dateNum, { color: theme.text }, isActive && { color: theme.textInverse }]}>
                {item.num}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Macros Recap */}
      <View style={[styles.summaryCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <Text style={[styles.summaryHeader, { color: theme.accentSolid }]}>{"FUEL RECAP"}</Text>
        <View style={styles.macroRow}>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: theme.text }]}>
              {recap.calories.toLocaleString()}
            </Text>
            <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>CALORIES</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: theme.text }]}>{recap.protein}g</Text>
            <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>PROTEIN</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: theme.text }]}>{recap.carbs}g</Text>
            <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>CARBS</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: theme.text }]}>{recap.fat}g</Text>
            <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>FATS</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Logged Items</Text>

      {isLoading && !refreshing ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.logList}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
          }
        >
          {logItems.length === 0 ? (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <Text style={{ color: theme.textSecondary, fontSize: 16, textAlign: 'center' }}>
                No items logged for this date yet. Plate is looking clean! 🍽️
              </Text>
            </View>
          ) : (
            logItems.map((item) => (
              <View key={item.id} style={[styles.logCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                <View style={styles.logInfo}>
                  <Text style={[styles.logTime, { color: theme.accentSolid }]}>{item.time}</Text>
                  <Text style={[styles.logName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.logDetails, { color: theme.textSecondary }]}>{item.amount}</Text>
                </View>
                <View style={[styles.caloriesBadge, { backgroundColor: theme.backgroundSelected }]}>
                  <Text style={[styles.caloriesText, { color: theme.accentSolid }]}>+{item.calories} kcal</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

