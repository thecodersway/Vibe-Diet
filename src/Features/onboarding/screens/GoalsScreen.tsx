import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';
import { styles } from '../styles';

const GOALS = [
  { id: 'shred', title: 'Get Shredded', description: 'Lose body fat while maintaining muscle mass' },
  { id: 'maintain', title: 'Maintain Weight', description: 'Stay at your current weight and improve fitness' },
  { id: 'bulk', title: 'Build Muscle', description: 'Gain healthy weight and increase muscle size' },
];

export default function GoalsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleComplete = () => {
    // Just navigate to the tabs without saving anything for now
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 40 }}>
          <Text style={[styles.title, { textAlign: 'left', color: theme.text }]}>What's your goal?</Text>
          <Text style={[styles.subtitle, { textAlign: 'left', color: theme.textSecondary, marginBottom: 40 }]}>
            Choose your primary objective so we can tailor your experience.
          </Text>

          {GOALS.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.selectionCard,
                { backgroundColor: theme.backgroundElement, borderColor: theme.border },
                selectedGoal === goal.id && { borderColor: theme.primary, backgroundColor: theme.primary + '1A' }
              ]}
              onPress={() => setSelectedGoal(goal.id)}
            >
              <Text style={[styles.selectionTitle, { color: theme.text }]}>{goal.title}</Text>
              <Text style={[styles.selectionDesc, { color: theme.textSecondary }]}>{goal.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ paddingBottom: 24, paddingTop: 16 }}>
          <Button 
            label="Finish Setup"
            disabled={!selectedGoal}
            onPress={handleComplete}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
