/**
 * LogFeature Component
 * Manages display of daily logged food items, macro nutrients recap,
 * and date picker selection list with glassmorphic cards.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';

interface LogItem {
  id: string;
  time: string;
  name: string;
  amount: string;
  calories: number;
}

const MOCK_LOG_ITEMS: LogItem[] = [
  { id: '1', time: '08:30 AM', name: 'Avocado Toast & Poached Egg', amount: '1 plate', calories: 340 },
  { id: '2', time: '09:00 AM', name: 'Ceremonial Matcha Latte', amount: '12 oz', calories: 85 },
  { id: '3', time: '01:15 PM', name: 'Grilled Chicken & Quinoa Salad', amount: '1 bowl', calories: 520 },
  { id: '4', time: '04:00 PM', name: 'Whey Protein Shake', amount: '1 scoop', calories: 140 },
  { id: '5', time: '07:45 PM', name: 'Baked Salmon with Asparagus', amount: '1 fillet', calories: 410 },
];

const WEEK_DAYS = [
  { day: 'MON', num: '15' },
  { day: 'TUE', num: '16', active: true },
  { day: 'WED', num: '17' },
  { day: 'THU', num: '18' },
  { day: 'FRI', num: '19' },
];

export default function LogFeature() {
  const [selectedNum, setSelectedNum] = useState('16');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>DIET LOG</Text>
          <Text style={styles.subtitle}>Track your daily vibe fuel</Text>
        </View>
      </View>

      {/* Date Carousel */}
      <View style={styles.dateContainer}>
        {WEEK_DAYS.map((item) => {
          const isActive = selectedNum === item.num;
          return (
            <TouchableOpacity
              key={item.num}
              activeOpacity={0.8}
              onPress={() => setSelectedNum(item.num)}
              style={[styles.dateCard, isActive && styles.activeDateCard]}
            >
              <Text style={[styles.dateDay, isActive && styles.activeDateDay]}>
                {item.day}
              </Text>
              <Text style={[styles.dateNum, isActive && styles.activeDateNum]}>
                {item.num}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Macros Recap */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryHeader}>{"TODAY'S FUEL RECAP"}</Text>
        <View style={styles.macroRow}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>1,495</Text>
            <Text style={styles.macroLabel}>CALORIES</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>112g</Text>
            <Text style={styles.macroLabel}>PROTEIN</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>142g</Text>
            <Text style={styles.macroLabel}>CARBS</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>48g</Text>
            <Text style={styles.macroLabel}>FATS</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Logged Items</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.logList}
        contentContainerStyle={styles.scrollContent}
      >
        {MOCK_LOG_ITEMS.map((item) => (
          <View key={item.id} style={styles.logCard}>
            <View style={styles.logInfo}>
              <Text style={styles.logTime}>{item.time}</Text>
              <Text style={styles.logName}>{item.name}</Text>
              <Text style={styles.logDetails}>{item.amount}</Text>
            </View>
            <View style={styles.caloriesBadge}>
              <Text style={styles.caloriesText}>+{item.calories} kcal</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity activeOpacity={0.8} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ QUICK LOG FOOD</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
