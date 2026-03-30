import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function BookingDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; category: string; name: string; price: string; image: string; location: string }>();
  const [selectedDate, setSelectedDate] = useState('Tomorrow');

  const isHotel = params.category === 'hotel';
  const isFlight = params.category === 'flight';

  const handleBooking = () => {
    try {
      if (params.category === 'hotel') {
        // Direct redirect to Booking.com
        Linking.openURL(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(params.name + ' ' + params.location)}`);
      } else if (params.category === 'flight') {
        Linking.openURL(`https://www.google.com/travel/flights?q=${encodeURIComponent('Flights to ' + params.location + ' ' + params.name)}`);
      } else if (params.category === 'food') {
        Alert.alert('Added to cart! Tap the cart icon to checkout.');
      } else {
        Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent('Book ' + params.name + ' in ' + params.location)}`);
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: params.image }} style={styles.coverImage} />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', 'rgba(0,0,0,0.4)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/booking')} style={styles.circleButton}>
              <Ionicons name="chevron-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton}>
              <Ionicons name="heart-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Content */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryBadge}>{params.category?.toUpperCase()}</Text>
              <Text style={styles.mainTitle}>{params.name}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>${params.price}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={16} color={WayoraColors.coral} />
            <Text style={styles.locationText}>{params.location}</Text>
          </View>

          {/* Highlights */}
          <View style={styles.highlightsGrid}>
            <View style={styles.highlightItem}>
              <Ionicons name="star" size={18} color="#FBBF24" />
              <Text style={styles.highlightVal}>4.8/5</Text>
              <Text style={styles.highlightLab}>Rating</Text>
            </View>
            <View style={styles.highlightItem}>
              <Ionicons name="shield-checkmark" size={18} color="#05C46B" />
              <Text style={styles.highlightVal}>Verified</Text>
              <Text style={styles.highlightLab}>Listing</Text>
            </View>
            <View style={styles.highlightItem}>
              <Ionicons name="flash" size={18} color="#00A3FF" />
              <Text style={styles.highlightVal}>Instant</Text>
              <Text style={styles.highlightLab}>Booking</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Overview</Text>
          </View>
          <Text style={styles.description}>
            Experience the very best of {params.location} with this premium {params.category} experience. 
            Selected carefully for the Wayora community to ensure quality, safety, and authentic local charm. 
            Includes state-of-the-art facilities and world-class service.
          </Text>

          {/* Selection */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{isFlight ? 'Select Class' : 'Select Date'}</Text>
          </View>
          <View style={styles.optionsRow}>
            {['Today', 'Tomorrow', 'Next Week'].map(opt => (
              <TouchableOpacity 
                key={opt}
                style={[styles.optionBtn, selectedDate === opt && styles.optionBtnActive]}
                onPress={() => setSelectedDate(opt)}
              >
                <Text style={[styles.optionText, selectedDate === opt && styles.optionTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Floating Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.actionInfo}>
          <Text style={styles.totalLabel}>Total Booking</Text>
          <Text style={styles.totalAmount}>${params.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>{params.category === 'food' ? 'Add to Cart' : 'Book Now'}</Text>
          <Ionicons name={params.category === 'food' ? 'cart' : 'arrow-forward'} size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { },
  imageContainer: { width: '100%', height: 350 },
  coverImage: { width: '100%', height: '100%' },
  headerButtons: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    right: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  circleButton: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  infoSection: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    marginTop: -30, 
    padding: 24,
    flex: 1 
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  categoryBadge: { fontSize: 10, fontWeight: '800', color: WayoraColors.coral, marginBottom: 5, letterSpacing: 1 },
  mainTitle: { fontSize: 24, fontWeight: '800', color: WayoraColors.black, flex: 1, marginRight: 15 },
  priceBox: { alignItems: 'flex-end' },
  priceLabel: { fontSize: 12, color: WayoraColors.gray, marginBottom: 2 },
  priceValue: { fontSize: 24, fontWeight: '900', color: WayoraColors.black },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { fontSize: 14, color: WayoraColors.gray, marginLeft: 5 },
  
  highlightsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 20, 
    padding: 16, 
    marginTop: 24 
  },
  highlightItem: { alignItems: 'center', flex: 1 },
  highlightVal: { fontSize: 13, fontWeight: '700', color: WayoraColors.black, marginTop: 4 },
  highlightLab: { fontSize: 10, color: WayoraColors.gray, marginTop: 1 },

  sectionHeader: { marginTop: 30, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black },
  description: { fontSize: 15, color: WayoraColors.darkGray, lineHeight: 24 },

  optionsRow: { flexDirection: 'row', gap: 10 },
  optionBtn: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    backgroundColor: '#FFF' 
  },
  optionBtnActive: { backgroundColor: WayoraColors.black, borderColor: WayoraColors.black },
  optionText: { fontSize: 14, fontWeight: '600', color: WayoraColors.gray },
  optionTextActive: { color: '#FFF' },

  actionBar: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#FFF', 
    paddingHorizontal: 20, 
    paddingTop: 15, 
    paddingBottom: 35, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  actionInfo: { },
  totalLabel: { fontSize: 12, color: WayoraColors.gray, marginBottom: 2 },
  totalAmount: { fontSize: 22, fontWeight: '900', color: WayoraColors.black },
  bookButton: { 
    backgroundColor: '#FF6B00', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    paddingVertical: 14, 
    borderRadius: 16, 
    gap: 10 
  },
  bookButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
