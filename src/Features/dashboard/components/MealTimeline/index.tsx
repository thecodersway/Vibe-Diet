/**
 * MealTimeline Component
 * Renders the daily logged meals in a chronological timeline view.
 * Handles display of completed meals and dotted placeholders with "+ Add Meal" prompts.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Meal } from '../../types';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';

interface MealTimelineProps {
  meals: Meal[];
}

export function MealTimeline({ meals }: MealTimelineProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>{"Today's Grub"}</Text>
          <Text style={styles.plateEmoji}>🍽️</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timelineContainer}>
        {meals.map((meal, index) => {
          const isLast = index === meals.length - 1;

          return (
            <View key={meal.id} style={styles.timelineItem}>
              <View style={styles.leftLineColumn}>
                {!isLast && <View style={[styles.verticalLine, { borderColor: theme.border }]} />}

                {meal.isCompleted ? (
                  <View style={styles.completedIndicatorOuter}>
                    <View style={styles.completedIndicatorInner} />
                  </View>
                ) : (
                  <View style={[styles.emptyIndicator, { backgroundColor: theme.background, borderColor: theme.border }]} />
                )}
              </View>

              <View style={styles.rightCardColumn}>
                {meal.isCompleted ? (
                  <View style={[styles.mealCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                    <View style={styles.cardHeader}>
                      <Text style={[styles.timeText, { color: theme.textSecondary }]}>{meal.time}</Text>
                      {meal.kcal && (
                        <View style={styles.kcalBadge}>
                          <Text style={styles.kcalBadgeText}>{meal.kcal} kcal</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.mealTitle, { color: theme.primary }]}>{meal.type}</Text>
                    <Text style={[styles.mealDesc, { color: theme.textSecondary }]}>{meal.description}</Text>
                  </View>
                ) : (
                  <View style={[styles.mealCard, styles.emptyCard, { borderColor: theme.border }]}>
                    <View style={styles.cardHeader}>
                      <Text style={[styles.timeText, { color: theme.textSecondary }]}>{meal.time}</Text>
                    </View>
                    <Text style={[styles.emptyMealTitle, { color: theme.textSecondary }]}>{meal.type}</Text>

                    <TouchableOpacity activeOpacity={0.8} style={[styles.addMealButton, { backgroundColor: theme.primary + '1A', borderColor: theme.primary + '33' }]}>
                      <Text style={[styles.addMealButtonText, { color: theme.primary }]}>+ Add Meal</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
