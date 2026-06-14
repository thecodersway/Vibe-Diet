import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16181C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#24272D',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  labelText: {
    color: '#E6E8EC',
    fontSize: 15,
    fontWeight: '700',
  },
  valueText: {
    color: '#1A3F7A', // Deep dark-blue value font matching screenshot
    fontSize: 15,
    fontWeight: '800',
  },
});
