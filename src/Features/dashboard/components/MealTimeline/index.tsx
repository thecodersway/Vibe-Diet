import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Meal } from '../../types';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';
import { SymbolView } from 'expo-symbols';

interface MealTimelineProps {
  meals: Meal[];
  onRefresh?: () => void;
}

export function MealTimeline({ meals, onRefresh }: MealTimelineProps) {
  const theme = useTheme();

  const [isAddingManual, setIsAddingManual] = useState(false);
  const [manualText, setManualText] = useState('');
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Snack');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleManualLog = async () => {
    if (!manualText.trim()) return;
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('scan-food', {
        body: {
          text: manualText,
          meal_type: mealType,
        },
      });

      if (error) throw error;
      if (!data) throw new Error('No data received from scanning service');

      // Success! Reset inputs
      setManualText('');
      setIsAddingManual(false);

      // Refresh Dashboard data
      if (onRefresh) {
        onRefresh();
      }
    } catch (err: any) {
      console.error('Error logging meal manually:', err);
      Alert.alert('Logging Failed', err.message || 'Gemini could not analyze the text. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{"Today's Grub"}</Text>
          <Text style={styles.plateEmoji}>🍽️</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsAddingManual((prev) => !prev)}
          style={[styles.seeAllButton, { backgroundColor: theme.primary, borderColor: theme.primary }]}
        >
          <Text style={[styles.seeAllText, { color: theme.textInverse }]}>+ Add Meal</Text>
        </TouchableOpacity>
      </View>

      {/* Manual Entry Form */}
      {isAddingManual && (
        <View style={[styles.manualFormCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.formTitle, { color: theme.text }]}>Log Meal with AI</Text>
          
          <TextInput
            style={[styles.textInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
            placeholder="What did you eat? (e.g. 2 roti and paneer sabzi)"
            placeholderTextColor={theme.textSecondary}
            value={manualText}
            onChangeText={setManualText}
            editable={!isSubmitting}
          />

          <Text style={[styles.formLabel, { color: theme.textSecondary }]}>MEAL TYPE</Text>
          <View style={styles.mealTypeContainer}>
            {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map((type) => {
              const isSelected = mealType === type;
              return (
                <TouchableOpacity
                  key={type}
                  activeOpacity={0.8}
                  onPress={() => setMealType(type)}
                  style={[
                    styles.mealTypeBtn,
                    { backgroundColor: theme.background, borderColor: theme.border },
                    isSelected && { backgroundColor: theme.accentSolid, borderColor: theme.accentSolid }
                  ]}
                  disabled={isSubmitting}
                >
                  <Text style={[styles.mealTypeBtnText, { color: theme.textSecondary }, isSelected && { color: theme.textInverse }]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsAddingManual(false)}
              style={[styles.cancelBtn, { borderColor: theme.border }]}
              disabled={isSubmitting}
            >
              <Text style={[styles.cancelBtnText, { color: theme.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleManualLog}
              style={[styles.submitBtn, { backgroundColor: theme.primary }]}
              disabled={isSubmitting || !manualText.trim()}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={theme.textInverse} />
              ) : (
                <Text style={[styles.submitBtnText, { color: theme.textInverse }]}>Log with AI ✨</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Meals List */}
      <View style={styles.timelineContainer}>
        {meals.length === 0 ? (
          <View style={styles.emptyListContainer}>
            <SymbolView name="sparkles" size={24} tintColor={theme.textSecondary} style={{ marginBottom: 12 }} />
            <Text style={[styles.emptyListText, { color: theme.textSecondary }]}>
              No meals logged today yet.{"\n"}Tap + Add Meal to check your vibes!
            </Text>
          </View>
        ) : (
          meals.map((meal, index) => {
            const isLast = index === meals.length - 1;

            return (
              <View key={meal.id} style={styles.timelineItem}>
                <View style={styles.leftLineColumn}>
                  {!isLast && <View style={[styles.verticalLine, { backgroundColor: theme.border }]} />}

                  <View style={[styles.completedIndicatorOuter, { backgroundColor: theme.accentBg, borderColor: theme.accentBorder }]}>
                    <View style={[styles.completedIndicatorInner, { backgroundColor: theme.accentSolid }]} />
                  </View>
                </View>

                <View style={styles.rightCardColumn}>
                  <View style={[styles.mealCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                    <View style={styles.cardHeader}>
                      <Text style={[styles.timeText, { color: theme.textSecondary }]}>{meal.time}</Text>
                      {meal.kcal && (
                        <View style={[styles.kcalBadge, { backgroundColor: theme.accentBg }]}>
                          <Text style={[styles.kcalBadgeText, { color: theme.accentSolid }]}>{meal.kcal} kcal</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.mealTitle, { color: theme.text }]}>{meal.type}</Text>
                    <Text style={[styles.mealDesc, { color: theme.textSecondary }]}>{meal.description}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}
