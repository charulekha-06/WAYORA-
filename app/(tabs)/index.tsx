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
  { icon: 'sparkles' as const, title: 'AI Planner', desc: 'Smart itineraries', color: WayoraColors.coral, bg: '#FDF2F4' },
  { icon: 'wallet-outline' as const, title: 'Budget', desc: 'Track spending', color: WayoraColors.orange, bg: '#FEF3EA' },
  { icon: 'shield-checkmark-outline' as const, title: 'Safety', desc: 'Stay protected', color: WayoraColors.blue, bg: '#F0F4FF' },
  { icon: 'trophy-outline' as const, title: 'Wandrix', desc: 'Earn badges', color: WayoraColors.green, bg: '#F2FFF6' },
];

const quickActions = [
  { icon: 'map-outline' as const, label: 'Trip Atlas', color: WayoraColors.blue, bg: WayoraColors.lavenderLight },
  { icon: 'create-outline' as const, label: 'Post Gen', color: WayoraColors.blue, bg: WayoraColors.lavenderLight },
  { icon: 'alert-circle-outline' as const, label: 'Emergency', color: WayoraColors.red, bg: WayoraColors.redLight },
  { icon: 'book-outline' as const, label: 'Bookings', color: WayoraColors.green, bg: WayoraColors.greenLight },
  { icon: 'chatbubble-ellipses-outline' as const, label: 'AI Chat', color: WayoraColors.coral, bg: '#FDF2F4' },
  { icon: 'language-outline' as const, label: 'Translate', color: WayoraColors.orange, bg: '#FEF3EA' },
  { icon: 'people-outline' as const, label: 'Artisans', color: WayoraColors.purple, bg: '#F8F0F7' },
  { icon: 'cloudy-outline' as const, label: 'Weather', color: WayoraColors.blue, bg: '#F0F4FF' },
];

const destinations = [
  { name: 'Tokyo', country: 'Japan', emoji: '🏯', rating: 4.9, price: '$1,200' },
  { name: 'Santorini', country: 'Greece', emoji: '🏛️', rating: 4.8, price: '$1,800' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌴', rating: 4.7, price: '$900' },
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
              <Text style={styles.greeting}>Welcome back! 👋</Text>
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
            <Text style={styles.sectionTitle}>Upcoming Trip</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <LinearGradient colors={[WayoraColors.coral, WayoraColors.orange]} style={styles.tripCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.tripTop}>
              <View>
                <Text style={styles.tripDest}>Tokyo, Japan 🏯</Text>
                <Text style={styles.tripDates}>Mar 15 - Mar 22, 2026</Text>
              </View>
              <View style={styles.daysLeft}>
                <Text style={styles.daysLeftText}>12 days left</Text>
              </View>
            </View>
            <View style={styles.tripBottom}>
              <View style={styles.tripStat}>
                <Text style={styles.tripStatLabel}>Budget</Text>
                <Text style={styles.tripStatValue}>$2,500</Text>
              </View>
              <View style={styles.tripStat}>
                <Text style={styles.tripStatLabel}>Spent</Text>
                <Text style={styles.tripStatValue}>$450</Text>
              </View>
              <View style={styles.tripStat}>
                <Text style={styles.tripStatLabel}>Activities</Text>
                <Text style={styles.tripStatValue}>18</Text>
              </View>
            </View>
            {/* Budget Progress */}
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: '18%' }]} />
            </View>
            <Text style={styles.progressText}>$450 / $2,500</Text>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.label} style={styles.quickAction} activeOpacity={0.7}>
                <View style={[styles.quickIconWrap, { backgroundColor: action.bg }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Features</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {features.map((f) => (
              <TouchableOpacity key={f.title} style={[styles.featureCard, { backgroundColor: f.bg }]}>
                <Ionicons name={f.icon} size={28} color={f.color} />
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Destinations</Text>
            <TouchableOpacity onPress={() => router.push('/explore' as any)}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {destinations.map((dest) => (
            <TouchableOpacity key={dest.name} style={styles.destCard} onPress={() => router.push('/planner' as any)}>
              <Text style={styles.destEmoji}>{dest.emoji}</Text>
              <View style={styles.destInfo}>
                <Text style={styles.destName}>{dest.name}</Text>
                <Text style={styles.destCountry}>{dest.country}</Text>
              </View>
              <View style={styles.destRight}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={WayoraColors.orange} />
                  <Text style={styles.ratingText}>{dest.rating}</Text>
                </View>
                <Text style={styles.destPrice}>{dest.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  tripCard: { borderRadius: 20, padding: 20, shadowColor: WayoraColors.coral, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8 },
  tripTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  tripDest: { fontSize: 20, fontWeight: '800', color: 'white' },
  tripDates: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  daysLeft: { backgroundColor: 'rgba(60,179,113,0.9)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  daysLeftText: { fontSize: 11, fontWeight: '700', color: 'white' },
  tripBottom: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tripStat: {},
  tripStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  tripStatValue: { fontSize: 16, fontWeight: '700', color: 'white', marginTop: 2 },
  progressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: WayoraColors.black, borderRadius: 3 },
  progressText: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 6, textAlign: 'right' },
  quickAction: { alignItems: 'center', width: 72 },
  quickIconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 8, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  quickLabel: { fontSize: 11, fontWeight: '600', color: WayoraColors.darkGray, textAlign: 'center' },
  featureCard: { width: 130, paddingVertical: 20, paddingHorizontal: 14, borderRadius: 18, marginRight: 10, alignItems: 'flex-start' },
  featureTitle: { fontSize: 14, fontWeight: '700', color: WayoraColors.black, marginTop: 10 },
  featureDesc: { fontSize: 11, color: WayoraColors.gray, marginTop: 4 },
  destCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, padding: 14, borderRadius: 16, marginBottom: 10, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  destEmoji: { fontSize: 36, marginRight: 12 },
  destInfo: { flex: 1 },
  destName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  destCountry: { fontSize: 12, color: WayoraColors.gray, marginTop: 2 },
  destRight: { alignItems: 'flex-end' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(242,140,56,0.08)', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 },
  ratingText: { fontSize: 11, fontWeight: '700', color: WayoraColors.black },
  destPrice: { fontSize: 14, fontWeight: '700', color: WayoraColors.coral, marginTop: 4 },
});
