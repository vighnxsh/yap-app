import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { BrandColors } from '@/constants/theme';

export function YapWordmark() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>
        YAP
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'LuckiestGuy-Regular',
    color: BrandColors.cherryPunch,
    fontSize: 21,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
});

