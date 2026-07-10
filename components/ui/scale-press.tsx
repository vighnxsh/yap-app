import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ScalePressProps extends PressableProps {
  children: React.ReactNode;
  activeScale?: number;
  hapticStyle?: Haptics.ImpactFeedbackStyle;
}

export function ScalePress({
  children,
  style,
  activeScale = 0.95,
  hapticStyle = Haptics.ImpactFeedbackStyle.Light,
  onPressIn,
  onPressOut,
  ...props
}: ScalePressProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = (event: any) => {
    if (process.env.EXPO_OS !== 'web') {
      Haptics.impactAsync(hapticStyle).catch(() => {});
    }
    scale.value = withSpring(activeScale, {
      damping: 15,
      stiffness: 300,
    });
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    onPressOut?.(event);
  };

  return (
    <AnimatedPressable
      style={[style as any, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}>
      {children}
    </AnimatedPressable>
  );
}
