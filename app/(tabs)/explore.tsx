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
];

const destinations = [
  { 
    name: 'Tokyo', country: 'Japan', icon: 'business-outline' as const, 
    iconBgColor: '#FF4D6D', pastelBgColor: '#FFF0F3', 
    rating: 4.9, price: '$1,200', category: 'Cultural', duration: '7 DAYS', 
    desc: 'Ancient temples meet neon-lit streets.', catBgr: '#E0E7FF', catTxt: '#4338CA'
  },
  { 
    name: 'Santorini', country: 'Greece', icon: 'sunny-outline' as const, 
    iconBgColor: '#F97316', pastelBgColor: '#FFF7ED', 
    rating: 4.8, price: '$1,800', category: 'Beach', duration: '5 DAYS', 
    desc: 'White-washed buildings on volcanic cliffs.', catBgr: '#DBEAFE', catTxt: '#2563EB'
  },
  { 
    name: 'Bali', country: 'Indonesia', icon: 'leaf-outline' as const, 
    iconBgColor: '#10B981', pastelBgColor: '#ECFDF5', 
    rating: 4.7, price: '$900', category: 'Wellness', duration: '10 DAYS', 
    desc: 'Rice terraces, temples, and serenity.', catBgr: '#D1FAE5', catTxt: '#059669'
  },
  { 
    name: 'Paris', country: 'France', icon: 'diamond-outline' as const, 
    iconBgColor: '#8B5CF6', pastelBgColor: '#F5F3FF', 
    rating: 4.9, price: '$2,100', category: 'Cultural', duration: '6 DAYS', 
    desc: 'The city of light, love, and art.', catBgr: '#E0E7FF', catTxt: '#4338CA'
  },
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
      <View style={{ backgroundColor: '#FFF' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                onPress={() => setActiveCategory(cat.name)}
                style={[styles.catBtn, isActive && styles.catBtnActive]}>
                <Ionicons name={cat.icon} size={16} color={isActive ? '#fff' : WayoraColors.darkGray} />
                <Text style={[styles.catText, isActive && styles.catTextActive]}>{cat.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.results}>
        <Text style={styles.resultCount}>{filtered.length} destinations found</Text>
        
        {filtered.map((dest, idx) => (
          <TouchableOpacity key={dest.name} style={styles.card} onPress={() => router.push('/planner' as any)}>
            <View style={[styles.cardImage, { backgroundColor: dest.pastelBgColor }]}>
              
              {/* Duration Badge */}
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{dest.duration}</Text>
              </View>

              {/* Rating Badge */}
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color={WayoraColors.orange} />
                <Text style={styles.ratingText}>{dest.rating}</Text>
              </View>

              {/* Centered Square Icon Wrapper */}
              <View style={[styles.cardIconWrap, { backgroundColor: dest.pastelBgColor }]}>
                 <Ionicons name={dest.icon} size={36} color={dest.iconBgColor} />
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
                <View style={[styles.catTag, { backgroundColor: dest.catBgr }]}>
                  <Text style={[styles.catTagText, { color: dest.catTxt }]}>{dest.category}</Text>
                </View>
                <TouchableOpacity style={styles.planBtnWrap}>
                   {/* In the requested screenshot, Tokyo icon color was redish. So keeping the text button coral/red. */}
                   <Text style={[styles.planBtn, { color: dest.iconBgColor }]}>Plan Trip →</Text>
                   {/* For Santorini it has the large round orange message icon floating on top. */}
                   {dest.name === 'Santorini' && (
                     <View style={styles.santoriniFloatingChat}>
                       <Ionicons name="chatbubble-ellipses" size={24} color="#FFF" />
                     </View>
                   )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#F9FAFC' },
  title: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginTop: 14, gap: 10, borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  
  catScroll: { maxHeight: 54, backgroundColor: '#F9FAFC' },
  catContent: { paddingHorizontal: 20, gap: 8, alignItems: 'center', paddingBottom: 12 },
  catBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F3F4F6' },
  catBtnActive: { backgroundColor: '#FF4D6D', borderColor: '#FF4D6D', shadowColor: '#FF4D6D', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  catText: { fontSize: 13, fontWeight: '600', color: '#4B5563' },
  catTextActive: { color: '#fff' },
  
  results: { padding: 20, paddingBottom: 40, backgroundColor: '#F9FAFC' },
  resultCount: { fontSize: 12, color: '#6B7280', fontWeight: '500', marginBottom: 12 },
  
  card: { backgroundColor: '#FFF', borderRadius: 24, marginBottom: 16, overflow: 'visible', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 3 },
  cardImage: { height: 160, alignItems: 'center', justifyContent: 'center', position: 'relative', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  
  cardIconWrap: { width: 72, height: 72, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  
  ratingBadge: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  
  durationBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#6B7280', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  durationText: { fontSize: 10, fontWeight: '800', color: '#fff', textTransform: 'uppercase' },
  
  cardBody: { padding: 20 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardName: { fontSize: 18, fontWeight: '800', color: '#111827' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  cardCountry: { fontSize: 13, color: '#6B7280' },
  cardPrice: { fontSize: 18, fontWeight: '800', color: '#FF4D6D' },
  
  cardDesc: { fontSize: 13, color: '#4B5563', marginTop: 12, lineHeight: 18 },
  
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, position: 'relative' },
  catTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  catTagText: { fontSize: 11, fontWeight: '700' },
  
  planBtnWrap: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  planBtn: { fontSize: 13, fontWeight: '700' },
  
  // Specific override for Santorini floating bubble that appears in user screenshot
  santoriniFloatingChat: { position: 'absolute', bottom: -5, right: -15, width: 56, height: 56, borderRadius: 28, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center', shadowColor: '#F97316', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
});
