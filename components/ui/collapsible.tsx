import React, { PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScalePress } from './scale-press';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  // Shared values for animating height and opacity
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    // Physical custom curve for iOS feels: --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)
    const easing = Easing.bezier(0.32, 0.72, 0, 1);

    animatedHeight.value = withTiming(nextState ? contentHeight : 0, {
      duration: 250,
      easing,
    });
    animatedOpacity.value = withTiming(nextState ? 1 : 0, {
      duration: 200,
      easing,
    });
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && height !== contentHeight) {
      setContentHeight(height);
      if (isOpen) {
        animatedHeight.value = height;
      }
    }
  };

  // Rotating chevron animation style
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withTiming(isOpen ? 90 : 0, {
      duration: 200,
      easing: Easing.bezier(0.32, 0.72, 0, 1),
    });
  }, [isOpen, rotation]);

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const contentContainerStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      opacity: animatedOpacity.value,
    };
  });

  return (
    <ThemedView style={styles.container}>
      <ScalePress
        style={styles.heading}
        onPress={toggleOpen}
        activeScale={0.97}>
        <Animated.View style={chevronStyle}>
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          />
        </Animated.View>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </ScalePress>

      <Animated.View style={[styles.contentContainer, contentContainerStyle]}>
        <View
          style={styles.measuredContent}
          onLayout={onLayout}>
          {children}
        </View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  measuredContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingLeft: 26,
    paddingTop: 4,
    paddingBottom: 8,
  },
});

