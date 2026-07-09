/**
 * CameraFeature Component
 * Renders a simulated AI food-scanner viewfinder with automated scanning overlays,
 * real-time HUD estimates, and an animated scanner line to look premium.
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useFocusEffect } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

const { width } = Dimensions.get('window');
const VIEWFINDER_SIZE = width * 0.85; // Made slightly larger as requested

interface ScannedMeal {
  id: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  ai_roast: string;
  image_url: string;
}

export default function CameraFeature() {
  const router = useRouter();
  const theme = useTheme();
  
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanAnim] = useState(() => new Animated.Value(0));
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScannedMeal | null>(null);

  // Capture photo from embedded live CameraView
  const takePhoto = async () => {
    if (!cameraRef.current) {
      Alert.alert('Camera Error', 'Camera feed is not active.');
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      if (photo) {
        setImageUri(photo.uri);
        setImageBase64(photo.base64 || null);
        // Automatically trigger the scan
        handleScan(photo.base64 || '');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
      Alert.alert('Camera Error', 'Could not capture photo.');
    }
  };

  // Open photo library
  const chooseFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'We need access to your photos to upload food.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false, // Bypass cropping
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        setImageUri(asset.uri);
        setImageBase64(asset.base64 || null);
        // Automatically trigger the scan
        handleScan(asset.base64 || '');
      }
    } catch (error) {
      Alert.alert('Gallery Error', 'Could not open the photo library.');
    }
  };

  useEffect(() => {
    // Loop the scanner line animation up and down the viewfinder box continuously until result is received
    if (!scanResult) {
      scanAnim.setValue(0);
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: VIEWFINDER_SIZE - 20,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => {
        animation.stop();
      };
    }
  }, [scanResult, scanAnim]);

  // Trigger Supabase Edge Function to upload and analyze image via Gemini
  const handleScan = async (base64Data: string) => {
    if (!base64Data) return;
    
    setIsScanning(true);
    try {
      // Determine default meal type based on local hours
      const hour = new Date().getHours();
      let mealType = 'Snack';
      if (hour >= 5 && hour < 11) mealType = 'Breakfast';
      else if (hour >= 11 && hour < 16) mealType = 'Lunch';
      else if (hour >= 16 && hour < 22) mealType = 'Dinner';

      const { data, error } = await supabase.functions.invoke('scan-food', {
        body: {
          image: `data:image/jpeg;base64,${base64Data}`,
          meal_type: mealType,
        },
      });

      if (error) throw error;
      if (!data) throw new Error('No data received from scanning service');

      setScanResult(data);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Scanning Failed', error.message || 'Gemini could not recognize the food. Try again.');
      resetScanner();
    } finally {
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setImageUri(null);
    setImageBase64(null);
    setScanResult(null);
    setIsScanning(false);
  };

  // Reset scanner states automatically when the user leaves/navigates away from this tab
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetScanner();
      };
    }, [])
  );

  const confirmLog = () => {
    resetScanner();
    // Go back to the dashboard, which will pull the new meal log from database
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.scannerContainer}>
        {/* Viewfinder block */}
        <View style={[styles.viewfinder, { width: VIEWFINDER_SIZE, height: VIEWFINDER_SIZE, borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.viewfinderImage} />
          ) : permission && permission.granted ? (
            <CameraView ref={cameraRef} style={styles.cameraView} facing="back" />
          ) : (
            <View style={styles.permissionPlaceholder}>
              <SymbolView name="camera.viewfinder" size={32} tintColor={theme.textSecondary} style={{ marginBottom: 8 }} />
              <Text style={[styles.permissionText, { color: theme.textSecondary }]}>
                Allow camera access to scan your food
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.permissionBtn, { backgroundColor: theme.primary }]}
                onPress={requestPermission}
              >
                <Text style={{ color: theme.textInverse, fontWeight: '700', fontSize: 12 }}>
                  Enable Camera
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.cornerTL, { borderColor: theme.primary }]} />
          <View style={[styles.cornerTR, { borderColor: theme.primary }]} />
          <View style={[styles.cornerBL, { borderColor: theme.primary }]} />
          <View style={[styles.cornerBR, { borderColor: theme.primary }]} />

          {/* Animated Scanner Line */}
          {!scanResult && (
            <Animated.View
              style={[
                styles.scannerLine,
                {
                  backgroundColor: theme.primary,
                  shadowColor: theme.primary,
                  transform: [{ translateY: scanAnim }],
                },
              ]}
            />
          )}
        </View>

        {/* Top Instructions */}
        <View style={styles.overlayTop}>
          <Text style={[styles.overlayTitle, { color: theme.text }]}>AI SCANNER</Text>
          <Text style={[styles.overlaySubtitle, { color: theme.textSecondary, backgroundColor: theme.backgroundElement }]}>
            Aim at your plate to check calories & vibes
          </Text>
        </View>

        {/* Shutter Controls */}
        {!isScanning && !scanResult && (
          <View style={styles.controlsRowWithGallery}>
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={chooseFromGallery}
              style={[styles.galleryButton, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
            >
              <SymbolView name="photo.on.rectangle" size={20} tintColor={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.shutterButton} onPress={takePhoto}>
              <View style={[styles.shutterInner, { backgroundColor: theme.primary }]} />
            </TouchableOpacity>

            <View style={{ width: 54 }} />
          </View>
        )}

        {/* HUD Scanner Readings while scanning */}
        {isScanning && (
          <View style={[styles.hudContainer, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <Text style={[styles.hudHeader, { color: theme.primary }]}>LOGGING FOOD & ANALYZING VIBES...</Text>
            <ActivityIndicator size="small" color={theme.primary} style={{ marginTop: 8 }} />
          </View>
        )}

        {/* Results Overlay Card */}
        {scanResult && (
          <View style={[styles.resultOverlay, { backgroundColor: theme.background + 'EE' }]}>
            <View style={[styles.resultCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <View style={styles.resultHeader}>
                <SymbolView name="sparkles" size={24} tintColor={theme.primary} />
                <Text style={[styles.resultFoodName, { color: theme.text, marginTop: 8 }]}>
                  {scanResult.food_name}
                </Text>
              </View>

              <View style={[styles.resultRoastBox, { backgroundColor: theme.backgroundSelected }]}>
                <Text style={[styles.resultRoastText, { color: theme.text }]}>
                  "{scanResult.ai_roast}"
                </Text>
              </View>

              <View style={styles.resultMacrosRow}>
                <View style={styles.resultMacroCol}>
                  <Text style={[styles.resultMacroVal, { color: theme.primary }]}>{scanResult.calories}</Text>
                  <Text style={[styles.resultMacroLbl, { color: theme.textSecondary }]}>CALORIES</Text>
                </View>
                <View style={styles.resultMacroCol}>
                  <Text style={[styles.resultMacroVal, { color: theme.text }]}>{scanResult.protein}g</Text>
                  <Text style={[styles.resultMacroLbl, { color: theme.textSecondary }]}>PROTEIN</Text>
                </View>
                <View style={styles.resultMacroCol}>
                  <Text style={[styles.resultMacroVal, { color: theme.text }]}>{scanResult.carbs}g</Text>
                  <Text style={[styles.resultMacroLbl, { color: theme.textSecondary }]}>CARBS</Text>
                </View>
                <View style={styles.resultMacroCol}>
                  <Text style={[styles.resultMacroVal, { color: theme.text }]}>{scanResult.fat}g</Text>
                  <Text style={[styles.resultMacroLbl, { color: theme.textSecondary }]}>FAT</Text>
                </View>
              </View>

              <Text style={[styles.resultIngredientsTitle, { color: theme.textSecondary }]}>INGREDIENTS</Text>
              <View style={styles.resultIngredientsList}>
                {scanResult.ingredients.map((ing, i) => (
                  <View key={i} style={[styles.resultIngredientTag, { backgroundColor: theme.backgroundSelected }]}>
                    <Text style={[styles.resultIngredientText, { color: theme.text }]}>{ing}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.buttonRow}>
                <View style={styles.buttonFlex}>
                  <Button label="Retake" variant="outline" onPress={resetScanner} />
                </View>
                <View style={styles.buttonFlex}>
                  <Button label="Log Meal" onPress={confirmLog} />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
