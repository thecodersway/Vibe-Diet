/**
 * FuelCard Component
 * Displays remaining calories, goal thresholds, a ProgressRing overview,
 * and a grid of progress bar gauges for Protein, Carbs, and Fats.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { ProgressRing } from '../ProgressRing';
import { Macro } from '../../types';
import { styles } from './styles';
import { useTheme } from '@/hooks/use-theme';

interface FuelCardProps {
  remainingFuel: number;
  goalFuel: number;
  eatenFuel: number;
  macros: Macro[];
}

export function FuelCard({
  remainingFuel,
  goalFuel,
  eatenFuel,
  macros,
}: FuelCardProps) {
  const theme = useTheme();
  const formatNum = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const progressRatio = Math.min(eatenFuel / goalFuel, 1);

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      <View style={styles.topRow}>
        <View style={styles.leftColumn}>
          <Text style={[styles.labelText, { color: theme.textSecondary }]}>FUEL REMAINING</Text>
          <View style={styles.valueRow}>
            <Text style={[styles.valueText, { color: theme.text }]}>{formatNum(remainingFuel)}</Text>
            <Text style={[styles.unitText, { color: theme.textSecondary }]}>kcal</Text>
          </View>
          <View style={[styles.goalBadge, { backgroundColor: theme.accentBg, borderColor: theme.accentBorder }]}>
            <View style={[styles.goalDot, { backgroundColor: theme.accentSolid }]} />
            <Text style={[styles.goalText, { color: theme.accentSolid }]}>Goal: {formatNum(goalFuel)}</Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <ProgressRing
            size={110}
            strokeWidth={10}
            progress={progressRatio}
            color={theme.accentSolid}
            eatenValue={eatenFuel}
          />
        </View>
      </View>

      <View style={styles.macrosRow}>
        {macros.map((macro) => {
          const ratio = Math.min(macro.current / macro.target, 1);
          return (
            <View key={macro.name} style={[styles.macroCol, { backgroundColor: theme.backgroundSelected }]}>
              <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>{macro.name.toUpperCase()}</Text>
              <View style={styles.macroValueContainer}>
                <Text style={[styles.macroCurrent, { color: theme.text }]}>{macro.current}</Text>
                <Text style={[styles.macroSlash, { color: theme.textSecondary }]}>/</Text>
                <Text style={[styles.macroTarget, { color: theme.textSecondary }]}>{macro.target}{macro.unit}</Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
                <View
                  style={[
                    styles.progressBarActive,
                    {
                      width: `${ratio * 100}%`,
                      backgroundColor: macro.color === '#C2FF1A' ? theme.accentSolid : macro.color,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
