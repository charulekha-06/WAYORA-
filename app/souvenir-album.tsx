import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Image, Dimensions, FlatList, useWindowDimensions,
  ActivityIndicator, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

// Removed static Dimensions calculation

const STATIC_ACHIEVEMENTS = [
  { id: '1', title: 'Paris Explorer', icon: 'map-outline' },
  { id: '2', title: 'Art Connoisseur', icon: 'color-palette-outline' },
  { id: '3', title: 'Local Foodie', icon: 'restaurant-outline' },
  { id: '4', title: 'Eco Warrior', icon: 'leaf-outline' },
  { id: '5', title: 'Global Nomad', icon: 'airplane-outline' },
  { id: '6', title: 'Photo Master', icon: 'camera-outline' },
  { id: '7', title: 'Hidden Gem Hunter', icon: 'search-outline' },
  { id: '8', title: 'Budget Pro', icon: 'wallet-outline' },
  { id: '9', title: 'Museum Buff', icon: 'business-outline' },
  { id: '10', title: 'Night Owl', icon: 'moon-outline' },
  { id: '11', title: 'Wellness Guru', icon: 'heart-outline' },
  { id: '12', title: 'Artisan Scout', icon: 'hammer-outline' },
];

import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export default function SouvenirAlbumScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('memories');
  const [loading, setLoading] = useState(true);
  const [memories, setMemories] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Use mock/static data for demo if not logged in
      const mergedAchievements = STATIC_ACHIEVEMENTS.map(staticAch => ({
        ...staticAch,
        unlocked: false
      }));
      setAchievements(mergedAchievements);
      setLoading(false);
      return;
    }

    // Fetch Memories
    const { data: memData } = await supabase
      .from('memories')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });
    
    setMemories(memData || []);

    // Fetch Achievements (unlocked ones)
    const { data: achData } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', user.id);
    
    // Merge with static list to show locked ones
    const mergedAchievements = STATIC_ACHIEVEMENTS.map(staticAch => ({
      ...staticAch,
      unlocked: achData?.some((a: any) => a.badge_type === staticAch.title) || false
    }));
    
    setAchievements(mergedAchievements);
    setLoading(false);
  }

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  const renderMemory = ({ item }: { item: any }) => (
    <View key={item.id} style={[styles.memoryCard, { width: (width - 52) / 2 }]}>
      <Image 
        source={{ uri: item.image_url }} 
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

  const renderAchievement = (item: any) => (
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

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const [saving, setSaving] = useState(false);

  const handleAddMemory = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need photo library access to add memories!');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      setSaving(true);
      const imageUri = result.assets[0].uri;
      
      // In a real app, we'd upload imageUri to Supabase Storage here.
      // For this implementation, we'll use a high-quality placeholder or the local URI 
      // (noting that local URIs aren't truly persistent in the cloud, but valid for the UI demo)
      // or we can simulate an upload to a public image service.
      
      const { error } = await supabase
        .from('memories')
        .insert([
          {
            user_id: user.id,
            title: 'New Memory', // User would normally input this via a modal
            location: 'Nearby',   // User would normally input this
            image_url: imageUri,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          }
        ]);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        fetchData(); // Refresh list
        Alert.alert('Success', 'Moment captured in your Souvenir Album!');
      }
      setSaving(false);
    }
  };

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
          <TouchableOpacity style={styles.cameraBtn} onPress={handleAddMemory} disabled={saving}>
            {saving ? <ActivityIndicator size="small" color={WayoraColors.taviPurple} /> : <Ionicons name="camera" size={24} color={WayoraColors.taviPurple} />}
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

        {loading ? (
          <View style={{ marginTop: 100 }}>
            <ActivityIndicator size="large" color={WayoraColors.taviPurple} />
            <Text style={{ textAlign: 'center', marginTop: 10, color: WayoraColors.gray }}>Opening Album...</Text>
          </View>
        ) : (
          <>
            {activeTab === 'memories' ? (
              <View style={styles.grid}>
                {memories.map((m) => renderMemory({ item: m }))}
                {memories.length === 0 && (
                   <View style={{ flex: 1, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="camera-outline" size={48} color="#CBD5E1" />
                      <Text style={{ marginTop: 12, color: WayoraColors.gray, fontWeight: '600' }}>No memories captured yet.</Text>
                   </View>
                )}
              </View>
            ) : (
              <View style={styles.badgeGrid}>
                {achievements.map((a) => (
                  <View key={a.id} style={[styles.badgeWrapper, { width: (width - 70) / 3 }]}>
                    {renderAchievement(a)}
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Stats Summary Section */}
      <View style={styles.statsBar}>
         <View style={styles.statItem}>
            <Text style={styles.statValue}>{memories.length}</Text>
            <Text style={styles.statLabel}>Memories</Text>
         </View>
         <View style={styles.statDivider} />
         <View style={styles.statItem}>
            <Text style={styles.statValue}>{achievements.filter(a => a.unlocked).length}/{achievements.length}</Text>
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
