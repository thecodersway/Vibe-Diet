import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 8,
    paddingRight: 16,
  },
  vibeBadge: {
    backgroundColor: '#1E2B1E', // Dark green-tinted background
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C2FF1A33',
  },
  vibeBadgeText: {
    color: '#C2FF1A', // Bright green-yellow accent
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  titleText: {
    color: '#1A3F7A', // Deep dark-blue text matching the screenshot
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  crownButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(194, 255, 26, 0.08)', // Soft yellow/green glow
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(194, 255, 26, 0.25)',
    shadowColor: '#C2FF1A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  crownInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E2024',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D3139',
  },
});
