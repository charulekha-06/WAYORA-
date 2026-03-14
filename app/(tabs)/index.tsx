import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, ImageBackground, Image, Modal, TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const features = [
  { icon: 'map' as const, title: 'Itinerary Planner', desc: 'Smart itineraries', color: WayoraColors.coral, bg: '#FDF2F4' },
  { icon: 'medkit' as const, title: 'Emergency Finder', desc: 'Find help fast', color: WayoraColors.blue, bg: '#F0F4FF' },
  { icon: 'list' as const, title: 'To Do List', desc: 'Stay organized', color: WayoraColors.orange, bg: '#FEF3EA' },
  { icon: 'image' as const, title: 'Souvenir Album', desc: 'Capture memories', color: WayoraColors.purple, bg: '#F8F0F7' },
  { icon: 'flash' as const, title: 'Post Generator', desc: 'Share your trip', color: WayoraColors.green, bg: '#F2FFF6' },
  { icon: 'cash' as const, title: 'Currency Converter', desc: 'Quick conversion', color: '#14B8A6', bg: '#E6FFFA' },
];

const quickActions = [
  { icon: 'map-outline' as const, label: 'Trip Atlas', color: '#fff', bg: '#86B5F0' },
  { icon: 'pencil-outline' as const, label: 'Post Gen', color: '#fff', bg: '#D0A8E3' },
  { icon: 'medkit-outline' as const, label: 'Emergency', color: '#fff', bg: '#F27471' },
  { icon: 'book-outline' as const, label: 'Bookings', color: '#fff', bg: '#91D28C' },
  { icon: 'chatbubble-ellipses-outline' as const, label: 'AI Chat', color: '#fff', bg: '#F5A89A' },
  { icon: 'language-outline' as const, label: 'Translate', color: '#fff', bg: '#F5BE87' },
  { icon: 'people-outline' as const, label: 'Artisans', color: '#fff', bg: '#D3A4CF' },
  { icon: 'cloudy-outline' as const, label: 'Weather', color: '#fff', bg: '#A6C8F5' },
];

const destinations = [
  { name: 'Tokyo', country: 'Japan', icon: 'business-outline' as const, iconColor: WayoraColors.coral, iconBg: '#FDF2F4', rating: 4.9, price: '$1,200' },
  { name: 'Santorini', country: 'Greece', icon: 'sunny-outline' as const, iconColor: WayoraColors.orange, iconBg: '#FEF3EA', rating: 4.8, price: '$1,800' },
  { name: 'Bali', country: 'Indonesia', icon: 'leaf-outline' as const, iconColor: WayoraColors.green, iconBg: '#F2FFF6', rating: 4.7, price: '$900' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [newTripProps, setNewTripProps] = useState({ name: '', date: '' });
  const [upcomingTrips, setUpcomingTrips] = useState([
    { id: '1', name: 'Tokyo, Japan', date: 'Jan 10-20, 2025', status: 'Planning', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80' },
    { id: '2', name: 'Swiss Alps', date: 'Mar 5-12, 2025', status: 'Saved', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=150&q=80' },
  ]);

  const handleAddTrip = () => {
    if (newTripProps.name && newTripProps.date) {
      setUpcomingTrips([
        ...upcomingTrips,
        {
          id: Date.now().toString(),
          name: newTripProps.name,
          date: newTripProps.date,
          status: 'Planning',
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=150&q=80' // default travel plane image
        }
      ]);
      setNewTripProps({ name: '', date: '' });
      setShowAddTrip(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#FDF2F4', '#FEF3EA', '#F0F4FF']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Welcome back! </Text>
              <Text style={styles.userName}>Alex Traveler</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color={WayoraColors.darkGray} />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/explore' as any)}>
            <Ionicons name="search" size={18} color={WayoraColors.gray} />
            <Text style={styles.searchText}>Where do you want to go?</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Current Trip Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Trip</Text>
          </View>
          <View style={styles.currentTripCard}>
            <View style={styles.tripImagePart}>
              <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80' }} 
                style={styles.tripImageOverlay}
                resizeMode="cover"
              >
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFillObject} />
                <View style={[styles.tripTopInfo, { zIndex: 1 }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Ionicons name="location" size={18} color="white" />
                    <Text style={styles.tripDest}>Paris, France</Text>
                  </View>
                  <Text style={styles.tripDates}>Dec 15-22, 2024</Text>
                  <Text style={styles.daysLeftText}>12 days to go!</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.tripProgressPart}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Budget Progress</Text>
                <Text style={styles.progressValue}>$450 / $2500</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: '18%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Explore Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((f) => {
              const handlePress = () => {
                if (f.title === 'Itinerary Planner') {
                  router.push('/itinerary' as any);
                }
              };

              return (
                <TouchableOpacity 
                  key={f.title} 
                  style={[styles.featureCard, { backgroundColor: f.bg }]}
                  onPress={handlePress}
                >
                  <Ionicons name={f.icon} size={24} color={f.color} />
                  <View style={{ marginTop: 12 }}>
                    <Text style={styles.featureTitle}>{f.title}</Text>
                    <Text style={styles.featureDesc}>{f.desc}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Upcoming Trips Section */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Trips</Text>
            <TouchableOpacity style={styles.addTripBtn} onPress={() => setShowAddTrip(true)}>
              <Ionicons name="add" size={18} color={WayoraColors.blue} />
              <Text style={[styles.seeAll, { color: WayoraColors.blue }]}>Add Trip</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingTrips.map(trip => (
            <TouchableOpacity key={trip.id} style={styles.upcomingCard}>
              <Image source={{ uri: trip.image }} style={styles.upcomingImg} />
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingName}>{trip.name}</Text>
                <Text style={styles.upcomingDate}>{trip.date}</Text>
              </View>
              <View style={[styles.upcomingBadge, trip.status === 'Saved' && { backgroundColor: '#F5F5F5' }]}>
                <Text style={[styles.upcomingBadgeText, trip.status === 'Saved' && { color: '#666' }]}>{trip.status}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={WayoraColors.gray} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Trip Modal */}
      <Modal visible={showAddTrip} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Trip</Text>
              <TouchableOpacity onPress={() => setShowAddTrip(false)}>
                <Ionicons name="close" size={24} color={WayoraColors.gray} />
              </TouchableOpacity>
            </View>
            <TextInput 
              style={styles.modalInput} 
              placeholder="Destination (e.g., Rome, Italy)" 
              value={newTripProps.name} 
              onChangeText={t => setNewTripProps({ ...newTripProps, name: t })} 
            />
            <TextInput 
              style={styles.modalInput} 
              placeholder="Dates (e.g., Apr 1-10, 2025)" 
              value={newTripProps.date} 
              onChangeText={t => setNewTripProps({ ...newTripProps, date: t })} 
            />
            <TouchableOpacity style={styles.modalSubmit} onPress={handleAddTrip}>
              <Text style={styles.modalSubmitText}>Add Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 14, color: WayoraColors.gray, fontWeight: '500' },
  userName: { fontSize: 24, fontWeight: '800', color: WayoraColors.black, marginTop: 2 },
  notifBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: WayoraColors.white, alignItems: 'center', justifyContent: 'center', shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  notifBadge: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: WayoraColors.coral },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, gap: 10, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  searchText: { fontSize: 14, color: WayoraColors.gray },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black, marginBottom: 12 },
  seeAll: { fontSize: 13, fontWeight: '600', color: WayoraColors.coral },
  currentTripCard: { borderRadius: 20, backgroundColor: WayoraColors.white, overflow: 'hidden', borderWidth: 1, borderColor: WayoraColors.lightGray },
  tripImagePart: { height: 160 },
  tripImageOverlay: { flex: 1, padding: 20, justifyContent: 'flex-end' },
  tripTopInfo: { gap: 4 },
  tripDest: { fontSize: 20, fontWeight: '800', color: 'white' },
  tripDates: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
  daysLeftText: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '500', marginTop: 2 },
  tripProgressPart: { padding: 20, backgroundColor: '#F8FBFF' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  progressLabel: { fontSize: 13, color: WayoraColors.gray, fontWeight: '600' },
  progressValue: { fontSize: 13, color: WayoraColors.black, fontWeight: '700' },
  progressBg: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2D3436', borderRadius: 4 },
  
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  featureCard: { width: '48%', padding: 16, borderRadius: 20, alignItems: 'flex-start', marginBottom: 2 },
  featureTitle: { fontSize: 13, fontWeight: '700', color: WayoraColors.black },
  featureDesc: { fontSize: 10, color: WayoraColors.gray, marginTop: 4 },

  addTripBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  upcomingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, padding: 12, borderRadius: 18, marginBottom: 12, borderWidth: 1, borderColor: WayoraColors.lightGray },
  upcomingImg: { width: 50, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  upcomingInfo: { flex: 1, marginLeft: 16 },
  upcomingName: { fontSize: 16, fontWeight: '700', color: WayoraColors.black },
  upcomingDate: { fontSize: 13, color: WayoraColors.gray, marginTop: 2 },
  upcomingBadge: { backgroundColor: '#F0F4FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, marginRight: 10 },
  upcomingBadgeText: { fontSize: 11, fontWeight: '700', color: WayoraColors.blue },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: { backgroundColor: WayoraColors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black },
  modalInput: { backgroundColor: WayoraColors.offWhite, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, marginBottom: 16, borderWidth: 1, borderColor: WayoraColors.lightGray },
  modalSubmit: { backgroundColor: WayoraColors.coral, paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  modalSubmitText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
