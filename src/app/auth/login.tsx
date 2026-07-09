import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Optional name during signup
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        // Sign Up Flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name.trim() || undefined,
            },
            emailRedirectTo: 'vibediet://auth-callback',
          },
        });
        
        if (error) throw error;
        
        if (data.session) {
          // Already logged in directly (e.g. email verification is disabled)
          router.replace('/onboarding/carousel');
        } else {
          Alert.alert('Success', 'Verification email sent. Please check your inbox.');
          setIsSignUp(false); // Toggle to Sign In
        }
      } else {
        // Sign In Flow
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Redirect handled by root app session listener / index redirect
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.brandText, { color: theme.primary }]}>VIBE-DIET</Text>
            <Text style={[styles.title, { color: theme.text }]}>
              {isSignUp ? 'Create your profile' : 'Welcome back'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isSignUp 
                ? 'Sign up to customize your macro fuel tracker.' 
                : 'Log in to check your daily vibe fuel logs.'}
            </Text>
          </View>

          <View style={styles.form}>
            {isSignUp && (
              <TextInput
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}

            <TextInput
              label="Email Address"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Button
              label={isSignUp ? 'Sign Up' : 'Log In'}
              onPress={handleAuth}
              isLoading={isLoading}
              style={styles.submitButton}
            />

            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => setIsSignUp(!isSignUp)}
              style={styles.switchContainer}
            >
              <Text style={[styles.switchText, { color: theme.textSecondary }]}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text style={{ color: theme.primary, fontWeight: '800' }}>
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Inline Touch opacity mapping since we don't import TouchOpacity directly in React Native view declarations.
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
const TouchableOpacity = RNTouchableOpacity;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  brandText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  form: {
    gap: 8,
  },
  submitButton: {
    marginTop: 16,
  },
  switchContainer: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
