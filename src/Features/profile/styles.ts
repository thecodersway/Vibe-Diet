import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  dropdownContainer: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '800',
  },
  dropdownHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdownSelectedText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dropdownChevron: {
    fontSize: 10,
    fontWeight: '800',
  },
  dropdownList: {
    borderTopWidth: 1,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '800',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  planCard: {
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 20,
    gap: 16,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  planSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  daysBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  daysBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrackWrapper: {
    gap: 8,
  },
  progressBarOuter: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    borderRadius: 4,
  },
  weightLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightLabelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  planFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 14,
    gap: 10,
  },
  planDescText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  planKcalText: {
    fontSize: 13,
    fontWeight: '800',
  },
  planDaysLeft: {
    fontSize: 12,
    fontWeight: '800',
  },
});
