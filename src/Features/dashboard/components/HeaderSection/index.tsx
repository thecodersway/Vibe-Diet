/**
 * HeaderSection Component
 * Displays the daily vibe badge, dynamic welcome headline, and a floating profile
 * shortcut containing a neon user silhouette SVG icon.
 */

import { ProfileNeonIcon } from '@/asset';
import { useTheme } from '@/hooks/use-theme';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface HeaderSectionProps {
  vibeName: string;
}

export function HeaderSection({ vibeName }: HeaderSectionProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={[styles.vibeBadge, { backgroundColor: theme.accentBg, borderColor: theme.accentBorder }]}>
          <Text style={[styles.vibeBadgeText, { color: theme.accentSolid }]}>{"✨ TODAY'S VIBE"}</Text>
        </View>
        <Text style={[styles.titleText, { color: theme.text }]}>{vibeName} ✨</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={[styles.crownButton, { backgroundColor: theme.primaryMuted, borderColor: theme.accentBorder }]}>
        <View style={[styles.crownInner, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <ProfileNeonIcon color={theme.accentSolid} size={22} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
