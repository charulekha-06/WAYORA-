import React, { useState, useRef } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Image, Alert, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { WayoraColors } from '@/constants/Colors';

// New color palette — deep purple/indigo/teal
const PALETTE = {
  gradientStart: '#4C1D95',  // deep violet
  gradientEnd:   '#7C3AED',  // vivid purple
  accent:        '#A78BFA',  // soft lavender
  accentDark:    '#5B21B6',
  teal:          '#0D9488',
  white:         '#FFFFFF',
};

const badges = [
  { name: 'Explorer I', icon: 'compass-outline' as const, color: '#7C3AED', earned: true },
  { name: 'Culture Buff', icon: 'business-outline' as const, color: '#0D9488', earned: true },
  { name: 'Foodie', icon: 'restaurant-outline' as const, color: '#DB2777', earned: true },
  { name: 'Budget Pro', icon: 'wallet-outline' as const, color: '#059669', earned: true },
  { name: 'Adventurer', icon: 'trail-sign-outline' as const, color: '#D97706', earned: false },
  { name: 'Wandrix Elite', icon: 'star-outline' as const, color: '#7C3AED', earned: false },
  { name: 'Puthir Master', icon: 'extension-puzzle-outline' as const, color: '#2563EB', earned: false },
  { name: 'Globe Trotter', icon: 'globe-outline' as const, color: '#0D9488', earned: false },
];

const trips = [
  { dest: 'Tokyo, Japan', dates: 'Mar 10-15, 2026', status: 'Active', icon: 'business-outline' as const, iconColor: '#7C3AED', daysLeft: 12 },
  { dest: 'Bali, Indonesia', dates: 'Jan 5-15, 2026', status: 'Completed', icon: 'leaf-outline' as const, iconColor: '#059669' },
  { dest: 'Paris, France', dates: 'Nov 20-27, 2025', status: 'Completed', icon: 'diamond-outline' as const, iconColor: '#2563EB' },
];

const menu = [
  { label: 'Notifications', icon: 'notifications-outline' as const, badge: '3' },
  { label: 'Privacy & Security', icon: 'shield-checkmark-outline' as const },
  { label: 'Location', icon: 'location-outline' as const, value: 'France' },
  { label: 'Language', icon: 'globe-outline' as const, value: 'English' },
  { label: 'Help & Support', icon: 'help-circle-outline' as const },
];

export default function ProfileScreen() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [userName, setUserName] = useState('Alex Traveler');
  const [editingName, setEditingName] = useState(false);
  const nameInputRef = useRef<TextInput>(null);

  const handleEditAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photo library to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient colors={[PALETTE.gradientStart, PALETTE.gradientEnd]} style={styles.header}>
          
          {/* Editable Avatar */}
          <TouchableOpacity onPress={handleEditAvatar} style={styles.avatarWrapper} activeOpacity={0.85}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="rgba(255,255,255,0.9)" />
              </View>
            )}
            {/* Camera badge overlay */}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color="#FFF" />
            </View>
          </TouchableOpacity>

          {/* Editable Name */}
          <View style={styles.nameRow}>
            {editingName ? (
              <TextInput
                ref={nameInputRef}
                value={userName}
                onChangeText={setUserName}
                style={styles.nameInput}
                onBlur={() => setEditingName(false)}
                onSubmitEditing={() => setEditingName(false)}
                autoFocus
                returnKeyType="done"
                selectTextOnFocus
              />
            ) : (
              <Text style={styles.userName}>{userName}</Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setEditingName(true);
                setTimeout(() => nameInputRef.current?.focus(), 50);
              }}
              style={styles.editIcon}
            >
              <Ionicons name="pencil" size={14} color="rgba(255,255,255,0.85)" />
            </TouchableOpacity>
          </View>
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
              <Ionicons name="trophy-outline" size={16} color="#7C3AED" />{' '}Wandrix Badges
            </Text>
            <Text style={styles.cardSubtitle}>4/8 earned</Text>
          </View>
          <View style={styles.badgeGrid}>
            {badges.map(b => (
              <View key={b.name} style={[styles.badgeItem, !b.earned && { opacity: 0.35 }]}>
                <View style={[styles.badgeIconWrap, { backgroundColor: b.color + '18' }]}>
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
            <Ionicons name="calendar-outline" size={16} color="#7C3AED" />{' '}Trip History
          </Text>
          {trips.map(trip => (
            <View key={trip.dest} style={styles.tripItem}>
              <View style={[styles.tripIconWrap, { backgroundColor: trip.iconColor + '18' }]}>
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
            <Ionicons name="settings-outline" size={16} color="#6B7280" />{' '}Settings
          </Text>
          {menu.map(item => (
            <TouchableOpacity key={item.label} style={styles.menuItem}>
              <Ionicons name={item.icon} size={20} color="#6B7280" />
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
              <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text style={[styles.menuLabel, { color: '#DC2626' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3FF' },
  header: { paddingTop: 60, paddingBottom: 34, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  
  // Editable Avatar
  avatarWrapper: { position: 'relative', marginBottom: 16 },
  avatarPlaceholder: { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.45)' },
  avatarImage: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: 'rgba(255,255,255,0.6)' },
  cameraBadge: { position: 'absolute', bottom: 2, right: 2, width: 28, height: 28, borderRadius: 14, backgroundColor: '#5B21B6', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
  
  userName: { fontSize: 22, fontWeight: '800', color: '#fff' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  nameInput: { fontSize: 22, fontWeight: '800', color: '#fff', borderBottomWidth: 1.5, borderBottomColor: 'rgba(255,255,255,0.6)', minWidth: 160, textAlign: 'center', paddingVertical: 2 },
  editIcon: { padding: 4, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.15)' },
  userLevel: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 28, marginTop: 22 },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  
  card: { marginHorizontal: 20, marginTop: 16, backgroundColor: '#FFF', borderRadius: 20, padding: 18, shadowColor: '#4C1D95', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1F1F2E', marginBottom: 12 },
  cardSubtitle: { fontSize: 11, color: '#6B7280', fontWeight: '600' },

  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badgeItem: { width: '22%', alignItems: 'center', paddingVertical: 10, borderRadius: 14, backgroundColor: '#FAF5FF' },
  badgeIconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  badgeName: { fontSize: 9, fontWeight: '700', color: '#374151', textAlign: 'center' },

  tripItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tripIconWrap: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  tripDest: { fontSize: 14, fontWeight: '700', color: '#111827' },
  tripDates: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  activeBadge: { backgroundColor: '#EDE9FE', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  activeBadgeText: { fontSize: 10, fontWeight: '700', color: '#7C3AED' },
  completedText: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },

  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#111827' },
  menuBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center' },
  menuBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  menuValue: { fontSize: 13, color: '#9CA3AF', marginRight: 4 },
});
