import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { ScalePress } from '@/components/ui/scale-press';
import { BrandColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LessonsScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  // ambient blobs (Cherry Punch top-right, Chartreuse bottom-left)
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]} edges={['top']}>
      {/* Background Blobs */}
      <View style={styles.blobContainer}>
        <View style={styles.cherryBlob} />
        <View style={styles.chartreuseBlob} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.label}>LEARN FLOW</ThemedText>
          <ThemedText type="title" style={styles.title}>Lessons</ThemedText>
          <ThemedText style={styles.desc}>Interactive Bombay GenZ Hinglish speaking packs. No textbook rules, just real flow.</ThemedText>
        </View>

        {/* Lesson Cards */}
        <GlassCard style={styles.lessonCard}>
          <View style={styles.badgeRow}>
            <View style={[styles.pill, { backgroundColor: '#FFEBF3', borderColor: BrandColors.electricPink }]}>
              <ThemedText style={styles.pillText}>POPULAR</ThemedText>
            </View>
            <ThemedText style={styles.duration}>6 mins</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.cardTitle}>The {"\"Yaar\""} & {"\"Matlab\""} Bridge</ThemedText>
          <ThemedText style={styles.cardDesc}>Learn how to use transition fillers to keep speaking without breaking rhythm.</ThemedText>
          <ScalePress style={styles.startBtn} activeScale={0.96}>
            <ThemedText style={styles.startBtnText}>Start Pack ⚡</ThemedText>
          </ScalePress>
        </GlassCard>

        <GlassCard style={styles.lessonCard}>
          <View style={styles.badgeRow}>
            <View style={[styles.pill, { backgroundColor: '#FFFEEA', borderColor: BrandColors.canaryYellow }]}>
              <ThemedText style={[styles.pillText, { color: BrandColors.cherryPunch }]}>ACCENT</ThemedText>
            </View>
            <ThemedText style={styles.duration}>8 mins</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.cardTitle}>SoBo Vibe Check Accent</ThemedText>
          <ThemedText style={styles.cardDesc}>Speak natural high-society Bombay slang with appropriate pitch rises.</ThemedText>
          <ScalePress style={styles.startBtn} activeScale={0.96}>
            <ThemedText style={styles.startBtnText}>Start Pack ⚡</ThemedText>
          </ScalePress>
        </GlassCard>

        <GlassCard style={styles.lessonCard}>
          <View style={styles.badgeRow}>
            <View style={[styles.pill, { backgroundColor: '#EFFFEC', borderColor: BrandColors.lime }]}>
              <ThemedText style={[styles.pillText, { color: '#27AE60' }]}>FLUENCY</ThemedText>
            </View>
            <ThemedText style={styles.duration}>5 mins</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.cardTitle}>Grammar-Fear-Free zones</ThemedText>
          <ThemedText style={styles.cardDesc}>Banish classroom exam anxiety. Build speaking confidence with zero grammar fear.</ThemedText>
          <ScalePress style={styles.startBtn} activeScale={0.96}>
            <ThemedText style={styles.startBtnText}>Start Pack ⚡</ThemedText>
          </ScalePress>
        </GlassCard>

        <View style={{ height: 100 }} />
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
    zIndex: -1,
  },
  cherryBlob: {
    position: 'absolute',
    top: -120,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: BrandColors.cherryPunch,
    opacity: 0.08,
  },
  chartreuseBlob: {
    position: 'absolute',
    bottom: -120,
    left: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: BrandColors.chartreuse,
    opacity: 0.08,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: BrandColors.cherryPunch,
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.7,
  },
  lessonCard: {
    marginBottom: 16,
    padding: 20,
    borderWidth: 1.5,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
  },
  duration: {
    fontSize: 12,
    opacity: 0.5,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  startBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#0A0104',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  startBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: BrandColors.chartreuse,
  },
});
