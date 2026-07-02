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
});
