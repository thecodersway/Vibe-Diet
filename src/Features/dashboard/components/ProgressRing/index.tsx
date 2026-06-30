/**
 * ProgressRing Component
 * Renders a circular progress indicator using SVG. Calculates circle circumference
 * and active stroke offsets based on the target percentage.
 */

import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';

interface ProgressRingProps {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  eatenValue: number;
}

export function ProgressRing({
  size,
  strokeWidth,
  progress,
  color,
  eatenValue,
}: ProgressRingProps) {
  const theme = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.border}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.contentContainer}>
        <Text style={[styles.valueText, { color: theme.text }]}>{eatenValue}</Text>
        <Text style={[styles.labelText, { color: theme.textSecondary }]}>EATEN</Text>
      </View>
    </View>
  );
}
