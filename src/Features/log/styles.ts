import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0F12',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8E939E',
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dateCard: {
    width: 50,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#16181C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#24272D',
  },
  activeDateCard: {
    backgroundColor: '#C2FF1A',
    borderColor: '#C2FF1A',
  },
  dateDay: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8E939E',
  },
  activeDateDay: {
    color: '#16181C',
  },
  dateNum: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },
  activeDateNum: {
    color: '#16181C',
  },
  summaryCard: {
    backgroundColor: '#16181C',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#24272D',
    marginBottom: 24,
  },
  summaryHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#C2FF1A',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8E939E',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  logList: {
    flex: 1,
  },
  logCard: {
    backgroundColor: '#16181C',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#24272D',
  },
  logInfo: {
    flex: 1,
  },
  logTime: {
    fontSize: 10,
    fontWeight: '800',
    color: '#C2FF1A',
    marginBottom: 4,
  },
  logName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  logDetails: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8E939E',
    marginTop: 2,
  },
  caloriesBadge: {
    backgroundColor: '#24272D',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  caloriesText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#C2FF1A',
  },
  addButton: {
    height: 54,
    backgroundColor: '#C2FF1A',
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
    // Glow shadow
    shadowColor: '#C2FF1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#16181C',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 130 : 116,
  },
});
