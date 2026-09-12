import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { styles as baseStyles } from '../styles';

export default function DetailsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | null>(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [showSexDropdown, setShowSexDropdown] = useState(false);

  const isValid =
    (age || '').trim().length > 0 &&
    gender !== null &&
    (height || '').trim().length > 0 &&
    (weight || '').trim().length > 0;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[baseStyles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={baseStyles.container}
      >
        {/* Progress Bar Header */}
        <View style={styles.progressHeader}>
          <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
            <View style={[styles.progressFill, { backgroundColor: '#C2FF1A', width: '50%' }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>1/2</Text>
        </View>

        <Text style={[baseStyles.title, { textAlign: 'left', color: theme.text, fontSize: 30, fontWeight: '900', marginTop: 24 }]}>
          Spill the stats ☕
        </Text>
        <Text style={[baseStyles.subtitle, { textAlign: 'left', color: theme.textSecondary, marginBottom: 32 }]}>
          We need this to calculate your daily fuel.
        </Text>

        {/* 2x2 Grid of Inputs */}
        <View style={baseStyles.row}>
          <View style={baseStyles.flex1}>
            <TextInput
              label="Age"
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>
          
          <View style={[baseStyles.flex1, { position: 'relative', zIndex: 50 }]}>
            <Text style={[baseStyles.label, { color: theme.textSecondary }]}>Sex</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowSexDropdown(!showSexDropdown)}
              style={[
                baseStyles.input,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.backgroundElement,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                },
              ]}
            >
              <Text style={{ color: gender ? theme.text : theme.textSecondary, fontSize: 16, fontWeight: '400' }}>
                {gender || 'Select Sex'}
              </Text>
            </TouchableOpacity>

            {showSexDropdown && (
              <View style={[styles.dropdownOverlay, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                {['Male', 'Female'].map((sex) => (
                  <TouchableOpacity
                    key={sex}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setGender(sex as any);
                      setShowSexDropdown(false);
                    }}
                  >
                    <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600' }}>{sex}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={baseStyles.row}>
          <View style={baseStyles.flex1}>
            <TextInput
              label="Weight (kg)"
              placeholder="Weight"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <View style={baseStyles.flex1}>
            <TextInput
              label="Height (cm)"
              placeholder="Height"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Lime Green Neon Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isValid}
          style={[
            styles.nextBtn,
            { backgroundColor: '#C2FF1A' },
            !isValid && { opacity: 0.5 }
          ]}
          onPress={() => router.push({
            pathname: '/onboarding/goals',
            params: { age, gender: gender || '', height, weight }
          })}
        >
          <Text style={styles.nextBtnText}>Next Vibe</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  dropdownOverlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    borderRadius: 16,
    borderWidth: 1,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  nextBtn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  nextBtnText: {
    color: '#0D0F12',
    fontSize: 18,
    fontWeight: '900',
  },
});
