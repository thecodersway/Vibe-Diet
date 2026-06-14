import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#16181C', // Dark premium glassmorphic background
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#24272D',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: '#8E939E',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  valueText: {
    color: '#1A3F7A', // Deep dark-blue text matching screenshots
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  unitText: {
    color: '#8E939E',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 6,
  },
  goalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(194, 255, 26, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(194, 255, 26, 0.15)',
  },
  goalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C2FF1A',
    marginRight: 6,
  },
  goalText: {
    color: '#C2FF1A',
    fontSize: 12,
    fontWeight: '800',
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  macroCol: {
    flex: 1,
    backgroundColor: '#1E2126',
    borderRadius: 16,
    padding: 12,
    alignItems: 'flex-start',
  },
  macroLabel: {
    color: '#8E939E',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  macroValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  macroCurrent: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  macroSlash: {
    color: '#6E737D',
    fontSize: 12,
    marginHorizontal: 2,
  },
  macroTarget: {
    color: '#6E737D',
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 4,
    width: '100%',
    backgroundColor: '#282C34',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    borderRadius: 2,
  },
});
