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
  { id: '1', title: 'Sunset at Eiffel', date: 'Oct 12, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80' },
  { id: '2', title: 'Louvre Morning', date: 'Oct 14, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80' },
  { id: '3', title: 'Café Culture', date: 'Oct 15, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1502301103665-0b95cc738def?w=500&q=80' },
  { id: '4', title: 'Riverside Walk', date: 'Oct 16, 2025', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1440778303588-435521a205bc?w=500&q=80' },
];

const ACHIEVEMENTS = [
  { id: '1', title: 'Paris Explorer', icon: 'map-outline', unlocked: true },
  { id: '2', title: 'Art Connoisseur', icon: 'color-palette-outline', unlocked: true },
  { id: '3', title: 'Local Foodie', icon: 'restaurant-outline', unlocked: true },
  { id: '4', title: 'Global Nomad', icon: 'airplane-outline', unlocked: false },
  { id: '5', title: 'Photo Master', icon: 'camera-outline', unlocked: false },
  { id: '6', title: 'Hidden Gem Hunter', icon: 'search-outline', unlocked: false },
];

  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('memories');
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  const renderMemory = ({ item }: { item: typeof MEMORIES[0] }) => (
    <View style={[styles.memoryCard, { width: (width - 52) / 2 }]}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.memoryImage}
        onLoadStart={() => setImageLoading(prev => ({ ...prev, [item.id]: true }))}
        onLoad={() => handleImageLoad(item.id)}
      />
      {imageLoading[item.id] && (
        <View style={styles.imageLoader}>
          <ActivityIndicator size="small" color={WayoraColors.black} />
        </View>
      )}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.memoryOverlay}
      >
        <Text style={styles.memoryTitle}>{item.title}</Text>
        <View style={styles.memoryInfo}>
          <Ionicons name="location-sharp" size={12} color="white" />
          <Text style={styles.memoryDate}>{item.location} • {item.date}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderAchievement = (item: typeof ACHIEVEMENTS[0]) => (
    <View style={[styles.badgeCard, !item.unlocked && { opacity: 0.4 }]}>
      <View style={[styles.badgeIcon, !item.unlocked && styles.badgeLocked]}>
        <View style={styles.badgeInner}>
           <Ionicons name={item.icon as any} size={24} color={WayoraColors.black} />
        </View>
      </View>
      <Text style={styles.badgeText}>{item.title}</Text>
      {!item.unlocked && <Ionicons name="lock-closed" size={10} color={WayoraColors.gray} style={styles.lockIcon} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Souvenir Album</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={28} color="white" />
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'memories' ? (
          <View style={styles.grid}>
            {MEMORIES.map((m) => renderMemory({ item: m }))}
            <TouchableOpacity style={[styles.captureNew, { width: (width - 52) / 2 }]}>
               <LinearGradient colors={['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.05)']} style={styles.captureGradient}>
                  <Ionicons name="camera" size={32} color="rgba(0,0,0,0.2)" />
                  <Text style={styles.captureText}>Capture Moment</Text>
               </LinearGradient>
            </TouchableOpacity>
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

      {/* Stats Summary Tooltip-like section */}
      <View style={styles.statsBar}>
         <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Memories</Text>
         </View>
         <View style={styles.statDivider} />
         <View style={styles.statItem}>
            <Text style={styles.statValue}>3/6</Text>
            <Text style={styles.statLabel}>Badges</Text>
         </View>
         <View style={styles.statDivider} />
         <View style={styles.statItem}>
            <Text style={styles.statValue}>850</Text>
            <Text style={styles.statLabel}>Travel Pts</Text>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, backgroundColor: 'white' 
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F3F5', alignItems: 'center', justifyContent: 'center' },
  addBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: WayoraColors.black, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },

  tabContainer: { flexDirection: 'row', padding: 4, backgroundColor: '#E2E8F0', borderRadius: 16, margin: 20 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  tabText: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  activeTabText: { color: WayoraColors.black },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  memoryCard: { height: 200, borderRadius: 20, overflow: 'hidden', backgroundColor: '#E5E7EB' },
  memoryImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageLoader: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' },
  memoryOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 12 },
  memoryTitle: { color: 'white', fontSize: 14, fontWeight: '800' },
  memoryInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  memoryDate: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '600' },

  captureNew: { height: 200, borderRadius: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CBD5E1' },
  captureGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  captureText: { color: '#94A3B8', fontSize: 13, fontWeight: '700', marginTop: 10 },

  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  badgeWrapper: { },
  badgeCard: { alignItems: 'center' },
  badgeIcon: { 
    width: 68, height: 68, borderRadius: 34, 
    borderWidth: 1.5, borderColor: '#000',
    alignItems: 'center', justifyContent: 'center', 
    marginBottom: 10,
    backgroundColor: 'white'
  },
  badgeLocked: { 
    borderColor: '#94A3B8', 
    borderStyle: 'dashed',
    backgroundColor: 'transparent'
  },
  badgeInner: { 
    width: 60, height: 60, borderRadius: 30, 
    borderWidth: 1, borderColor: '#E2E8F0',
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { fontSize: 10, fontWeight: '800', color: WayoraColors.black, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },
  lockIcon: { marginTop: 4 },

  statsBar: { 
    position: 'absolute', bottom: 20, left: 20, right: 20, 
    flexDirection: 'row', backgroundColor: 'white', borderRadius: 24, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10,
    alignItems: 'center', justifyContent: 'space-around'
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '900', color: WayoraColors.black },
  statLabel: { fontSize: 11, fontWeight: '600', color: WayoraColors.gray, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: '#E2E8F0' },
});
