import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function ItineraryResultScreen() {
  const router = useRouter();
  const { dest, days, budget, group, interests } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate generation delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <LinearGradient colors={[WayoraColors.taviPurple, '#A78BFA']} style={styles.loadingCircle}>
          <Ionicons name="sparkles" size={40} color="#fff" />
        </LinearGradient>
        <Text style={styles.loadingText}>Crafting your perfect {dest} escape...</Text>
        <Text style={styles.loadingSubtext}>Optimizing for {group} travelers</Text>
      </View>
    );
  }

  const interestList = (interests as string || '').split(',');
  const dayCount = parseInt(days as string) || 3;

  const getDayPlan = (day: number) => {
    const plans: Record<string, any[]> = {
      'culture': [
        { time: '09:00 AM', activity: 'Historical Museum Visit', desc: 'Dive into the local heritage and artifacts.' },
        { time: '02:00 PM', activity: 'Old Town Walking Tour', desc: 'Explore ancient architecture and stories.' }
      ],
      'food': [
        { time: '12:00 PM', activity: 'Street Food Discovery', desc: 'Taste the most authentic local flavors.' },
        { time: '07:30 PM', activity: 'Traditional Dinner Experience', desc: 'A curated multicourse meal.' }
      ],
      'adventure': [
        { time: '10:00 AM', activity: 'Outdoor Expedition', desc: 'A thrilling morning hike or activity.' },
        { time: '03:00 PM', activity: 'Zipline Adventure', desc: 'Get a bird\'s eye view of the landscape.' }
      ]
    };

    // Default plan if no interests match
    const basePlan = [
      { time: '10:00 AM', activity: `${dest} Main Landmark`, desc: 'The most iconic spot in the city.' },
      { time: '01:00 PM', activity: 'Local Market Exploration', desc: 'Browse unique souvenirs and crafts.' },
      { time: '04:00 PM', activity: 'Scenic Park Relax', desc: 'Enjoy the atmosphere like a local.' }
    ];

    const selectedPlan = plans[interestList[0]] || basePlan;
    return selectedPlan;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Itinerary</Text>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <LinearGradient colors={[WayoraColors.taviPurple, '#4C1D95']} style={styles.banner}>
          <View>
            <Text style={styles.bannerDest}>{dest}</Text>
            <View style={styles.bannerInfo}>
              <Ionicons name="calendar-outline" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.bannerInfoText}>{days} Days</Text>
              <View style={styles.infoDot} />
              <Ionicons name="wallet-outline" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.bannerInfoText}>${budget}</Text>
              <View style={styles.infoDot} />
              <Text style={styles.bannerInfoText}>{group}</Text>
            </View>
          </View>
          <View style={styles.aiBadge}>
            <Ionicons name="sparkles" size={12} color={WayoraColors.taviPurple} />
            <Text style={styles.aiBadgeText}>AI Generated</Text>
          </View>
        </LinearGradient>

        {/* Interests Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.interestScroll}>
          {interestList.filter(Boolean).map(interest => (
            <View key={interest} style={styles.interestChip}>
              <Text style={styles.interestText}>{interest.charAt(0).toUpperCase() + interest.slice(1)}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Day-by-Day */}
        <View style={styles.itinerarySection}>
          {Array.from({ length: dayCount }).map((_, i) => (
            <View key={i} style={styles.dayBlock}>
              <View style={styles.dayHeader}>
                <View style={styles.dayCircle}>
                  <Text style={styles.dayCircleText}>{i + 1}</Text>
                </View>
                <Text style={styles.dayTitle}>Day {i + 1}</Text>
              </View>

              <View style={[styles.dayContent, i === dayCount - 1 && { borderLeftColor: 'transparent' }]}>
                {getDayPlan(i + 1).map((item, idx) => (
                  <View key={idx} style={styles.activityCard}>
                    <View style={styles.timeLabel}>
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTitle}>{item.activity}</Text>
                      <Text style={styles.activityDesc}>{item.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmBtnText}>Add to My Trips</Text>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: WayoraColors.taviPurple,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '800',
    color: WayoraColors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingSubtext: {
    fontSize: 14,
    color: WayoraColors.gray,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: WayoraColors.black,
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: WayoraColors.taviPurpleLight,
  },
  saveBtnText: {
    color: WayoraColors.taviPurple,
    fontWeight: '700',
    fontSize: 13,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  banner: {
    margin: 20,
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bannerDest: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 8,
  },
  bannerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerInfoText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 4,
  },
  infoDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 8,
  },
  aiBadge: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: WayoraColors.taviPurple,
  },
  interestScroll: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  interestChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginRight: 8,
  },
  interestText: {
    fontSize: 12,
    fontWeight: '600',
    color: WayoraColors.gray,
  },
  itinerarySection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  dayBlock: {
    marginBottom: 10,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: WayoraColors.taviPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: WayoraColors.black,
  },
  dayContent: {
    marginLeft: 14,
    paddingLeft: 26,
    borderLeftWidth: 2,
    borderLeftColor: '#F3F4F6',
    paddingTop: 20,
    paddingBottom: 10,
  },
  activityCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 16,
    flexDirection: 'row',
    gap: 16,
  },
  timeLabel: {
    backgroundColor: WayoraColors.taviBg,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: WayoraColors.taviPurple,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: WayoraColors.black,
    marginBottom: 4,
  },
  activityDesc: {
    fontSize: 13,
    color: WayoraColors.gray,
    lineHeight: 18,
  },
  confirmBtn: {
    margin: 20,
    paddingVertical: 18,
    backgroundColor: WayoraColors.black,
    borderRadius: 20,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
