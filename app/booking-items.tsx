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
    { id: 'h4', name: 'The Ritz-Carlton Paris', price: 550, rating: 5.0, reviews: 2100, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', location: 'Place Vendôme', tag: 'Ultra Luxury' },
    { id: 'h5', name: 'Château Stay Versailles', price: 380, rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1564501025302-689dfcb3f4e1?w=600&q=80', location: 'Versailles', tag: 'Royal Experience' },
  ],
  flight: [
    { id: 'f1', name: 'Air France AF123', price: 450, rating: 4.7, reviews: 3200, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=600&q=80', location: 'CDG to JFK', tag: 'Fastest' },
    { id: 'f2', name: 'Emirates EK202', price: 850, rating: 5.0, reviews: 5400, image: 'https://images.unsplash.com/photo-1540339832863-474c99b3f66f?w=600&q=80', location: 'DXB to Heathrow', tag: 'Premium' },
    { id: 'f3', name: 'Lufthansa LH456', price: 320, rating: 4.6, reviews: 1800, image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=80', location: 'FRA to CDG', tag: 'Efficient' },
    { id: 'f4', name: 'Singapore Airlines SQ12', price: 980, rating: 5.0, reviews: 6200, image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=600&q=80', location: 'SIN to CDG', tag: 'Best Service' },
  ],
  transport: [
    { id: 't1', name: 'Eurostar Express', price: 95, rating: 4.6, reviews: 2100, image: 'https://images.unsplash.com/photo-1474487056207-5d7d76e535cd?w=600&q=80', location: 'London to Paris', tag: 'Eco-Friendly' },
    { id: 't2', name: 'Thalys High Speed', price: 75, rating: 4.8, reviews: 1500, image: 'https://images.unsplash.com/photo-1532105956626-ce5e407b4975?w=600&q=80', location: 'Brussels to Paris', tag: 'Sustainable' },
    { id: 't3', name: 'FlixBus Premium', price: 25, rating: 4.2, reviews: 4500, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80', location: 'Amsterdam to Paris', tag: 'Budget' },
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
    { id: 'a2', name: 'Eiffel Tower Access', price: 45, rating: 4.7, reviews: 25000, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80', location: 'Champ de Mars', tag: 'Must Do' },
    { id: 'a3', name: 'Louvre Museum Tour', price: 85, rating: 4.8, reviews: 18000, image: 'https://images.unsplash.com/photo-1544413647-b51463ddffb3?w=600&q=80', location: 'Rue de Rivoli', tag: 'Cultural' },
    { id: 'a4', name: 'Mont-Saint-Michel Trip', price: 120, rating: 4.9, reviews: 4200, image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80', location: 'Normandy', tag: 'Excursion' },
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
  const [cart, setCart] = useState<Record<string, number>>({});

  const cartCount = useMemo(() => Object.values(cart).reduce((sum, count) => sum + count, 0), [cart]);

  const addToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

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
          <Ionicons name="search" size={20} color={WayoraColors.gray} />
          <TextInput 
            style={styles.searchInput}
            placeholder={`Search ${categoryName?.toLowerCase() || 'items'}...`}
            placeholderTextColor="#94A3B8"
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
            activeOpacity={0.9}
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
                <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={22} color={WayoraColors.gray} />
                </TouchableOpacity>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color={WayoraColors.taviPurple} />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={15} color="#FBBF24" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.reviewsText}>({item.reviews})</Text>
                </View>
                
                <View style={styles.priceAndAction}>
                  <Text style={styles.priceText}>
                    <Text style={styles.priceAmount}>${item.price}</Text>
                    <Text style={styles.priceUnit}> / {categoryId === 'hotel' ? 'night' : 'person'}</Text>
                  </Text>
                  
                  {categoryId === 'food' && (
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        addToCart(item.id);
                      }}
                    >
                      <Ionicons name="add" size={18} color="white" />
                      <Text style={styles.addButtonText}>Add</Text>
                      {cart[item.id] > 0 && (
                        <View style={styles.itemBadge}>
                          <Text style={styles.itemBadgeText}>{cart[item.id]}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {items.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={WayoraColors.taviBg} />
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
          <Ionicons name="bag-handle" size={28} color="white" />
          {cartCount > 0 && (
            <View style={styles.floatingBadge}>
              <Text style={styles.floatingBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFB' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 60, 
    paddingBottom: 15,
    backgroundColor: 'white',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3
  },
  backButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: WayoraColors.black },
  filterButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  
  searchSection: { paddingHorizontal: 20, marginTop: 20, marginBottom: 15 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 16, 
    paddingHorizontal: 15, 
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16, color: WayoraColors.black, fontWeight: '600' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    marginBottom: 20, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  cardImage: { width: '100%', height: 220 },
  tagBadge: { 
    position: 'absolute', 
    top: 15, 
    left: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5
  },
  tagText: { fontSize: 10, fontWeight: '900', color: WayoraColors.taviPurple, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardInfo: { padding: 18 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardName: { fontSize: 18, fontWeight: '800', color: WayoraColors.black, flex: 1, marginRight: 10 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  locationText: { fontSize: 14, color: WayoraColors.gray, marginLeft: 6, fontWeight: '500' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  ratingBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  ratingText: { fontSize: 15, fontWeight: '800', color: WayoraColors.black, marginLeft: 5 },
  reviewsText: { fontSize: 13, color: WayoraColors.gray, marginLeft: 3, fontWeight: '500' },
  
  priceAndAction: { alignItems: 'flex-end' },
  priceText: { marginBottom: 8 },
  priceAmount: { fontSize: 20, fontWeight: '900', color: WayoraColors.taviPurple },
  priceUnit: { fontSize: 13, color: WayoraColors.gray, fontWeight: '600' },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WayoraColors.taviPurple,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
    position: 'relative'
  },
  addButtonText: { color: 'white', fontWeight: '800', fontSize: 14 },
  itemBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  itemBadgeText: { color: 'white', fontSize: 10, fontWeight: '900' },

  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 15, color: WayoraColors.gray, fontSize: 16, fontWeight: '600' },

  floatingCart: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: WayoraColors.taviPurple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: WayoraColors.taviPurple,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  floatingBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: 'white'
  },
  floatingBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
  },
});
