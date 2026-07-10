import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, BrandColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const boardData = [
    { rank: 1, name: 'Aarav Mehta', score: '98%', active: false },
    { rank: 2, name: 'Kiara Sen', score: '96%', active: false },
    { rank: 3, name: 'Kabir Doshi', score: '94%', active: false },
    { rank: 12, name: 'You (Aarya M.)', score: '88%', active: true },
    { rank: 13, name: 'Rohan Shah', score: '87%', active: false },
    { rank: 14, name: 'Priya Iyer', score: '86%', active: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]} edges={['top']}>
      {/* Background Blobs */}
      <View style={styles.blobContainer}>
        <View style={styles.cherryBlob} />
        <View style={styles.chartreuseBlob} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.label}>MUMBAI VIBES</ThemedText>
          <ThemedText type="title" style={styles.title}>Leaderboard</ThemedText>
          <ThemedText style={styles.desc}>GenZ Bombay speaker rankings. Top fluency scorers and active daily streaks.</ThemedText>
        </View>

        {/* Top 3 Podium Cards */}
        <View style={styles.podiumRow}>
          <GlassCard style={[styles.podiumCard, styles.podiumSecond]}>
            <ThemedText style={styles.podiumRank}>#2</ThemedText>
            <ThemedText style={styles.podiumName}>Kiara</ThemedText>
            <ThemedText style={styles.podiumScore}>96%</ThemedText>
          </GlassCard>

          <GlassCard style={[styles.podiumCard, styles.podiumFirst]}>
            <IconSymbol name="star.fill" size={24} color={BrandColors.chartreuse} style={styles.trophyIcon} />
            <ThemedText style={styles.podiumRank}>#1</ThemedText>
            <ThemedText style={styles.podiumName}>Aarav</ThemedText>
            <ThemedText style={styles.podiumScore}>98%</ThemedText>
          </GlassCard>

          <GlassCard style={[styles.podiumCard, styles.podiumThird]}>
            <ThemedText style={styles.podiumRank}>#3</ThemedText>
            <ThemedText style={styles.podiumName}>Kabir</ThemedText>
            <ThemedText style={styles.podiumScore}>94%</ThemedText>
          </GlassCard>
        </View>

        {/* Board List */}
        <View style={styles.listContainer}>
          {boardData.map((user, idx) => (
            <GlassCard
              key={idx}
              style={[
                styles.rowCard,
                user.active && styles.activeRow,
              ]}
              borderRadius={16}>
              <View style={styles.rowLeft}>
                <ThemedText style={[styles.rowRank, user.active && styles.activeText]}>
                  #{user.rank}
                </ThemedText>
                <ThemedText style={[styles.rowName, user.active && styles.activeText]}>
                  {user.name}
                </ThemedText>
              </View>
              <ThemedText style={[styles.rowScore, user.active && styles.activeText]}>
                {user.score}
              </ThemedText>
            </GlassCard>
          ))}
        </View>

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
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  podiumCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1.5,
  },
  podiumFirst: {
    height: 144,
    borderColor: BrandColors.cherryPunch,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  podiumSecond: {
    height: 116,
  },
  podiumThird: {
    height: 100,
  },
  trophyIcon: {
    position: 'absolute',
    top: -12,
  },
  podiumRank: {
    fontSize: 14,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
    marginBottom: 4,
  },
  podiumName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  podiumScore: {
    fontSize: 12,
    fontWeight: '800',
    opacity: 0.7,
  },
  listContainer: {
    gap: 8,
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.2,
  },
  activeRow: {
    backgroundColor: 'rgba(213, 0, 74, 0.1)',
    borderColor: BrandColors.cherryPunch,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowRank: {
    fontSize: 13,
    fontWeight: '900',
    opacity: 0.6,
    width: 28,
  },
  rowName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  rowScore: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  activeText: {
    color: BrandColors.cherryPunch,
    fontWeight: '900',
  },
});
