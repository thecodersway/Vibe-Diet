import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 20,
    left: 16,
    right: 16,
    height: 76,
    backgroundColor: '#16181C',
    borderRadius: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#24272D',
    // Premium soft shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  // Centered Floating Camera Button styling
  cameraButtonContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  cameraButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#C2FF1A', // Signature neon green-yellow
    alignItems: 'center',
    justifyContent: 'center',
    // Shifting it upwards to overlap the top edge of the tab bar
    transform: [{ translateY: -22 }],
    // Thick outline to create the dark cut-out effect
    borderWidth: 5,
    borderColor: '#0D0F12', // Matches the screen background color
    // Glowing neon shadow
    shadowColor: '#C2FF1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
});
