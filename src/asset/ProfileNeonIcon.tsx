import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { IconProps } from './HomeIcon';

export function ProfileNeonIcon({ color = '#C2FF1A', size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth="2.5"
      />
      <Path
        d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
