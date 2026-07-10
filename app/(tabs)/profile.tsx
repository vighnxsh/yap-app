import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Colors, BrandColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]} edges={['top']}>
      {/* Background Blobs */}
      <View style={styles.blobContainer}>
        <View style={styles.cherryBlob} />
        <View style={styles.chartreuseBlob} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.label}>USER ACCOUNT</ThemedText>
          <ThemedText type="title" style={styles.title}>Profile</ThemedText>
        </View>

        {/* User Card */}
        <GlassCard style={styles.userCard}>
          <View style={styles.avatar}>
            <ThemedText style={styles.avatarChar}>A</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.userName}>Aarya Manjrekar</ThemedText>
          <ThemedText style={styles.userLevel}>Level 5 • GenZ Speaker (Mumbai)</ThemedText>
        </GlassCard>

        {/* User Stats */}
        <View style={styles.statsGrid}>
          <GlassCard style={styles.statCell} borderRadius={16}>
            <ThemedText style={styles.statVal}>88%</ThemedText>
            <ThemedText style={styles.statLbl}>Avg Fluency</ThemedText>
          </GlassCard>

          <GlassCard style={styles.statCell} borderRadius={16}>
            <ThemedText style={styles.statVal}>5</ThemedText>
            <ThemedText style={styles.statLbl}>Active Streak</ThemedText>
          </GlassCard>
        </View>

        {/* Settings options list */}
        <View style={styles.menu}>
          <GlassCard style={styles.menuCard} borderRadius={16}>
            <View style={styles.menuItem}>
              <IconSymbol name="house.fill" size={20} color={BrandColors.cherryPunch} />
              <ThemedText style={styles.menuText}>Bombay Dialect Settings</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.menuItem}>
              <IconSymbol name="mic.fill" size={20} color={BrandColors.cherryPunch} />
              <ThemedText style={styles.menuText}>Configure Audio Coaching</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.menuItem}>
              <IconSymbol name="chevron.right" size={20} color={BrandColors.cherryPunch} />
              <ThemedText style={styles.menuText}>Milestone Trophies</ThemedText>
            </View>
          </GlassCard>
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
  userCard: {
    alignItems: 'center',
    padding: 24,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: BrandColors.cherryPunch,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarChar: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 12,
    opacity: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCell: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  statVal: {
    fontSize: 22,
    fontWeight: '900',
    color: BrandColors.cherryPunch,
    marginBottom: 4,
  },
  statLbl: {
    fontSize: 11,
    opacity: 0.6,
    fontWeight: '600',
  },
  menu: {
    marginBottom: 16,
  },
  menuCard: {
    padding: 16,
    borderWidth: 1.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(213, 0, 74, 0.1)',
  },
});
