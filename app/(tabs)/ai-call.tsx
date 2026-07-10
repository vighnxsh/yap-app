import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { ScalePress } from '@/components/ui/scale-press';
import { BrandColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import * as Haptics from 'expo-haptics';

export default function AiCallScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const [callActive, setCallActive] = useState(false);

  const toggleCall = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    setCallActive((prev) => !prev);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]} edges={['top']}>
      {/* Background Blobs */}
      <View style={styles.blobContainer}>
        <View style={styles.cherryBlob} />
        <View style={styles.chartreuseBlob} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.label}>1-ON-1 FLUENCY COACH</ThemedText>
          <ThemedText type="title" style={styles.title}>AI Call</ThemedText>
          <ThemedText style={styles.desc}>Call the AI speaking buddy. Speak Hinglish naturally, get feedback in real time.</ThemedText>
        </View>

        {/* Hero Interactive Glass Card */}
        <GlassCard style={styles.callCard}>
          <View style={styles.avatarCircle}>
            <IconSymbol name="mic.fill" size={32} color={BrandColors.cherryPunch} />
            {callActive && <View style={styles.pulseIndicator} />}
          </View>
          
          <ThemedText type="subtitle" style={styles.buddyName}>YAP Buddy (AI)</ThemedText>
          <ThemedText style={styles.callStatus}>
            {callActive ? 'Calling... active speaking session' : 'Offline • Ready for daily yap'}
          </ThemedText>

          <ScalePress
            style={[styles.callBtn, { backgroundColor: callActive ? '#EB5757' : BrandColors.cherryPunch }]}
            onPress={toggleCall}
            activeScale={0.94}>
            <ThemedText style={styles.callBtnText}>
              {callActive ? 'End Yapping Call 🚫' : 'Start Voice Call 📞'}
            </ThemedText>
          </ScalePress>
        </GlassCard>

        {/* Call Tips */}
        <GlassCard style={styles.tipsCard}>
          <ThemedText style={styles.tipsTitle}>💡 HOW TO PRACTICE</ThemedText>
          <View style={styles.tipItem}>
            <IconSymbol name="sparkles" size={16} color={BrandColors.cherryPunch} />
            <ThemedText style={styles.tipText}>Don{"'"}t pause. If you get stuck, call out {"\"yaar\""}.</ThemedText>
          </View>
          <View style={styles.tipItem}>
            <IconSymbol name="sparkles" size={16} color={BrandColors.cherryPunch} />
            <ThemedText style={styles.tipText}>Speak about your day, food scenes, or any movie hype.</ThemedText>
          </View>
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
  callCard: {
    alignItems: 'center',
    padding: 32,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFEBF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pulseIndicator: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: BrandColors.cherryPunch,
    opacity: 0.6,
  },
  buddyName: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
    color: '#1A1A1A',
  },
  callStatus: {
    fontSize: 13,
    opacity: 0.5,
    marginBottom: 24,
  },
  callBtn: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.cherryPunch,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  callBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  tipsCard: {
    padding: 20,
    borderWidth: 1.5,
  },
  tipsTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: BrandColors.cherryPunch,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 13,
    color: '#1A1A1A',
    flex: 1,
  },
});
