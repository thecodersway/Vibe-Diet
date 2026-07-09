import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A3F7A', // Deep dark-blue title
  },
  plateEmoji: {
    fontSize: 20,
  },
  seeAllButton: {
    backgroundColor: 'rgba(194, 255, 26, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(194, 255, 26, 0.15)',
  },
  seeAllText: {
    color: '#C2FF1A',
    fontSize: 12,
    fontWeight: '800',
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 120,
    marginBottom: 8,
  },
  leftLineColumn: {
    width: 24,
    alignItems: 'center',
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    top: 14,
    bottom: -18,
    width: 2,
    backgroundColor: '#24272D',
  },
  completedIndicatorOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(194, 255, 26, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(194, 255, 26, 0.4)',
    zIndex: 2,
  },
  completedIndicatorInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C2FF1A',
  },
  emptyIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#343842',
    backgroundColor: '#0D0F12',
    zIndex: 2,
  },
  rightCardColumn: {
    flex: 1,
    paddingLeft: 12,
  },
  mealCard: {
    backgroundColor: '#16181C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#24272D',
    padding: 16,
    alignItems: 'flex-start',
    gap: 8,
  },
  emptyCard: {
    borderStyle: 'dashed',
    borderColor: '#343842',
    backgroundColor: 'transparent',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  timeText: {
    color: '#8E939E',
    fontSize: 12,
    fontWeight: '800',
  },
  kcalBadge: {
    backgroundColor: '#C2FF1A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kcalBadgeText: {
    color: '#0D0F12',
    fontSize: 12,
    fontWeight: '800',
  },
  mealTitle: {
    color: '#1A3F7A', // Deep dark-blue header matching screenshots
    fontSize: 20,
    fontWeight: '900',
  },
  emptyMealTitle: {
    color: '#8E939E',
    fontSize: 20,
    fontWeight: '900',
  },
  mealDesc: {
    color: '#A6AEBB',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  manualFormCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  textInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  mealTypeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  mealTypeBtn: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTypeBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
  submitBtn: {
    flex: 1.5,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
  emptyListContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
});
