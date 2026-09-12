import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/hooks/use-theme';

export default function Index() {
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSessionAndRoute = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (!session) {
          router.replace('/auth/login');
          return;
        }

        // Fetch user profile to check onboarding completion
        const { data: profile, error } = await supabase
          .from('users')
          .select('goal')
          .eq('id', session.user.id)
          .single();

        if (!mounted) return;

        // If user exists and goal is set, they have completed onboarding
        if (profile && profile.goal) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding/carousel');
        }
      } catch (err) {
        if (mounted) {
          router.replace('/auth/login');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkSessionAndRoute();

    // Listen for auth changes (e.g. login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === 'SIGNED_IN' && session) {
        checkSessionAndRoute();
      } else if (event === 'SIGNED_OUT') {
        router.replace('/auth/login');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
