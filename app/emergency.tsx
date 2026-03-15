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

const EMERGENCY_SERVICES = [
  { id: '1', name: 'Hospitals', icon: 'medical', color: '#EF4444', bgColor: '#FEF2F2' },
  { id: '2', name: 'Pharmacies', icon: 'bandage', color: '#3B82F6', bgColor: '#EFF6FF' },
  { id: '3', name: 'ATMs', icon: 'card', color: '#10B981', bgColor: '#ECFDF5' },
  { id: '4', name: 'Restrooms', icon: 'water', color: '#D946EF', bgColor: '#FDF4FF' },
  { id: '5', name: 'Police', icon: 'shield-checkmark', color: '#1F2937', bgColor: '#F9FAFB' },
  { id: '6', name: 'Embassy', icon: 'flag', color: '#F59E0B', bgColor: '#FFFBEB' },
];

export default function EmergencyScreen() {
  const router = useRouter();
  const [searching, setSearching] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<{name: string, dist: string} | null>(null);

  const handleServicePress = (service: string) => {
    setSearching(service);
    // Simulate finding nearest service
    setTimeout(() => {
      setSearching(null);
      setShowResult({
        name: `Nearest ${service}`,
        dist: (Math.random() * 2 + 0.2).toFixed(1) + ' km away'
      });
    }, 1500);
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
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
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
            <Text style={styles.locationText}>Location: Active (Milan, Italy)</Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.searchBox}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.searchText}>Finding nearest {searching}...</Text>
          </View>
        </View>
      </Modal>

      {/* Result Modal */}
      <Modal visible={showResult !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.resultBox}>
            <Ionicons name="location-sharp" size={40} color={WayoraColors.coral} />
            <Text style={styles.resultTitle}>{showResult?.name}</Text>
            <Text style={styles.resultDist}>{showResult?.dist}</Text>
            <TouchableOpacity style={styles.navBtn} onPress={() => setShowResult(null)}>
              <Text style={styles.navBtnText}>Open in Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowResult(null)}>
              <Text style={styles.closeBtnText}>Dismiss</Text>
            </TouchableOpacity>
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

  modalOverlay: { flex: 1, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
  searchBox: { alignItems: 'center' },
  searchText: { marginTop: 20, fontSize: 16, fontWeight: '700', color: '#000' },
  
  resultBox: { width: width * 0.8, backgroundColor: 'white', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
  resultTitle: { fontSize: 20, fontWeight: '800', color: '#000', marginTop: 15 },
  resultDist: { fontSize: 16, color: WayoraColors.gray, marginTop: 5, marginBottom: 25 },
  navBtn: { backgroundColor: WayoraColors.black, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 18, width: '100%', alignItems: 'center' },
  navBtnText: { color: 'white', fontSize: 15, fontWeight: '700' },
  closeBtn: { marginTop: 15 },
  closeBtnText: { color: WayoraColors.gray, fontSize: 14, fontWeight: '600' },
});
