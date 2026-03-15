import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions, Alert, ActivityIndicator, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ServiceInfo {
  name: string;
  category: string;
  distance: string;
  status: string;
  address: string;
  rating: string;
  reviews: string;
  phone: string;
  tags: string[];
  icon: string;
}

const EMERGENCY_SERVICES = [
  { id: '1', name: 'Hospitals', icon: 'medical', color: '#EF4444', bgColor: '#FEF2F2' },
  { id: '2', name: 'Pharmacies', icon: 'bandage', color: '#3B82F6', bgColor: '#EFF6FF' },
  { id: '3', name: 'ATMs', icon: 'card', color: '#10B981', bgColor: '#ECFDF5' },
  { id: '4', name: 'Restrooms', icon: 'water', color: '#D946EF', bgColor: '#FDF4FF' },
  { id: '5', name: 'Police', icon: 'shield-checkmark', color: '#1F2937', bgColor: '#F9FAFB' },
  { id: '6', name: 'Embassy', icon: 'flag', color: '#F59E0B', bgColor: '#FFFBEB' },
];

const MOCK_DATA: Record<string, ServiceInfo> = {
  'Hospitals': {
    name: 'Hôpital Saint-Joseph',
    category: 'General Hospital',
    distance: '2.4 km',
    status: 'Open 24 Hours',
    address: '185 Rue Raymond Losserand, 75014 Paris',
    rating: '4.1',
    reviews: '654 reviews',
    phone: '+33 1 44 12 33 33',
    tags: ['Emergency', 'Surgery', 'Cardiology'],
    icon: 'business'
  },
  'Pharmacies': {
    name: 'Pharmacie de la Mairie',
    category: 'Late Night Pharmacy',
    distance: '0.8 km',
    status: 'Open until 11:00 PM',
    address: '12 Rue de Rivoli, 75004 Paris',
    rating: '4.5',
    reviews: '128 reviews',
    phone: '+33 1 42 72 34 56',
    tags: ['Prescriptions', 'Vaccinations', 'OTC'],
    icon: 'medkit'
  },
  'ATMs': {
    name: 'BNP Paribas ATM',
    category: 'Bank / ATM',
    distance: '0.3 km',
    status: 'Available',
    address: '45 Boulevard Saint-Germain, 75005 Paris',
    rating: '3.8',
    reviews: '42 reviews',
    phone: '3477 (Local)',
    tags: ['24h Access', 'Withdrawal', 'English Menu'],
    icon: 'cash'
  },
  'Restrooms': {
    name: 'Sanisette Public Toliet',
    category: 'Public Restroom',
    distance: '0.1 km',
    status: 'Operational',
    address: 'Place de la Concorde, 75008 Paris',
    rating: '3.5',
    reviews: '210 reviews',
    phone: 'N/A',
    tags: ['Accessible', 'Self-Cleaning', 'Free'],
    icon: 'water'
  },
  'Police': {
    name: 'Commissariat de Police',
    category: 'Police Station',
    distance: '1.2 km',
    status: 'Open 24 Hours',
    address: '9 Boulevard du Palais, 75004 Paris',
    rating: '4.0',
    reviews: '85 reviews',
    phone: '17 (Emergency)',
    tags: ['Passport Loss', 'Security', 'Reporting'],
    icon: 'shield-half'
  },
  'Embassy': {
    name: 'Consulat Général',
    category: 'Diplomatic Mission',
    distance: '3.5 km',
    status: 'By Appointment',
    address: '2 Avenue Gabriel, 75008 Paris',
    rating: '4.2',
    reviews: '150 reviews',
    phone: '+33 1 43 12 22 22',
    tags: ['Visas', 'Passport Services', 'Citizenship'],
    icon: 'flag'
  }
};

export default function EmergencyScreen() {
  const router = useRouter();
  const [searching, setSearching] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<ServiceInfo | null>(null);

  const handleServicePress = (service: string) => {
    setSearching(service);
    // Simulate finding nearest service
    setTimeout(() => {
      setSearching(null);
      setShowResult(MOCK_DATA[service] || MOCK_DATA['Hospitals']);
    }, 1200);
  };

  const handleSOS = () => {
    Alert.alert(
      "Emergency SOS",
      "Confirm calling local emergency services? Your location will be shared.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "CALL NOW", onPress: () => console.log("Calling emergency..."), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Finder</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* SOS Pulse Button */}
        <View style={styles.sosSection}>
          <TouchableOpacity onPress={handleSOS} activeOpacity={0.8}>
            <LinearGradient
              colors={['#EF4444', '#B91C1C']}
              style={styles.sosButton}
            >
              <Ionicons name="alert-circle" size={48} color="white" />
              <Text style={styles.sosText}>SOS</Text>
              <Text style={styles.sosSubtext}>Tap for Emergency</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.locationBadge}>
            <Ionicons name="location" size={14} color={WayoraColors.gray} />
            <Text style={styles.locationText}>Location: Active (Paris, France)</Text>
          </View>
        </View>

        {/* Improved Service Grid */}
        <View style={styles.gridSection}>
          <Text style={styles.gridTitle}>Nearest Services</Text>
          <View style={styles.grid}>
            {EMERGENCY_SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.serviceCard, { backgroundColor: service.bgColor }]}
                onPress={() => handleServicePress(service.name)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBox, { backgroundColor: 'white' }]}>
                  <Ionicons name={service.icon as any} size={28} color={service.color} />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceAction}>Find Now</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Global Assistance Card */}
        <View style={styles.assistanceCard}>
          <Ionicons name="globe-outline" size={24} color={WayoraColors.black} />
          <View style={styles.assistanceInfo}>
            <Text style={styles.assistanceTitle}>Travel Assistance</Text>
            <Text style={styles.assistanceDesc}>Available 24/7 for support</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Searching Modal */}
      <Modal visible={searching !== null} transparent animationType="fade">
        <View style={styles.modalOverlayLight}>
          <View style={styles.searchBox}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.searchText}>Finding nearest {searching}...</Text>
          </View>
        </View>
      </Modal>

      {/* DETAILED Result Modal (Based on user image) */}
      <Modal visible={showResult !== null} transparent animationType="slide">
        <View style={styles.modalOverlayDark}>
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIconBox}>
                <Ionicons name={showResult?.icon as any} size={20} color={WayoraColors.black} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.resultTitle}>{showResult?.name}</Text>
                  <Text style={styles.resultDistance}>{showResult?.distance}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                  <Text style={styles.resultCategory}>{showResult?.category}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{showResult?.status}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location-sharp" size={16} color={WayoraColors.coral} />
              <Text style={styles.infoText}>{showResult?.address}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: '700', color: WayoraColors.black }}>{showResult?.rating}</Text> ({showResult?.reviews})
              </Text>
              <View style={{ width: 12 }} />
              <Ionicons name="call" size={16} color={WayoraColors.black} />
              <Text style={styles.infoText}>{showResult?.phone}</Text>
            </View>

            <View style={styles.tagRow}>
              {showResult?.tags.map((tag, idx) => (
                <View key={idx} style={styles.tagCell}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.footerActions}>
              <TouchableOpacity style={styles.getDirectionsBtn} onPress={() => setShowResult(null)}>
                <Text style={styles.getDirectionsText}>Get Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.callNowBtn} onPress={() => setShowResult(null)}>
                <Ionicons name="call-outline" size={18} color="#4F46E5" />
                <Text style={styles.callNowText}>Call Now</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowResult(null)} style={{ padding: 10 }}>
                <Text style={styles.detailsText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 15, 
    paddingBottom: 15,
    backgroundColor: 'white'
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F3F5', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },

  sosSection: { padding: 25, alignItems: 'center' },
  sosButton: { 
    width: width * 0.5, 
    height: width * 0.5, 
    borderRadius: width * 0.25, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 12
  },
  sosText: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 8 },
  sosSubtext: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  locationBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 20, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  locationText: { fontSize: 12, fontWeight: '600', color: WayoraColors.gray },

  gridSection: { paddingHorizontal: 20 },
  gridTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black, marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceCard: { 
    width: (width - 55) / 2, 
    padding: 20, 
    borderRadius: 24, 
    marginBottom: 15, 
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2
  },
  iconBox: { width: 56, height: 56, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  serviceName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black, marginBottom: 4 },
  serviceAction: { fontSize: 11, fontWeight: '600', color: WayoraColors.gray, opacity: 0.7 },

  assistanceCard: { 
    margin: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 24, 
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 
  },
  assistanceInfo: { flex: 1, marginLeft: 15 },
  assistanceTitle: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  assistanceDesc: { fontSize: 12, color: WayoraColors.gray, marginTop: 2 },
  callBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: WayoraColors.black, alignItems: 'center', justifyContent: 'center' },

  modalOverlayLight: { flex: 1, backgroundColor: 'rgba(255,255,255,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalOverlayDark: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  searchBox: { alignItems: 'center' },
  searchText: { marginTop: 20, fontSize: 16, fontWeight: '700', color: '#000' },
  
  resultCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, elevation: 15 
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 15 },
  resultIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  resultTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  resultDistance: { fontSize: 14, fontWeight: '700', color: '#000' },
  resultCategory: { fontSize: 13, color: WayoraColors.gray },
  statusBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '700', color: '#10B981' },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  infoText: { fontSize: 12, color: WayoraColors.gray, flex: 1 },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 15, marginBottom: 25 },
  tagCell: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  tagText: { fontSize: 11, fontWeight: '600', color: WayoraColors.gray },

  footerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  getDirectionsBtn: { flex: 1, backgroundColor: '#111827', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  getDirectionsText: { color: 'white', fontSize: 14, fontWeight: '700' },
  callNowBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#E5E7EB', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14 },
  callNowText: { color: WayoraColors.black, fontSize: 14, fontWeight: '700' },
  detailsText: { fontSize: 13, fontWeight: '600', color: WayoraColors.gray },
});
