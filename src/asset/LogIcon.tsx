import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { IconProps } from './HomeIcon';

export function LogIcon({ color = '#8E939E', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="5" width="18" height="16" rx="2.5" stroke={color} strokeWidth="2.5" />
      <Path d="M3 10H21" stroke={color} strokeWidth="2.5" />
      <Path d="M8 2V5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M16 2V5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Circle cx="8" cy="14" r="1" fill={color} />
      <Circle cx="12" cy="14" r="1" fill={color} />
      <Circle cx="16" cy="14" r="1" fill={color} />
    </Svg>
  );
}
