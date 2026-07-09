import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';
import { styles as baseStyles } from '../styles';
import { SymbolView } from 'expo-symbols';

const GOALS = [
  { id: 'shred', title: 'Shredded 🔪', description: 'Lose fat, keep muscle' },
  { id: 'bulk', title: 'Bulking Szn 🐻', description: 'Build mass and strength' },
  { id: 'maintain', title: 'Maintain ✨', description: 'Keep it right, keep it tight' },
  { id: 'vibe_shift', title: 'Custom Era ✍️', description: 'Set your exact weight target' },
];

interface AIPlan {
  plan_title: string;
  duration_days: number;
  goal_type: 'cut' | 'bulk' | 'maintain';
  target_calories: number;
  target_protein: number;
  target_carbs: number;
  target_fat: number;
  description: string;
}

export default function GoalsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { age, gender, height, weight } = useLocalSearchParams<{
    age: string;
    gender: string;
    height: string;
    weight: string;
  }>();

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  
  // Custom weight plan states
  const [showTargetView, setShowTargetView] = useState(false);
  const [gainMass, setGainMass] = useState(false); // false = Lose Weight, true = Gain Mass
  const [weightDelta, setWeightDelta] = useState(5); // absolute kg delta
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPlans, setAiPlans] = useState<AIPlan[]>([]);
  const [selectedAiPlan, setSelectedAiPlan] = useState<AIPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const weightChange = gainMass ? weightDelta : -weightDelta;

  const handleGeneratePlans = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-plans', {
        body: {
          current_weight_kg: Number(weight),
          height_cm: Number(height),
          age: Number(age),
          gender: gender || 'Male',
          weight_change_kg: weightChange,
          activity_level: 'medium',
        },
      });

      if (error) throw error;
      if (!data || !Array.isArray(data)) throw new Error('Invalid plans array received');

      setAiPlans(data);
      setSelectedAiPlan(data[0]);
    } catch (err: any) {
      console.error('Error generating AI plans:', err);
      Alert.alert('AI Plan Generation Failed', err.message || 'Could not reach Gemini service.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleComplete = async () => {
    if (!selectedGoal) return;

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active login session found.');
      }

      const parsedAge = parseInt(age || '25', 10);
      const parsedWeight = parseFloat(weight || '70');
      const parsedHeight = parseFloat(height || '175');

      let planTitle = '';
      let goalType = '';
      let target_calories = 0;
      let target_protein = 0;
      let target_carbs = 0;
      let target_fat = 0;
      let durationDays = 30;
      let planDesc = '';
      let targetWeight = parsedWeight;

      if (selectedGoal === 'vibe_shift' && selectedAiPlan) {
        planTitle = selectedAiPlan.plan_title;
        goalType = selectedAiPlan.goal_type;
        target_calories = selectedAiPlan.target_calories;
        target_protein = selectedAiPlan.target_protein;
        target_carbs = selectedAiPlan.target_carbs;
        target_fat = selectedAiPlan.target_fat;
        durationDays = selectedAiPlan.duration_days;
        planDesc = selectedAiPlan.description;
        targetWeight = parsedWeight + weightChange;
      } else {
        goalType = selectedGoal === 'shred' ? 'cut' : selectedGoal === 'bulk' ? 'bulk' : 'maintain';
        planTitle = selectedGoal === 'shred' ? 'Standard Shred Quest' : selectedGoal === 'bulk' ? 'Standard Bulk Quest' : 'Standard Aura Maintenance';
        durationDays = selectedGoal === 'shred' ? 45 : selectedGoal === 'bulk' ? 60 : 90;
        targetWeight = selectedGoal === 'shred' ? parsedWeight - 3 : selectedGoal === 'bulk' ? parsedWeight + 4 : parsedWeight;
        planDesc = selectedGoal === 'shred' ? 'Cut body fat safely and maintain muscle mass.' : selectedGoal === 'bulk' ? 'Build quality muscle weight.' : 'Maintain current energy levels.';

        const calculatedCalories =
          gender === 'Male'
            ? (selectedGoal === 'shred' ? 1800 : selectedGoal === 'bulk' ? 2600 : 2200)
            : (selectedGoal === 'shred' ? 1400 : selectedGoal === 'bulk' ? 2200 : 1800);

        target_calories = Math.round(calculatedCalories);
        target_protein = Math.round((target_calories * 0.30) / 4);
        target_carbs = Math.round((target_calories * 0.40) / 4);
        target_fat = Math.round((target_calories * 0.30) / 9);
      }

      // 1. Update user targets in DB
      const { error: userError } = await supabase
        .from('users')
        .update({
          gender: gender || undefined,
          age: isNaN(parsedAge) ? undefined : parsedAge,
          height_cm: isNaN(parsedHeight) ? undefined : parsedHeight,
          current_weight_kg: isNaN(parsedWeight) ? undefined : parsedWeight,
          goal: goalType,
          target_calories,
          target_protein,
          target_carbs,
          target_fat,
        })
        .eq('id', session.user.id);

      if (userError) throw userError;

      // 2. Set past plans inactive
      const { error: deactivateError } = await supabase
        .from('weight_plans')
        .update({ is_active: false })
        .eq('user_id', session.user.id);

      if (deactivateError) throw deactivateError;

      // 3. Insert active plan
      const startDateStr = new Date().toISOString().split('T')[0];
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + durationDays);
      const endDateStr = endDate.toISOString().split('T')[0];

      const { error: insertPlanError } = await supabase
        .from('weight_plans')
        .insert({
          user_id: session.user.id,
          plan_title: planTitle,
          goal_type: goalType,
          start_weight_kg: parsedWeight,
          target_weight_kg: targetWeight,
          duration_days: durationDays,
          target_calories,
          target_protein,
          target_carbs,
          target_fat,
          plan_desc: planDesc,
          start_date: startDateStr,
          end_date: endDateStr,
          is_active: true,
        });

      if (insertPlanError) throw insertPlanError;

      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Save Setup Error', error.message || 'Something went wrong while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextAction = () => {
    if (selectedGoal === 'vibe_shift') {
      setShowTargetView(true);
    } else {
      handleComplete();
    }
  };

  // State flags for different layout steps
  const isCustomMode = selectedGoal === 'vibe_shift';
  const isDisplayingPlans = isCustomMode && aiPlans.length > 0;
  const isDisplayingTargetAdjustor = isCustomMode && showTargetView && aiPlans.length === 0;
  const isDisplayingGoalSelection = !showTargetView;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[baseStyles.safeArea, { backgroundColor: theme.background }]}>
      <View style={baseStyles.container}>
        
        {/* Progress Bar Track */}
        <View style={styles.progressHeader}>
          <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: '#C2FF1A',
                  width: isDisplayingPlans ? '100%' : isDisplayingTargetAdjustor ? '85%' : '66%',
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {isDisplayingPlans ? '3/3' : isDisplayingTargetAdjustor ? '2/2' : '2/2'}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}>
          {isDisplayingGoalSelection && (
            <>
              <Text style={[baseStyles.title, { textAlign: 'left', color: theme.text, fontSize: 30, fontWeight: '900', marginTop: 12 }]}>
                What's the vibe? 🎯
              </Text>
              <Text style={[baseStyles.subtitle, { textAlign: 'left', color: theme.textSecondary, marginBottom: 32 }]}>
                AI will build a custom plan based on this.
              </Text>

              {GOALS.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    { backgroundColor: theme.backgroundElement, borderColor: theme.border },
                    selectedGoal === goal.id && { borderColor: '#C2FF1A', backgroundColor: 'rgba(194, 255, 26, 0.08)' }
                  ]}
                  onPress={() => setSelectedGoal(goal.id)}
                >
                  <Text style={[styles.goalTitle, { color: theme.text }]}>{goal.title}</Text>
                  <Text style={[styles.goalDesc, { color: theme.textSecondary }]}>{goal.description}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {isDisplayingTargetAdjustor && (
            <>
              <Text style={[baseStyles.title, { textAlign: 'left', color: theme.text, fontSize: 30, fontWeight: '900', marginTop: 12 }]}>
                Set Your Target 🎯
              </Text>
              <Text style={[baseStyles.subtitle, { textAlign: 'left', color: theme.textSecondary, marginBottom: 32 }]}>
                Choose weight direction and specify your shifts.
              </Text>

              {/* Weight Plan Toggles */}
              <View style={[styles.toggleTrack, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.toggleBtn, !gainMass && { backgroundColor: '#C2FF1A' }]}
                  onPress={() => setGainMass(false)}
                >
                  <Text style={[styles.toggleBtnText, { color: !gainMass ? '#0D0F12' : theme.textSecondary }]}>
                    Lose Weight
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.toggleBtn, gainMass && { backgroundColor: '#C2FF1A' }]}
                  onPress={() => setGainMass(true)}
                >
                  <Text style={[styles.toggleBtnText, { color: gainMass ? '#0D0F12' : theme.textSecondary }]}>
                    Gain Mass
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Increment / Decrement Card */}
              <View style={[styles.adjustorCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.adjustorCircleBtn, { backgroundColor: theme.backgroundSelected }]}
                  onPress={() => setWeightDelta((prev) => Math.max(1, prev - 1))}
                >
                  <Text style={[styles.adjustorCircleBtnText, { color: theme.text }]}>-</Text>
                </TouchableOpacity>
                
                <Text style={[styles.adjustorValText, { color: theme.text }]}>
                  {weightDelta} <Text style={{ fontSize: 18, color: theme.textSecondary }}>kg</Text>
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.adjustorCircleBtn, { backgroundColor: '#C2FF1A' }]}
                  onPress={() => setWeightDelta((prev) => Math.min(25, prev + 1))}
                >
                  <Text style={[styles.adjustorCircleBtnText, { color: '#0D0F12' }]}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={{ color: theme.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 12 }}>
                Current Weight: {weight} kg  ➡️  Target Weight: {gainMass ? Number(weight) + weightDelta : Number(weight) - weightDelta} kg
              </Text>
            </>
          )}

          {isDisplayingPlans && (
            <>
              <Text style={[baseStyles.title, { textAlign: 'left', color: theme.text, fontSize: 30, fontWeight: '900', marginTop: 12 }]}>
                Choose Your Arc 🔮
              </Text>
              <Text style={[baseStyles.subtitle, { textAlign: 'left', color: theme.textSecondary, marginBottom: 24 }]}>
                AI generated these paths to hit your target.
              </Text>

              {aiPlans.map((plan, index) => {
                const isSelected = selectedAiPlan?.plan_title === plan.plan_title;
                const weeksVal = Math.round(plan.duration_days / 7);
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.85}
                    style={[
                      styles.planCard,
                      { backgroundColor: theme.backgroundElement, borderColor: theme.border },
                      isSelected && { borderColor: '#C2FF1A', backgroundColor: 'rgba(194, 255, 26, 0.08)' }
                    ]}
                    onPress={() => setSelectedAiPlan(plan)}
                  >
                    <View style={styles.planCardHeader}>
                      <Text style={[styles.planCardTitle, { color: theme.text }]}>{plan.plan_title}</Text>
                      <View style={[styles.planWeeksBadge, { backgroundColor: theme.border }]}>
                        <Text style={{ color: theme.text, fontSize: 11, fontWeight: '800' }}>{weeksVal} Weeks</Text>
                      </View>
                    </View>
                    
                    <Text style={{ color: theme.textSecondary, fontSize: 13, lineHeight: 18, marginBottom: 12 }}>
                      {plan.description}
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <View style={[styles.badgePill, { borderColor: '#C2FF1A', backgroundColor: 'rgba(194, 255, 26, 0.1)' }]}>
                        <Text style={{ color: '#C2FF1A', fontSize: 11, fontWeight: '800' }}>{plan.target_calories} kcal</Text>
                      </View>
                      <View style={[styles.badgePill, { borderColor: '#A855F7', backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
                        <Text style={{ color: '#A855F7', fontSize: 11, fontWeight: '800' }}>{plan.target_protein}g Protein</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </>
          )}
        </ScrollView>

        {/* Action Button */}
        <View style={{ paddingBottom: 16, paddingTop: 12 }}>
          {isDisplayingGoalSelection && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!selectedGoal}
              style={[styles.neonBtn, { backgroundColor: '#C2FF1A' }, !selectedGoal && { opacity: 0.5 }]}
              onPress={handleNextAction}
            >
              <Text style={styles.neonBtnText}>Calculate My Macros 🪄</Text>
            </TouchableOpacity>
          )}

          {isDisplayingTargetAdjustor && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={isGenerating}
              style={[styles.neonBtn, { backgroundColor: '#C2FF1A' }]}
              onPress={handleGeneratePlans}
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="#0D0F12" />
              ) : (
                <Text style={styles.neonBtnText}>See AI Plans ✨</Text>
              )}
            </TouchableOpacity>
          )}

          {isDisplayingPlans && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={isLoading || !selectedAiPlan}
              style={[styles.neonBtn, { backgroundColor: '#C2FF1A' }]}
              onPress={handleComplete}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#0D0F12" />
              ) : (
                <Text style={styles.neonBtnText}>Lock In Plan 🔒</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '800',
  },
  goalCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  goalDesc: {
    fontSize: 13,
    fontWeight: '500',
  },
  toggleTrack: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnText: {
    fontSize: 14,
    fontWeight: '900',
  },
  adjustorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
  },
  adjustorCircleBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#212225',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustorCircleBtnText: {
    fontSize: 28,
    fontWeight: '700',
  },
  adjustorValText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  planCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planCardTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  planWeeksBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePill: {
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  neonBtn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neonBtnText: {
    color: '#0D0F12',
    fontSize: 18,
    fontWeight: '900',
  },
});
