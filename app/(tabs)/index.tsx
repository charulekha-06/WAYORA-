import React from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const features = [
  { icon: 'map' as const, title: 'Itinerary Planner', desc: 'Smart itineraries', color: WayoraColors.coral, bg: '#FDF2F4' },
  { icon: 'medkit' as const, title: 'Emergency Finder', desc: 'Find help fast', color: WayoraColors.blue, bg: '#F0F4FF' },
  { icon: 'list' as const, title: 'To Do List', desc: 'Stay organized', color: WayoraColors.orange, bg: '#FEF3EA' },
  { icon: 'image' as const, title: 'Souvenir Album', desc: 'Capture memories', color: WayoraColors.purple, bg: '#F8F0F7' },
  { icon: 'flash' as const, title: 'AI Post Gen', desc: 'Share your trip', color: WayoraColors.green, bg: '#F2FFF6' },
  { icon: 'cash' as const, title: 'Currency', desc: 'Quick conversion', color: '#14B8A6', bg: '#E6FFFA' },
];

const quickActions = [
  { icon: 'map-outline' as const, label: 'Trip Atlas', color: '#fff', bg: '#86B5F0' },
  { icon: 'pencil-outline' as const, label: 'Post Gen', color: '#fff', bg: '#D0A8E3' },
  { icon: 'medkit-outline' as const, label: 'Emergency', color: '#fff', bg: '#F27471' },
  { icon: 'book-outline' as const, label: 'Bookings', color: '#fff', bg: '#91D28C' },
  { icon: 'chatbubble-ellipses-outline' as const, label: 'AI Chat', color: '#fff', bg: '#F5A89A' },
  { icon: 'language-outline' as const, label: 'Translate', color: '#fff', bg: '#F5BE87' },
  { icon: 'people-outline' as const, label: 'Artisans', color: '#fff', bg: '#D3A4CF' },
  { icon: 'cloudy-outline' as const, label: 'Weather', color: '#fff', bg: '#A6C8F5' },
];

const destinations = [
  { name: 'Tokyo', country: 'Japan', icon: 'business-outline' as const, iconColor: WayoraColors.coral, iconBg: '#FDF2F4', rating: 4.9, price: '$1,200' },
  { name: 'Santorini', country: 'Greece', icon: 'sunny-outline' as const, iconColor: WayoraColors.orange, iconBg: '#FEF3EA', rating: 4.8, price: '$1,800' },
  { name: 'Bali', country: 'Indonesia', icon: 'leaf-outline' as const, iconColor: WayoraColors.green, iconBg: '#F2FFF6', rating: 4.7, price: '$900' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#FDF2F4', '#FEF3EA', '#F0F4FF']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Welcome back! </Text>
              <Text style={styles.userName}>Alex Traveler</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color={WayoraColors.darkGray} />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/explore' as any)}>
            <Ionicons name="search" size={18} color={WayoraColors.gray} />
            <Text style={styles.searchText}>Where do you want to go?</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Current Trip Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Trip</Text>
          </View>
          <View style={styles.currentTripCard}>
            <View style={styles.tripImagePart}>
              {/* Using a placeholder gradient for the image as requested by design */}
              <LinearGradient colors={['#A0522D', '#5D4037']} style={styles.tripImageOverlay}>
                <View style={styles.tripTopInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Ionicons name="location" size={18} color="white" />
                    <Text style={styles.tripDest}>Paris, France</Text>
                  </View>
                  <Text style={styles.tripDates}>Dec 15-22, 2024</Text>
                  <Text style={styles.daysLeftText}>12 days to go!</Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.tripProgressPart}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Budget Progress</Text>
                <Text style={styles.progressValue}>$450 / $2500</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: '18%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Explore Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Features</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {features.map((f) => (
              <TouchableOpacity key={f.title} style={[styles.featureCard, { backgroundColor: f.bg }]}>
                <Ionicons name={f.icon} size={24} color={f.color} />
                <View style={{ marginTop: 12 }}>
                  <Text style={styles.featureTitle}>{f.title}</Text>
                  <Text style={styles.featureDesc}>{f.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Trips Section */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Trips</Text>
            <TouchableOpacity style={styles.addTripBtn}>
              <Ionicons name="add" size={18} color={WayoraColors.blue} />
              <Text style={[styles.seeAll, { color: WayoraColors.blue }]}>Add Trip</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.upcomingCard}>
            <View style={[styles.upcomingImg, { backgroundColor: '#FFDAB9' }]}>
               <Ionicons name="image-outline" size={20} color="#8B4513" />
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingName}>Tokyo, Japan</Text>
              <Text style={styles.upcomingDate}>Jan 10-20, 2025</Text>
            </View>
            <View style={styles.upcomingBadge}>
              <Text style={styles.upcomingBadgeText}>Planning</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={WayoraColors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.upcomingCard}>
            <View style={[styles.upcomingImg, { backgroundColor: '#E0F7FA' }]}>
               <Ionicons name="sunny-outline" size={20} color="#00838F" />
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingName}>Swiss Alps</Text>
              <Text style={styles.upcomingDate}>Mar 5-12, 2025</Text>
            </View>
            <View style={[styles.upcomingBadge, { backgroundColor: '#F5F5F5' }]}>
              <Text style={[styles.upcomingBadgeText, { color: '#666' }]}>Saved</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={WayoraColors.gray} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 14, color: WayoraColors.gray, fontWeight: '500' },
  userName: { fontSize: 24, fontWeight: '800', color: WayoraColors.black, marginTop: 2 },
  notifBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: WayoraColors.white, alignItems: 'center', justifyContent: 'center', shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  notifBadge: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: WayoraColors.coral },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, gap: 10, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  searchText: { fontSize: 14, color: WayoraColors.gray },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black, marginBottom: 12 },
  seeAll: { fontSize: 13, fontWeight: '600', color: WayoraColors.coral },
  currentTripCard: { borderRadius: 20, backgroundColor: WayoraColors.white, overflow: 'hidden', borderWidth: 1, borderColor: WayoraColors.lightGray },
  tripImagePart: { height: 160 },
  tripImageOverlay: { flex: 1, padding: 20, justifyContent: 'flex-end' },
  tripTopInfo: { gap: 4 },
  tripDest: { fontSize: 20, fontWeight: '800', color: 'white' },
  tripDates: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
  daysLeftText: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '500', marginTop: 2 },
  tripProgressPart: { padding: 20, backgroundColor: '#F8FBFF' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  progressLabel: { fontSize: 13, color: WayoraColors.gray, fontWeight: '600' },
  progressValue: { fontSize: 13, color: WayoraColors.black, fontWeight: '700' },
  progressBg: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2D3436', borderRadius: 4 },
  
  featureCard: { width: 140, padding: 16, borderRadius: 20, alignItems: 'flex-start' },
  featureTitle: { fontSize: 14, fontWeight: '700', color: WayoraColors.black },
  featureDesc: { fontSize: 11, color: WayoraColors.gray, marginTop: 4 },

  addTripBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  upcomingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, padding: 12, borderRadius: 18, marginBottom: 12, borderWidth: 1, borderColor: WayoraColors.lightGray },
  upcomingImg: { width: 50, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  upcomingInfo: { flex: 1, marginLeft: 16 },
  upcomingName: { fontSize: 16, fontWeight: '700', color: WayoraColors.black },
  upcomingDate: { fontSize: 13, color: WayoraColors.gray, marginTop: 2 },
  upcomingBadge: { backgroundColor: '#F0F4FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, marginRight: 10 },
  upcomingBadgeText: { fontSize: 11, fontWeight: '700', color: WayoraColors.blue },
});
