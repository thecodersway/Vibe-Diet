import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface IconProps {
  color?: string;
  size?: number;
}

export function HomeIcon({ color = '#8E939E', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H14V14H10V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
