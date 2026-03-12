import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const categories = [
  { name: 'All', icon: 'compass-outline' as const },
  { name: 'Adventure', icon: 'trail-sign-outline' as const },
  { name: 'Beach', icon: 'water-outline' as const },
  { name: 'Cultural', icon: 'business-outline' as const },
  { name: 'Wellness', icon: 'heart-outline' as const },
  { name: 'Food', icon: 'restaurant-outline' as const },
  { name: 'Nature', icon: 'leaf-outline' as const },
];

const destinations = [
  { name: 'Tokyo', country: 'Japan', emoji: '🏯', rating: 4.9, price: '$1,200', category: 'Cultural', duration: '7 days', desc: 'Ancient temples meet neon-lit streets.' },
  { name: 'Santorini', country: 'Greece', emoji: '🏛️', rating: 4.8, price: '$1,800', category: 'Beach', duration: '5 days', desc: 'White-washed buildings on volcanic cliffs.' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌴', rating: 4.7, price: '$900', category: 'Wellness', duration: '10 days', desc: 'Rice terraces, temples, and serenity.' },
  { name: 'Paris', country: 'France', emoji: '🗼', rating: 4.9, price: '$2,100', category: 'Cultural', duration: '6 days', desc: 'The city of light, love, and art.' },
  { name: 'Machu Picchu', country: 'Peru', emoji: '🏔️', rating: 4.8, price: '$1,500', category: 'Adventure', duration: '8 days', desc: 'Lost city of the Incas in the Andes.' },
  { name: 'Maldives', country: 'Maldives', emoji: '🏝️', rating: 4.9, price: '$2,500', category: 'Beach', duration: '5 days', desc: 'Crystal waters and overwater bungalows.' },
  { name: 'Kyoto', country: 'Japan', emoji: '⛩️', rating: 4.8, price: '$1,100', category: 'Cultural', duration: '5 days', desc: 'Bamboo forests and 2,000 temples.' },
  { name: 'Marrakech', country: 'Morocco', emoji: '🕌', rating: 4.6, price: '$800', category: 'Cultural', duration: '6 days', desc: 'Vibrant souks and stunning riads.' },
  { name: 'Bangkok', country: 'Thailand', emoji: '🛕', rating: 4.6, price: '$600', category: 'Food', duration: '5 days', desc: 'Street food capital of the world.' },
  { name: 'Swiss Alps', country: 'Switzerland', emoji: '🏔️', rating: 4.9, price: '$2,800', category: 'Nature', duration: '7 days', desc: 'Snow-capped peaks and alpine meadows.' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = destinations.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover amazing destinations</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={WayoraColors.gray} />
          <TextInput
            placeholder="Search destinations..."
            placeholderTextColor={WayoraColors.gray}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.name}
            onPress={() => setActiveCategory(cat.name)}
            style={[styles.catBtn, activeCategory === cat.name && styles.catBtnActive]}>
            <Ionicons name={cat.icon} size={16} color={activeCategory === cat.name ? '#fff' : WayoraColors.darkGray} />
            <Text style={[styles.catText, activeCategory === cat.name && styles.catTextActive]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.results}>
        <Text style={styles.resultCount}>{filtered.length} destinations found</Text>
        {filtered.map((dest, idx) => (
          <TouchableOpacity key={dest.name} style={styles.card} onPress={() => router.push('/planner' as any)}>
            <View style={[styles.cardImage, { backgroundColor: idx % 3 === 0 ? '#FDF2F4' : idx % 3 === 1 ? '#F0F4FF' : '#F2FFF6' }]}>
              <Text style={styles.cardEmoji}>{dest.emoji}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color={WayoraColors.orange} />
                <Text style={styles.ratingText}>{dest.rating}</Text>
              </View>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{dest.duration}</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardName}>{dest.name}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color={WayoraColors.gray} />
                    <Text style={styles.cardCountry}>{dest.country}</Text>
                  </View>
                </View>
                <Text style={styles.cardPrice}>{dest.price}</Text>
              </View>
              <Text style={styles.cardDesc}>{dest.desc}</Text>
              <View style={styles.cardBottom}>
                <View style={styles.catTag}>
                  <Text style={styles.catTagText}>{dest.category}</Text>
                </View>
                <Text style={styles.planBtn}>Plan Trip →</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#F8F8FC' },
  title: { fontSize: 28, fontWeight: '800', color: WayoraColors.black },
  subtitle: { fontSize: 13, color: WayoraColors.gray, marginTop: 4 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginTop: 14, gap: 10, borderWidth: 1, borderColor: WayoraColors.lightGray },
  searchInput: { flex: 1, fontSize: 14, color: WayoraColors.black },
  catScroll: { maxHeight: 50, backgroundColor: WayoraColors.white, borderBottomWidth: 1, borderBottomColor: WayoraColors.lightGray },
  catContent: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  catBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: WayoraColors.offWhite, borderWidth: 1, borderColor: WayoraColors.lightGray },
  catBtnActive: { backgroundColor: WayoraColors.coral, borderColor: WayoraColors.coral },
  catText: { fontSize: 12, fontWeight: '600', color: WayoraColors.darkGray },
  catTextActive: { color: '#fff' },
  results: { padding: 20, paddingBottom: 40 },
  resultCount: { fontSize: 12, color: WayoraColors.gray, fontWeight: '500', marginBottom: 12 },
  card: { backgroundColor: WayoraColors.white, borderRadius: 18, marginBottom: 14, overflow: 'hidden', shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  cardImage: { height: 140, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cardEmoji: { fontSize: 56 },
  ratingBadge: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { fontSize: 11, fontWeight: '700', color: WayoraColors.black },
  durationBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  durationText: { fontSize: 10, fontWeight: '700', color: '#fff', textTransform: 'uppercase' },
  cardBody: { padding: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardName: { fontSize: 17, fontWeight: '700', color: WayoraColors.black },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 3 },
  cardCountry: { fontSize: 12, color: WayoraColors.gray },
  cardPrice: { fontSize: 16, fontWeight: '700', color: WayoraColors.coral },
  cardDesc: { fontSize: 12, color: WayoraColors.darkGray, marginTop: 8, lineHeight: 18 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  catTag: { backgroundColor: WayoraColors.lavenderLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  catTagText: { fontSize: 10, fontWeight: '600', color: WayoraColors.blue },
  planBtn: { fontSize: 12, fontWeight: '600', color: WayoraColors.coral },
});
