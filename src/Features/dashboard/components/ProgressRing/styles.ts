import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F131D', // Deep dark font in the circle, matching the screenshot
    letterSpacing: -0.5,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#707784',
    marginTop: 1,
    letterSpacing: 0.5,
  },
});
