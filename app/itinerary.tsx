import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  TextInput, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];
const interests = [
  { id: 'culture', label: 'Culture', icon: 'business-outline' as const, color: WayoraColors.blue },
  { id: 'food', label: 'Food', icon: 'restaurant-outline' as const, color: WayoraColors.orange },
  { id: 'adventure', label: 'Adventure', icon: 'trail-sign-outline' as const, color: WayoraColors.green },
  { id: 'nature', label: 'Nature', icon: 'leaf-outline' as const, color: WayoraColors.green },
  { id: 'shopping', label: 'Shopping', icon: 'bag-handle-outline' as const, color: WayoraColors.purple },
  { id: 'nightlife', label: 'Nightlife', icon: 'moon-outline' as const, color: '#8B5CF6' },
  { id: 'wellness', label: 'Wellness', icon: 'heart-outline' as const, color: '#14B8A6' },
  { id: 'photo', label: 'Photography', icon: 'camera-outline' as const, color: WayoraColors.coral },
];

export default function ItineraryScreen() {
  const router = useRouter();
  const [dest, setDest] = useState('');
  const [days, setDays] = useState('3');
  const [budget, setBudget] = useState('1500');
  const [group, setGroup] = useState('Solo');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan your <Text style={{ color: WayoraColors.coral }}>perfect trip</Text></Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        {/* Destination */}
        <View style={styles.labelRow}>
          <Ionicons name="location-outline" size={16} color={WayoraColors.coral} />
          <Text style={styles.label}>Where do you want to go?</Text>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="e.g., Tokyo, Japan" 
          placeholderTextColor={WayoraColors.gray} 
          value={dest} 
          onChangeText={setDest} 
        />

        {/* Days & Budget */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <View style={styles.labelRow}>
              <Ionicons name="calendar-outline" size={16} color={WayoraColors.blue} />
              <Text style={styles.label}>Days</Text>
            </View>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={days} 
              onChangeText={setDays} 
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.labelRow}>
              <Ionicons name="wallet-outline" size={16} color={WayoraColors.orange} />
              <Text style={styles.label}>Budget ($)</Text>
            </View>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={budget} 
              onChangeText={setBudget} 
            />
          </View>
        </View>

        {/* Group Type */}
        <View style={styles.labelRow}>
          <Ionicons name="people-outline" size={16} color={WayoraColors.purple} />
          <Text style={styles.label}>Group Type</Text>
        </View>
        <View style={styles.chipRow}>
          {groupTypes.map(g => (
            <TouchableOpacity 
              key={g} 
              onPress={() => setGroup(g)}
              style={[styles.chip, group === g && styles.chipActive]}
            >
              <Text style={[styles.chipText, group === g && styles.chipTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Interests */}
        <View style={styles.labelRow}>
          <Ionicons name="heart-outline" size={16} color={WayoraColors.coral} />
          <Text style={styles.label}>Interests</Text>
        </View>
        <View style={styles.interestGrid}>
          {interests.map(i => (
            <TouchableOpacity 
              key={i.id} 
              onPress={() => toggleInterest(i.id)}
              style={[
                styles.interestChip, 
                selectedInterests.includes(i.id) && styles.interestActive
              ]}
            >
              <Ionicons 
                name={i.icon} 
                size={16} 
                color={selectedInterests.includes(i.id) ? WayoraColors.coral : i.color} 
              />
              <Text style={[
                styles.interestLabel, 
                selectedInterests.includes(i.id) && { color: WayoraColors.coral }
              ]}>{i.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateBtnContainer}>
          <LinearGradient 
            colors={[WayoraColors.coral, WayoraColors.orange]} 
            style={styles.generateBtn} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="sparkles" size={20} color="#fff" />
            <Text style={styles.generateText}>Generate My Itinerary</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC', // slightly softer background to match image
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFC',
  },
  backBtn: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B1B2F',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B2F',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1B1B2F',
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  chipActive: {
    backgroundColor: '#E65C7B', // Match coral-pink from image
    borderColor: '#E65C7B',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  chipTextActive: {
    color: '#FFF',
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  interestActive: {
    backgroundColor: 'rgba(230,92,123,0.06)', // Very faint pink background
    borderColor: '#E65C7B',
  },
  interestLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  generateBtnContainer: {
    marginTop: 40,
    shadowColor: '#F28C38', // Orange glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
  },
  generateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
