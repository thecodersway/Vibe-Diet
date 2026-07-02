import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from './HomeIcon';

export function CameraIcon({ color = '#16181C', size = 26 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="13.5" r="3.5" stroke={color} strokeWidth="2.5" />
    </Svg>
  );
}
