/**
 * BottomTabBar Component
 * Custom bottom tab bar rendering for Expo Router.
 * Configures the floating navigation panel, central elevated camera button,
 * active indicator states, and raw SVG navigation path icons.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { HomeIcon, LogIcon, CameraIcon, AuraIcon, MeIcon } from '@/asset';

function getTabLabel(routeName: string) {
  switch (routeName) {
    case 'index':
      return 'Home';
    case 'log':
      return 'Log';
    case 'aura':
      return 'Aura';
    case 'me':
      return 'Me';
    default:
      return '';
  }
}

function renderIcon(routeName: string, isFocused: boolean) {
  const color = isFocused ? '#C2FF1A' : '#8E939E';

  switch (routeName) {
    case 'index':
      return <HomeIcon color={color} size={24} />;
    case 'log':
      return <LogIcon color={color} size={24} />;
    case 'camera':
      return <CameraIcon color="#16181C" size={26} />;
    case 'aura':
      return <AuraIcon color={color} size={24} />;
    case 'me':
      return <MeIcon color={color} size={24} />;
    default:
      return null;
  }
}

export function BottomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Render Special Camera tab button differently in the center
        if (route.name === 'camera') {
          return (
            <View key={route.key} style={styles.cameraButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.cameraButton}
              >
                {renderIcon('camera', true)}
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {renderIcon(route.name, isFocused)}
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? '#C2FF1A' : '#8E939E' },
              ]}
            >
              {getTabLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
