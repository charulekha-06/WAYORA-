import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Dimensions, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getCurrentLocation } from '@/lib/location';

const { width } = Dimensions.get('window');

const categories = [
  { name: 'All', icon: 'compass-outline' as const },
  { name: 'Adventure', icon: 'trail-sign-outline' as const },
  { name: 'Beach', icon: 'water-outline' as const },
  { name: 'Cultural', icon: 'business-outline' as const },
  { name: 'Wellness', icon: 'heart-outline' as const },
  { name: 'Nature', icon: 'leaf-outline' as const },
];

const destinations = [
  { 
    name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, price: '$1,200', category: 'Cultural', duration: '7 DAYS', 
    desc: 'Ancient temples meet neon-lit streets.'
  },
  { 
    name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, price: '$1,800', category: 'Beach', duration: '5 DAYS', 
    desc: 'White-washed buildings on volcanic cliffs.'
  },
  { 
    name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    rating: 4.7, price: '$900', category: 'Wellness', duration: '10 DAYS', 
    desc: 'Rice terraces, temples, and serenity.'
  },
  { 
    name: 'Paris', country: 'France',    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, price: '$2,100', category: 'Cultural', duration: '6 DAYS', 
    desc: 'The city of light, love, and art.'
  },
  { 
    name: 'Machu Picchu', country: 'Peru',    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, price: '$1,500', category: 'Adventure', duration: '8 DAYS', 
    desc: 'Lost city of the Incas in the Andes.'
  },
  { 
    name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, price: '$2,500', category: 'Beach', duration: '5 DAYS', 
    desc: 'Crystal waters and overwater bungalows.'
  },
  { 
    name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, price: '$1,100', category: 'Cultural', duration: '5 DAYS', 
    desc: 'Bamboo forests and 2,000 temples.'
  },
  { 
    name: 'Swiss Alps', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, price: '$2,800', category: 'Nature', duration: '7 DAYS', 
    desc: 'Snow-capped peaks and alpine meadows.'
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [locLoading, setLocLoading] = useState(false);

  useEffect(() => {
    async function fetchLoc() {
      setLocLoading(true);
      const loc = await getCurrentLocation();
      if (loc && loc.city) {
        setCurrentCity(loc.city);
      } else {
        setCurrentCity('Nearby');
      }
      setLocLoading(false);
    }
    fetchLoc();
  }, []);

  const filtered = destinations.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Results */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.results}>
        {/* Header moved inside */}
        <View style={styles.headerInner}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search destinations..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Categories moved inside */}
        <View style={{ backgroundColor: 'transparent' }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => setActiveCategory(cat.name)}
                  style={[styles.catBtn, isActive && styles.catBtnActive]}>
                  <Ionicons name={cat.icon} size={16} color={isActive ? '#fff' : '#6B7280'} />
                  <Text style={[styles.catText, isActive && styles.catTextActive]}>{cat.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ marginBottom: 16 }}>
          <View style={styles.locationTag}>
            <Ionicons name={locLoading ? "sync" : "location"} size={14} color="#FF5A36" />
            <Text style={styles.locationTagText}>
              {locLoading ? "Discovering location..." : `Discover near ${currentCity || "Nearby"}`}
            </Text>
          </View>
          <Text style={styles.resultCount}>{filtered.length} destinations found</Text>
        </View>
        
        {filtered.map((dest, idx) => (
          <TouchableOpacity key={dest.name} style={styles.card} onPress={() => router.push('/itinerary' as any)}>
            <View style={styles.cardImageContainer}>
              <Image source={{ uri: dest.image }} style={styles.cardImage} />
              <View style={styles.cardImageOverlay}>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{dest.duration}</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color="#FBBF24" />
                  <Text style={styles.ratingText}>{dest.rating}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardName}>{dest.name}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
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
                <TouchableOpacity style={styles.planBtnWrap} onPress={() => router.push('/itinerary' as any)}>
                   <Text style={styles.planBtn}>Plan Trip →</Text>
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
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  headerInner: { paddingHorizontal: 0, paddingBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFC', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, gap: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  searchInput: { flex: 1, fontSize: 16, color: '#111827' },
  
  catScroll: { backgroundColor: 'transparent', paddingBottom: 10 },
  catContent: { paddingHorizontal: 0, gap: 10, alignItems: 'center', paddingTop: 4 },
  catBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 24, backgroundColor: '#F9FAFC', borderWidth: 1, borderColor: '#E5E7EB' },
  catBtnActive: { backgroundColor: '#FF5A36', borderColor: '#FF5A36' },
  catText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  catTextActive: { color: '#FFF' },
  
  results: { padding: 20, paddingBottom: 100 },
  resultCount: { fontSize: 14, color: '#6B7280', fontWeight: '500', marginBottom: 16 },
  
  card: { backgroundColor: '#FFF', borderRadius: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4 },
  cardImageContainer: { position: 'relative', width: '100%', height: 220 },
  cardImage: { width: '100%', height: '100%', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  cardImageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 16, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' },
  
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255, 255, 255, 0.95)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  ratingText: { fontSize: 13, fontWeight: '800', color: '#111827' },
  
  durationBadge: { backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  durationText: { fontSize: 11, fontWeight: '800', color: '#FFF', textTransform: 'uppercase', letterSpacing: 0.5 },
  
  cardBody: { padding: 20 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardName: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardCountry: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  cardPrice: { fontSize: 20, fontWeight: '800', color: '#FF5A36' },
  
  cardDesc: { fontSize: 15, color: '#4B5563', marginTop: 12, lineHeight: 22 },
  
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  catTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  catTagText: { fontSize: 12, fontWeight: '700', color: '#4B5563', textTransform: 'uppercase' },
  
  planBtnWrap: { flexDirection: 'row', alignItems: 'center' },
  planBtn: { fontSize: 15, fontWeight: '800', color: '#FF5A36' },
  locationTag: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8, backgroundColor: '#FFF', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FF5A36' },
  locationTagText: { fontSize: 12, fontWeight: '700', color: '#FF5A36' },
});
