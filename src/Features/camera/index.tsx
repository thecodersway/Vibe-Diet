/**
 * CameraFeature Component
 * Renders a simulated AI food-scanner viewfinder with automated scanning overlays,
 * real-time HUD estimates, and an animated scanner line to look premium.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { styles } from './styles';

const { width } = Dimensions.get('window');
const VIEWFINDER_SIZE = width * 0.75;

export default function CameraFeature() {
  const [scanAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // Loop the scanner line animation up and down the viewfinder box
    const startAnimation = () => {
      scanAnim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: VIEWFINDER_SIZE - 20,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [scanAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        {/* Viewfinder block */}
        <View style={styles.viewfinder}>
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          {/* Animated Scanner Line */}
          <Animated.View
            style={[
              styles.scannerLine,
              {
                transform: [{ translateY: scanAnim }],
              },
            ]}
          />
        </View>

        {/* Top Instructions */}
        <View style={styles.overlayTop}>
          <Text style={styles.overlayTitle}>AI SCANNER</Text>
          <Text style={styles.overlaySubtitle}>Aim at your plate to check calories & vibes</Text>
        </View>

        {/* Shutter Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity activeOpacity={0.8} style={styles.shutterButton}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        </View>

        {/* HUD Scanner Readings */}
        <View style={styles.hudContainer}>
          <Text style={styles.hudHeader}>DETECTING NUTRIENTS...</Text>
          <View style={styles.hudRow}>
            <View style={styles.hudItem}>
              <Text style={styles.hudValue}>Salmon Bowl</Text>
              <Text style={styles.hudLabel}>PREDICTION</Text>
            </View>
            <View style={styles.hudItem}>
              <Text style={styles.hudValue}>~450 kcal</Text>
              <Text style={styles.hudLabel}>EST. ENERGY</Text>
            </View>
            <View style={styles.hudItem}>
              <Text style={styles.hudValue}>88%</Text>
              <Text style={styles.hudLabel}>ACCURACY</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
