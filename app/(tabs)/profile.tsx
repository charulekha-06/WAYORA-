import React from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';

const badges = [
  { name: 'Explorer I', icon: 'compass-outline' as const, color: WayoraColors.blue, earned: true },
  { name: 'Culture Buff', icon: 'business-outline' as const, color: WayoraColors.coral, earned: true },
  { name: 'Foodie', icon: 'restaurant-outline' as const, color: WayoraColors.orange, earned: true },
  { name: 'Budget Pro', icon: 'wallet-outline' as const, color: WayoraColors.green, earned: true },
  { name: 'Adventurer', icon: 'trail-sign-outline' as const, color: WayoraColors.green, earned: false },
  { name: 'Wandrix Elite', icon: 'star-outline' as const, color: WayoraColors.orange, earned: false },
  { name: 'Puthir Master', icon: 'extension-puzzle-outline' as const, color: WayoraColors.purple, earned: false },
  { name: 'Globe Trotter', icon: 'globe-outline' as const, color: WayoraColors.blue, earned: false },
];

const trips = [
  { dest: 'Tokyo, Japan', dates: 'Mar 10-15, 2026', status: 'Active', icon: 'business-outline' as const, iconColor: WayoraColors.coral, daysLeft: 12 },
  { dest: 'Bali, Indonesia', dates: 'Jan 5-15, 2026', status: 'Completed', icon: 'leaf-outline' as const, iconColor: WayoraColors.green },
  { dest: 'Paris, France', dates: 'Nov 20-27, 2025', status: 'Completed', icon: 'diamond-outline' as const, iconColor: WayoraColors.blue },
];

const menu = [
  { label: 'Notifications', icon: 'notifications-outline' as const, badge: '3' },
  { label: 'Privacy & Security', icon: 'shield-checkmark-outline' as const },
  { label: 'Language', icon: 'globe-outline' as const, value: 'English' },
  { label: 'Help & Support', icon: 'help-circle-outline' as const },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient colors={[WayoraColors.coral, WayoraColors.orange]} style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color="rgba(255,255,255,0.9)" />
          </View>
          <Text style={styles.userName}>Alex Traveler</Text>
          <Text style={styles.userLevel}>Wandrix Level: Explorer II · 750 pts</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>12</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>8</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>4</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Wandrix Badges */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              <Ionicons name="trophy-outline" size={16} color={WayoraColors.orange} />{' '}Wandrix Badges
            </Text>
            <Text style={styles.cardSubtitle}>4/8 earned</Text>
          </View>
          <View style={styles.badgeGrid}>
            {badges.map(b => (
              <View key={b.name} style={[styles.badgeItem, !b.earned && { opacity: 0.4 }]}>
                <View style={[styles.badgeIconWrap, { backgroundColor: b.color + '15' }]}>
                  <Ionicons name={b.icon} size={20} color={b.color} />
                </View>
                <Text style={styles.badgeName}>{b.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Trip History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="calendar-outline" size={16} color={WayoraColors.coral} />{' '}Trip History
          </Text>
          {trips.map(trip => (
            <View key={trip.dest} style={styles.tripItem}>
              <View style={[styles.tripIconWrap, { backgroundColor: trip.iconColor + '12' }]}>
                <Ionicons name={trip.icon} size={20} color={trip.iconColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tripDest}>{trip.dest}</Text>
                <Text style={styles.tripDates}>{trip.dates}</Text>
              </View>
              {trip.status === 'Active' ? (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>{trip.daysLeft} days left</Text>
                </View>
              ) : (
                <Text style={styles.completedText}>Completed</Text>
              )}
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={[styles.card, { marginBottom: 30 }]}>
          <Text style={styles.cardTitle}>
            <Ionicons name="settings-outline" size={16} color={WayoraColors.gray} />{' '}Settings
          </Text>
          {menu.map(item => (
            <TouchableOpacity key={item.label} style={styles.menuItem}>
              <Ionicons name={item.icon} size={20} color={WayoraColors.gray} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
              <Ionicons name="chevron-forward" size={16} color={WayoraColors.lightGray} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={20} color={WayoraColors.red} />
            <Text style={[styles.menuLabel, { color: WayoraColors.red }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { paddingTop: 60, paddingBottom: 30, alignItems: 'center', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)', marginBottom: 12 },
  avatarText: { fontSize: 36 },
  userName: { fontSize: 22, fontWeight: '800', color: '#fff' },
  userLevel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: 20 },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' },
  card: { marginHorizontal: 20, marginTop: 16, backgroundColor: WayoraColors.white, borderRadius: 18, padding: 16, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: WayoraColors.black, marginBottom: 10 },
  cardSubtitle: { fontSize: 11, color: WayoraColors.gray, fontWeight: '500' },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badgeItem: { width: '22%', alignItems: 'center', paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(242,140,56,0.06)' },
  badgeIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  badgeName: { fontSize: 9, fontWeight: '700', color: WayoraColors.black, textAlign: 'center' },
  tripItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: WayoraColors.lightGray },
  tripIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tripDest: { fontSize: 14, fontWeight: '600', color: WayoraColors.black },
  tripDates: { fontSize: 11, color: WayoraColors.gray, marginTop: 2 },
  activeBadge: { backgroundColor: 'rgba(60,179,113,0.08)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  activeBadgeText: { fontSize: 10, fontWeight: '700', color: WayoraColors.green },
  completedText: { fontSize: 11, color: WayoraColors.gray },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: WayoraColors.lightGray },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: WayoraColors.black },
  menuBadge: { width: 20, height: 20, borderRadius: 10, backgroundColor: WayoraColors.coral, alignItems: 'center', justifyContent: 'center' },
  menuBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  menuValue: { fontSize: 12, color: WayoraColors.gray, marginRight: 4 },
});
