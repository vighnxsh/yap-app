import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ScalePress } from '@/components/ui/scale-press';
import { YapWordmark } from '@/components/ui/wordmark';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, BrandColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { CelebrationTrigger, EasterEggToast } from '@/components/ui/celebration-trigger';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  // Speaking state
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [streakCount, setStreakCount] = useState(5);
  const [mumbaiRank, setMumbaiRank] = useState(12);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'recording' | 'completed'>('idle');
  const [mockScore, setMockScore] = useState(0);

  // Celebration state
  const [celebrationType, setCelebrationType] = useState<'streak_7' | 'fluency_90' | 'top_10' | null>(null);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const [easterEggVisible, setEasterEggVisible] = useState(false);

  // Reanimated shared values
  const pulse1Scale = useSharedValue(1);
  const pulse1Opacity = useSharedValue(0);
  const pulse2Scale = useSharedValue(1);
  const pulse2Opacity = useSharedValue(0);

  // Waveform heights
  const bar1 = useSharedValue(8);
  const bar2 = useSharedValue(12);
  const bar3 = useSharedValue(6);
  const bar4 = useSharedValue(18);
  const bar5 = useSharedValue(10);
  const bar6 = useSharedValue(14);
  const bar7 = useSharedValue(8);

  // Seconds timer
  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // Pulse record ring loop
  useEffect(() => {
    if (isRecording) {
      pulse1Scale.value = withRepeat(
        withTiming(2.2, { duration: 1300, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      pulse1Opacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 200 }),
          withTiming(0, { duration: 1100, easing: Easing.out(Easing.ease) })
        ),
        -1,
        false
      );

      pulse2Scale.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 250 }),
          withTiming(2.4, { duration: 1050, easing: Easing.out(Easing.ease) })
        ),
        -1,
        false
      );
      pulse2Opacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 250 }),
          withTiming(0, { duration: 1050, easing: Easing.out(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      pulse1Scale.value = withTiming(1, { duration: 300 });
      pulse1Opacity.value = withTiming(0, { duration: 300 });
      pulse2Scale.value = withTiming(1, { duration: 300 });
      pulse2Opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isRecording, pulse1Scale, pulse1Opacity, pulse2Scale, pulse2Opacity]);

  // Waveform live bars animation
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        bar1.value = withTiming(Math.random() * 32 + 8, { duration: 90 });
        bar2.value = withTiming(Math.random() * 42 + 10, { duration: 90 });
        bar3.value = withTiming(Math.random() * 26 + 6, { duration: 90 });
        bar4.value = withTiming(Math.random() * 46 + 14, { duration: 90 });
        bar5.value = withTiming(Math.random() * 36 + 10, { duration: 90 });
        bar6.value = withTiming(Math.random() * 42 + 12, { duration: 90 });
        bar7.value = withTiming(Math.random() * 26 + 8, { duration: 90 });
      }, 100);
    } else {
      const settle = { duration: 250 };
      bar1.value = withTiming(8, settle);
      bar2.value = withTiming(8, settle);
      bar3.value = withTiming(8, settle);
      bar4.value = withTiming(8, settle);
      bar5.value = withTiming(8, settle);
      bar6.value = withTiming(8, settle);
      bar7.value = withTiming(8, settle);
    }
    return () => clearInterval(interval);
  }, [isRecording, bar1, bar2, bar3, bar4, bar5, bar6, bar7]);

  const handleStreakPress = () => {
    const nextStreak = streakCount + 1;
    setStreakCount(nextStreak);
    if (nextStreak === 7) {
      setCelebrationType('streak_7');
      setCelebrationVisible(true);
    } else {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
    }
  };

  const handleLeaderboardPress = () => {
    // If we are already rank 12, rank up to top 10 (rank 9) and trigger rank-up celebration
    if (mumbaiRank === 12) {
      setMumbaiRank(9);
      setCelebrationType('top_10');
      setCelebrationVisible(true);
    } else {
      // Navigate to rankings tab
      router.push('/leaderboard');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setFeedbackState('completed');
      
      // Generate a mock score: 70% chance to score >= 90 (to show off the celebration), 30% chance for a lower score
      const randomScore = Math.random() > 0.3 ? 92 : 82;
      setMockScore(randomScore);

      if (randomScore >= 90) {
        setCelebrationType('fluency_90');
        setCelebrationVisible(true);
      } else {
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        }
      }
    } else {
      setIsRecording(true);
      setFeedbackState('recording');
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      }
    }
  };

  const trigger67EasterEgg = () => {
    setMockScore(67);
    setEasterEggVisible(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Reanimated style bindings
  const animPulse1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse1Scale.value }],
    opacity: pulse1Opacity.value,
  }));

  const animPulse2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse2Scale.value }],
    opacity: pulse2Opacity.value,
  }));

  const animBar1 = useAnimatedStyle(() => ({ height: bar1.value }));
  const animBar2 = useAnimatedStyle(() => ({ height: bar2.value }));
  const animBar3 = useAnimatedStyle(() => ({ height: bar3.value }));
  const animBar4 = useAnimatedStyle(() => ({ height: bar4.value }));
  const animBar5 = useAnimatedStyle(() => ({ height: bar5.value }));
  const animBar6 = useAnimatedStyle(() => ({ height: bar6.value }));
  const animBar7 = useAnimatedStyle(() => ({ height: bar7.value }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]} edges={['top']}>
      {/* Celebration & Toast Overlays */}
      <CelebrationTrigger
        type={celebrationType}
        visible={celebrationVisible}
        onClose={() => setCelebrationVisible(false)}
      />
      <EasterEggToast
        visible={easterEggVisible}
        onClose={() => setEasterEggVisible(false)}
      />

      {/* Ambient background blurred blobs */}
      <View style={styles.blobContainer}>
        <View style={styles.cherryBlob} />
        <View style={styles.chartreuseBlob} />
        <BlurView intensity={Platform.OS === 'ios' ? 95 : 60} style={StyleSheet.absoluteFill} tint="default" />
      </View>

      {/* Header (Wordmark left, Streak pill right) */}
      <View style={styles.header}>
        <YapWordmark />
        <ScalePress style={styles.streakBadge} onPress={handleStreakPress} activeScale={0.93}>
          <ThemedText style={styles.streakText}>🔥 {streakCount}</ThemedText>
        </ScalePress>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Glass Card (Today's 1-min yap) */}
        <GlassCard style={styles.heroCard}>
          <ThemedText style={styles.smallUpperLabel}>TODAY{"'"}S 1-MIN YAP</ThemedText>
          <ThemedText type="subtitle" style={styles.promptHeadline}>
            Which place serves the absolute best cutting chai in Bombay? Ya phir your favorite midnight spot?
          </ThemedText>

          {/* Interactive Record button and audio states */}
          <View style={styles.recordSection}>
            {isRecording ? (
              <View style={styles.visualizerActive}>
                <ThemedText style={styles.timerText}>{formatTime(seconds)}</ThemedText>
                <View style={styles.waveform}>
                  <Animated.View style={[styles.waveBar, animBar1]} />
                  <Animated.View style={[styles.waveBar, animBar2]} />
                  <Animated.View style={[styles.waveBar, animBar3]} />
                  <Animated.View style={[styles.waveBar, animBar4]} />
                  <Animated.View style={[styles.waveBar, animBar5]} />
                  <Animated.View style={[styles.waveBar, animBar6]} />
                  <Animated.View style={[styles.waveBar, animBar7]} />
                </View>
              </View>
            ) : (
              <ThemedText style={styles.recordInstruction}>Tap to speak. Flow focus, zero stress.</ThemedText>
            )}

            {/* Pulsing circles behind button */}
            <View style={styles.buttonWrapper}>
              <Animated.View style={[styles.pulseRing, animPulse1]} />
              <Animated.View style={[styles.pulseRing, animPulse2]} />

              <ScalePress onPress={toggleRecording} activeScale={0.92}>
                <LinearGradient
                  colors={[BrandColors.electricPink, BrandColors.cherryPunch]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.recordCircle}>
                  <IconSymbol
                    name={isRecording ? 'chevron.left.forwardslash.chevron.right' : 'mic.fill'}
                    size={28}
                    color="#FFFFFF"
                  />
                </LinearGradient>
              </ScalePress>
            </View>
          </View>
        </GlassCard>

        {/* Mock Speach Feedback display */}
        {feedbackState === 'completed' && (
          <GlassCard style={styles.completedCard}>
            <View style={styles.completedHeaderRow}>
              <ThemedText style={styles.smallUpperLabel}>YAP SCORE: {mockScore}%</ThemedText>
              <ScalePress style={styles.eggTrigger} onPress={trigger67EasterEgg} activeScale={0.9}>
                <ThemedText style={styles.eggTriggerText}>🎯 Test 67</ThemedText>
              </ScalePress>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.completedGreeting}>
              {mockScore === 67 ? 'six-seven vibe check! 🎯' : 'Ek number performance, boss! 🌟'}
            </ThemedText>
            <ThemedText style={styles.completedBody}>
              {mockScore === 67
                ? 'Your speech rhythm hit the perfect six-seven index! Butter flow, absolutely zero scenes.'
                : 'Aapki speaking flow was buttery-smooth. Filler word bridges like "matlab" kept your rhythm clean!'}
            </ThemedText>
          </GlassCard>
        )}

        {/* Quick Practice 2-Column Grid */}
        <View style={styles.sectionHeaderRow}>
          <ThemedText style={styles.smallUpperLabel}>QUICK PRACTICE</ThemedText>
        </View>

        <View style={styles.practiceGrid}>
          <ScalePress style={styles.gridCellWrapper} activeScale={0.96}>
            <GlassCard style={styles.gridCell} borderRadius={16}>
              <IconSymbol name="list.bullet" size={24} color={BrandColors.cherryPunch} style={styles.gridIcon} />
              <ThemedText type="defaultSemiBold" style={styles.gridTitle}>Starbucks Order</ThemedText>
              <ThemedText style={styles.gridDesc}>Custom Ordering drill</ThemedText>
            </GlassCard>
          </ScalePress>

          <ScalePress style={styles.gridCellWrapper} activeScale={0.96}>
            <GlassCard style={styles.gridCell} borderRadius={16}>
              <IconSymbol name="bubble.left.and.bubble.right.fill" size={24} color={BrandColors.cherryPunch} style={styles.gridIcon} />
              <ThemedText type="defaultSemiBold" style={styles.gridTitle}>SoBo Slang</ThemedText>
              <ThemedText style={styles.gridDesc}>Townie conversation drill</ThemedText>
            </GlassCard>
          </ScalePress>
        </View>

        {/* Leaderboard Preview Card */}
        <View style={styles.sectionHeaderRow}>
          <ThemedText style={styles.smallUpperLabel}>RANKINGS</ThemedText>
        </View>

        <ScalePress onPress={handleLeaderboardPress} activeScale={0.97}>
          <GlassCard style={styles.leaderboardPreview} borderRadius={16}>
            <View style={styles.leaderLeft}>
              <IconSymbol name="star.fill" size={20} color={BrandColors.chartreuse} />
              <ThemedText style={styles.leaderRankText}>
                Mumbai Rank: <ThemedText type="defaultSemiBold" style={{ color: BrandColors.cherryPunch }}>#{mumbaiRank}</ThemedText>
              </ThemedText>
            </View>
            <View style={styles.leaderRight}>
              <ThemedText style={styles.viewLeaderText}>
                {mumbaiRank === 12 ? 'Rank up! ↗' : 'View all ↗'}
              </ThemedText>
            </View>
          </GlassCard>
        </ScalePress>

        {/* Bottom tab spacer */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blobContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -2,
  },
  cherryBlob: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: BrandColors.cherryPunch,
    opacity: 0.1,
  },
  chartreuseBlob: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: BrandColors.chartreuse,
    opacity: 0.08,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    zIndex: 10,
  },
  streakBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
    fontFamily: 'ui-rounded',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  heroCard: {
    padding: 24,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  smallUpperLabel: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.4,
    color: BrandColors.cherryPunch,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  promptHeadline: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  recordSection: {
    alignItems: 'center',
    width: '100%',
  },
  recordInstruction: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '600',
    marginBottom: 16,
  },
  visualizerActive: {
    alignItems: 'center',
    marginBottom: 12,
  },
  timerText: {
    fontSize: 22,
    fontWeight: '900',
    fontFamily: 'ui-monospace',
    color: BrandColors.cherryPunch,
    marginBottom: 6,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    gap: 4,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: BrandColors.cherryPunch,
  },
  buttonWrapper: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.cherryPunch,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  pulseRing: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: BrandColors.cherryPunch,
    zIndex: 1,
  },
  completedCard: {
    padding: 20,
    borderWidth: 1.5,
    borderColor: BrandColors.chartreuse,
    marginBottom: 20,
  },
  completedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  eggTrigger: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(215, 250, 50, 0.15)',
    borderWidth: 1,
    borderColor: BrandColors.chartreuse,
  },
  eggTriggerText: {
    fontSize: 10,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
  },
  completedGreeting: {
    fontSize: 17,
    color: BrandColors.cherryPunch,
    marginBottom: 6,
  },
  completedBody: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
    color: '#1A1A1A',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  practiceGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  gridCellWrapper: {
    flex: 1,
  },
  gridCell: {
    padding: 16,
    borderWidth: 1.2,
    height: 110,
    justifyContent: 'space-between',
  },
  gridIcon: {
    opacity: 0.8,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  gridDesc: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '500',
  },
  leaderboardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.2,
  },
  leaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leaderRankText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  leaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLeaderText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#999999',
  },
});
