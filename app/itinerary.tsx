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

  const handleGenerate = () => {
    if (!dest.trim()) {
      alert('Please enter a destination');
      return;
    }
    router.push({
      pathname: '/itinerary-result',
      params: {
        dest,
        days,
        budget,
        group,
        interests: selectedInterests.join(','),
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Itinerary Planner</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        {/* Destination */}
        <View style={styles.labelRow}>
          <Ionicons name="location-sharp" size={18} color={WayoraColors.taviPurple} />
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
              <Ionicons name="calendar" size={18} color={WayoraColors.taviPurple} />
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
              <Ionicons name="wallet" size={18} color={WayoraColors.taviPurple} />
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
          <Ionicons name="people" size={18} color={WayoraColors.taviPurple} />
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
          <Ionicons name="heart" size={18} color={WayoraColors.taviPurple} />
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
                color={selectedInterests.includes(i.id) ? WayoraColors.taviPurple : WayoraColors.gray} 
              />
              <Text style={[
                styles.interestLabel, 
                selectedInterests.includes(i.id) && { color: WayoraColors.taviPurple }
              ]}>{i.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateBtnContainer} onPress={handleGenerate}>
          <LinearGradient 
            colors={[WayoraColors.taviPurple, '#A78BFA']} 
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
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  backBtn: {
    marginRight: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: WayoraColors.black,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: WayoraColors.black,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: WayoraColors.black,
    borderWidth: 1,
    borderColor: '#F3F4F6',
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
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  chipActive: {
    backgroundColor: WayoraColors.taviPurple,
    borderColor: WayoraColors.taviPurple,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: WayoraColors.gray,
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
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  interestActive: {
    backgroundColor: WayoraColors.taviPurpleLight,
    borderColor: WayoraColors.taviPurple,
  },
  interestLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: WayoraColors.gray,
  },
  generateBtnContainer: {
    marginTop: 40,
    shadowColor: WayoraColors.taviPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    borderRadius: 20,
  },
  generateText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
});
