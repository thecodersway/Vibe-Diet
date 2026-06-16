import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D0F12', // Rich premium dark background
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 130 : 116,
  },
  divider: {
    height: 12, // Empty spacer separating metric card groups
  },
});
