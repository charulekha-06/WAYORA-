import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions, Alert, ActivityIndicator, Modal, FlatList, Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { getCurrentLocation, UserLocation } from '@/lib/location';
import { fetchNearbyServices, Place } from '@/lib/places';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface ServiceInfo {
  id: string;
  name: string;
  category: string;
  distance: string;
  status: string;
  address: string;
  rating: string;
  reviews: string;
  tags: string[];
  icon: string;
  lat?: number;
  lon?: number;
}

const EMERGENCY_SERVICES = [
  { id: '1', name: 'Hospitals', icon: 'medical', color: '#EF4444', bgColor: '#FEF2F2' },
  { id: '2', name: 'Pharmacies', icon: 'bandage', color: '#3B82F6', bgColor: '#EFF6FF' },
  { id: '3', name: 'ATMs', icon: 'card', color: '#10B981', bgColor: '#ECFDF5' },
  { id: '4', name: 'Restrooms', icon: 'water', color: '#D946EF', bgColor: '#FDF4FF' },
];

const MOCK_RESULTS: Record<string, ServiceInfo[]> = {
  'Hospitals': [
    {
      id: 'h1',
      name: 'Hôpital Saint-Joseph',
      category: 'General Hospital',
      distance: '2.4 km',
      status: 'Open 24 Hours',
      address: '185 Rue Raymond Losserand, 75014 Paris',
      rating: '4.1',
      reviews: '654 reviews',
      tags: ['Emergency', 'Surgery', 'Cardiology'],
      icon: 'business'
    },
    {
      id: 'h2',
      name: 'Pitié-Salpêtrière Hospital',
      category: 'Public Hospital',
      distance: '3.1 km',
      status: 'Open 24 Hours',
      address: '47-83 Bd de l\'Hôpital, 75013 Paris',
      rating: '4.3',
      reviews: '1.2k reviews',
      tags: ['Cardiology', 'Neurology', 'Urgences'],
      icon: 'medical'
    }
  ],
  'Pharmacies': [
    {
      id: 'p1',
      name: 'Pharmacie de la Mairie',
      category: 'Late Night Pharmacy',
      distance: '0.8 km',
      status: 'Open until 11:00 PM',
      address: '12 Rue de Rivoli, 75004 Paris',
      rating: '4.5',
      reviews: '128 reviews',
      tags: ['Prescriptions', 'Vaccinations', 'English'],
      icon: 'medkit'
    },
    {
      id: 'p2',
      name: 'Citypharma',
      category: 'Pharmacy & Drugstore',
      distance: '1.5 km',
      status: 'Open (Busy)',
      address: '26 Rue du Four, 75006 Paris',
      rating: '4.4',
      reviews: '3.5k reviews',
      tags: ['Cosmetics', 'Expert Staff', 'Large Stock'],
      icon: 'bandage'
    }
  ],
  'ATMs': [
    {
      id: 'a1',
      name: 'BNP Paribas ATM',
      category: 'Bank / ATM',
      distance: '0.3 km',
      status: 'Available',
      address: '45 Boulevard Saint-Germain, 75005 Paris',
      rating: '3.8',
      reviews: '42 reviews',
      tags: ['24h Access', 'Withdrawal', 'English'],
      icon: 'cash'
    },
    {
      id: 'a2',
      name: 'Société Générale ATM',
      category: 'ATM Terminal',
      distance: '0.5 km',
      status: 'Available',
      address: '12 Place de la Bastille, 75011 Paris',
      rating: '4.0',
      reviews: '15 reviews',
      tags: ['Touch Screen', 'Receipts', 'Safe'],
      icon: 'card'
    },
    {
      id: 'a3',
      name: 'HSBC ATM',
      category: 'Global ATM',
      distance: '0.6 km',
      status: 'Available',
      address: '52 Avenue des Champs-Élysées, 75008 Paris',
      rating: '4.2',
      reviews: '88 reviews',
      tags: ['Global Cards', 'Multi-Currency'],
      icon: 'card'
    }
  ],
  'Restrooms': [
    {
      id: 'r1',
      name: 'Sanisette Public Toilet',
      category: 'Public Restroom',
      distance: '0.1 km',
      status: 'Operational',
      address: 'Place de la Concorde, 75008 Paris',
      rating: '3.5',
      reviews: '210 reviews',
      tags: ['Accessible', 'Self-Cleaning', 'Free'],
      icon: 'water'
    },
    {
      id: 'r2',
      name: 'Louvre Public Restrooms',
      category: 'Museum Facility',
      distance: '0.4 km',
      status: 'Open (Museum hours)',
      address: 'Palais Royal, 75001 Paris',
      rating: '4.2',
      reviews: '50 reviews',
      tags: ['Clean', 'Infant Care', 'Paid'],
      icon: 'water'
    }
  ],
  'Police': [
    {
      id: 'police1',
      name: 'Commissariat de Police',
      category: 'Police Station',
      distance: '1.2 km',
      status: 'Open 24 Hours',
      address: '9 Boulevard du Palais, 75004 Paris',
      rating: '4.0',
      reviews: '85 reviews',
      tags: ['Passport Loss', 'Security', 'Urgences'],
      icon: 'shield-half'
    }
  ],
  'Embassy': [
    {
      id: 'e1',
      name: 'Consulat Général',
      category: 'Diplomatic Mission',
      distance: '3.5 km',
      status: 'By Appointment',
      address: '2 Avenue Gabriel, 75008 Paris',
      rating: '4.2',
      reviews: '150 reviews',
      tags: ['Visas', 'Passport Services', 'Citizenship'],
      icon: 'flag'
    }
  ]
};

export default function EmergencyScreen() {
  const router = useRouter();
  const [searching, setSearching] = useState<string | null>(null);
  const [results, setResults] = useState<ServiceInfo[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('Set Location');
  const [userLoc, setUserLoc] = useState<UserLocation | null>(null);
  const [locLoading, setLocLoading] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, []);

  async function fetchLocation() {
    setLocLoading(true);
    const loc = await getCurrentLocation();
    if (loc) {
      setCurrentLocation(loc.formattedAddress);
      setUserLoc(loc);
    }
    setLocLoading(false);
  }

  const handleServicePress = async (service: string) => {
    setSearching(service);
    setSelectedCategory(service);
    setResults(null); // Reset results
    
    let currentLoc = userLoc;
    
    // Attempt to re-fetch if location is missing
    if (!currentLoc) {
      const loc = await getCurrentLocation();
      if (loc) {
        currentLoc = loc;
        setUserLoc(loc);
        setCurrentLocation(loc.formattedAddress);
      }
    }
    
    if (currentLoc) {
      try {
        const places = await fetchNearbyServices(currentLoc.latitude, currentLoc.longitude, service, 25000);
        
        if (places.length > 0) {
          const mappedResults: ServiceInfo[] = places.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            distance: 'Nearby', 
            status: 'Open',
            address: p.address || 'Local area',
            rating: (4 + Math.random()).toFixed(1),
            reviews: Math.floor(Math.random() * 500).toString(),
            tags: Object.keys(p.tags || {}).slice(0, 3).filter(t => !t.startsWith('addr:') && !t.startsWith('osm_')),
            icon: 'location',
            lat: p.lat,
            lon: p.lon
          }));
          setResults(mappedResults);
        } else {
          setResults([]); 
        }
      } catch (err) {
        console.error('Error fetching real services:', err);
        setResults([]);
      }
    } else {
      setSearching(null);
      Alert.alert(
        "Location Needed",
        "We couldn't detect your location. Please check your GPS settings and try again.",
        [{ text: "OK" }]
      );
      setResults([]);
    }
    
    setSearching(null);
  };

  const handleGetDirections = (item: ServiceInfo) => {
    if (item.lat && item.lon) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lon}`;
      Linking.openURL(url).catch(err => {
        console.error('Failed to open maps:', err);
        Alert.alert("Error", "Could not open map application.");
      });
    } else {
      Alert.alert("Location missing", "No coordinates available for this location.");
    }
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

  const renderResultItem = ({ item }: { item: ServiceInfo }) => (
    <View style={styles.resultCard}>
      <View style={styles.resultHeader}>
        <View style={styles.resultIconBox}>
          <Ionicons name={item.icon as any} size={20} color={WayoraColors.black} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.resultTitle}>{item.name}</Text>
            <Text style={styles.resultDistance}>{item.distance}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Text style={styles.resultCategory}>{item.category}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="location-sharp" size={16} color={WayoraColors.coral} />
        <Text style={styles.infoText}>{item.address}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="star" size={16} color="#F59E0B" />
        <Text style={styles.infoText}>
          <Text style={{ fontWeight: '700', color: WayoraColors.black }}>{item.rating}</Text> ({item.reviews})
        </Text>
      </View>

      <View style={styles.tagRow}>
        {item.tags.map((tag, idx) => (
          <View key={idx} style={styles.tagCell}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerActions}>
        <TouchableOpacity 
          style={styles.getDirectionsBtn} 
          onPress={() => handleGetDirections(item)}
        >
          <Text style={styles.getDirectionsText}>Get Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Text style={styles.detailsText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <TouchableOpacity 
            style={styles.locationBadge} 
            onPress={fetchLocation}
            disabled={locLoading}
          >
            <Ionicons 
              name={locLoading ? "sync" : "location"} 
              size={14} 
              color={WayoraColors.gray} 
              style={locLoading ? { transform: [{ rotate: '0deg' }] } : {}}
            />
            <Text style={styles.locationText}>
              {locLoading ? "Updating Location..." : `Location: Active (${currentLocation})`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Improved Service Grid */}
        <View style={styles.gridSection}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.gridTitle}>Nearest Services</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 13, color: WayoraColors.gray, fontWeight: '600' }}>View Map</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={styles.searchText}>Searching nearby {searching}...</Text>
          </View>
        </View>
      </Modal>

      {/* MULTI-RESULT Modal */}
      <Modal visible={results !== null} transparent animationType="slide">
        <View style={styles.modalOverlayDark}>
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <View>
                <Text style={styles.resultsHeading}>Nearby {selectedCategory}</Text>
                <Text style={styles.resultsCount}>
                  {results && results.length > 0 
                    ? `${results.length} found matches` 
                    : "No matches found nearby"}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setResults(null)} style={styles.closeResultsBtn}>
                <Ionicons name="close" size={24} color={WayoraColors.black} />
              </TouchableOpacity>
            </View>

            {results && results.length === 0 ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                <Ionicons name="search-outline" size={64} color={WayoraColors.lightGray} />
                <Text style={{ fontSize: 18, fontWeight: '700', color: WayoraColors.darkGray, marginTop: 20, textAlign: 'center' }}>
                  No {selectedCategory} Found
                </Text>
                <Text style={{ fontSize: 14, color: WayoraColors.gray, textAlign: 'center', marginTop: 10 }}>
                  We couldn't find any results within 25km of your location. Try a different category or area.
                </Text>
              </View>
            ) : (
              <FlatList
                data={results}
                renderItem={renderResultItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 20, paddingTop: 0 }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              />
            )}
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
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 12
  },
  sosText: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 8 },
  sosSubtext: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  locationBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 20, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  locationText: { fontSize: 12, fontWeight: '600', color: WayoraColors.gray },

  gridSection: { paddingHorizontal: 20 },
  gridTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 12
  },
  serviceCard: { 
    width: '48%', 
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 24, 
    marginBottom: 4, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 10, 
    elevation: 2
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

  modalOverlayLight: { flex: 1, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
  modalOverlayDark: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  searchBox: { alignItems: 'center' },
  searchText: { marginTop: 20, fontSize: 16, fontWeight: '700', color: '#000' },
  
  resultsContainer: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
    height: height * 0.85, 
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 20 
  },
  resultsHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 25, 
    paddingBottom: 20 
  },
  resultsHeading: { fontSize: 22, fontWeight: '900', color: '#111827' },
  resultsCount: { fontSize: 13, color: WayoraColors.gray, marginTop: 2, fontWeight: '600' },
  closeResultsBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },

  resultCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: '#F3F4F6'
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  resultIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  resultTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  resultDistance: { fontSize: 13, fontWeight: '700', color: '#000' },
  resultCategory: { fontSize: 12, color: WayoraColors.gray },
  statusBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '800', color: '#10B981', textTransform: 'uppercase' },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  infoText: { fontSize: 11, color: WayoraColors.gray, flex: 1 },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12, marginBottom: 20 },
  tagCell: { backgroundColor: '#F9FAFB', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: '#F3F4F6' },
  tagText: { fontSize: 10, fontWeight: '600', color: WayoraColors.gray },

  footerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  getDirectionsBtn: { flex: 1, backgroundColor: '#111827', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  getDirectionsText: { color: 'white', fontSize: 13, fontWeight: '700' },
  callNowBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#E5E7EB', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12 },
  callNowText: { color: WayoraColors.black, fontSize: 13, fontWeight: '700' },
  detailsText: { fontSize: 12, fontWeight: '600', color: WayoraColors.gray },
});
