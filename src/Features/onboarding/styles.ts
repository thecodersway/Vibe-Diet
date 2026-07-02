import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D0F12',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B4BA',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#212225',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2E3135',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B0B4BA',
    marginBottom: 8,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#0274DF',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#212225',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  selectionCard: {
    backgroundColor: '#212225',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2E3135',
  },
  selectionCardActive: {
    borderColor: '#0274DF',
    backgroundColor: 'rgba(2, 116, 223, 0.1)',
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  selectionDesc: {
    fontSize: 14,
    color: '#B0B4BA',
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 48,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E3135',
  },
  dotActive: {
    backgroundColor: '#0274DF',
    width: 24,
  },
});
