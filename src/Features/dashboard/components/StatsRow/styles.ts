import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16181C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#24272D',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterIconWrapper: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  burnedIconWrapper: {
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.15)',
  },
  iconEmoji: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  label: {
    color: '#8E939E',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  plusIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#24272D',
  },
});
