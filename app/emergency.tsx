import React from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const services = [
  { id: '1', name: 'Hospitals', icon: 'medical' as const, color: '#FF5A36', bg: '#FFF5F2' },
  { id: '2', name: 'Pharmacies', icon: 'medkit' as const, color: '#00A3FF', bg: '#F2FAFF' },
  { id: '3', name: 'ATMs', icon: 'cash' as const, color: '#05C46B', bg: '#F2FFF6' },
  { id: '4', name: 'Restrooms', icon: 'water' as const, color: '#DE31D1', bg: '#FFF2FD' },
  { id: '5', name: 'Police', icon: 'shield-checkmark' as const, color: '#111827', bg: '#F9FAFB' },
  { id: '6', name: 'Embassy', icon: 'flag' as const, color: '#FF8A00', bg: '#FFF9F2' },
];

export default function EmergencyScreen() {
  const router = useRouter();

  const handleSOS = () => {
    Alert.alert(
      "Emergency Call",
      "Are you sure you want to call emergency services?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", style: "destructive", onPress: () => console.log("Calling 911...") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Finder</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        
        {/* SOS Button Area */}
        <View style={styles.sosCard}>
          <Text style={styles.sosWarning}>In case of urgent help, press below</Text>
          <TouchableOpacity 
            style={styles.sosButton} 
            onPress={handleSOS}
            activeOpacity={0.8}
          >
            <LinearGradient 
              colors={['#FF5F6D', '#FFC371']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 1 }} 
              style={styles.sosGradient}
            >
              <Ionicons name="notifications" size={40} color="white" />
              <Text style={styles.sosText}>SOS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <Text style={styles.sectionTitle}>Nearest Services</Text>
        <View style={styles.servicesGrid}>
          {services.map(service => (
            <TouchableOpacity 
              key={service.id} 
              style={[styles.serviceCard, { backgroundColor: service.bg }]}
              onPress={() => Alert.alert(`Finding ${service.name}`, "Generating map to nearest location...")}
            >
              <View style={[styles.iconCircle, { backgroundColor: 'white' }]}>
                <Ionicons name={service.icon} size={28} color={service.color} />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Location Note */}
        <View style={styles.locationNote}>
          <Ionicons name="location" size={16} color={WayoraColors.gray} />
          <Text style={styles.locationText}>Location services are active. Finding help in Paris, France.</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: WayoraColors.offWhite,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: WayoraColors.black },
  
  sosCard: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  sosWarning: { fontSize: 14, color: WayoraColors.gray, fontWeight: '500', marginBottom: 24 },
  sosButton: { width: 140, height: 140, borderRadius: 70, overflow: 'hidden', elevation: 12, shadowColor: '#FF5F6D', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 20 },
  sosGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sosText: { color: 'white', fontSize: 24, fontWeight: '900', marginTop: 4 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black, marginBottom: 20 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  serviceCard: { width: '47%', padding: 20, borderRadius: 24, alignItems: 'center' },
  iconCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
  serviceName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  
  locationNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 40, opacity: 0.6 },
  locationText: { fontSize: 12, color: WayoraColors.gray, fontWeight: '500' },
});
