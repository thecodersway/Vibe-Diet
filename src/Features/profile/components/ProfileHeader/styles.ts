import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 28,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(168, 85, 247, 0.08)', // Soft purple glow
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A855F7', // Vibrant purple border
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#16181C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#24272D',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
    alignItems: 'flex-start',
    gap: 8,
  },
  nameText: {
    color: '#1A3F7A', // Deep dark-blue matching dashboard header
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
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
});
