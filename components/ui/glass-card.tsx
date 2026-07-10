import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  borderRadius?: number;
}

export function GlassCard({
  children,
  style,
  intensity = 35,
  borderRadius = 24,
}: GlassCardProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const blurTint = theme === 'dark' ? 'dark' : 'light';
  const backgroundColor = theme === 'dark' ? 'rgba(21, 3, 10, 0.75)' : 'rgba(255, 255, 255, 0.75)';
  const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)';

  return (
    <BlurView
      intensity={intensity}
      tint={blurTint}
      style={[
        styles.card,
        {
          borderRadius,
          backgroundColor,
          borderColor,
        },
        style,
      ]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    // Diffused soft shadow
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    overflow: 'hidden',
  },
});
