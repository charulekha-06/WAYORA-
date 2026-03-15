import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const BOOKING_DATA = {
  hotel: [
    { id: 'h1', name: 'Le Grand Hotel Paris', price: 180, rating: 4.8, reviews: 1240, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80', location: 'Paris, France', tag: 'Luxury' },
    { id: 'h2', name: 'Alpine Resort & Spa', price: 250, rating: 4.9, reviews: 856, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', location: 'Swiss Alps', tag: 'Top Rated' },
    { id: 'h3', name: 'Coastal Breeze Inn', price: 120, rating: 4.5, reviews: 412, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', location: 'Amalfi Coast', tag: 'Best Value' },
  ],
  flight: [
    { id: 'f1', name: 'Air France AF123', price: 450, rating: 4.7, reviews: 3200, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=600&q=80', location: 'CDG to JFK', tag: 'Fastest' },
    { id: 'f2', name: 'Emirates EK202', price: 850, rating: 5.0, reviews: 5400, image: 'https://images.unsplash.com/photo-1540339832863-474c99b3f66f?w=600&q=80', location: 'DXB to Heathrow', tag: 'Premium' },
  ],
  transport: [
    { id: 't1', name: 'Eurostar Express', price: 95, rating: 4.6, reviews: 2100, image: 'https://images.unsplash.com/photo-1474487056207-5d7d76e535cd?w=600&q=80', location: 'London to Paris', tag: 'Eco-Friendly' },
  ],
  car: [
    { id: 'c1', name: 'Tesla Model 3', price: 85, rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80', location: 'Paris City Center', tag: 'Electric' },
    { id: 'c2', name: 'Range Rover Sport', price: 145, rating: 4.8, reviews: 92, image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80', location: 'CDG Airport', tag: 'Luxury SUV' },
    { id: 'c3', name: 'Mercedes-Benz E-Class', price: 110, rating: 5.0, reviews: 210, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', location: 'Paris Downtown', tag: 'Premium' },
    { id: 'c4', name: 'Mini Cooper Convertible', price: 65, rating: 4.7, reviews: 340, image: 'https://images.unsplash.com/photo-1594070319944-7c0c63146b1d?w=600&q=80', location: 'Nice Coast', tag: 'Fun' },
    { id: 'c5', name: 'Peugeot 3008', price: 55, rating: 4.5, reviews: 820, image: 'https://images.unsplash.com/photo-1621245023901-fd5138092288?w=600&q=80', location: 'Lyon Center', tag: 'Economical' },
  ],
  activities: [
    { id: 'a1', name: 'Seine River Dinner Cruise', price: 65, rating: 4.9, reviews: 890, image: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=600&q=80', location: 'Paris, France', tag: 'Romantic' },
  ],
  food: [
    { id: 'fd1', name: 'Le Meurice Alain Ducasse', price: 150, rating: 5.0, reviews: 320, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', location: 'Paris, France', tag: 'Michelin Star' },
    { id: 'fd2', name: 'La Tour d\'Argent', price: 180, rating: 4.9, reviews: 560, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', location: 'Paris, France', tag: 'Historic' },
    { id: 'fd3', name: 'Septime', price: 95, rating: 4.8, reviews: 1100, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', location: 'Paris, France', tag: 'Modern' },
    { id: 'fd4', name: 'Boulangerie Poilâne', price: 15, rating: 5.0, reviews: 4500, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', location: 'Saint-Germain', tag: 'Legendary' },
    { id: 'fd5', name: 'L\'As du Fallafel', price: 12, rating: 4.7, reviews: 12000, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&q=80', location: 'Le Marais', tag: 'Must Try' },
  ]
};

export default function BookingItemsScreen() {
  const router = useRouter();
  const { categoryId, categoryName } = useLocalSearchParams<{ categoryId: keyof typeof BOOKING_DATA; categoryName: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const items = useMemo(() => {
    const categoryItems = BOOKING_DATA[categoryId] || [];
    if (!searchQuery) return categoryItems;
    return categoryItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categoryId, searchQuery]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName || 'Search'}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color={WayoraColors.black} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={WayoraColors.darkGray} />
          <TextInput 
            style={styles.searchInput}
            placeholder={`Search ${categoryName?.toLowerCase() || 'items'}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {items.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            onPress={() => router.push({
              pathname: '/booking-details',
              params: { id: item.id, category: categoryId, name: item.name, price: item.price.toString(), image: item.image, location: item.location }
            } as any)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{item.tag}</Text>
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.cardName}>{item.name}</Text>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={20} color={WayoraColors.gray} />
                </TouchableOpacity>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color={WayoraColors.coral} />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={14} color="#FBBF24" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.reviewsText}>({item.reviews})</Text>
                </View>
                <Text style={styles.priceText}>
                  <Text style={styles.priceAmount}>${item.price}</Text>
                  <Text style={styles.priceUnit}> / {categoryId === 'hotel' ? 'night' : 'person'}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {items.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={WayoraColors.lightGray} />
            <Text style={styles.emptyText}>No results found for your search.</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Cart for Food Category */}
      {categoryId === 'food' && (
        <TouchableOpacity 
          style={styles.floatingCart}
          onPress={() => router.push('/payment' as any)}
        >
          <Ionicons name="bag-handle" size={26} color="white" />
          <View style={styles.floatingBadge}>
            <Text style={styles.floatingBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 15 
  },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black },
  filterButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  
  searchSection: { paddingHorizontal: 20, marginBottom: 15 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 48 
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: WayoraColors.black },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    marginBottom: 20, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: { width: '100%', height: 200 },
  tagBadge: { 
    position: 'absolute', 
    top: 15, 
    left: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20 
  },
  tagText: { fontSize: 11, fontWeight: '800', color: WayoraColors.black, textTransform: 'uppercase' },
  cardInfo: { padding: 15 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  cardName: { fontSize: 16, fontWeight: '700', color: WayoraColors.black, flex: 1, marginRight: 10 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  locationText: { fontSize: 13, color: WayoraColors.gray, marginLeft: 4 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 14, fontWeight: '700', color: WayoraColors.black, marginLeft: 4 },
  reviewsText: { fontSize: 12, color: WayoraColors.gray, marginLeft: 2 },
  priceText: { alignItems: 'flex-end' },
  priceAmount: { fontSize: 18, fontWeight: '800', color: WayoraColors.coral },
  priceUnit: { fontSize: 12, color: WayoraColors.gray },

  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 15, color: WayoraColors.gray, fontSize: 16 },

  floatingCart: {
    position: 'absolute',
    bottom: 160, // Above chatbot (which is at 90)
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF8A00', // Orange
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  floatingBadgeText: {
    color: '#FF8A00',
    fontSize: 10,
    fontWeight: '900',
  },
});
