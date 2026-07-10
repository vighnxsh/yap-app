import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ScalePress } from '@/components/ui/scale-press';
import { BrandColors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Score Ring Summary */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreRing}>
            <ThemedText style={styles.scoreNumber}>A+</ThemedText>
            <ThemedText style={styles.scoreText}>YAP GRADE</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.congratsText}>
            Kya baat hai, boss! 🎉
          </ThemedText>
          <ThemedText style={styles.descText}>
            You spoke with incredible confidence. Filler words matched the rhythm perfectly.
          </ThemedText>
        </View>

        {/* Detailed Metrics List */}
        <View style={styles.statsSection}>
          <ThemedText style={styles.sectionTitle}>DETAILED ANALYSIS</ThemedText>
          
          <ThemedView type="card" style={styles.statCard}>
            <View style={styles.statIconWrapper}>
              <IconSymbol name="sparkles" size={20} color={BrandColors.cherryPunch} />
            </View>
            <View style={styles.statInfo}>
              <ThemedText type="defaultSemiBold">Fluency Index</ThemedText>
              <ThemedText style={styles.statSubText}>Paces are consistent with minimal stutters.</ThemedText>
            </View>
            <ThemedText style={styles.statValText}>88%</ThemedText>
          </ThemedView>

          <ThemedView type="card" style={styles.statCard}>
            <View style={styles.statIconWrapper}>
              <IconSymbol name="bubble.left.and.bubble.right.fill" size={20} color={BrandColors.cherryPunch} />
            </View>
            <View style={styles.statInfo}>
              <ThemedText type="defaultSemiBold">Hinglish filler bridges</ThemedText>
              <ThemedText style={styles.statSubText}>Used {"'yaar'"} & {"'matlab'"} to keep transition flow.</ThemedText>
            </View>
            <ThemedText style={styles.statValText}>4</ThemedText>
          </ThemedView>

          <ThemedView type="card" style={styles.statCard}>
            <View style={styles.statIconWrapper}>
              <IconSymbol name="mic.fill" size={20} color={BrandColors.cherryPunch} />
            </View>
            <View style={styles.statInfo}>
              <ThemedText type="defaultSemiBold">Speaking Speed</ThemedText>
              <ThemedText style={styles.statSubText}>138 Words Per Minute. Elegant and calm!</ThemedText>
            </View>
            <ThemedText style={styles.statValText}>138 WPM</ThemedText>
          </ThemedView>
        </View>

        {/* Pro Tip Box */}
        <View style={styles.proTipSection}>
          <ThemedView type="card" style={styles.proTipCard}>
            <ThemedText style={styles.proTipTitle}>⭐ PRO CONFIDENCE TIP</ThemedText>
            <ThemedText style={styles.proTipBody}>
              Try opening your next answer with an exclamatory <ThemedText type="defaultSemiBold" style={{ color: BrandColors.cherryPunch }}>{"\"Arre!\""}</ThemedText>. It adds local authenticity and keeps your initial sentence flow extremely confident.
            </ThemedText>
          </ThemedView>
        </View>

        {/* Action Button */}
        <Link href="/" dismissTo asChild>
          <ScalePress style={styles.backButton} activeScale={0.96}>
            <ThemedText style={styles.backButtonText}>Keep Yapping! 🚀</ThemedText>
          </ScalePress>
        </Link>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  scoreSection: {
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
  },
  scoreRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: BrandColors.chartreuse,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(215, 250, 50, 0.05)',
    shadowColor: BrandColors.chartreuse,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
    fontFamily: 'ui-rounded',
  },
  scoreText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    opacity: 0.6,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
    marginBottom: 6,
  },
  descText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.65,
    paddingHorizontal: 20,
  },
  statsSection: {
    width: '100%',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: BrandColors.cherryPunch,
    marginBottom: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#EAE0E4',
    marginBottom: 10,
    gap: 12,
  },
  statIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEBF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statSubText: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
  },
  statValText: {
    fontSize: 16,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
  },
  proTipSection: {
    width: '100%',
    marginVertical: 12,
    marginBottom: 32,
  },
  proTipCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: BrandColors.chartreuse,
    backgroundColor: 'rgba(215, 250, 50, 0.05)',
  },
  proTipTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: BrandColors.cherryPunch,
    marginBottom: 6,
  },
  proTipBody: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.75,
  },
  backButton: {
    width: '100%',
    height: 56,
    backgroundColor: BrandColors.cherryPunch,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.cherryPunch,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
