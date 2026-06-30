import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { styles } from '../styles';

export default function DetailsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | null>(null);

  const isValid = name.trim().length > 0 && age.trim().length > 0 && gender !== null;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={[styles.title, { textAlign: 'left', color: theme.text }]}>Tell us about yourself</Text>
        <Text style={[styles.subtitle, { textAlign: 'left', color: theme.textSecondary }]}>This helps us calculate your optimal macros.</Text>

        <TextInput
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          label="Age"
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={[styles.label, { color: theme.textSecondary }]}>Gender</Text>
        <View style={styles.row}>
          {['Male', 'Female', 'Other'].map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.flex1,
                styles.selectionCard,
                { backgroundColor: theme.backgroundElement, borderColor: theme.border, padding: 16, marginBottom: 0 },
                gender === g && { borderColor: theme.primary, backgroundColor: theme.primary + '1A' }
              ]}
              onPress={() => setGender(g as any)}
            >
              <Text style={[styles.selectionTitle, { color: theme.text, fontSize: 16, textAlign: 'center', marginBottom: 0 }]}>
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <Button 
          label="Continue"
          disabled={!isValid}
          onPress={() => router.push('/onboarding/goals')}
          style={{ marginTop: 24 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
