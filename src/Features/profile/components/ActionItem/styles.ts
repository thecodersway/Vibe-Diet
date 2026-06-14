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
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconEmoji: {
    fontSize: 18,
  },
  labelText: {
    color: '#1A3F7A', // Deep dark-blue matching screenshots
    fontSize: 16,
    fontWeight: '800',
  },
  destructiveText: {
    color: '#F43F5E', // Coral/salmon red for logout
    fontSize: 16,
    fontWeight: '800',
  },
  chevronText: {
    color: '#505663',
    fontSize: 16,
    fontWeight: '800',
  },
});
