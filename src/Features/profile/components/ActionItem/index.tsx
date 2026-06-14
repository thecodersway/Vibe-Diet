/**
 * ActionItem Component
 * Renders a button item in the profile list. Customizes settings list entries
 * with chevrons and destructive items like log out.
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface ActionItemProps {
  label: string;
  iconEmoji?: string;
  showChevron?: boolean;
  isDestructive?: boolean;
  onPress?: () => void;
}

export function ActionItem({
  label,
  iconEmoji,
  showChevron = false,
  isDestructive = false,
  onPress,
}: ActionItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        {iconEmoji && <Text style={styles.iconEmoji}>{iconEmoji}</Text>}
        <Text style={isDestructive ? styles.destructiveText : styles.labelText}>
          {label}
        </Text>
      </View>
      
      {showChevron && (
        <Text style={styles.chevronText}>{"›"}</Text>
      )}
    </TouchableOpacity>
  );
}
