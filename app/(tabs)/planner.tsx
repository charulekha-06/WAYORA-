import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';

const interests = [
  { id: 'culture', label: 'Culture', emoji: '🏛️' },
  { id: 'food', label: 'Food', emoji: '🍜' },
  { id: 'adventure', label: 'Adventure', emoji: '🧗' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🌙' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘' },
  { id: 'photo', label: 'Photography', emoji: '📸' },
];

const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];

const sampleItinerary = [
  {
    day: 1, title: 'Arrival & Cultural Immersion',
    activities: [
      { time: '09:00 AM', name: 'Arrive & Check into Ryokan', cost: '$120', type: 'stay', icon: 'bed-outline' as const },
      { time: '11:30 AM', name: 'Senso-ji Temple Visit', cost: 'Free', type: 'culture', icon: 'camera-outline' as const },
      { time: '01:00 PM', name: 'Ramen Street Lunch', cost: '$15', type: 'food', icon: 'restaurant-outline' as const },
      { time: '03:00 PM', name: 'Meiji Shrine & Harajuku', cost: 'Free', type: 'culture', icon: 'camera-outline' as const },
      { time: '06:30 PM', name: 'Shibuya Crossing & Dinner', cost: '$35', type: 'food', icon: 'restaurant-outline' as const },
      { time: '09:00 PM', name: 'Tokyo Tower Night View', cost: '$10', type: 'exp', icon: 'moon-outline' as const },
    ],
  },
  {
    day: 2, title: 'Modern Tokyo & Tech',
    activities: [
      { time: '08:30 AM', name: 'Tsukiji Outer Market', cost: '$25', type: 'food', icon: 'sunny-outline' as const },
      { time: '11:00 AM', name: 'TeamLab Borderless', cost: '$30', type: 'exp', icon: 'color-palette-outline' as const },
      { time: '01:30 PM', name: 'Akihabara Electric Town', cost: '$20', type: 'shopping', icon: 'bag-outline' as const },
      { time: '04:00 PM', name: 'Imperial Palace Gardens', cost: 'Free', type: 'nature', icon: 'leaf-outline' as const },
      { time: '07:00 PM', name: 'Shinjuku Golden Gai', cost: '$40', type: 'nightlife', icon: 'moon-outline' as const },
    ],
  },
  {
    day: 3, title: 'Day Trip & Nature',
    activities: [
      { time: '07:00 AM', name: 'Shinkansen to Hakone', cost: '$45', type: 'transport', icon: 'train-outline' as const },
      { time: '10:00 AM', name: 'Hakone Open-Air Museum', cost: '$15', type: 'culture', icon: 'camera-outline' as const },
      { time: '12:30 PM', name: 'Lake Ashi Cruise', cost: '$10', type: 'nature', icon: 'boat-outline' as const },
      { time: '03:00 PM', name: 'Onsen Experience', cost: '$25', type: 'wellness', icon: 'water-outline' as const },
      { time: '06:00 PM', name: 'Kaiseki Dinner', cost: '$60', type: 'food', icon: 'restaurant-outline' as const },
    ],
  },
];

const typeColors: Record<string, string> = {
  culture: WayoraColors.blue, food: WayoraColors.orange, exp: WayoraColors.coral,
  nature: WayoraColors.green, shopping: WayoraColors.purple, nightlife: '#8B5CF6',
  wellness: '#14B8A6', stay: WayoraColors.coral, transport: WayoraColors.darkGray,
};

export default function PlannerScreen() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [selected, setSelected] = useState<string[]>([]);
  const [dest, setDest] = useState('');
  const [days, setDays] = useState('3');
  const [budget, setBudget] = useState('1500');
  const [group, setGroup] = useState('Solo');
  const [activeDay, setActiveDay] = useState(1);

  const toggleInterest = (id: string) => setSelected(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);
  const generate = () => { setStep('loading'); setTimeout(() => setStep('result'), 2500); };
  const currentDay = sampleItinerary.find(d => d.day === activeDay);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Ionicons name="sparkles" size={14} color={WayoraColors.coral} />
            <Text style={[styles.badgeText, { color: WayoraColors.coral }]}>AI Itinerary Planner</Text>
          </View>
          <Text style={styles.title}>Plan your <Text style={{ color: WayoraColors.coral }}>perfect trip</Text></Text>
        </View>

        {step === 'form' && (
          <View style={styles.form}>
            <Text style={styles.label}>📍 Where do you want to go?</Text>
            <TextInput style={styles.input} placeholder="e.g., Tokyo, Japan" placeholderTextColor={WayoraColors.gray} value={dest} onChangeText={setDest} />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>📅 Days</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={days} onChangeText={setDays} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>💰 Budget ($)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={budget} onChangeText={setBudget} />
              </View>
            </View>

            <Text style={styles.label}>👥 Group Type</Text>
            <View style={styles.chipRow}>
              {groupTypes.map(g => (
                <TouchableOpacity key={g} onPress={() => setGroup(g)}
                  style={[styles.chip, group === g && styles.chipActive]}>
                  <Text style={[styles.chipText, group === g && styles.chipTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>❤️ Interests</Text>
            <View style={styles.interestGrid}>
              {interests.map(i => (
                <TouchableOpacity key={i.id} onPress={() => toggleInterest(i.id)}
                  style={[styles.interestChip, selected.includes(i.id) && styles.interestActive]}>
                  <Text style={styles.interestEmoji}>{i.emoji}</Text>
                  <Text style={[styles.interestLabel, selected.includes(i.id) && { color: WayoraColors.coral }]}>{i.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={generate}>
              <LinearGradient colors={[WayoraColors.coral, WayoraColors.orange]} style={styles.generateBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Ionicons name="sparkles" size={18} color="#fff" />
                <Text style={styles.generateText}>Generate My Itinerary</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {step === 'loading' && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={WayoraColors.coral} />
            <Text style={styles.loadingTitle}>Crafting your itinerary...</Text>
            <Text style={styles.loadingDesc}>Our AI is analyzing thousands of travel experiences.</Text>
          </View>
        )}

        {step === 'result' && (
          <View style={styles.resultContainer}>
            <LinearGradient colors={[WayoraColors.coral, WayoraColors.orange]} style={styles.resultHeader} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.resultSubtitle}>Your AI-Generated Itinerary</Text>
              <Text style={styles.resultTitle}>{dest || 'Tokyo, Japan'} ✨</Text>
              <View style={styles.resultStats}>
                <Text style={styles.resultStat}>📅 {days} days</Text>
                <Text style={styles.resultStat}>💰 ${budget}</Text>
                <Text style={styles.resultStat}>👤 {group}</Text>
              </View>
            </LinearGradient>

            {/* Day tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabs} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
              {sampleItinerary.map(d => (
                <TouchableOpacity key={d.day} onPress={() => setActiveDay(d.day)}
                  style={[styles.dayTab, activeDay === d.day && styles.dayTabActive]}>
                  <Text style={[styles.dayTabLabel, activeDay === d.day && { color: WayoraColors.coral }]}>Day</Text>
                  <Text style={[styles.dayTabNum, activeDay === d.day && { color: WayoraColors.coral }]}>{d.day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Activities */}
            {currentDay && (
              <View style={styles.dayContent}>
                <Text style={styles.dayTitle}>{currentDay.title}</Text>
                {currentDay.activities.map((a, idx) => (
                  <View key={idx} style={styles.activityCard}>
                    <View style={[styles.activityIcon, { backgroundColor: (typeColors[a.type] || WayoraColors.gray) + '15' }]}>
                      <Ionicons name={a.icon} size={20} color={typeColors[a.type] || WayoraColors.gray} />
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTime}>{a.time}</Text>
                      <Text style={styles.activityName}>{a.name}</Text>
                    </View>
                    <Text style={[styles.activityCost, { color: typeColors[a.type] || WayoraColors.gray }]}>{a.cost}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.resultActions}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep('form')}>
                <Text style={styles.secondaryBtnText}>Regenerate</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient colors={[WayoraColors.coral, WayoraColors.orange]} style={styles.primaryBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.primaryBtnText}>Save Itinerary</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: 'rgba(232,99,122,0.08)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 8 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  title: { fontSize: 26, fontWeight: '800', color: WayoraColors.black },
  form: { paddingHorizontal: 20, paddingBottom: 40 },
  label: { fontSize: 13, fontWeight: '600', color: WayoraColors.black, marginTop: 16, marginBottom: 8 },
  input: { backgroundColor: WayoraColors.white, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, color: WayoraColors.black, borderWidth: 1, borderColor: WayoraColors.lightGray },
  row: { flexDirection: 'row', gap: 12 },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 14, backgroundColor: WayoraColors.offWhite, borderWidth: 1, borderColor: WayoraColors.lightGray },
  chipActive: { backgroundColor: WayoraColors.coral, borderColor: WayoraColors.coral },
  chipText: { fontSize: 13, fontWeight: '600', color: WayoraColors.darkGray },
  chipTextActive: { color: '#fff' },
  interestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interestChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: WayoraColors.offWhite, borderWidth: 1, borderColor: WayoraColors.lightGray },
  interestActive: { borderColor: WayoraColors.coral, backgroundColor: 'rgba(232,99,122,0.06)' },
  interestEmoji: { fontSize: 16 },
  interestLabel: { fontSize: 12, fontWeight: '600', color: WayoraColors.darkGray },
  generateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 16, marginTop: 24 },
  generateText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  loadingBox: { alignItems: 'center', justifyContent: 'center', padding: 60 },
  loadingTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black, marginTop: 20 },
  loadingDesc: { fontSize: 13, color: WayoraColors.gray, marginTop: 6, textAlign: 'center' },
  resultContainer: { paddingBottom: 40 },
  resultHeader: { marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 16 },
  resultSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  resultTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginTop: 4 },
  resultStats: { flexDirection: 'row', gap: 16, marginTop: 12 },
  resultStat: { fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  dayTabs: { marginBottom: 16 },
  dayTab: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14, backgroundColor: 'transparent' },
  dayTabActive: { backgroundColor: WayoraColors.white, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  dayTabLabel: { fontSize: 10, color: WayoraColors.gray },
  dayTabNum: { fontSize: 18, fontWeight: '700', color: WayoraColors.gray, marginTop: 2 },
  dayContent: { paddingHorizontal: 20 },
  dayTitle: { fontSize: 17, fontWeight: '700', color: WayoraColors.black, marginBottom: 12 },
  activityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, padding: 14, borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: WayoraColors.lightGray },
  activityIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  activityInfo: { flex: 1 },
  activityTime: { fontSize: 10, fontWeight: '600', color: WayoraColors.gray },
  activityName: { fontSize: 14, fontWeight: '600', color: WayoraColors.black, marginTop: 2 },
  activityCost: { fontSize: 13, fontWeight: '700' },
  resultActions: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginTop: 20 },
  secondaryBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, borderWidth: 1.5, borderColor: WayoraColors.lightGray, alignItems: 'center', backgroundColor: WayoraColors.white },
  secondaryBtnText: { fontSize: 14, fontWeight: '600', color: WayoraColors.darkGray },
  primaryBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  primaryBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
