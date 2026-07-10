import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { ThemedText } from '../themed-text';
import { ScalePress } from './scale-press';
import { GlassCard } from './glass-card';
import { CelebrationConfig } from '@/constants/celebrations';
import { BrandColors } from '@/constants/theme';
import * as Haptics from 'expo-haptics';

interface CelebrationTriggerProps {
  type: 'streak_7' | 'fluency_90' | 'top_10' | null;
  visible: boolean;
  onClose: () => void;
}

export function CelebrationTrigger({ type, visible, onClose }: CelebrationTriggerProps) {
  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0);

  const handleDismiss = useCallback(() => {
    opacity.value = withTiming(0, { duration: 250 }, () => {
      runOnJS(onClose)();
    });
    scale.value = withTiming(0.85, { duration: 250 });
  }, [opacity, scale, onClose]);

  useEffect(() => {
    if (visible && type) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }

      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 14, stiffness: 140 });

      const timer = setTimeout(() => {
        handleDismiss();
      }, 4800);

      return () => clearTimeout(timer);
    }
  }, [visible, type, opacity, scale, handleDismiss]);

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (!visible || !type) return null;

  const config = CelebrationConfig[type];

  return (
    <Animated.View style={[styles.backdrop, backdropStyle]}>
      <Animated.View style={[styles.cardContainer, cardStyle]}>
        <GlassCard style={styles.card} intensity={40}>
          <Image
            source={{ uri: config.gifUrl }}
            style={styles.gif}
            contentFit="contain"
          />
          <ThemedText style={styles.title}>{config.title}</ThemedText>
          <ThemedText style={styles.subtitle}>{config.subtitle}</ThemedText>
          <ScalePress
            style={styles.btn}
            onPress={handleDismiss}
            activeScale={0.95}>
            <ThemedText style={styles.btnText}>Ek Number! ⚡</ThemedText>
          </ScalePress>
        </GlassCard>
      </Animated.View>
    </Animated.View>
  );
}

interface EasterEggToastProps {
  visible: boolean;
  onClose: () => void;
}

export function EasterEggToast({ visible, onClose }: EasterEggToastProps) {
  const yVal = useSharedValue(-150);

  useEffect(() => {
    if (visible) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      }
      yVal.value = withSpring(64, { damping: 12, stiffness: 120 });

      const timer = setTimeout(() => {
        yVal.value = withTiming(-150, { duration: 300 }, () => {
          runOnJS(onClose)();
        });
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose, yVal]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: yVal.value }],
    };
  });

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, animatedStyle]}>
      <GlassCard style={styles.toastCard} intensity={45} borderRadius={16}>
        <View style={styles.toastRow}>
          <ThemedText style={styles.toastText}>six-seven 🎯</ThemedText>
          <ThemedText style={styles.toastSub}>Easter egg unlocked! Perfect speaking vibe rhythm.</ThemedText>
        </View>
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 1, 4, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  cardContainer: {
    width: '85%',
    maxWidth: 340,
  },
  card: {
    alignItems: 'center',
    padding: 24,
    borderWidth: 1.5,
  },
  gif: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
    fontFamily: 'ui-rounded',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 24,
  },
  btn: {
    width: '100%',
    height: 48,
    backgroundColor: '#0A0104',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '900',
    color: BrandColors.chartreuse,
  },
  // Toast Styles
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toastCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: BrandColors.cherryPunch,
    shadowColor: BrandColors.cherryPunch,
    shadowOpacity: 0.1,
  },
  toastRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
  },
  toastText: {
    fontSize: 15,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
    fontFamily: 'ui-rounded',
  },
  toastSub: {
    fontSize: 12,
    opacity: 0.7,
  },
});
