import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { IconProps } from './HomeIcon';

export function AvatarIcon({ color = '#C2FF1A', size = 36 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="8"
        r="4.5"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M4.5 20C4.5 16.134 7.63401 13 11.5 13H12.5C16.366 13 19.5 16.134 19.5 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
