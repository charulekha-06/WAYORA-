import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Image, Dimensions, FlatList, useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

// Removed static Dimensions calculation

const MEMORIES = [
  { id: '1', title: 'Sunset at Eiffel', date: 'Oct 12, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=60' },
  { id: '2', title: 'Louvre Morning', date: 'Oct 14, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=60' },
  { id: '3', title: 'Café Culture', date: 'Oct 15, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=70' },
  { id: '4', title: 'Riverside Walk', date: 'Oct 16, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1440778303588-435521a205bc?w=500&q=60' },
];

const ACHIEVEMENTS = [
  { id: '1', title: 'Paris Explorer', icon: 'map-outline', unlocked: true },
  { id: '2', title: 'Art Connoisseur', icon: 'color-palette-outline', unlocked: true },
  { id: '3', title: 'Local Foodie', icon: 'restaurant-outline', unlocked: true },
  { id: '4', title: 'Eco Warrior', icon: 'leaf-outline', unlocked: true },
  { id: '5', title: 'Global Nomad', icon: 'airplane-outline', unlocked: false },
  { id: '6', title: 'Photo Master', icon: 'camera-outline', unlocked: false },
  { id: '7', title: 'Hidden Gem Hunter', icon: 'search-outline', unlocked: false },
  { id: '8', title: 'Budget Pro', icon: 'wallet-outline', unlocked: false },
  { id: '9', title: 'Museum Buff', icon: 'business-outline', unlocked: false },
  { id: '10', title: 'Night Owl', icon: 'moon-outline', unlocked: false },
  { id: '11', title: 'Wellness Guru', icon: 'heart-outline', unlocked: false },
  { id: '12', title: 'Artisan Scout', icon: 'hammer-outline', unlocked: false },
];

export default function SouvenirAlbumScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('memories');
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  const renderMemory = ({ item }: { item: typeof MEMORIES[0] }) => (
    <View key={item.id} style={[styles.memoryCard, { width: (width - 52) / 2 }]}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.memoryImage}
        onError={() => handleImageError(item.id)}
      />
      {imageError[item.id] && (
        <View style={[styles.imageLoader, { backgroundColor: '#F1F5F9' }]}>
          <Ionicons name="image-outline" size={24} color="#CBD5E1" />
        </View>
      )}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={styles.memoryOverlay}
      >
        <Text style={styles.memoryTitle}>{item.title}</Text>
        <View style={styles.memoryInfo}>
          <Ionicons name="location-sharp" size={12} color="#FFF" />
          <Text style={styles.memoryDate}>{item.location} • {item.date}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderAchievement = (item: typeof ACHIEVEMENTS[0]) => (
    <View style={[styles.badgeCard, !item.unlocked && { opacity: 0.45 }]}>
      <View style={[styles.badgeIcon, !item.unlocked && styles.badgeLocked]}>
        <View style={[styles.badgeInner, item.unlocked && styles.badgeInnerUnlocked]}>
           <Ionicons 
            name={item.icon as any} 
            size={26} 
            color={item.unlocked ? WayoraColors.taviPurple : WayoraColors.gray} 
          />
        </View>
      </View>
      <Text style={[styles.badgeText, item.unlocked && styles.badgeTextUnlocked]}>{item.title}</Text>
      {!item.unlocked && (
        <View style={styles.lockBadge}>
          <Ionicons name="lock-closed" size={10} color="#FFF" />
        </View>
      )}
    </View>
  );

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Souvenir Album</Text>
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="camera" size={24} color={WayoraColors.taviPurple} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'memories' && styles.activeTab]}
            onPress={() => setActiveTab('memories')}
          >
            <Text style={[styles.tabText, activeTab === 'memories' && styles.activeTabText]}>Memories</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
            onPress={() => setActiveTab('achievements')}
          >
            <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>Achievements</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'memories' ? (
          <View style={styles.grid}>
            {MEMORIES.map((m) => renderMemory({ item: m }))}
          </View>
        ) : (
          <View style={styles.badgeGrid}>
            {ACHIEVEMENTS.map((a) => (
              <View key={a.id} style={[styles.badgeWrapper, { width: (width - 70) / 3 }]}>
                {renderAchievement(a)}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Stats Summary Section */}
      <View style={styles.statsBar}>
         <View style={styles.statItem}>
            <Text style={styles.statValue}>{MEMORIES.length}</Text>
            <Text style={styles.statLabel}>Memories</Text>
         </View>
         <View style={styles.statDivider} />
         <View style={styles.statItem}>
            <Text style={styles.statValue}>{unlockedCount}/{ACHIEVEMENTS.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
         </View>
         <View style={styles.statDivider} />
         <View style={styles.statItem}>
            <Text style={styles.statValue}>1,250</Text>
            <Text style={styles.statLabel}>Travel Pts</Text>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 0, paddingTop: 20, paddingBottom: 15, backgroundColor: 'transparent',
  },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  cameraBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: WayoraColors.taviBg, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: WayoraColors.black },

  tabContainer: { flexDirection: 'row', padding: 5, backgroundColor: '#F3F4F6', borderRadius: 20, margin: 20 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 16 },
  activeTab: { backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  tabText: { fontSize: 15, fontWeight: '700', color: '#94A3B8' },
  activeTabText: { color: WayoraColors.taviPurple },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  memoryCard: { height: 210, borderRadius: 24, overflow: 'hidden', backgroundColor: '#E5E7EB', elevation: 4 },
  memoryImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageLoader: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' },
  memoryOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 16 },
  memoryTitle: { color: 'white', fontSize: 15, fontWeight: '800' },
  memoryInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 5 },
  memoryDate: { color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: '600' },

  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  badgeWrapper: { },
  badgeCard: { alignItems: 'center', position: 'relative' },
  badgeIcon: { 
    width: 76, height: 76, borderRadius: 38, 
    alignItems: 'center', justifyContent: 'center', 
    marginBottom: 12,
    backgroundColor: 'white',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 4
  },
  badgeLocked: { 
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5, borderColor: '#E5E7EB', borderStyle: 'dashed',
    shadowOpacity: 0, elevation: 0
  },
  badgeInner: { 
    width: 66, height: 66, borderRadius: 33, 
    borderWidth: 1, borderColor: '#F1F5F9',
    alignItems: 'center', justifyContent: 'center',
  },
  badgeInnerUnlocked: {
    backgroundColor: WayoraColors.taviBg,
    borderColor: WayoraColors.taviPurpleLight,
  },
  badgeText: { fontSize: 10, fontWeight: '800', color: WayoraColors.gray, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },
  badgeTextUnlocked: { color: WayoraColors.taviPurple },
  lockBadge: { 
    position: 'absolute', top: 52, right: 8,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#94A3B8', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFF'
  },

  statsBar: { 
    position: 'absolute', bottom: 25, left: 20, right: 20, 
    flexDirection: 'row', backgroundColor: 'white', borderRadius: 28, padding: 24,
    shadowColor: WayoraColors.taviPurple, shadowOpacity: 0.15, shadowRadius: 20, elevation: 12,
    alignItems: 'center', justifyContent: 'space-around',
    borderWidth: 1, borderColor: WayoraColors.taviBg
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '900', color: WayoraColors.taviPurple },
  statLabel: { fontSize: 12, fontWeight: '700', color: WayoraColors.gray, marginTop: 3 },
  statDivider: { width: 1, height: 36, backgroundColor: '#F1F5F9' },
});
