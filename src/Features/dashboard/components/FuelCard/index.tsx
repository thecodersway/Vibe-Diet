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
  const formatNum = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const progressRatio = Math.min(eatenFuel / goalFuel, 1);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topRow}>
        <View style={styles.leftColumn}>
          <Text style={styles.labelText}>FUEL REMAINING</Text>
          <View style={styles.valueRow}>
            <Text style={styles.valueText}>{formatNum(remainingFuel)}</Text>
            <Text style={styles.unitText}>kcal</Text>
          </View>
          <View style={styles.goalBadge}>
            <View style={styles.goalDot} />
            <Text style={styles.goalText}>Goal: {formatNum(goalFuel)}</Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <ProgressRing
            size={110}
            strokeWidth={10}
            progress={progressRatio}
            color="#C2FF1A"
            eatenValue={eatenFuel}
          />
        </View>
      </View>

      <View style={styles.macrosRow}>
        {macros.map((macro) => {
          const ratio = Math.min(macro.current / macro.target, 1);
          return (
            <View key={macro.name} style={styles.macroCol}>
              <Text style={styles.macroLabel}>{macro.name.toUpperCase()}</Text>
              <View style={styles.macroValueContainer}>
                <Text style={styles.macroCurrent}>{macro.current}</Text>
                <Text style={styles.macroSlash}>/</Text>
                <Text style={styles.macroTarget}>{macro.target}{macro.unit}</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarActive,
                    {
                      width: `${ratio * 100}%`,
                      backgroundColor: macro.color,
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
